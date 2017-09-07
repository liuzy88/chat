var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.Server(app);
require('./lib/chat').init(server);

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.locals.EJS = require('./lib/ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var reqlog = require('./lib/reqlog');
app.use(reqlog);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./router/index'));
app.use('/say', require('./router/say'));

var config = require('./config');
var log = require('./lib/log');

server.listen(config.port, function() {
	log('Listening on ' + server.address().port);
});
