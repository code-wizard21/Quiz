const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51DOfAJIFbzohYGemOLOrA6C52yD7aHdglSfl0kMB95gRJoxcDGSqpWHxa4sGtJDb5mzPX2azyvGDF3GekVRLirFu00NPR9PV6c'
);
const { Payment } = require('./models');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/common');
const routes = require('./routes/v1');
const multer = require('multer');
const { User } = require('./models');

const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const endpointSecret = 'whsec_hm0gPh68j8RunfG1DEbrF2RzSKqDo0Dm';

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log('err', err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const info = event.data.object;

  if (event.type == 'checkout.session.completed') {
    const newData = new Payment({
      amount: info.amount_total,
      credit:info.metadata.credit,
      status: info.payment_status,
      ticket: info.metadata.ticket,
      user: info.metadata.user,
      email: info.metadata.email,
      trx_date: new Date(),
    });
 
    await newData
      .save()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log(err);
      });

    let user = await User.findOne({ email: info.metadata.email });

    let updatedDoc = await User.updateOne(
      { email: info.metadata.email },
      {
        $set: {
          ticket: user.ticket + parseInt(info.metadata.ticket),
          credit: user.credit + parseInt(info.metadata.credit),
        },
      }
    );


    response.send(200);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg'); // Add '.jpg' here
  },
});

const upload = multer({ storage: storage });

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());
app.use('/upload', express.static('upload'));
// enable cors
app.use(cors());
app.options('*', cors());

app.post(
  '/upload',
  upload.single('avatar'),
  (req, res, next) => {

    res.status(200).json({ message: 'Image uploaded successfully', filePath: req.file.filename });
  },
  (error, req, res, next) => {
    console.log('error.message', error.message);
    res.status(400).send({ error: error.message });
  }
);

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

app.get('/status', (req, res) => {
  res.status(200).send();
});

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found', true, {}));
});


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '1082715081696-mgk2hen3l75jf0oin4lavv7ga0r4pf9a.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4002/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
