const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
const { Quiz, QuizVote, LiveStream, Leaderboard, Question } = require('../models');
const ApiError = require('../utils/ApiError');
const UserParticipation = require('../models/participation.model');
const QuizQuestion = require('../models/question.model');
const Option = require('../models/option.model');
const mongoose = require('mongoose');
const UserActivity=require('../models/user-activity.model');
const UserAnswer=require('../models/user-answer.model');
/**
 * Create a user
 * @param {Object} quizBody
 * @returns {Promise<Quiz>}
 */
const createQuiz = async (quizBody, mongooseSession) => {
  const newQuiz = new Quiz(quizBody);
  await newQuiz.save({ session: mongooseSession });

  if (quizBody?.questions.length) {
    for (const question of quizBody.questions) {
      const newQuestion = new QuizQuestion({
        quiz: newQuiz._id,
        text: question.text,
        type: 'multiple_choice',
      });
      await newQuestion.save({ session: mongooseSession });

      // Create options
      for (const option of question.options) {
        const newOption = new Option({
          question: newQuestion._id,
          text: option.text,
          is_correct: option.is_correct,
        });
        await newOption.save({ session: mongooseSession });
      }
    }
  }
  return newQuiz;
};

const calculateQuizLeaderboard = async () => {
  try {
    let updatedUserActivityTable = await UserActivity.find();
    for (let i = 0; i < updatedUserActivityTable.length; i++) {
      let info = await UserAnswer.find({
        username: updatedUserActivityTable[i].username,
      });

      let time = 0;
      let correct = 0;
      let allQuestionCorrect = false;
      for (let i = 0; i < info.length; i++) {
        if (typeof info[i].duration === 'number') {
          time += parseFloat(info[i].duration.toFixed(2));
        }

        if (info[i].state == 'true') {
          correct++;
        }
      }
      if (correct == info.length) {
        allQuestionCorrect = true;
      }
      const result = await UserActivity.updateOne(
        { username: updatedUserActivityTable[i].username },
        { $set: { time: time, correct: correct, allQuestionCorrect: allQuestionCorrect } }
      );
    }
    const docs = await UserActivity.find({ role: 'user' }).sort({ correct: -1, time: 1 });

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const bulkOps = docs.map((doc, index) => {
        return {
          updateOne: {
            filter: { _id: doc._id },
            update: { $set: { rank: index + 1 } },
          },
        };
      });

      await UserActivity.bulkWrite(bulkOps, { session });
      await session.commitTransaction();
    } catch (error) {
      console.error('Error occurred while updating user ranks: ', error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }

   
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);
  }
};
/**
 * Get quiz by id
 * @param {ObjectId} quizId
 * @returns {Promise<Quiz>}
 */

