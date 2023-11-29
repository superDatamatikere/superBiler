const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Car = sequelize.define('Car', {
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Car.associate = (models) => {
    Car.belongsToMany(models.User, { through: 'UserCar' });
  };

module.exports = Car;