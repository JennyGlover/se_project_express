const router = require('express').Router();

const { getItems, createItem, deleteItem } = require('../controllers/clothingitems');

// Defining routes for items
router.get('/', getItems);
router.post('/', createItem);
router.delete('/:itemId', deleteItem);

// Handling non-existent routes for /items
router.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found for items' });
});


module.exports = router;