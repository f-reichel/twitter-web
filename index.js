'use strict';

const Hapi = require('hapi');
var moment = require('moment-timezone');
var hbs = require('handlebars');
moment.tz.setDefault('Europe/Berlin');
var DateFormats = {
  short: 'DD MMMM - YYYY',
  long: 'dddd DD.MM.YYYY HH:mm',
  list: 'DD.MM.YY HH:mm',
};
hbs.registerHelper('formatDate', function (datetime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  } else {
    return datetime;
  }
});

require('./app/models/db');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

server.register([require('inert'), require('vision'), require('hapi-auth-cookie')], err => {
  if (err) {
    throw err;
  }
  
  server.views({
    engines: {
      hbs: hbs,
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layout',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });
  
  server.auth.strategy('standard', 'cookie', {
    password: 'secretpasswordnotrevealedtoanyone',
    cookie: 'donation-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/login',
  });
  
  server.auth.default({
    strategy: 'standard',
  });

  server.route(require('./routes'));
  server.route(require('./routesapi'));
  
  server.start(err => {
    if (err) {
      throw err;
    }
    
    console.log('Server listening at:', server.info.uri);
  });
  
});
  
