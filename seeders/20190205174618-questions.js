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
        status: 'Good',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 1,
        text: 'First question',
        picture: 'pic1',
        type: 'True or False',
        value: 1,
        status: 'Bad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 1,
        text: 'First question',
        picture: 'pic1',
        type: 'True or False',
        value: 2,
        status: 'Ugly',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
