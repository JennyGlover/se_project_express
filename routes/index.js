const express = require("express");
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingitems");
const Errors = require("../utils/errors");

const router = express.Router();

router.use("/", userRoutes);
router.use("/items", clothingItemRoutes);

// Middleware for handling unknown route
router.use((req, res, next) =>
  next(new Errors.NotFoundError("Requested resource not found"))
);

module.exports = router;