const getQuizById = async (quizId, authUserId) => {
  // Match the quiz with the given quizId
  const quiz = await Quiz.aggregate([
    { $match: { _id: new ObjectId(quizId) } },
    // populate the voting_category field with the category and select only the name field
    {
      $lookup: {
        from: 'categories',
        localField: 'voting_category',
        foreignField: '_id',
        as: 'voting_category_temp',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    // add total_votes field to voting_category_temp array
    {
      $addFields: {
        voting_category_temp: {
          $map: {
            input: '$voting_category_temp',
            as: 'category',
            in: {
              $mergeObjects: [
                '$$category',
                {
                  total_votes: 0,
                },
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: 'quizvotes',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $group: {
              _id: '$category',
              total_votes: { $sum: 1 },
            },
          },
        ],
        as: 'category_votes',
      },
    },
    // get total votes for quiz
    {
      $lookup: {
        from: 'quizvotes',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $count: 'total_votes',
          },
        ],
        as: 'total_votes',
      },
    },
    // match category_votes[x]._id with voting_category_temp[x]._id and add total_votes field to voting_category array
    {
      $addFields: {
        voting_category: {
          $map: {
            input: '$voting_category_temp',
            as: 'category',
            in: {
              $mergeObjects: [
                '$$category',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$category_votes',
                        as: 'votes',
                        cond: { $eq: ['$$votes._id', '$$category._id'] },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },

    // Lookup quizzes collection to get the total count of quizzes in the same category
    {
      $lookup: {
        from: 'quizzes',
        let: { category: '$category' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$category', '$$category'],
              },
            },
          },
          {
            $count: 'category_total',
          },
        ],
        as: 'category_total',
      },
    },

    // Lookup quizreminders collection to get the reminders set by the user for this quiz
    {
      $lookup: {
        from: 'quizreminders',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$quiz', '$$quiz_id'] }, { $eq: ['$user', authUserId] }, { $ne: [authUserId, null] }],
              },
            },
          },
          {
            $project: {
              _id: 1,
              quiz: 1,
              user: 1,
              date: 1,
              active: 1,
              status: 1,
            },
          },
        ],
        as: 'quiz_reminders',
      },
    },

    // Unwind the quiz_reminders array to get individual documents for each reminder
    {
      $unwind: {
        path: '$quiz_reminders',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        completed: 2, // TODO: update this based on user participation
      },
    },
    // check if user has voted for this quiz as has_voted
    {
      $lookup: {
        from: 'quizvotes',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$quiz', '$$quiz_id'] }, { $eq: ['$user', authUserId] }],
              },
            },
          },
        ],
        as: 'user_vote',
      },
    },
    // Project only the required fields for the response
    {
      $project: {
        _id: 1,
        host: 1,
        category: 1,
        start_date: 1,
        status: 1,
        'voting_category._id': 1,
        'voting_category.name': 1,
        'voting_category.total_votes': 1,
        total_votes: { $arrayElemAt: ['$total_votes.total_votes', 0] },
        is_paid: 1,
        description: 1,
        is_live: 1,
        image: 1,
        quiz_reminders: 1,
        // category_total: { $arrayElemAt: ['$category_total.category_total', 0] },
        completed: 1, // TODO: update this based on user participation
        has_voted: { $cond: { if: { $eq: [{ $size: '$user_vote' }, 0] }, then: false, else: true } },
      },
    },
  ]);

  if (!quiz) {
    return null;
  }

  return quiz[0];
};

/**
 * Query for quizes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.type] - Type of quiz
 * @param {string} [options.host] - Host of quiz
 * @returns {Promise<QueryResult>}
 */

