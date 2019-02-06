'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Results', [
      {
        testId: 1,
        userId: 1,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testId: 2,
        userId: 2,
        status: 'SENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        testId: 3,
        userId: 3,
        status: 'CORRECTED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
