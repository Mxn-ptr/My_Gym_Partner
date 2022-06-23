const router = require('express').Router();
const auth = require('../controllers/auth');
const user = require('../controllers/users');

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


module.exports = router;
