'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [
      {
        userId: 1,
        answerId: 1,
        name: 'firstTest',
        time: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        answerId: 2,
        name: 'secondTest',
        time: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        answerId: 3,
        name: 'thirdTest',
        time: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
