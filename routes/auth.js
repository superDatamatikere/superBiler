var express = require('express');
var router = express.Router();
const { user } = require("../models")
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
	res.render("auth", { title: 'authentication Page' });
});



router.post('/login', async function (req, res) {
	try {
		const { email, psw } = req.body; // endpoint

		const User = await user.findOne({ where: { email } });

		if (!User) {
			return res.status(401).send('Invalid credentials');
		}
		const isMatch = await bcrypt.compare(psw, User.password);
		if (!isMatch) {
			return res.status(401).send('Invalid credentials');
		}

		// Create session or token herecls
		req.session.userId = User.id; // For session-based

		req.session.isLoggedIn = true;
		res.render('auth', { message: 'Success! You will be redirected in 3 seconds...' });

	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

router.get('/logout', (req, res) => {
	req.session.isLoggedIn = false; 
	console.log(req.session.isLoggedIn);
	req.session.destroy((err) => {
		if (err) {
			console.error("Session destruction error:", err);
			res.status(500).send("Error logging out");
		}
		else {
			res.redirect('/');
		}
	});
});



router.get('/success', (req, res) => {
	if (!req.session.userId) {
		return res.status(401).send("Not authorized");
	}
	res.send(`Welcome, your session ID is: ${req.session.userId}`);
});


// Endpoint for brugeroprettelse
router.post('/signup', async function (req, res) {
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

		res.render('auth', { message: 'Success! You will be redirected in 3 seconds...' });
		//res.status(201).json({ message: 'Bruger oprettet', user: newUser });

	} catch (error) {
		console.error('Fejl ved brugeroprettelse:', error);
		res.status(500).json({ message: 'Der opstod en fejl ved oprettelse af brugeren' });
	}
});



module.exports = router;