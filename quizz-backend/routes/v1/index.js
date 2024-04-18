const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const quizRoute = require('./quiz.route');
const quizCategoryRoute = require('./quiz-category.route');
const optionRoute = require('./option.route');
const userAnswerRoute = require('./user-answer.route');
const questionRoute = require('./question.route');
const participationRoute = require('./participation.route');
const quizReminderRoute = require('./quiz-reminder.route');
const agoraRoute = require('./agora.route');
const paymentRoute = require('./payment.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const transactionRoute = require('./transaction.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },

  {
    path: '/users',
    route: userRoute,
  },
  // {
  //   path: '/transaction',
  //   route: transactionRoute,
  // },
  {
    path: '/quizes',
    route: quizRoute,
  },
  {
    path: '/categories',
    route: quizCategoryRoute,
  },
  {
    path: '/options',
    route: optionRoute,
  },
  {
    path: '/user_answers',
    route: userAnswerRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
  {
    path: '/participations',
    route: participationRoute,
  },
  {
    path: '/agora',
    route: agoraRoute,
  },
  {
    path: '/quiz_reminders',
    route: quizReminderRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
