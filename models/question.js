'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    questionText: {
      type: DataTypes.STRING,
      allowNull: false
    },

    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {});
  Question.associate = function (models) {
    Question.hasMany(models.TestQuestion);
    Question.hasMany(models.Answer);
    Question.belongsTo(models.Subject);
  };
  return Question;
};
