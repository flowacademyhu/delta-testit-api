'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    lastLoginAt: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};