'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Test.associate = function (models) {
    Test.hasMany(models.Result);
    Test.hasMany(models.TestQuestion);
    Test.belongsTo(models.User);
  };
  return Test;
};
