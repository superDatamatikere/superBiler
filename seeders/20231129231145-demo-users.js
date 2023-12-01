const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        fname: 'test',
        lname: 'User',
        email: 'testUser@gmail.com',
        password: await bcrypt.hash('0000', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fname: 'demo1',
        lname: 'User1',
        email: 'demoUser1@gmail.com',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fname: 'demo2',
        lname: 'User2',
        email: 'demoUser2@gmail.com',
        password: await bcrypt.hash('4321', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};