const {
  BAD_REQUEST,
} = require("../statusCodes");


class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
