var log = require('./log');
var socketA, socketB, socketAPP
var count = 0;
var io = {};

function init(server) {
    io = require('socket.io')(server);
    io.on('connection', function(socket) {
        log('[' + socket.id + '] 已连接');
        // 断开
        socket.on('disconnect', function() {
            log('[' + socket.id + '] 已断开');
            io.emit('message', socket.id + ' is disconnected.');
        });
        // 绑定名字
        socket.on('setname', function(name) {
            switch(name) {
                case 'A': socketA = socket; break;
                case 'B': socketB = socket; break;
                case 'APP': socketApp = socket; break;
                default:  break;
            }
            io.emit('message', name + ' joined.');
        });
        // 交易开始
        socket.on('transfer start', function(msg) {
            log(socket.id + ' on transfer start by ' + msg);
            socketA && socketA.emit('transfer start', msg);
            io.emit('message', socket.id + ' ' + msg);
        });
        // 验证开始
        socket.on('validate start', function(msg) {
            log(socket.id + ' on validate start by ' + msg);
            socketB && socketB.emit('validate start', msg);
            io.emit('message', socket.id + ' ' + msg);
        });
        // 验证结束
        socket.on('validate end', function(msg) {
            log(socket.id + ' on validate end by ' + msg);
            socketA && socketA.emit('validate end', msg);
            io.emit('message', socket.id + ' ' + msg);
        });
        // 交易结束
        socket.on('transfer end', function(msg) {
            log(socket.id + ' on transfer end by ' + msg);
            socketAPP && socketAPP.emit('transfer end', msg);
            io.emit('message', socket.id + ' ' + msg);
        });
        // 日志
        socket.on('message', function(msg) {
            log(socket.id + ' on message by ' + msg);
            io.emit('message', msg);
        });
    });
}

module.exports = init;