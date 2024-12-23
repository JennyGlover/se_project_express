const router = require("express").Router();

const { getUsers, getUser, createUser } = require("../controllers/users");

// Defining routes for users
router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
