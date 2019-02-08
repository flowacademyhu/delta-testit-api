'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    time: DataTypes.INTEGER
  }, {});
  Test.associate = function (models) {
    Test.hasMany(models.Result, { foreignKey: 'resultId' });
    Test.hasMany(models.TestQuestion, { foreignKey: 'testId' });
    Test.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Test;
};
