'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    subjectId: DataTypes.INTEGER,
    questionText: DataTypes.STRING,
    level: DataTypes.INTEGER,
    type: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};