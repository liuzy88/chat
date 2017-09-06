var log = require('./log');
var sockets = {}; // socket.id - socket
var users = {}; // socket.id - name
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
        });
        // 绑定名字
        socket.on('setname', function(name) {
            log('[' + socket.id + '] 设置别名为 ' + name);
            users[socket.id] = name;
            socket.emit('message', '服务器: ' + name + '你好。');
            io.emit('message', '服务器: ' + JSON.stringify(users));
        });
        // 用户列表
        socket.on('list', function() {
            log('[' + socket.id + '] 查询列表');
            socket.emit('message', '服务器: ' + JSON.stringify(users));
        });
        // 发消息
        socket.on('message', function(msg) {
            log('[' + socket.id + ']' + msg);
            if (msg.to) {
                var flag = true;
                for (id in users) {
                    if (users[id] == msg.to) {
                        flag = false;
                        sockets[id].emit('message', '用户' + users[socket.id] + '对你说: ' + msg.msg);
                    }
                }
                if (flag) {
                    socket.emit('message', '服务器对你说: 用户' + msg.to + '不存在');
                } else {
                	socket.emit('message', '你对用户' + msg.to + '说: ' + msg.msg);
                }
            } else {
                io.emit('message', '用户' + users[socket.id] + '说: ' + msg.msg);
            }
        });
    });
}

module.exports = {
    init: init,
    send: function(to, msg) {
        var flag = false;
        if (to) {
            for (id in users) {
                if (users[id] == to) {
                    flag = true;
                    sockets[id].emit('message', 'API对你说: ' + msg);
                }
            }
        }
        return flag;
    }
}