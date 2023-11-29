const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Sørg for, at e-mail er unik
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsToMany(models.Car, { through: 'UserCar' });

module.exports = User;