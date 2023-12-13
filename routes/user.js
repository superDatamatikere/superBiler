var express = require('express');
var router = express.Router();
const { car, user, userCar } = require("../models")

/* GET users listing. */
router.get('/', function (req, res, next) {
	if (!req.session.userId) {
		res.redirect('/auth');
	} else if (req.session.userId) {
		res.redirect('/user/account');
	}
});

router.get('/account', async function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/auth');
    }
    else if (req.session.userId) {
        const currentUser = await user.findOne({ where: { id: req.session.userId } });
        res.render('account', {
            title: 'Account Page',
            isLoggedIn: req.session.userId,
            User: currentUser,
            recentCars: req.session.recentCars
        });
    }
});

router.get('/update', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/delete', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/favourite/cars', async function (req, res, next) {
	try {
		if (!req.session.userId) {
			res.redirect('/auth');
			
		} else if (req.session.userId) {
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

			res.render('favouriteCars', { title: 'Favourite Car Relationships', userCars: formattedData, isLoggedIn: req.session.userId});
		}
	} catch (e) {
		console.error(e);
		res.status(500).send("Error occurred");
	}
});

router.get('/cars', async function (req, res, next) {
	try {
		const cars = await car.findAll();

		res.render('carsAvailable', { title: 'Available Cars', cars: cars });
	} catch (e) {
		console.error(e);
		res.status(500).send("Error occurred");
	}
});

router.post('/cars', async function (req, res, next) {
	try {
		await userCar.create({
			userId: req.session.userId,
		});
	} catch (e) {
		console.error(e);
		res.status(500).send("Error occurred");
	}
});

router.get('/recent-cars', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/auth');
    } else {
        res.render('recentCars', {
            title: 'Seneste Sete Biler',
            recentCars: req.session.recentCars
        });
    }
});


module.exports = router;
