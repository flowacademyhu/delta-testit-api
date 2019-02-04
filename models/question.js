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

    picture: {
      type: DataTypes.BLOB
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
    Question.hasMany(models.TestQuestion, { foreignKey: 'questionId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
    Question.belongsTo(models.Subject, { foreignKey: 'subjectId' });
  };
  return Question;
};
