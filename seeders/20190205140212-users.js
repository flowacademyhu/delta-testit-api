'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        role: 'STUDENT',
        firstName: 'Rencso',
        lastName: 'Wilson',
        email: 'rencso@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'MENTOR',
        firstName: 'Peti',
        lastName: 'Stuart',
        email: 'peti@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'ADMIN',
        firstName: 'Brigi',
        lastName: 'Pattinson',
        email: 'brigi@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
