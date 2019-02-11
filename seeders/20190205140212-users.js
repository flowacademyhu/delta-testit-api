'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        role: 'STUDENT',
        firstName: 'Rencso',
        lastName: 'Wilson',
        email: 'rencso@gmail.com',
        encryptedPassword: '$2b$10$YGTVVGv4nXw5a8G8aKY7BuVRPTKx4A8jBazvD1stlCu7CgbSRqG52',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'MENTOR',
        firstName: 'Peti',
        lastName: 'Stuart',
        email: 'peti@gmail.com',
        encryptedPassword: '$2b$10$xlqlNkxWV0q3aoMW6qQ3i.7tZ355hBZrcW51jZ/.jzok2nFLfsu4.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'ADMIN',
        firstName: 'Brigi',
        lastName: 'Pattinson',
        email: 'brigi@gmail.com',
        encryptedPassword: '$2b$10$31Qos56feOenf9wb.sCL7OjK14cFh3bDQ930TKtWVrUrqLpY1IoP2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
