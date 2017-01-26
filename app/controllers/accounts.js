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

exports.register = {

  handler: function (request, reply) {
    const user = request.payload;
    this.users[user.email] = user;
    reply.redirect('/login');
  },

};

exports.authenticate = {

  handler: function (request, reply) {
    const user = request.payload;
    if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
      this.currentUser = this.users[user.email];
      reply.redirect('/home');
    } else {
      reply.redirect('/signup');
    }
  },

};
