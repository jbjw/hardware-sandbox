var SerialPort = require('serialport');
var port = new SerialPort('COM10', {
  baudRate: 9600
}, function (err) {
	console.log('port opened')
});

const ByteLength = SerialPort.parsers.ByteLength
// const parser = port.pipe(new ByteLength({length: 8}));

const Readline = SerialPort.parsers.Readline;
// const parser = port.pipe(new Readline());
// // const parser = port.pipe(Readline({ delimiter: '\r\n' }));

const Delimiter = SerialPort.parsers.Delimiter;
const parser = port.pipe(new Delimiter({ delimiter: '}' }));
// const parser = port.pipe(new Delimiter({ delimiter: Buffer.from('EOL') }));

var rawState = "waiting for data"
var state = "waiting for data";

parser.on('data', function (data) {
	try {
		// rawState = data.toString().substring(0) + "}";
		state = JSON.parse( data.toString().substring(0) + "}" );
	} catch (err) {
		console.log('error parsing json')
	}
})

setInterval(function () {
	console.log(state)
}, 100)

// port.on('data', function (data) {
//   console.log('Data:', data.toString());
// });

// port.write('main screen turn on', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message);
//   }
//   console.log('message written');
// });

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})
