'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        subjectId: 9,
        text: 'Mi a kedvenc Tantárgyad?',
        picture: 'pic1',
        type: 'SelectOne',
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 1,
        text: 'Olvastál e ma a Sequelize dokumentációból?',
        picture: 'pic2',
        type: 'True or False',
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 3,
        text: 'A Buborékos Rendezés miért ezt a nevet kapta?',
        picture: 'pic3',
        type: 'SelectOne',
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 5,
        text: 'M-es vagy XL-es pólót hord Jani?',
        picture: 'pic4',
        type: 'True or False',
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 5,
        text: 'Hány pontos vessző van egy átlagos for ciklusban?',
        picture: 'pic5',
        type: 'SelectOne',
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 2,
        text: 'Hány órát aludtál az éjjel?',
        picture: 'pic6',
        type: 'SelectOne',
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 4,
        text: 'Push-oltál e ma a git-re?',
        picture: 'pic6',
        type: 'SelectOne',
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subjectId: 9,
        text: 'Mennyire vagy asszertív a reggeli kávéd előtt?',
        picture: 'pic7',
        type: 'SelectOne',
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
