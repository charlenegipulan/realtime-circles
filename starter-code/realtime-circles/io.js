var io = require('socket.io')();

//object to hold player's initials as keys
var players = {};

io.on('connection', function(socket) {

    socket.on('add-circle', function(data) {
        io.emit('add-circle', data);
    });

    socket.on('clear-display', function() {
        io.emit('clear-display');
    });

    //players register
    socket.on('register-player', function(initials) {
        players[socket.id] = initials;
        io.emit('update-player-list', Object.values(players));
    });
    
    //player disconnects
    socket.on('disconnect', function() {
        delete players[socket.id];
        io.emit('update-player-list', Object.values(players));
    });
});

module.exports = io;