let socket = io();
//handle connect event from server
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
    var li = jQuery('<li></li');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});

//get new message from server
socket.on('newLocationMessage', function (message) {
    console.log("Location message received from server");
    console.log(message);
    var li = jQuery('<li></li');
    li.text(`${message.from} :`);
    var a = jQuery('<a target="_blank">My Current Location</a>');
    a.attr('href',message.locationURL);
    li.append(a);
    jQuery('#messages').append(li);
});

//handle form submit event
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        'from': 'User',
        'text': jQuery('[name=message]').val()
    });
});

var locationButoon = jQuery('#send-location');

//handle click event on location button
locationButoon.on('click', function (e) {
    if (!navigator.geolocation) {
        alert('Your browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            'lattitude': position.coords.latitude,
            'longitude': position.coords.longitude
        });

    }, function (err) {
        alert('Unable to fetch location!');
    });
});