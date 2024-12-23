const mongoose = require('mongoose');
const User = require("../models/users");
const handleError = require("../utils/handleErrors");
const { BAD_REQUEST } = require('../utils/errors');

// controller that gets all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({
      message: "users retrieved successfully",
      data: users.map((user) => ({
        _id: user._id.toString(),
        name: user.name,
        avatar: user.avatar
      }))
    }))
    .catch((err) => handleError(err, res));
};

// controller that gets user by id
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid itemId format" });
  }

  return User.findById(userId)
    .orFail(new Error("User not found"))
    .then((user) => {
      res.status(200).send({
        data: {
          _id: user._id.toString(),
          name: user.name,
          avatar: user.avatar,
        }
      });
    })
    .catch((err) => handleError(err, res));
};

// Controller that creates a new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  if (!name || !avatar) {
    return res.status(BAD_REQUEST).send({ message: "Missing required fields" });
  }
  return User.create({ name, avatar })
    .then((user) => res.status(201).send({
      message: 'user created',
      data: {
        formData: {
          name: user.name,
          avatar: user.avatar,
        },
        _id: user._id,
      },
    }))
    .catch((err) => handleError(err, res));
};