const queryQuizes = async (filter, options, authUserId) => {
  let sort = {};
  let limit;
  if (options.sort_by) {
    const parts = options.sort_by.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  } else {
    sort = { createdAt: -1 };
  }

  if (options.limit) {
    // make sure it is less than 100
    limit = parseInt(options.limit, 10);
    if (limit > 100) {
      limit = 100;
    }
  } else {
    limit = 10;
  }

  const page = options.page ? parseInt(options.page, 10) : 1;

  const quizes = await Quiz.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: 'categories',
        localField: 'voting_category',
        foreignField: '_id',
        as: 'voting_category_temp',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      // implement has_voted
      $lookup: {
        from: 'quizvotes',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$quiz', '$$quiz_id'] }, { $eq: ['$user', authUserId] }, { $ne: [authUserId, null] }],
              },
            },
          },
        ],
        as: 'user_vote',
      },
    },
    // add total_votes field to voting_category_temp array
    {
      $addFields: {
        voting_category_temp: {
          $map: {
            input: '$voting_category_temp',
            as: 'category',
            in: {
              $mergeObjects: [
                '$$category',
                {
                  total_votes: 0,
                },
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: 'quizvotes',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $group: {
              _id: '$category',
              total_votes: { $sum: 1 },
            },
          },
        ],
        as: 'category_votes',
      },
    },
    // get total votes for quiz
    {
      $lookup: {
        from: 'quizvotes',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $count: 'total_votes',
          },
        ],
        as: 'total_votes',
      },
    },
    // match category_votes[x]._id with voting_category_temp[x]._id and add total_votes field to voting_category array
    {
      $addFields: {
        voting_category: {
          $map: {
            input: '$voting_category_temp',
            as: 'category',
            in: {
              $mergeObjects: [
                '$$category',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$category_votes',
                        as: 'votes',
                        cond: { $eq: ['$$votes._id', '$$category._id'] },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    // populate host name
    {
      $lookup: {
        from: 'users',
        localField: 'host',
        foreignField: '_id',
        as: 'host',
      },
    },
    {
      $unwind: {
        path: '$host',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: sort,
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        _id: 1,
        'host._id': 1,
        'host.name': 1,
        category: '$category.name',
        start_date: 1,
        status: 1,
        'voting_category._id': 1,
        'voting_category.name': 1,
        'voting_category.total_votes': 1,
        total_votes: { $ifNull: [{ $arrayElemAt: ['$total_votes.total_votes', 0] }, 0] },
        is_paid: 1,
        description: 1,
        is_live: 1,
        image: 1,
        has_voted: { $cond: { if: { $eq: [{ $size: '$user_vote' }, 0] }, then: false, else: true } },
      },
    },
  ]);

  return {
    results: quizes,
  };
};

/**
 * Update quiz by id
 * @param {ObjectId} quizId
 * @param {Object} updateBody
 * @returns {Promise<Quiz>}
 */

const updateQuizById = async (quizId, updateBody) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const quiz = await Quiz.findById(quizId).session(session);
    if (!quiz) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
    }

    // check if their is any user participation for this quiz and if yes then throw error
    // const userParticipation = await UserParticipation.countDocuments({ quiz: quizId }).session(session);

    // if (userParticipation) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, `can't update quiz as user has already participated in this quiz`);
    // }

    if (updateBody?.removed_questions?.length) {
      for (const questionId of updateBody.removed_questions) {
        // remove quiz and their options
        await Option.deleteMany({ question: questionId }).session(session);

        await Question.deleteOne({ _id: questionId }).session(session);
      }
    }

    if (updateBody?.removed_options?.length) {
      for (const optionId of updateBody.removed_options) {
        await Option.deleteOne({ _id: optionId }).session(session);
      }
    }

    if (updateBody?.questions.length) {
      for (const question of updateBody.questions) {
        if (question._id) {
          const Question = await QuizQuestion.findById(question._id).session(session);
          if (!Question) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
          }
          Question.text = question.text;
          Question.question = question.question;
          await Question.save();

          // Update options
          for (const questionOption of question.options) {
            if (questionOption._id) {
              const OptionData = await Option.findById(questionOption._id).session(session);
              if (!OptionData) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Option not found');
              }
              OptionData.text = questionOption.text;
              OptionData.is_correct = questionOption.is_correct;
              await OptionData.save();
            } else {
              // Create new option
              const newOption = new Option({
                question: Question._id,
                text: questionOption.text,
                is_correct: questionOption.is_correct,
              });
              await newOption.save();
            }
          }
        } else {
          // Create new question
          const newQuestion = new QuizQuestion({
            quiz: quizId,
            text: question.text,
            type: 'multiple_choice',
          });
          await newQuestion.save();

          // Create options
          for (const questionOption of question.options) {
            const newOption = new Option({
              question: newQuestion._id,
              text: questionOption.text,
              is_correct: questionOption.is_correct,
            });
            await newOption.save();
          }
        }
      }
    }

    Object.assign(quiz, updateBody);
    await quiz.save();

    await session.commitTransaction();
    session.endSession();

    return quiz;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

/**
 * Get quiz overview
 * @param {Object} filter
 * @returns {Promise<Quiz>}
 */

