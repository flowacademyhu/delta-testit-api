'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    testId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Result.associate = function (models) {
    Result.belongsTo(models.Test);
    Result.belongsTo(models.User);
    Result.hasMany(models.ChoosenAnswer);
  };
  return Result;
};
