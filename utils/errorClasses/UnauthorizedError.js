const { UNAUTHORIZED } = require("../statusCodes");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
