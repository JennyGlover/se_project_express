const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("./errors");

// Error handling utility function
const handleError = (err, res) => {
  // Handling validation errors
  if (err.name === "ValidationError") {
    return res
      .status(BAD_REQUEST)
      .send({ message: `Validation failed: ${err.message}` });
  }

  // handling non-existent resources
  if (err.message === "Item not found") {
    return res.status(NOT_FOUND).send({ message: "Item not found" });
  }
  // Handle user not found errors
  if (err.message === "User not found") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }

  // Handling duplicate key errors
  if (err.name === "MongoError" && err.code === 1100) {
    // extracting the field that caused the duplication
    const duplicateField = Object.keys(err.keyValue)[0];
    return res.status(BAD_REQUEST).send({
      message: `Duplicate key error: The ${duplicateField} already exists`,
    });
  }

  // Handling unauthorized error
  if (err.message === "Incorrect email or password") {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }

  // Handle other errors
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
};

module.exports = handleError;
