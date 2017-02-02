'use strict';

const Tweet = require('../models/tweet');
const User = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');

exports.home = {
  
  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    var admin = false;
    if (userEmail === 'admin@simpson.com') {
      admin = true;
    }
    
    var array = [];
    User.find({}).then(users => {
      users.forEach(user => {
        if (user.email !== 'admin@simpson.com' && user.email !== userEmail) {
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
          {
            title: 'Write a message',
            users: array,
            admin: admin,
          });
    }).catch(err => {
          reply.redirect('/');
        });
    
  },
  
};

exports.write = {
  
  validate: {
    
    payload: {
      receiver: Joi.string().required(),
      content: Joi.string().max(140).required(),
    },
    
    options: {
      abortEarly: false,
    },
    
    failAction: function (request, reply, source, error) {
      reply.view('home', {
        title: 'Message Error',
        user: request.payload,
        errors: error.data.details,
      }).code(400);
    },
    
  },
  
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
    var userEmail = request.auth.credentials.loggedInUser;
    var edit = false;
    var admin = false;
    
    var userID = null;
    var array = [];
    User.find({}).then(users => {
      users.forEach(user => {
        if (user.email !== 'admin@simpson.com') {
          if (user.email !== userEmail) {
            array.push(
                {
                  _id: user._id,
                  nickName: user.nickName,
                  firstName: user.firstName,
                  lastName: user.lastName,
                }
            );
          } else {
            userID = user._id;
          }
        }
      });
    }).then(res => {
      var data = request.payload;
      var query = null;
  
      if (userEmail === 'admin@simpson.com') {
        admin = true;
        if (data === null || data.filter === 'own' || data.filter === 'all') {
          query = Tweet.find({});
          edit = true;
        } else {
          query = Tweet.find({ sender: data.filter });
          edit = true;
        }
      } else if (data === null || data.filter == 'own') {
        query = Tweet.find({ sender: userID });
        edit = true;
      } else if (data.filter == 'all') {
        query = Tweet.find({});
        edit = false;
      } else {
        query = Tweet.find({ sender: data.filter });
        edit = false;
      }
      
      query
          .populate('sender')
          .populate('receiver')
          .then(allTweets => {
            reply.view('report', {
              title: 'Tweet History',
              tweets: allTweets,
              users: array,
              editable: edit,
              userID: userID,
              admin: admin,
            });
          }).catch(err => {
        reply.redirect('/');
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
  
};

exports.delete = {
  handler: function (request, reply) {
    var data = request.payload;
    
    var userID = null;
    var userEmail = request.auth.credentials.loggedInUser;
    
    User.findOne({ email: userEmail }).then(foundUser1 => {
      userID = foundUser1._id;
    }).then(res => {
      if (data.delete === 'deleteall') {
        var senderID = mongoose.Types.ObjectId(userID);
        Tweet.remove({ sender: senderID })
            .then(res => {
              reply.redirect('/home');
            }).catch(res => {
          reply.redirect('/report');
        });
      } else if (data.delete === 'delete') {
        Tweet.remove({ _id: data.radio }).then(res => {
          reply.redirect('/report');
        }).catch(res => {
          reply.redirect('/home');
        });
      } else {
        reply.redirect('/report');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
  
};

exports.admin = {
  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    var array = [];
    User.find({}).then(users => {
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
      reply.view('admin',
          {
            title: 'Manage users',
            users: array,
          });
    }).catch(err => {
      reply.redirect('/');
    });
  },
  
};

exports.admindelete = {
  handler: function (request, reply) {
    var data = request.payload;
    var userID = mongoose.Types.ObjectId(data.user);
    if (data.delete === 'deleteTweet') {
      
      Tweet.remove({ sender: userID })
          .then(res => {
            reply.redirect('/report');
          }).catch(err => {
        reply.redirect('/');
      });
    } else if (data.delete === 'deleteUser') {
      Tweet.remove({ sender: userID })
          .then(res => {
            User.remove({ _id: userID })
                .then(res => {
                  reply.redirect('/report');
                }).catch(err => {
              reply.redirect('/');
            });
          }).catch(err => {
        reply.redirect('/');
      });
    }
            
  },
  
};
