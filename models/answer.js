'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: DataTypes.INTEGER,
    answerText: DataTypes.STRING,
    isCorrect: DataTypes.BOOLEAN
  }, {});
  Answer.associate = function (models) {
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    Answer.hasMany(models.ChoosenAnswer, { foreignKey: 'answerId' });
  };
  return Answer;
};
