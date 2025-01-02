const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const handleError = require("../utils/handleErrors");
const { BAD_REQUEST } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// controller that gets user by id
module.exports.getCurrentUser = (req, res) =>
  // Finding the user by ID in req.user object
  User.findById(req.user._id)
    .orFail(new Error("User not found"))
    .then((user) => {
      res.status(200).send({
        data: {
          _id: user._id.toString(),
          name: user.name,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => handleError(err, res));

// Controller that creates a new user
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!avatar) missingFields.push("avatar");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  // If there are missing fields, return an error message
  if (missingFields.length > 0) {
    return res.status(400).send({
      message: `Missing required field(s): ${missingFields.join(", ")}`
    });
  }

  // Checking if email already exists
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Email already in use" });
      }

      // Hashing the password after confirming the email is unique
      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          // Creating the user only if the email doesn't exist already
          User.create({
            name,
            avatar,
            email,
            password: hash,
          })
        )
        .then((newUser) => {
          // creating a new object to send in response
          const userData = {
            _id: newUser._id,
            name: newUser.name,
            avatar: newUser.avatar,
            email: newUser.email,
          };

          return res.status(201).send({
            message: "User created successfully",
            data: userData,
          });
        });
    })
    .catch((err) => handleError(err, res));
};

// login controller
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  const missingFields = [];
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  // If there are missing fields, return an error message
  if (missingFields.length > 0) {
    return res.status(400).send({
      message: `Missing required field(s): ${missingFields.join(", ")}`
    });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // creating token if credentials are correct
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({
        token,
      });
    })
    .catch((err) => handleError(err, res));
};

// modifying user data
module.exports.updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findById(req.user._id)
    .orFail(new Error("User not found"))
    .then((user) => {
      // creating a copy of the user opject
      const updatedData = {
        name: name || user.name,
        avatar: avatar || user.avatar,
      };
      // Merging updated data into the user object
      Object.assign(user, updatedData);

      return user.save({ runValidators: true });
    })
    .then((updatedUser) => {
      // sending back the updated user data
      res.status(200).send({
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          avatar: updatedUser.avatar,
        },
      });
    })
    .catch((err) => handleError(err, res));
};
