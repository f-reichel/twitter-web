const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      content: String,
    },
    {
      timestamps: true,
    }
);

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
