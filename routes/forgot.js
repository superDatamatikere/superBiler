var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ggdinske', { title: 'Du spasserlam' });
});

module.exports = router;