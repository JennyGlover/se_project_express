const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { errors } = require('celebrate');
const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger')

require('dotenv').config;

app.use(cors());

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enabling request loggers
app.use(requestLogger);

//Server crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Centralized routes
app.use(routes);

//enabling error logger
app.use(errorLogger);

//celebrate error handler
app.use(errors());

//Error Handling
app.use(errorHandler);

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
