const mongoose = require('mongoose');
const ClothingItem = require("../models/clothingitems");
const handleError = require("../utils/handleErrors");
const { BAD_REQUEST } = require('../utils/errors');

// controller that gets all clothing items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((clothingItems) => res.status(200).send({ message: "Clothing items retrieved successfully", data: clothingItems }))
    .catch((err) => handleError(err, res));
};

// controller that creates a new item
module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  if (!name || !weather || !imageUrl || !owner) {
    return res.status(BAD_REQUEST).send({ message: "Missing required fields" });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(201).send({ message: 'Clothing Item created', data: clothingItem }))
    .catch((err) => handleError(err, res));
};

/// controller that deletes an item
module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid itemId format" });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res.status(200).send({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => handleError(err, res));
};

// controller that likes an item
module.exports.putLike = (req, res) => {
  const { itemId } = req.params;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid itemId format" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((updatedItem) => {
      res.status(200).send({
        message: "Clothing item liked successfully",
        data: updatedItem,
      });
    })
    .catch((err) => handleError(err, res));
};

// controller that dislikes an item
module.exports.deleteLike = (req, res) => {
  const { itemId } = req.params;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid itemId format" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Clothing item not found")) // Item not found error
    .then((updatedItem) => {
      res.status(200).send({
        message: "Clothing item disliked successfully",
        data: updatedItem,
      });
    })
    .catch((err) => handleError(err, res));
};
