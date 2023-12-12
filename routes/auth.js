var express = require('express');
var router = express.Router();
const { user } = require("../models")
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
	if (!req.session.userId) {
		res.render("auth", { title: 'authentication Page' });
	} else if (req.session.userId) {
		res.redirect('/user/account');
	}
});

router.post('/login', async function (req, res) {
	try {
		const { email, psw } = req.body; // endpoint

		const User = await user.findOne({ where: { email } });

		if (!User) {
			res.render("auth", { title: 'authentication Page', errorMessage: 'Invalid credentials' });

		} else if (User) {
			const isMatch = await bcrypt.compare(psw, User.password);

			if (!isMatch) {
				res.render("auth", { title: 'authentication Page', errorMessage: 'Invalid credentials' });

			} else if (isMatch) {
				req.session.userId = User.id; // For session-based
				res.render('auth', { message: 'Success!' });
			}
		} 
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

router.get('/logout', (req, res) => {
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
/*
router.get('/success', (req, res) => {
	if (!req.session.userId) {
		return res.status(401).send("Not authorized");
	}
	res.send(`Welcome, your session ID is: ${req.session.userId}`);
});*/


// Endpoint for brugeroprettelse
router.post('/signup', async function (req, res) {
	try {
		// Få brugeroprettelsesdata fra forespørgslen
		const { fname, lname, email, password } = req.body;

		console.log(fname, lname, email, password);

		// Hash adgangskoden
		const hashedPassword = await bcrypt.hash(password, 10);

		const findUser = await user.findOne({ where: { email } }).then(async (USER) => {
			if (USER) {
				//return res.status(401).send('User already exists');
				res.render("auth", { title: 'authentication Page', errorMessage: 'Email is already in use' });
			}
			else {

				// Opret bruger i databasen
				const newUser = await user.create({
					fname,
					lname,
					email,
					password: hashedPassword,
				});
				req.session.userId = newUser.id; // For session-based
				res.render('auth', { message: 'Success!' });
				//res.status(201).json({ message: 'Bruger oprettet', user: newUser });
			}
		});
	} catch (error) {
		console.error('Fejl ved brugeroprettelse:', error);
		res.status(500).json({ message: 'Der opstod en fejl ved oprettelse af brugeren' });
	}
});



module.exports = router;
