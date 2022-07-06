const auth = require('../controllers/auth');
const multer = require('multer');
const upload = multer();
const uploadc = require('../controllers/upload');
const user = require('../controllers/users');
const router = require('express').Router();

// Authentification route
router.post("/register", auth.signUp);
router.post("/login", auth.signIn);
router.get("/logout", auth.logout);

// user routes
router.get("/", user.getAllUsers);
router.get("/:id", user.getOneUser);
router.put("/:id", user.updateUser);
router.delete("/:id", user.deleteUser);
router.patch("/follow/:id", user.follow);
router.patch("/unfollow/:id", user.unfollow);

// upload route
router.post('/upload', upload.single('file'), uploadc.uploadProfile);


module.exports = router;
