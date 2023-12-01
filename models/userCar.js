'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class userCar extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			userCar.belongsTo(models.user, {
				foreignKey: 'userID',
			});

			userCar.belongsTo(models.car, {
				foreignKey: 'carID',
			});
		}
	}
	userCar.init({
		userID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
						model: 'user', // This should match the table name
						key: 'id'
				}
		},
		carID: {
				type: DataTypes.INTEGER,
				references: {
						model: 'car', // This should match the table name
						key: 'id'
				}
		}
}, {
		sequelize,
		modelName: 'userCar',
		tableName: 'userCars', // Ensure this matches your actual table name
		freezeTableName: true // This prevents Sequelize from pluralizing the table name
});
return userCar;
};