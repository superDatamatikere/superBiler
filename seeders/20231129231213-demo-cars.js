'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cars', [
      {
        licensePlate: 'ABC123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cars', null, {});
  },
};
