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
    Question.hasMany(models.TestQuestion, { foreignKey: 'questionId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
    Question.belongsTo(models.Subject, { foreignKey: 'subjectId' });
  };
  return Question;
};
