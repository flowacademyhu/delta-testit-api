'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestQuestion = sequelize.define('TestQuestion', {
    questionId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER
  }, {});
  TestQuestion.associate = function(models) {
    // associations can be defined here
  };
  return TestQuestion;
};