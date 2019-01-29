'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChoosenAnswer = sequelize.define('ChoosenAnswer', {
    resultId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {});
  ChoosenAnswer.associate = function (models) {
    ChoosenAnswer.belongsTo(models.Answer);
    ChoosenAnswer.belongsTo(models.Result);
  };
  return ChoosenAnswer;
};
