'use strict';

const Tweet = require('../models/tweet');
const User = require('../models/user');

exports.home = {
  
  handler: function (request, reply) {
    reply.view('home', { title: 'Write a message' });
  },
  
};

exports.write = {
  
  handler: function (request, reply) {
    var data = request.payload;
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(foundUser => {
      delete(foundUser.password);
      data.sender = foundUser;
      console.log(data);
      const tweet = new Tweet(data);
      tweet.save().then(newTweet => {
        reply.redirect('/report');
      }).catch(err => {
        reply.redirect('/');
      });
    });
  },
};

exports.report = {
  
  handler: function (request, reply) {
    Tweet.find({}).exec().then(allTweets => {
      reply.view('report', {
        title: 'Tweet History',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
  
};
