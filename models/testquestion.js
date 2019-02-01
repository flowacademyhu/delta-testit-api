'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestQuestion = sequelize.define('TestQuestion', {
    questionId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER
  }, {});
  TestQuestion.associate = function (models) {
    TestQuestion.belongsTo(models.Question);
    TestQuestion.belongsTo(models.Test);
  };
  return TestQuestion;
};
