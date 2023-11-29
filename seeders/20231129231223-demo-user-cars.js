'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCars', [
      {
        UserId: 1,
        CarId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserCars', null, {});
  },
};
