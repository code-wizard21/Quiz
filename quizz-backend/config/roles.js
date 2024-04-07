const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers', 'getAllQuizDetails', 'getQuizDetails', 'createQuizRight'],
    host: ['getQuiz', 'updateQuiz', 'deleteQuiz', 'quizQuestions'],
    shadow: []
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};
