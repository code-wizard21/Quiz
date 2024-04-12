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
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

// const whitelist = ['http://localhost:3001', 'https://quiz-web-five.vercel.app'];
const whitelist =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local'
    ? ['http://localhost:3001', 'https://quiz-web-five.vercel.app', 'https://www.quizmobb.com']
    : ['https://quiz-web-five.vercel.app', 'https://www.quizmobb.com'];

const endpointSecret = 'whsec_hm0gPh68j8RunfG1DEbrF2RzSKqDo0Dm';

const app = express();
const bodyParser = require('body-parser');
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
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
  let ticketCount = 0;
  
  const ticketMapping = {
    300: 1,
    500: 2,
    2200: 10,
    3600: 20,
  };
  
  ticketCount = ticketMapping[info.amount_total] || 0;
  if (event.type == 'checkout.session.completed') {
    
    const newData = new Payment({
      amount: info.amount_total,
      status: info.payment_status,
      item: ticketCount,
      user: info.customer_details.name,
      email: info.customer_details.email,
      trx_date: info.created,
    });
    console.log('newData',newData);
    newData
      .save()
      .then((res) => {
        console.log('res',res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('checkoutSessionCompleted', checkoutSessionCompleted);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

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

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
