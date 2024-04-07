const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const quizReminderValidation = require('../../validations/quiz-reminder.validation');
const quizReminderController = require('../../controllers/quiz-reminder.controller');

const router = express.Router();

// TODO: Add authentication

router.get('/', auth(), validate(quizReminderValidation.getQuizReminders), quizReminderController.getQuizReminders);
router.get(
    '/:quiz_reminder_id',
    auth(),
    validate(quizReminderValidation.getQuizReminder),
    quizReminderController.getQuizReminder
);

router.post('/', auth(), validate(quizReminderValidation.createQuizReminder), quizReminderController.createQuizReminder);
router.patch(
    '/:quiz_reminder_id',
    auth(),
    validate(quizReminderValidation.updateQuizReminder),
    quizReminderController.updateQuizReminder
);

module.exports = router;
