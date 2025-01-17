const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const Errors = require("../utils/errors");

const handleAuthError = (next) => {
  return next(
    new Errors.UnauthorizedError("Authorization Error")
  );
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // Extracting the Authorization header from the incoming request.

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(next); // If no Authorization header or it doesn't start with 'Bearer ', send an auth error.
  }

  const token = extractBearerToken(authorization); // Extracting the token from the header.
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload; // adding the payload to the Request object

  return next();
};
