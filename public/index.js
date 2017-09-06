function keydown() {
    if (event.keyCode == 13 && $('#msg').val().trim().length > 0) {
        send();
    }
}

var socket = io();

function setname(name) {
    socket.emit('setname', name);
}

socket.on('message', function(msg) {
    $('#chat').val($('#chat').val() + msg + '\n');
});

function send() {
    var msg = $('#msg').val().trim();
    if (/^\@/.test(msg)) {
        var to = msg.split(' ')[0].substring(1);
        console.log(to);
        socket.emit('message', { to: to, msg: msg.split(' ')[1] });
    } else {
        socket.emit('message', { to: '', msg: msg });
    }
    $('#msg').val('');
}

$(function() {
    $('#msg')[0].focus();
    $('body').click(function() {
        $('#msg')[0].focus();
    });
    setname('A');
});