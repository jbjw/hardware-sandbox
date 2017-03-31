var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function (client) {
  client.on('event', function (data) {
    console.log('event', data)
  })
  client.on('disconnect', function () {
    console.log('disconnect')
  })
})

// http://www.openmusiclabs.com/index.html

server.listen(3000);

// 1 12
// 2 16
// 3 20
// 4 21

var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  var relay1 = new five.Relay('GPIO12');
  var relay2 = new five.Relay('GPIO16');
  var relay3 = new five.Relay('GPIO20');
  var relay4 = new five.Relay('GPIO21');
  setInterval(function () {
    relay1.toggle()
  }, 1000)
  setInterval(function () {
    relay2.toggle()
  }, 1100)
  setInterval(function () {
    relay3.toggle()
  }, 600)
  setInterval(function () {
    relay4.toggle()
  }, 2800)



  var piezo = new five.Piezo('GPIO26');

  // Plays a song
  piezo.play({

    song: [
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["A4", 1 / 4],
      [null, 1 / 4],
      ["A4", 1],
      ["G4", 1],
      [null, 1 / 2],
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["G4", 1 / 4],
      [null, 1 / 4],
      ["G4", 1],
      ["F4", 1],
      [null, 1 / 2]
    ],
    tempo: 100
  })



});