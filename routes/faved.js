const express = require('express');
const router = express.Router();
const { userCar } = require('../models');

router.post('/', async function (req, res) {
  try {
    const { nummerplade } = req.body;
    const carId = nummerplade;

    if (req.session.userId) {
      
      await userCar.create({
        userId: req.session.userId,
        carId: carId,
        createdAt: new Date()
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;