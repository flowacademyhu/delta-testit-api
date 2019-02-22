'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Answers', [
      {
        questionId: 1,
        text: 'Attól függ mennyire van reggel.',
        isCorrect: false,
        picture: 'answerPic1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 1,
        text: 'Mindig asszertív vagyok.',
        isCorrect: true,
        picture: 'answerPic2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 1,
        text: 'Hajaj...',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 1,
        text: 'Nem kávézok.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        text: 'Próbáltam, de csak japán nyelvű leírást találtam.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        text: 'Mi az a sequelize dokumentáció?',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        text: 'Nem kellett, tudom fejből.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        text: 'Igen, csemegéztem belőle ma is.',
        isCorrect: true,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        text: 'Motivált/demotivált.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        text: 'Modulator-demodulator.',
        isCorrect: true,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        text: 'Modern organikus déli egészséges mandarin.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        text: 'Mindjárt óriásit derülünk ezen a műsoron.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        text: 'Kettő.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        text: 'Egy sem, te lüke.',
        isCorrect: true,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        text: 'Négy.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        text: 'Nyolc.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        text: 'Azt a "stash" paranccsal kell?',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        text: 'A főnök mondta, hogy olyat itt nem csinálunk.',
        isCorrect: false,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        text: 'Igen, ahányszor egy új funkció működött.',
        isCorrect: true,
        picture: 'answerPic3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        text: 'Igen, de sikertelenül.',
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
