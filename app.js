const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { NOT_FOUND } = require("./utils/errors");
const authMiddleware = require("./middlewares/auth");
const cors = require("cors");
const app = express();

app.use(cors());

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//public routes that don't require authorization
const publicRoutes = ["/signin", "/signup", "/items"];

// Applying authMiddleware to all routes except public ones
app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  authMiddleware(req, res, next);
});

// Centralized routes
app.use(routes);
// Middleware for handling unknown route
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// starting the server on port 3001
const { PORT = 3001, BASE_PATH = "localhost" } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_PATH}:${PORT}`);
});
