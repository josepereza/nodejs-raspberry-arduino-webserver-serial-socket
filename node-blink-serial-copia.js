const express = require('express');
const socketio = require('socket.io');
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
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
parser.on('data', console.log)

})
