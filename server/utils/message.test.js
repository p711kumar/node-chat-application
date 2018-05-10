const expect = require('expect');

var generateMessage = require('./message');

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