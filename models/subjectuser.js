'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubjectUser = sequelize.define('SubjectUser', {
    subjectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  SubjectUser.associate = function (models) {
    SubjectUser.belongsTo(models.User);
    SubjectUser.belongsTo(models.Subject);
  };
  return SubjectUser;
};
