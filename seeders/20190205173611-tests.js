<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> develop
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [
      {
        userId: 1,
<<<<<<< HEAD
        answerId: 1,
=======
>>>>>>> develop
        name: 'firstTest',
        time: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
<<<<<<< HEAD
        answerId: 2,
=======
>>>>>>> develop
        name: 'secondTest',
        time: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
<<<<<<< HEAD
        answerId: 3,
=======
>>>>>>> develop
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
<<<<<<< HEAD
=======
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [
      {
        userId: 1,
        name: 'firstTest',
        time: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'secondTest',
        time: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
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
>>>>>>> develop
=======
>>>>>>> develop
