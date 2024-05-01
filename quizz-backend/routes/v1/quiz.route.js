const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const quizValidation = require('../../validations/quiz.validation');
const quizController = require('../../controllers/quiz.controller');

const router = express.Router();

// TODO: Implement AUTH in quiz API

router.post('/', auth(), validate(quizValidation.newQuiz), quizController.createQuiz);
router.get('/', validate(quizValidation.getQuizes), quizController.getQuizes);
// get all quizes with questions and options
router.get('/all', auth('getAllQuizDetails'), validate(quizValidation.getQuizes), quizController.getAllQuizesWithDetails);

router.get('/getstate', validate(quizValidation.getQuizes), quizController.getQuizeState);
router.post('/getquestion',  quizController.getQuestion);
router.post('/getonlyquestion',  quizController.getOnlyQuestion);

router.get('/overview', auth(), validate(quizValidation.getQuizesOverview), quizController.getQuizesOverview);

router.get('/:quiz_id', validate(quizValidation.getQuiz), quizController.getQuiz);
// TODO: add host auth
router.get(
  '/:quiz_id/questions',
  auth('quizQuestions'),
  validate(quizValidation.quizIdParams),
  quizController.getQuizQuestions
);
router.get('/:quiz_id/votes', auth(), validate(quizValidation.quizIdParams), quizController.getQuizVotes);

router.post('/:quiz_id/live', auth(), validate(quizValidation.quizIdParams), quizController.createQuizLiveStream);
// router.patch('/:quiz_id/live', auth(), validate(quizValidation.patchQuizLive), quizController.patchQuizLive);

router.post(
  '/:quiz_id/votes/category/:category_id',
  auth(),
  validate(quizValidation.voteQuizCategory),
  quizController.voteQuizCategory
);

router.patch('/:quiz_id', auth('createQuizRight'), validate(quizValidation.updateQuiz), quizController.updateQuiz);

router.get('/:quiz_id/leaderboard', auth(), validate(quizValidation.quizLeaderboard), quizController.getQuizLeaderboard);

router.get(
  '/:quiz_id/leaderboard/toppers',
  auth(),
  validate(quizValidation.quizIdParams),
  quizController.getTopThreeRankerInQuiz
);

router.get('/:quiz_id/livequiz',  validate(quizValidation.quizIdParams), quizController.getLiveQuiz);

router.get('/:quiz_id/user/summary', auth(), validate(quizValidation.quizIdParams), quizController.getQuizUserSummary);


router.delete('/temp', quizController.deleteAllUserAnswerAndParticipation);

module.exports = router;
