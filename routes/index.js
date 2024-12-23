const express = require("express");
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingitems");

const router = express.Router();

// routes for users and clothing items
router.use("/users", userRoutes);
router.use("/items", clothingItemRoutes);

module.exports = router;
