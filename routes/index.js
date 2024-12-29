const express = require("express");
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingitems");

const router = express.Router();

router.use("/", userRoutes);
router.use("/items", clothingItemRoutes);

module.exports = router;
