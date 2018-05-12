const moment = require('moment');

var generateMessage = function (from, text) {

    return {
        from,
        text,
        'createdAt': new moment().valueOf()
    };
};

var generateLocationMessage = function (from, lat,lng) {

    return {
        from,
        'locationURL':'https://www.google.com/maps/?q='+lat+','+lng,
        'createdAt': new moment().valueOf()
    };
};

module.exports = {generateMessage,generateLocationMessage};