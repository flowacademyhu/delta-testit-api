'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubjectUser = sequelize.define('SubjectUser', {
    subjectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  SubjectUser.associate = function(models) {
    // associations can be defined here
  };
  return SubjectUser;
};