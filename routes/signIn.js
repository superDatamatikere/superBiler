var express = require('express');
var router = express.Router();
const { user } = require('../models');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
    res.render("signIn", { title: 'Login Page' });
});

router.get('/ggDinSke', function (req, res, next) {
  res.render("ggdinske", { title: 'Du spasserlam' });
});

/* 
const dummyUser = [
  { email: "testUser@gmail.com", psw: bcrypt.hashSync("1234", 10) }, // Hashed for security
  { email: "nej@gmail.com", psw: bcrypt.hashSync("4321", 10) }, // Hashed for security
];*/

router.post('/', async function (req, res) {
    try {
        const { email, psw } = req.body; // endpoint
        
        console.log(email, psw);

        const User = await user.findOne({ where: { email } });
        //const user = dummyUser.find(u => u.email === email);

        if (!User) {
            return res.status(401).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(psw, User.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Create session or token here
        req.session.userId = User.id; // For session-based
        //req.session.userId = User.email; // For session-based
        res.status(200).send('Logged in successfully');
        //res.redirect('/signIn/success'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/success', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Not authorized");
  }
  res.send(`Welcome, your session ID is: ${req.session.userId}`);
});

module.exports = router;
