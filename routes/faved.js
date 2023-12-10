const express = require('express');
const router = express.Router();
const { userCar, car } = require('../models');

router.post('/', async function (req, res) {
  try {
    const { nummerplade } = req.body;


    if (req.session.userId) {

      const Car = await car.findOne({ where: {licensePlate: nummerplade }}) || await car.create({
        licensePlate: nummerplade
      });
    

      
      await userCar.create({
        userID: req.session.userId,
        carId: Car.id,
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

module.exports = router;