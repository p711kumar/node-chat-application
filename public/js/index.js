let socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconencted from server');
});

//get new message from server
socket.on('newMessage', function (message) {
    console.log("message received from server");
    console.log(message);
});