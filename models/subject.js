'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function (models) {
    Subject.hasMany(models.Question, { foreignKey: 'subjectId' });
  };
  return Subject;
};
