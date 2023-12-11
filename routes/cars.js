var express = require('express');
var router = express.Router();
const { userCar, car } = require('../models');

const API_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/dmr/regnrquery';
const MOT_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/tstyr/reports?vin='
// Dette kører igennem en corsproxy, da jeg fik en CORS fejl.

router.get('/', async function (req, res) {
    try {

        res.render('searchedCar', { title: 'Cars', isLoggedIn: req.session.userId });
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({ error: 'server error' })
    }
});

router.post('/unfavorite', async function (req, res) {
    try {
        if (req.session.userId) {
            const { plate } = req.body;

            const carToRemove = await car.findOne({ where: { licensePlate: plate } });
            if (carToRemove) {
                await userCar.destroy({
                    where: {
                        userID: req.session.userId,
                        carID: carToRemove.id
                    }
                });
            }
            res.redirect('back');
        } else {
            res.redirect('/auth')
        }
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'server error' });
    }
});

//res.render('auth', { message: 'Success! You will be redirected in 3 seconds...' });
router.post('/favorite', async function (req, res, next) { // handles option for user to add car to favorite
    try {
        if (req.session.userId) {
            const { plate } = req.body;

            const Car = await car.findOne({ where: { licensePlate: plate } }) || await car.create({
                licensePlate: plate
            });

            await userCar.create({
                userID: req.session.userId,
                carID: Car.id
            });

            res.redirect('back');
        } else {
            res.redirect('/auth')
        }

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'server error' });
    }
});

router.get('/:licensePlate', async function (req, res) {
    try {
        const plate = req.params.licensePlate;
        let json;

        let request = await fetch(`${API_URL}/${plate}?amount=1`);
        json = await request.json();

        let cardata = json[0];

        if (req.session.userId) {
            const findSpecificCar = await car.findOne({ where: { licensePlate: plate } });

            // Check if the car was found before proceeding
            if (findSpecificCar) {
                const findUserCar = await userCar.findOne({ where: { userID: req.session.userId, carID: findSpecificCar.id } });

                res.render('searchedCar', { title: 'Cars', car: cardata, isFavorite: findUserCar, isLoggedIn: req.session.userId });
            } else {
                res.render('searchedCar', { title: 'Cars', car: cardata, isLoggedIn: req.session.userId });
            }
        } else {
            res.render('searchedCar', { title: 'Cars', car: cardata, isLoggedIn: req.session.userId });
        }
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({ error: 'server error' })
    }
});

module.exports = router;
