'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    testId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.ENUM('PUBLISHED', 'CLOSED')
  }, {
    getterMethods: {
      sum: async function () {
        let sum = 0;
        const chosenAnswers = await this.getChoosenAnswers({where: {resultId: this.id}});
        for (let i = 0; i < chosenAnswers.length; i++) {
          sum += chosenAnswers[i].points;
        }
        return sum;
      }
    }
  });
  Result.associate = function (models) {
    Result.belongsTo(models.Test, { foreignKey: 'testId' });
    Result.belongsTo(models.User, { foreignKey: 'userId' });
    Result.hasMany(models.ChoosenAnswer, { foreignKey: 'resultId', onDelete: 'cascade' });
  };
  return Result;
};
