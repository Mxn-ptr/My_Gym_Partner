const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const { isEmail } = require('validator');

// Define a User model
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      maxlength: 20,
      trim: true
    },
    last_name: {
      type: String,
      maxlength: 20,
      trim: true
    },
    age: {
      type: Number,
      trim: true
    },
    gender: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    localisation: {
      type: String,
      trim: true
    },
    type_of_sports: {
      type: String,
      trim: true
    },
    frequence: {
      type: Number,
      trim: true
    },
    picture: {
      type: String,
      default: ""
    },
    following: {
      type: [String]
    },
    followers: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
})

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema);
module.exports = User;
