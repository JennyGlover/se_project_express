const {
  FORBIDDEN,
} = require("../statusCodes");


class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;