module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("googleUser", {
    code: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
    isDelete: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};