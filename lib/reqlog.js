var log = require('./log');

function ip(req) {
	var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	ip = ip.replace(/::ffff:/, '');
	req.userip = ip;
	return ip;
}

function reqlog(req, res, next) {
	log(ip(req), req.method, req.originalUrl), next();
}

module.exports = reqlog;
