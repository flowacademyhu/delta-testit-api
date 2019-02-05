'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        role: 'student',
        firstName: 'Rencso',
        lastName: 'Wilson',
        email: 'rencso@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'mentor',
        firstName: 'Peti',
        lastName: 'Stuart',
        email: 'peti@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'admin',
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
