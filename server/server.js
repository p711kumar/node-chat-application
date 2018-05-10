const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const generateMessage = require('./utils/message');
const port = process.env.PORT || 5000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("new user connected");

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));
    //get new message from client
    socket.on('createMessage', (message) => {
        console.log("create message", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });


    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`node server started at port ${port}`);
});