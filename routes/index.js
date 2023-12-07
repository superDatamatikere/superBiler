var express = require('express');
var router = express.Router();
const { car } = require('../models');

const API_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/dmr/regnrquery';
const MOT_URL = 'https://corsproxy.io/?https://www.tjekbil.dk/api/v3/tstyr/reports?vin=' 
// Dette kører igennem en corsproxy, da jeg fik en CORS fejl.

/* GET home page. */
router.get('/', async function(req, res, next) {

 // res.render('index', { title: 'Express' });

  plate = "ab12345"

let request = await fetch(`${API_URL}/${plate}?amount=1`);
let json;
try {
    json = await request.json();
} catch(err) {
    return $('#vehicle').html(`<h3>Der kunne ikke findes noget data på dette køretøj.<h3/>`);
}

//res.render('index', { title: 'Express', json});

res.status(200).json({ json });

});



module.exports = router;
