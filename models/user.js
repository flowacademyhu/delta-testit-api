'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    lastLoginAt: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    User.belongsTo(models.Group);
    User.hasMany(models.Result);
    User.hasMany(models.Test);
    User.hasMany(models.SubjectUser);
  };
  return User;
};
