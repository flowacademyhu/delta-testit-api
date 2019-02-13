'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [
      {
        userId: 1,
        name: 'firstTest',
        time: 10,
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'secondTest',
        time: 15,
        status: 'PROCESSING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        name: 'thirdTest',
        time: 30,
        status: 'CLOSED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
