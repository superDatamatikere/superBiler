const express = require('express');
const bcrypt = require('bcrypt');
const { user } = require('../models');

const router = express.Router();

// Endpoint for brugeroprettelse
router.post('/', async function (req, res) {
  try {
    // Få brugeroprettelsesdata fra forespørgslen
    const { fname, lname, email, password } = req.body;

    console.log(fname, lname, email, password);

    // Hash adgangskoden
    const hashedPassword = await bcrypt.hash(password, 10);

    // Opret bruger i databasen
    const newUser = await user.create({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    res.render('signIn', { message: 'Success. You will be redirected in 3 seconds...' });
    //res.status(201).json({ message: 'Bruger oprettet', user: newUser });
  
  } catch (error) {
    console.error('Fejl ved brugeroprettelse:', error);
    res.status(500).json({ message: 'Der opstod en fejl ved oprettelse af brugeren' });
  }
});

module.exports = router;