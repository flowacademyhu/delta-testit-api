'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: {
      type: DataTypes.STRING
      // allowNull: false
      // defaultValue: 'role'
    },
    firstName: {
      type: DataTypes.STRING
      // allowNull: false
      // validate: {notNull: { msg: 'foo is required' }}
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
      // allowNull: false
    },
    encryptedPassword: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    lastLoginAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  }, {
    allowNull: false,
    defaultValue: null
    // validate: { min: 3, max: 500 }
  });
  User.associate = function (models) {
    User.belongsTo(models.Group, { foreignKey: 'groupId' });
    User.hasMany(models.Result, { foreignKey: 'userId' });
    User.hasMany(models.Test, { foreignKey: 'userId' });
    User.hasMany(models.SubjectUser, { foreignKey: 'userId' });
  };
  return User;
};
