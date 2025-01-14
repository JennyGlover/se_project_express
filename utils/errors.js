
const BadRequestError = require("./errorClasses/BadRequestError");
const UnauthorizedError = require("./errorClasses/UnauthorizedError");
const ForbiddenError = require("./errorClasses/ForbiddenError");
const NotFoundError = require("./errorClasses/NotFoundError");
const ConflictError = require("./errorClasses/ConflictError");


module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
