const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

// Defining routes for users
router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

// Handling non-existent routes for users
router.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found for items' });
});

module.exports = router;
