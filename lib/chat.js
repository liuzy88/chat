var log = require('./log');
var sockets = {}; // socket.id - socket
var users = {}; // socket.id - name
var count = 0;
var io = {};

function init(server) {
    io = require('socket.io')(server);
    io.on('connection', function(socket) {
        log('[' + socket.id + '] 已连接');
        sockets[socket.id] = socket; // 记录socket
        // 断开
        socket.on('disconnect', function() {
            log('[' + socket.id + '] 已断开');
            delete sockets[socket.id];
            delete users[socket.id];
            count--;
            users[socket.id] && io.emit('message', users[socket.id] + ' is disconnected.');
        });
        // 绑定名字
        socket.on('setname', function(name) {
            log('[' + socket.id + '] 设置别名为 ' + name);
            users[socket.id] = name;
            count++;
            io.emit('message', name + ' joined. there are ' + count + ' users.');
        });
        // 用户列表
        socket.on('list', function() {
            log('[' + socket.id + '] 查询列表');
            socket.emit('message', JSON.stringify(users));
        });
        // 发消息
        socket.on('message', function(msg) {
            log('[' + socket.id + ']', JSON.stringify(msg));
            if (msg.to) {
                var flag = true;
                for (id in users) {
                    if (users[id] == msg.to) {
                        flag = false;
                        sockets[id].emit('message', users[socket.id] + ' say to you: ' + msg.msg);
                    }
                }
                if (flag) {
                    socket.emit('message', 'server: user ' + msg.to + ' not exist!');
                } else {
                    socket.emit('message', 'say to ' + msg.to + ': ' + msg.msg);
                }
            } else {
                io.emit('message', users[socket.id] + ' say: ' + msg.msg);
            }
        });
    });
}

module.exports = {
    init: init,
    send: function(to, msg) {
        if (to) {
            var flag = false;
            for (id in users) {
                if (users[id] == to) {
                    flag = true;
                    sockets[id].emit('message', 'APP对你说: ' + msg);
                }
            }
            return flag;
        } else {
            io.emit('message', 'APP说: ' + msg);
            return true;
        }
    }
}