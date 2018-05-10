const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 5000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("new user connected");

    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
    });

    //get new message from client
    socket.on('createMessage', (message) => {
        console.log("message received from user");
        console.log(message);
        io.emit('newMessage', {
            'from': message.from,
            'text': message.text,
            'createdAt': new Date().getTime()
        });
    });
});

server.listen(port, () => {
    console.log(`node server started at port ${port}`);
});