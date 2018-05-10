const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = "abc@example.com";
        var text = "This is a test message";
        var messageObject = generateMessage(from,text);
        expect(messageObject.from).toMatch(from);
        expect(messageObject.text).toMatch(text);
        expect(typeof(messageObject.createdAt)).toEqual('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the location message object', () => {
        var from = "Admin";
        var lat = 13.009539199999999;
        var lng = 77.65684399999999;
        var message = generateLocationMessage(from,lat,lng);
        var url = "https://www.google.com/maps/?q=13.009539199999999,77.65684399999999";
        expect(message.from).toMatch(from);
        expect(message.locationURL).toMatch(url);
        expect(typeof(message.createdAt)).toEqual('number');
    });
});