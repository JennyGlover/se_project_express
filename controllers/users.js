const mongoose = require("mongoose");
const User = require("../models/users");
const handleError = require("../utils/handleErrors");
const { BAD_REQUEST } = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// controller that gets all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) =>
      res.status(200).send({
        message: "users retrieved successfully",
        data: users.map((user) => ({
          _id: user._id.toString(),
          name: user.name,
          avatar: user.avatar,
        })),
      })
    )
    .catch((err) => handleError(err, res));
};

// controller that gets user by id
module.exports.getCurrentUser = (req, res) => {
  //Finding the user by ID in req.user object
  return User.findById(req.user._id)
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
};

// Controller that creates a new user
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST).send({ message: "Missing required fields" });
  }

  // Checking if email already exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Email already in use" });
      }

      // Hashing the password after confirming the email is unique
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      // Create the user only if the email doesn't exist already
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      delete user.password; // Deleting the password hash before sending the response

      res.status(201).send({
        message: "User created successfully",
        data: {
          formData: {
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          },
          _id: user._id,
        },
      });
    })
    .catch((err) => handleError(err, res));
};

//login controller
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ message: "Missing required fields" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      //creating token if credentials are correct
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({
        token: token,
      });
    })
    .catch((err) => handleError(err, res));
};

//modifying user data
module.exports.updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findById(req.user._id)
    .orFail(new Error("User not found"))
    .then((user) => {
      user.name = name || user.name; //only if new data is given
      user.avatar = avatar || user.avatar;

      return user.save({ runValidators: true });
    })
    .then((updatedUser) => {
      //sending back the updated user data
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
