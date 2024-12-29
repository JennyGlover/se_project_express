const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const {
  login,
  createUser,
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users");

// Defining authentication routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware, updateUserProfile);

module.exports = router;
