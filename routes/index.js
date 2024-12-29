const express = require("express");
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingitems");
const { NOT_FOUND } = require("../utils/errors");

const router = express.Router();

router.use("/", userRoutes);
router.use("/items", clothingItemRoutes);

// Middleware for handling unknown route
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
