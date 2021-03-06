'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var dbURI = 'mongodb://twitter-web:tw1tt3r@ds135069.mlab.com:35069/twitter-web';

var dbURI = 'mongodb://localhost/twitter-web';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
  
  // if (process.env.NODE_ENV != 'production') {
  var seeder = require('mongoose-seeder');
  const data = require('./data.json');
  const Tweet = require('./tweet');
  const User = require('./user');
  seeder.seed(data, { dropDatabase: false, dropCollections: true }).then(dbData => {
      console.log('preloading Test Data');
      console.log(dbData);
    }).catch(err => {
      console.log(error);
    });
  
  // }
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
