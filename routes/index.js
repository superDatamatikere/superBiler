var express = require('express');
var router = express.Router();
const { userCar, car } = require('../models');

const API_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/dmr/regnrquery';
const MOT_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/tstyr/reports?vin='
// Dette kører igennem en corsproxy, da jeg fik en CORS fejl.

/* GET home page. */
router.get('/', async function (req, res) {

  res.render('index', { title: 'Super Cars', isLoggedIn: req.session.userId });

});

router.post('/', async function (req, res) {
  try {
    const { nummerplade } = req.body
    const plate = nummerplade;
    let json;

    let request = await fetch(`${API_URL}/${plate}?amount=1`);
    json = await request.json();

    let carData = json[0];
    //res.status(200).json({carData});

  
    res.render('index', { title: 'Super Cars', car: carData, isLoggedIn: req.session.userId});
  } catch (error) {
    console.error('Error', error)
    res.status(500).json({ error: 'server error' })
  }
});

module.exports = router;
