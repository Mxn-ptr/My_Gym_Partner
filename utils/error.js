module.exports.signUpErrors = (err) => {
  const errors = { username: '', email: '', password: '', firstname: '', lastname: '', localisation: '' };
  
  if (err.message.includes('username')) {
    errors.username = 'Username must be between 3 and 30 characters long';
  }

  if (err.message.includes('email')) {
    errors.email = 'Email incorrect';
  }

  if (err.message.includes('firstname')) {
    errors.firstname = 'Your first name is required';
  }

  if (err.message.includes('lastname')) {
    errors.lastname = 'Your last name is required';
  }

  if (err.message.includes('localisation')) {
    errors.localisation = 'Your city is required';
  }

  if (err.message.includes('password')) {
    errors.password = 'Password too short';
  }

  if (err.message.includes('username') && err.code === 11000) {
    errors.username = 'Username already taken';
  }

  if (err.message.includes('email') && err.code === 11000) {
    errors.email = 'Email already taken';
  }
  
  return errors;
};

module.exports.signInErrors = (err) => {
  const errors = { email: '', password: '' };

  if (err.message.includes('email')) {
    errors.email = 'Email unknown';
  }

  if (err.message.includes('password')) {
    errors.password = 'Password incorrect';
  }
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format : "", maxSize : ''};
  if (err.message.includes('Invalid file'))
    errors.format = 'Invalid file, your file must be .png, .jpg or .jpeg';
  
  if (err.message.includes('File too voluminous'))
    errors.maxSize = 'File too voluminous, your file must be less than 500ko'

  return errors;
}
