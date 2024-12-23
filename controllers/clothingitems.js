const ClothingItem = require('../models/clothingitems');

//controller that gets all clothing items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .populate('owner')
    .then(clothingItems => res.send({ data: clothingItems }))
    .catch(err => res.status(500).send({ message: err.message }));
};

//controller that creates a new item
module.exports.createItem = (req, res) => {
  const { name, weatherType, imageUrl, owner } = req.body;
  ClothingItem.create({ name, weatherType, imageUrl, owner })
    .then(clothingItem => res.status(201).send({ data: clothingItem }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.fingByIdandDelete(itemId)
    .then(clothingItem => {
      if (!clothingItem) {
        return res.status(404).send({ message: 'Clothing item not found' });
      }
      res.send({ message: 'Clothing item deleted successfully' });
    })
    .catch(err => res.status(500).send({ message: err.message }));
}