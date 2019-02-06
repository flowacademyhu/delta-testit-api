'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Answers', [
      {
        questionId: 1,
        text: 'Answer D',
        isCorrect: true,
        picture: 'answerPic1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        text: 'Answer A',
        isCorrect: true,
        picture: 'answerPic2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        text: 'Answer C',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
