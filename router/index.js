var express = require('express');
var router = express.Router();
var config = require('../config');
var log = require('../lib/log');

router.get('/', function(req, res, next) {
	res.render('index');
})

module.exports = router;