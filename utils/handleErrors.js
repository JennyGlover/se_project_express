const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("./errors");

// Error handling utility function
const handleError = (err, res) => {

  // Handling validation errors
  if (err.name === "ValidationError") {
    return res
      .status(BAD_REQUEST)
      .send({ message: `Validation failed: ${err.message}` });
  }

  // Handling duplicate key errors (MongoDB error)
  if (err.name === "MongoError" && err.code === 11000) {
    return res
      .status(BAD_REQUEST)
      .send({ message: `Duplicate key error: ${err.message}` });
  }

  // Handle other errors
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
};

module.exports = handleError;
