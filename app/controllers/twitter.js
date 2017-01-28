'use strict';

const Tweet = require('../models/tweet');
const User = require('../models/user');

exports.home = {
  
  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.find({}).then(users => {
      var array = [];
      users.forEach(user => {
        if (user.email !== userEmail) {
          array.push(
              {
                _id: user._id,
                nickName: user.nickName,
                firstName: user.firstName,
                lastName: user.lastName,
              }
          );
        }
      });
      reply.view('home',
          { title: 'Write a message',
            users: array,
          });
    }).catch(err => {});
    
  },
  
};

exports.write = {
  handler: function (request, reply) {
    var data = request.payload;
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(foundUser1 => {
      const tweet = new Tweet(data);
      tweet.sender = foundUser1.id;
      tweet.receiver = data.receiver;
      return tweet.save();
    }).then(newTweet => {
          reply.redirect('/report');
        }).catch(err => {
          reply.redirect('/');
        });
  },
  
};

exports.report = {
  handler: function (request, reply) {
    Tweet.find({})
        .populate('sender')
        .populate('receiver')
        .then(allTweets => {
          reply.view('report', {
            title: 'Tweet History',
            tweets: allTweets,
          });
        }).catch(err => {
      reply.redirect('/');
    });
  },
  
};

