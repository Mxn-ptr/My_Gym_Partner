const mongoose = require('mongoose');

// Define a post model
const postSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    picture: {
      type: String,
    },
    likes: {
      type: [String],
      required: true
    },
    comments: {
      type: [
        {
          userId: String,
          username: String,
          text: String,
          timestamp: Number
        }
      ],
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('post', postSchema);
