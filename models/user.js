'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'student'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    encryptedPassword: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    lastLoginAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  });
  User.associate = function (models) {
    User.belongsTo(models.Group, { foreignKey: 'groupId' });
    User.hasMany(models.Result, { foreignKey: 'userId' });
    User.hasMany(models.Test, { foreignKey: 'userId' });
    User.hasMany(models.SubjectUser, { foreignKey: 'userId' });
  };
  return User;
};
