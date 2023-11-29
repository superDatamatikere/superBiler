var express = require('express');
var router = express.Router();
const { user } = require('../models');
const bcrypt = require('bcrypt');




router.get('/', function (req, res, next) {
    res.render("login", { title: 'Login Page' });
});


router.get('/ggDinSke', function (req, res, next) {
  res.render("ggdinske", { title: 'Du spasserlam' });
});



const dummyUser = [
  { email: "hej@gmail.com", psw: bcrypt.hashSync("1234", 10) }, // Hashed for security
  { email: "nej@gmail.com", psw: bcrypt.hashSync("4321", 10) } // Hashed for security
];

router.post('/', async function (req, res) {
    try {

 
    
        //res.send('ny bruger gg');

        const { email, psw } = req.body; // endpoint

        
        //const User = await use.findOne({ where: { email } });
        const User = dummyUser.find(u => u.email === email);
     
        
        if (!User) {
            return res.status(401).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(psw, User.psw);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Create session or token here
        //req.session.userId = user.id; // For session-based
        req.session.userId = User.email; // For session-based
        res.send('Logged in successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.get('/UrloggedIn', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Not authorized");
  }
  res.send(`Welcome, your session ID is: ${req.session.userId}`);
});

module.exports = router;
