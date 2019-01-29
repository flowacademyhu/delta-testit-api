'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    subjectId: DataTypes.INTEGER,
    questionText: DataTypes.STRING,
    level: DataTypes.INTEGER,
    type: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    Question.hasMany(models.TestQuestion);
    Question.hasMany(models.Answer);
    Question.belongsTo(models.Subject);
  };
  return Question;
};
