'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
  };
  return Subject;
};