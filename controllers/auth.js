const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors} = require('../utils/error');

const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: maxAge });
};

module.exports.signUp = async (req, res) => {
  const { username, email, password, firstname, lastname,
    age, gender, localisation, type_of_sports, frequence } = req.body;
  try {
    const user = await User.create({ username, email, password, firstname, lastname,
      age, gender, localisation, type_of_sports, frequence });
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error)
    let errors = signUpErrors(error)
    res.status(200).json({errors});
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    let errors = signInErrors(error);
    res.status(200).json({errors});
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
