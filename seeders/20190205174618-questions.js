'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        subjectId: 1,
        text: 'First question',
        picture: 'pic1',
        type: 'True or False',
        value: 2,
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 1,
        text: 'First question',
        picture: 'pic1',
        type: 'True or False',
        value: 1,
        status: 'PROCESSING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 1,
        text: 'First question',
        picture: 'pic1',
        type: 'True or False',
        value: 2,
        status: 'CLOSED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
