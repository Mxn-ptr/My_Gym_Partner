const router = require('express').Router();
const post = require('../controllers/post');
const multer = require('multer');
const upload = multer();

// Posts routes
router.get('/', post.getPosts);
router.post('/', upload.single('file'), post.createPost);
router.put('/:id', post.updatePost);
router.delete('/:id', post.deletePost);
router.patch('/like/:id', post.likePost);
router.patch('/unlike/:id', post.unlikePost);

// Comments routes
router.patch('/comments/:id', post.commentPost);
router.patch('/edit-comment/:id', post.editComment);
router.patch('/delete-comment/:id', post.deleteComment);

module.exports = router;
