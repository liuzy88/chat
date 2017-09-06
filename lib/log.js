function datetime() {
    var d = new Date();
    return [d.getFullYear(), '-',
        ('0' + (d.getMonth() + 1)).slice(-2), '-',
        ('0' + d.getDate()).slice(-2), ' ',
        ('0' + d.getHours()).slice(-2), ':',
        ('0' + d.getMinutes()).slice(-2), ':',
        ('0' + d.getSeconds()).slice(-2)
    ].join('');
}

function log() {
    var args = [datetime()];
    for (k in arguments) {
        args.push(arguments[k]);
    }
    console.log(args.join(' '));
}

module.exports = log;
