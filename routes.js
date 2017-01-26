const Accounts = require('./app/controllers/accounts');
const Twitter = require('./app/controllers/twitter.js');
const Assets = require('./app/controllers/assets');

module.exports = [
    
  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },

  { method: 'GET', path: '/home', config: Twitter.home },
  { method: 'GET', path: '/report', config: Twitter.report },
  { method: 'POST', path: '/tweet', config: Twitter.write },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