const getQuizesOverview = async (filter) => {
  const facetQuery = {};
  if (filter.paid || (!filter.paid && !filter.free)) {
    facetQuery.paid = [
      { $match: { is_paid: true, category: { $ne: null } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      {
        $addFields: {
          completed: 2, // TODO: update this based on user participation
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      { $project: { category: '$category.name', count: 1, _id: 0, completed: 2 } },
    ];
  }

  if (filter.free || (!filter.paid && !filter.free)) {
    facetQuery.free = [
      { $match: { is_paid: false, category: { $ne: null } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      {
        $addFields: {
          completed: 2, // TODO: update this based on user participation
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      { $project: { category: '$category.name', count: 1, _id: 0, completed: 2 } },
    ];
  }

  const result = await Quiz.aggregate([
    {
      $facet: facetQuery,
    },
  ]);

  if (result.length === 0) {
    return {};
  }
  return result[0];
};

const voteQuizCategory = async (quizId, categoryId, userId) => {
  const quizVote = await QuizVote.create({
    quiz: quizId,
    category: categoryId,
    user: userId,
  });

  return quizVote;
};

const getQuizVotes = async (quizId) => {
  // fetch quiz votes from quizvotes collection and group by category
  const quizVotes = await QuizVote.aggregate([
    {
      $match: {
        quiz: new ObjectId(quizId),
      },
    },
    {
      $group: {
        _id: '$category',
        votes: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },
    { $project: { category: '$category.name', votes: 1, _id: 0 } },
  ]);

  return quizVotes;
};

const getQuizQuestions = async (quizId) => {
  const quizQuestions = await Quiz.aggregate([
    {
      $match: {
        _id: new ObjectId(quizId),
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'quizquestions',
        // pipeline
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $lookup: {
              from: 'options',
              let: { question_id: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ['$question', '$$question_id'],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    text: 1,
                    is_correct: 1,
                  },
                },
              ],
              as: 'options',
            },
          },
          {
            $project: {
              _id: 1,
              question: 1,
              options: 1,
              text: 1,
            },
          },
        ],
        as: 'questions',
      },
    },
    {
      $lookup: {
        // get room_id from livestreams collection
        from: 'livestreams',
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $project: {
              _id: 1,
              room_id: 1,
            },
          },
        ],
        as: 'livestream',
      },
    },
    {
      $unwind: {
        path: '$livestream',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        questions: 1,
        category: '$category.name',
        start_date: 1,
        room_id: '$livestream.room_id',
      },
    },
  ]);

  return quizQuestions[0];
};

const createQuizLiveStream = async (quizId, hostId, transaction) => {
  // create a entry in livestreams collection
 
  const liveStream = new LiveStream({
    quiz: quizId,
    host: hostId,
  });

  await liveStream.save({ session: transaction });

  return LiveStream.findById(liveStream._id);
};

const patchQuizLive = async (quizId, status, hostId) => {
  const quizLiveData = await LiveStream.findOne({ quiz: quizId, host: hostId });

  if (!quizLiveData) {
    return null;
  }

  if (status === 'ongoing') {
    quizLiveData.start_time = new Date();
  }

  if (status === 'completed') {
    quizLiveData.end_time = new Date();
  }

  quizLiveData.status = status;

  await quizLiveData.save();

  return quizLiveData;
};

const calculateLeaderboard = async (quizId) => {
  try {
    const allUserParticipation = await UserParticipation.aggregate([
      {
        $match: {
          quiz: new ObjectId(quizId),
          user_type: 'registered',
        },
      },
      {
        $lookup: {
          from: 'useranswers',
          let: { user_id: '$user' },
          pipeline: [
            {
              $match: {
                // matched quizId and userId
                $expr: {
                  $and: [{ $eq: ['$quiz', new ObjectId(quizId)] }, { $eq: ['$user', '$$user_id'] }],
                },
              },
            },
            {
              $lookup: {
                from: 'options',
                let: { option_id: '$option' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$option_id'],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      is_correct: 1,
                    },
                  },
                ],
                as: 'option',
              },
            },
            {
              $unwind: {
                path: '$option',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                is_correct: '$option.is_correct',
                duration: 1,
              },
            },
          ],
          as: 'answers',
        },
      },
      {
        $addFields: {
          correct_answers: {
            $size: {
              $filter: {
                input: '$answers',
                as: 'answer',
                cond: { $eq: ['$$answer.is_correct', true] },
              },
            },
          },
          total_duration: {
            $sum: '$answers.duration',
          },
        },
      },
      {
        $sort: {
          correct_answers: -1,
          total_duration: 1,
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          quiz: 1,
          answers: 1,
          correct_answers: 1,
          total_duration: 1,
        },
      },
    ]);

    // loop through allUserParticipation and add them in leaderboard collection with rank based on index
    if (allUserParticipation.length > 0) {
      allUserParticipation.forEach(async (userParticipation, index) => {
        await Leaderboard.create({
          user: userParticipation.user,
          quiz: userParticipation.quiz,
          rank: index + 1,
          correct_answers: userParticipation.correct_answers,
          total_duration: userParticipation.total_duration,
        });
      });
    }

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getQuizLeaderboard = async (quizId, userId, page = 1, limit = 10, fetchUserData = false) => {
  // TODO: to be removed after testing #Remove #Testing
  // await Leaderboard.deleteMany({ quiz: quizId });
  // await calculateLeaderboard(quizId);

  limit = limit > 20 ? 20 : limit;

  const userRanking = await Leaderboard.findOne({ quiz: quizId, user: userId }, { rank: 1 });

  const userRank = userRanking?.rank;

  const userRankPage = Math.ceil(userRank / limit);

  if (userRankPage && fetchUserData) {
    page = userRankPage;
  }

  const leaderboard = await Leaderboard.paginate(
    { quiz: quizId },
    { page, limit, populate: { path: 'user', select: 'name' }, sort_by: 'rank:asc' }
  );

  // loop over leaderboard and generate random name if user is not present
  // TODO: to be removed after testing #Remove #Testing
  if (leaderboard?.results?.length > 0) {
    leaderboard.results.forEach((leader) => {
      if (!leader.user) {
        leader.user = {
          name: 'Anonymous',
          id: new ObjectId(),
        };
      }
    });
  }

  return {
    leaderboard,
    page,
  };
};

const getTopThreeRankerInQuiz = async (quizId) => {
  const leaderboard = await Leaderboard.find({ quiz: new ObjectId(quizId) })
    .populate('user', 'name')
    .sort({ rank: 1 })
    .limit(3);
  if (leaderboard.length === 0) {
    return null;
  }

  return leaderboard;
};

const getQuizUserSummary = async (quizId, userId) => {
  const userParticipation = await UserParticipation.findOne({ quiz: quizId, user: userId });

  if (!userParticipation) {
    return null;
  }

  const userAnswers = await QuizQuestion.aggregate([
    {
      $match: {
        quiz: new ObjectId(quizId),
      },
    },
    {
      $lookup: {
        from: 'useranswers',
        let: { question_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$question', '$$question_id'] }, { $eq: ['$user', new ObjectId(userId)] }],
              },
            },
          },
          {
            $lookup: {
              from: 'options',
              let: { option_id: '$option' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ['$_id', '$$option_id'],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    is_correct: 1,
                    text: 1,
                  },
                },
              ],
              as: 'option',
            },
          },
          {
            $unwind: {
              path: '$option',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              is_correct: '$option.is_correct',
              text: '$option.text',
              duration: 1,
            },
          },
        ],
        as: 'user_answer',
      },
    },
    {
      $unwind: {
        path: '$user_answer',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        text: 1,
        question: 1,
        user_answer: 1,
      },
    },
  ]);

  return userAnswers;
};

