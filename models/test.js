'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    time: DataTypes.TIME
  }, {});
  Test.associate = function (models) {
    Test.belongsTo(models.Result, { foreignKey: 'resultId' });
    Test.hasMany(models.TestQuestion, { foreignKey: 'testId' });
    Test.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Test;
};
