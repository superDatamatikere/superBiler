const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserCar = sequelize.define('UserCar', {});

module.exports = UserCar;