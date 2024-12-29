const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization Error" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // Extracting the Authorization header from the incoming request.

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res); // If no Authorization header or it doesn't start with 'Bearer ', send an auth error.
  }

  const token = extractBearerToken(authorization); // Extracting the token from the header.
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; //adding the payload to the Request object

  next();
};
