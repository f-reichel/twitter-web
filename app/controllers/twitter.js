'use strict';

exports.home = {
  
  handler: function (request, reply) {
    reply.view('home', { title: 'Write a message' });
  },
  
};

exports.report = {
  
  handler: function (request, reply) {
    reply.view('report', {
      title: 'Tweet history',
      tweet: this.tweet,
    });
  },
  
};

exports.write = {
  
  handler: function (request, reply) {
    var data = request.payload;
    var userEmail = request.auth.credentials.loggedInUser;
    data.sender =  this.users[userEmail];
    this.tweet.push(data);
    reply.redirect('/report');
  },
  
};
