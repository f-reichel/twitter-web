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
      console.log('del' + array);
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
      delete(foundUser1.password);
      data.sender = foundUser1;
      console.log(data);
      User.findOne({ _id: data.receiver }).then(foundUser2 => {
        delete(foundUser2.password);
        data.receiver = foundUser2;
        const tweet = new Tweet(data);
        tweet.save().then(newTweet => {
          reply.redirect('/report');
        }).catch(err => {
          reply.redirect('/');
        });
      }).catch(err => {
      });
    }).catch(err => {
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

