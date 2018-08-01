var io = require('socket.io')();

io.on('connection', function(socket) {
    console.log('Client has connected to socket.io');
});

module.exports = io;