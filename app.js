const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { NOT_FOUND } = require("./utils/errors");

const app = express();

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authentication middleware
app.use((req, res, next) => {
  req.user = {
    _id: "6768c9d38124c7ff4574d1a0",
  };
  next();
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
