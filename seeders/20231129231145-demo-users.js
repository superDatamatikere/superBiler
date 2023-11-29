const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};