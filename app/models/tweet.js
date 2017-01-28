const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
        //        firstName: String,
        //        lastName: String,
        //        email: String,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
  
        //        firstName: String,
        //        lastName: String,
        //        email: String,
      },
      content: String,
    },
    {
      timestamps: true,
    }
);

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
