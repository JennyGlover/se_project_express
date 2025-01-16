const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const {
  login,
  createUser,
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users");

// Defining authentication routes
router.post("/signin", validation.login, login);
router.post("/signup", validation.userInfo, createUser);
router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware, validation.updateUser, updateUserProfile);

module.exports = router;
