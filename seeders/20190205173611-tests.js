'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [
      {
        userId: 1,
        creatorId: 1,
        name: 'firstTest',
        time: 10,
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        creatorId: 3,
        name: 'secondTest',
        time: 15,
        status: 'PROCESSING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        creatorId: 1,
        name: 'thirdTest',
        time: 30,
        status: 'CLOSED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        creatorId: 2,
        name: 'fourthTest',
        time: 20,
        status: 'CLOSED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        creatorId: 3,
        name: 'niceTest',
        time: 25,
        status: 'PROCESSING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        creatorId: 2,
        name: 'killerTest',
        time: 60,
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
