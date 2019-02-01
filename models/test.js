'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    userId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answerId: DataTypes.INTEGER
  }, {});
  Test.associate = function (models) {
    Test.hasMany(models.Result);
    Test.hasMany(models.TestQuestion);
    Test.belongsTo(models.User);
  };
  return Test;
};
