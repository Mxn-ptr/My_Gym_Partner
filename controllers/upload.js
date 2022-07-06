const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const User = require('../models/user');
const { uploadErrors } = require('../utils/error');

module.exports.uploadProfile = async (req,res) => {
  try {
    if (req.file.detectedMimeType !== 'image/jpg' && req.file.detectedMimeType !== 'image/png' && req.file.detectedMimeType !== 'image/jpeg')
    throw Error('Invalid file');

    if (req.file.size > 500000)
      throw Error('File too voluminous');
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(200).json({ errors });
  }

  const filename = req.body.username + ".jpg";

  await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../client/public/uploads/profile/${filename}`))

  User.findByIdAndUpdate(req.body.userId,
      { $set : {picture: './uploads/profile/' + filename}},
      { new: true})
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ err }))
}
