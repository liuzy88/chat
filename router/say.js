var http = require('http');
var express = require('express');
var router = express.Router();
var config = require('../config');
var log = require('../lib/log');
var chat = require('../lib/chat');

router.post('/', function(req, res, next) {
	console.log(req.body);
	if (chat.send(req.body.to, req.body.msg)) {
		res.json({ code: 200, msg: '成功'});
	} else {
		res.json({ code: 200, msg: '失败'});
	}
});

module.exports = router;