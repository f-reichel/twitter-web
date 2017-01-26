const Controller = require('./app/controllers/twitter.js');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Controller.home },
  { method: 'GET', path: '/signup', config: Controller.signup },
  { method: 'GET', path: '/login', config: Controller.login },
  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
