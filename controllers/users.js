const User = require("../models/users");
const { BAD_REQUEST } = require("../utils/errors");
const handleError = require("../utils/handleErrors");

//controller that gets all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

//controller that gets user by id
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => handleError(err, res));
};

// Controller that creates a new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => handleError(err, res));
};
