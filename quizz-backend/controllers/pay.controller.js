const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, agoraService } = require('../services');
const { Token, Payment, User } = require('../models');
const { DateTime } = require('luxon');
const { tokenTypes } = require('../config/tokens');
const stripe = require('stripe')(
  'sk_test_51DOfAJIFbzohYGemOLOrA6C52yD7aHdglSfl0kMB95gRJoxcDGSqpWHxa4sGtJDb5mzPX2azyvGDF3GekVRLirFu00NPR9PV6c'
);

const buyticket = catchAsync(async (req, res) => {
  const { amount, payment_method_id, user, email, item } = req.body;
  console.log(req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'SGD',
      payment_method: payment_method_id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    })
      .then((info) => {
        const newData = new Payment({
          amount: info.amount,
          status: info.status,
          payment_method: "visa ***4242",
          item: item,
          user: user,
          email: email,
          trx_date: new Date()
        });
        newData.save()
          .then(() => {
            res.status(200).send(paymentIntent);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err => {
        console.log(err);
      }))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


const buyticketgoogle = catchAsync(async (req, res) => {
  try {
    const paymentData = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      // `amount` should be the required amount for the product or service, 
      // remember this is in the smallest unit of the currency, cents for dollar
      amount: 1000, // for example, this will be $10.00

      // `currency` should be the currency in which the payment is supposed to be made
      currency: 'usd',
      
      // `payment_method` will be the ID of the PaymentMethod received from the client-side
      payment_method: paymentData.paymentMethodId,

      // Setting `confirmation_method` to 'manual' here since we are confirming the paymentIntent manually
      confirmation_method: 'manual',

      // We are confirming the paymentIntent immediately
      confirm: true,
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Error confirming payment intent', error);
    res.status(500).send({ success: false });
  }
});
const buyticketapp = catchAsync(async (req, res) => {
  const token = req.body.token;
  const amount=req.body.amount;
  console.log("token",token);
  console.log("amount",amount);
  // Use the token to create a charge
  try {
    const charge = await stripe.charges.create({
      amount: 100, // amount in cents
      currency: 'sgd',
      description: 'Demo payment',
      source: token,
    });

    // Respond with the status of the charge
    if (charge.paid) {
      res.json(charge);
    } else {
      res.json({ error: 'Payment failed' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

const gethistory = catchAsync(async (req, res) => {
  try {
    const paymentHistory = await stripe.charges.list({ limit: 100 });
    console.log('payment');
    res.json(paymentHistory);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: 'An error occurred while trying to fetch the payment history' });
  }
});

const getAll = (req, res) => {
  Payment.find().sort({trx_date:-1})
    .then((result) => {
      
      res.status(200).json(result);
    })
    .catch(() => {

    });
}

const getID = (req, res) => {
  const { params } = req;
  User.findOne(params)
    .then((result) => {
      Payment.find({ email: result.email })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = {
  buyticket,
  buyticketapp,
  buyticketgoogle,
  gethistory,
  getAll,
  getID,
};
