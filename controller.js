const Twitter = require('./app/controllers/twitter');

module.exports = [
    { method: 'GET', path: '/', config: Twitter.home },

];
