var express = require('express');
var router = express.Router();
const { userCar, car } = require('../models');

const API_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/dmr/regnrquery';
const MOT_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/tstyr/reports?vin=' 
// Dette kører igennem en corsproxy, da jeg fik en CORS fejl.

/* GET home page. */
router.get('/', async function(req, res) {

  res.render('index', { title: 'Super Biler', isLoggedIn: req.session.userId});

});

router.post('/', async function(req, res){
  try {
    const {nummerplade} = req.body    
    const plate = nummerplade;
    let json;

    let request = await fetch(`${API_URL}/${plate}?amount=1`);
    json = await request.json();
    
    let cardata = json[0];
    //res.status(200).json({carData});

    res.render('index', {title: 'Super Biler', car: cardata});

  } catch (error) { console.error('Error', error) 
  res.status(500).json({error: 'server error'})}
});

router.post('/car/favorite', async function(req, res){ // handles option for user to add car to favorite
  try {
    const { nummerplade } = req.body;

    if (req.session.userId) {

      const Car = await car.findOne({ where: {licensePlate: nummerplade }}) || await car.create({
        licensePlate: nummerplade
      });
      
      await userCar.create({
        userID: req.session.userId,
        carID: Car.id
      });

    } else {
      res.status(401).json({ error: 'Invalid Credential'})
    }
    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'server error' });
  }
}); 


router.post('/car/unfavorite', async function(req, res){
  try {

    

  } catch (error) { console.error('Error', error) 
  res.status(500).json({error: 'server error'})}
});





module.exports = router;
