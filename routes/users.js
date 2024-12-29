const router = require("express").Router();

const {
  login,
  createUser,
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users");

//Defining authentication routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);

module.exports = router;
