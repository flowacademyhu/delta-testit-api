'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: {
      type: DataTypes.ENUM('student', 'mentor', 'admin'),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 3,
        max: 500
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 3,
        max: 500
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        max: 500
      }
    },
    picture: {
      type: DataTypes.STRING
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
