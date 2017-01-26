'use strict';

exports.main = {
  
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Twitter Node' });
  },
  
};

exports.signup = {
  
  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Twitter' });
  },
  
};

exports.login = {
  
  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Twitter' });
  },
  
};

exports.authenticate = {
  
  handler: function (request, reply) {
    reply.redirect('/home');
  },
  
};

exports.logout = {
  
  handler: function (request, reply) {
    reply.redirect('/');
  },
  
};
