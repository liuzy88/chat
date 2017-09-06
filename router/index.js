var express = require('express');
var router = express.Router();
var config = require('../config');
var log = require('../lib/log');

router.get('/', function(req, res, next) {
    if (req.query.p) {
        res.render('main', { p: req.query.p });
    } else {
        res.render('index');
    }
})

module.exports = router;