'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cars', [
      {
        licensePlate: 'ABC12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        licensePlate: 'AB1230',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        licensePlate: 'AB12302',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cars', null, {});
  },
};
