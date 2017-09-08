var express = require('express');
var router = express.Router();
var config = require('../config');
var log = require('../lib/log');

router.get('/', function(req, res, next) {
    if (req.query.p == 'A') {
        res.render('A', { p: req.query.p });
    } else if (req.query.p == 'B') {
        res.render('B', { p: req.query.p });
    } else if (req.query.p == 'APP') {
        res.render('APP', { p: req.query.p });
    } else {
        res.render('index');
    }
})

module.exports = router;