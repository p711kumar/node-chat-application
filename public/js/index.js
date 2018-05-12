let socket = io();
//handle connect event from server
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconencted from server');
});

var scrolltoBottom = function () {
    //selector
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}
//get new message from server
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrolltoBottom();
});

//get new location message from server
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        locationURL: message.locationURL,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
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