const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/post');
const User = require('../models/user');

// Get all posts
module.exports.getPosts = (req, res) => {
  Post.find().sort({createdAt: -1})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

// Create a post
module.exports.createPost = (req, res) => {
  const post = new Post({
    ...req.body
  });
  post.save()
    .then(post => res.status(201).json(post))
    .catch(error => res.status(400).json({ error }))
}

// Update a post
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID post unknown: ' + req.params.id)
  }
  const updatedMessage = {message : req.body.message};
  Post.findByIdAndUpdate(req.params.id, {$set: updatedMessage}, {new: true})
    .then(post => res.send(post))
    .catch(error => console.log("Update post error" + error));
}

// Delete a post
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID post unknown: ' + req.params.id)
  }

  Post.deleteOne({_id: req.params.id})
    .then(() => res.send('Post delete: ' + req.params.id))
    .catch(error => console.log('Delete error: ' + error))
}


// Like a post
module.exports.likePost = (req, res) => {
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.params.idUser))) {
    return res.status(400).send('Id unknow');
  }
  Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.body.idUser } }, {new : true})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));

  User.findByIdAndUpdate(req.body.idUser, { $addToSet: { likes: req.params.id } })
    .catch(error => res.status(400).json({ error }));
}


// Unlike a post
module.exports.unlikePost = (req, res) => {
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.params.idUser))) {
    return res.status(400).send('Id unknow');
  }
  Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.idUser } })
    .then(() => res.status(200).json({ message: 'Unlike successed'}))
    .catch(error => res.status(400).json({ error }));

  User.findByIdAndUpdate(req.body.idUser, { $pull: { likes: req.params.id } })
    .catch(error => res.status(400).json({ error })); 
}


module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Id unknow');
  }
  return Post.findByIdAndUpdate(req.params.id,
    {$push: {
      comments: {
        userId: req.body.userId,
        username : req.body.username,
        text: req.body.text,
        timestamp: new Date().getTime()
      }
    }},
    {new: true})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))
}

module.exports.editComment = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Id unknow');
  }
  Post.findById(req.params.id, (err, post) => {
    const comment = post.comments.find((comment) => 
      comment._id.equals(req.body.commentId)
    );
    if (!comment) return res.status(404).json('Comment not found')
    comment.text = req.body.text;
    return post.save((err) => {
      if (!err) return res.status(200).json(post)
      return res.status(500).send(err)
    })
  })
}

module.exports.deleteComment = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Id unknow');
  }

  Post.findByIdAndUpdate(
    req.params.id, 
    {$pull: {
      comments: {
        _id: req.body.commentId
      }
    }},
    {new : true}
  )
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))
}
