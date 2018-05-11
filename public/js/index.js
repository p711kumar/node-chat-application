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
    a.attr('href', message.locationURL);
    li.append(a);
    jQuery('#messages').append(li);
});

//handle form submit event
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        'from': 'User',
        'text': messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });

});

var locationButoon = jQuery('#send-location');

//handle click event on location button
locationButoon.on('click', function (e) {
    locationButoon.addClass('')
    if (!navigator.geolocation) {
        alert('Your browser does not support geolocation');
    }
    locationButoon.attr('disabled', 'disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButoon.removeAttr('disabled').text('Send-Location');
        socket.emit('createLocationMessage', {
            'lattitude': position.coords.latitude,
            'longitude': position.coords.longitude
        });
            }, function (err) {
        alert('Unable to fetch location!');
        locationButoon.removeAttr('disabled').text('Send-Location');
    });
});