const queryQuizesWithDetails = async (filter, options) => {
  if (filter._id) {
    filter._id = new ObjectId(filter._id);
  }

  // get quizes with question and their options
  const quizQuestions = await Quiz.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    // populate host name & id
    {
      $lookup: {
        from: 'users',
        localField: 'host',
        foreignField: '_id',
        as: 'host',
      },
    },
    // unwind host array
    {
      $unwind: {
        path: '$host',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'voting_category',
        foreignField: '_id',
        as: 'voting_category',
      },
    },
    {
      $lookup: {
        from: 'quizquestions',
        // pipeline
        let: { quiz_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$quiz', '$$quiz_id'],
              },
            },
          },
          {
            $lookup: {
              from: 'options',
              let: { question_id: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ['$question', '$$question_id'],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    text: 1,
                    is_correct: 1,
                  },
                },
              ],
              as: 'options',
            },
          },
          {
            $project: {
              _id: 1,
              question: 1,
              options: 1,
              text: 1,
            },
          },
        ],
        as: 'questions',
      },
    },
    {
      $project: {
        _id: 1,
        questions: 1,
        category: 1,
        start_date: 1,
        voting_category: 1,
        is_paid: 1,
        description: 1,
        is_live: 1,
        image: 1,
        host: {
          _id: 1,
          name: 1,
        },
        status: 1,
      },
    },
  ]);

  return {
    results: quizQuestions,
  };
};

module.exports = {
  createQuiz,
  getQuizById,
  queryQuizes,
  updateQuizById,
  getQuizesOverview,
  voteQuizCategory,
  getQuizVotes,
  getQuizQuestions,
  createQuizLiveStream,
  patchQuizLive,
  calculateLeaderboard,
  getQuizLeaderboard,
  getTopThreeRankerInQuiz,
  getQuizUserSummary,
  calculateQuizLeaderboard,
  queryQuizesWithDetails,
};
