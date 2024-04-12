const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, agoraService } = require('../services');
const { Token, Payment, User } = require('../models');
const { DateTime } = require('luxon');
const { tokenTypes } = require('../config/tokens');
const stripe = require('stripe')(
  'sk_test_51DOfAJIFbzohYGemOLOrA6C52yD7aHdglSfl0kMB95gRJoxcDGSqpWHxa4sGtJDb5mzPX2azyvGDF3GekVRLirFu00NPR9PV6c'
);
const YOUR_DOMAIN = 'https://quizmobb.com';
//const YOUR_DOMAIN = 'http://localhost:4002';
const buyticket = catchAsync(async (req, res) => {
  const { amount, payment_method_id, user, email, item } = req.body;
  console.log(req.body);

  try {
    const paymentIntent = await stripe.paymentIntents
      .create({
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
          payment_method: 'visa ***4242',
          item: item,
          user: user,
          email: email,
          trx_date: new Date(),
        });
        newData
          .save()
          .then(() => {
            res.status(200).send(paymentIntent);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const checkoutsession = catchAsync(async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { amount, ticket, user, email } = req.body;
    console.log('req.body', req.body);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'sgd',
            product_data: {
              name: 'ticket',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/selectmode`,
      metadata: {
        email: email, // Replace with your customer's email
        user: user,
        ticket: ticket, // Replace with your customer's username
      },
    });

    //   console.log("session",session.url);
    // // res.redirect(303, session.url);
    // res.status(200).send(session.url);
  } catch (error) {
    console.error('Error confirming payment intent', error);
    res.status(500).send({ success: false });
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
  Payment.find()
    .sort({ trx_date: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {});
};

const getID = (req, res) => {
  const { params } = req;
  User.findOne(params)
    .then((result) => {
      Payment.find({ email: result.email })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  buyticket,
  gethistory,
  getAll,
  getID,
  checkoutsession,
};
