const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
    {
      sender: {
        firstName: String,
        lastName: String,
        email: String,
      },
      receiver: String,
      content: String,
    },
    {
      timestamps: true,
    }
);

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
