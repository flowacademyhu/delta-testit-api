'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};