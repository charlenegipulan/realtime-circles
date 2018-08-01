document.addEventListener("DOMContentLoaded", function() {
  var socket = io();

  socket.on('add-circle', function(data) {
    addCircle(data);
  });

  socket.on('clear-display', function(data) {
    circles.innerHTML = '';
  });

  //listener for update-player-list
  socket.on('update-player-list', function(initials) {
    var playerList = '<li>' + initials.join('</li><li>') + '</li>';
    players.innerHTML = playerList;
  });

  var circles = document.getElementById('circles');
  var players = document.getElementById('players');
  var initials = '';

  circles.addEventListener('click', function(evt) {
    socket.emit('add-circle', {
      initials,
      x: evt.clientX,
      y: evt.clientY,
      dia: randomBetween(20, 125),
      rgba: getRandomRGBA()
    });
  });

  document.getElementsByTagName('button')[0].addEventListener('click', function() {
    socket.emit('clear-display');
  });

  do {
    initials = getInitials();
  } while (initials.length < 2 || initials.length > 3);
  socket.emit('register-player', initials); //emit register-player message

  function getInitials() {
    var input = prompt("Please enter your initials");
    return input ? input.toUpperCase() : '';
  }

  function addCircle({x, y, dia, rgba, initials}) {
    var el = document.createElement('div');
    el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
    el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = dia + 'px';
    el.style.backgroundColor = rgba;
    el.style.fontSize = Math.floor(dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    el.style.lineHeight = dia + 'px';
    el.innerHTML = initials;
    circles.appendChild(el);
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
  }

});
