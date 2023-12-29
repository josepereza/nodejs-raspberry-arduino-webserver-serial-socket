const Gpio = require('onoff').Gpio; //require onoff to control GPIO

const express = require('express');
const socketio = require('socket.io');
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

var LEDPin = new Gpio(22, 'out'); //declare GPIO22 an output


const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
const app = express();
//parser.on('data', console.log)

app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});



const server = app.listen(3000, () => {
    console.log('Server running!')
});

const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New connection')
parser.on('data', (data)=>
{
console.log(data);
if (data<500) {
console.log('data menor de ', data);
socket.emit("sensor","peligro");

}else {
socket.emit("sensor","bien");

}

})

 socket.on('state', function (data) { //get button state from client
    buttonState = data;
    if (buttonState != LEDPin.readSync()) { //Change LED state if button state is changed
      LEDPin.writeSync(buttonState); //turn LED on or off
    }
  });

})
