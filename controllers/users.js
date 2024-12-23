const User = require('../models/users');

//controller that gets all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

//controller that gets user by id
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send({ data: user })
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Controller that creates a new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  console.log('Received data:', { name, avatar });

  User.create({ name, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};