const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Centralized routes
app.use(routes);

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
