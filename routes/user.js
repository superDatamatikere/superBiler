var express = require('express');
var router = express.Router();
const { car, user, userCar} = require("../models")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
},

);


router.get('/favourite/cars', async function(req, res, next) {
	try {
	  const userCars = await userCar.findAll({ 
		where: { userId: req.session.userId },
		include: [car, user]
	  });
  
	  const formattedData = userCars.map(({ id, car, user }) => ({
		userCarId: id,
		userId: user?.id,
		userName: user ? `${user.fname} ${user.lname}` : 'Unknown',
		carId: car?.id,
		licensePlate: car?.licensePlate
	  }));
  
	  res.render('favouriteCars', { title: 'Favourite Car Relationships', userCars: formattedData });
	} catch (e) {
	  console.error(e);
	  res.status(500).send("Error occurred");
	}
  });
  
  

module.exports = router;
