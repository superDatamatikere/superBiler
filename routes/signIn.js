var express = require('express');
var router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
    res.render("signIn", { title: 'Login Page' });
});

router.get('/ggDinSke', function (req, res, next) {
  res.render("ggdinske", { title: 'Du spasserlam' });
});

const dummyUser = [
  { email: "testUser@gmail.com", psw: bcrypt.hashSync("1234", 10) }, // Hashed for security
];

router.post('/', async function (req, res) {
    try {
        const { email, psw } = req.body; // endpoint

        //const user = await User.findOne({ where: { email } });
        const user = dummyUser.find(u => u.email === email);
     
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(psw, user.psw);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Create session or token here
        //req.session.userId = user.id; // For session-based
        req.session.userId = user.email; // For session-based
        res.redirect('/signIn/success'); 
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
