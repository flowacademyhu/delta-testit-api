'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChoosenAnswer = sequelize.define('ChoosenAnswer', {
    resultId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {});
  ChoosenAnswer.associate = function(models) {
    // associations can be defined here
  };
  return ChoosenAnswer;
};