const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingitems");
const handleError = require("../utils/handleErrors");
const { BAD_REQUEST, FORBIDDEN, NOT_FOUND } = require("../utils/errors");

// controller that gets all clothing items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((clothingItems) =>
      res.status(200).send({
        message: "Clothing items retrieved successfully",
        data: clothingItems.map((clothingItem) => ({
          name: clothingItem.name,
          weather: clothingItem.weather,
          imageUrl: clothingItem.imageUrl,
          owner: clothingItem.owner,
          _id: clothingItem._id,
        })),
      })
    )
    .catch((err) => handleError(err, res));
};

module.exports.createItem = (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "User not authenticated" });
  }
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(BAD_REQUEST).send({ message: "Missing required fields" });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) =>
      res.status(201).send({
        message: "Clothing Item created",
        data: {
          name: clothingItem.name,
          weather: clothingItem.weather,
          imageUrl: clothingItem.imageUrl,
          owner: clothingItem.owner,
          _id: clothingItem._id,
        },
      })
    )
    .catch((err) => handleError(err, res));
};

/// controller that deletes an item
module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  const currentUser = req.user._id;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid itemId format" });
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      // if the item does not exist, return an error
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      // Checking if user has permission to delete item
      if (item.owner.toString() !== currentUser.toString()) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You do not have permission to delete this item" });
      }

      // If ownership matches, delete the item
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res
        .status(200)
        .send({ message: "Clothing item deleted successfully" }))
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
    .orFail(new Error("Item not found"))
    .then((clothingItem) => {
      res.status(200).send({
        message: "Clothing item liked successfully",
        data: {
          name: clothingItem.name,
          weather: clothingItem.weather,
          imageUrl: clothingItem.imageUrl,
          owner: clothingItem.owner,
          _id: clothingItem._id,
          likes: clothingItem.likes,
        },
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
    .orFail(new Error("Item not found")) // Item not found error
    .then((clothingItem) => {
      res.status(200).send({
        message: "Clothing item disliked successfully",
        data: {
          name: clothingItem.name,
          weather: clothingItem.weather,
          imageUrl: clothingItem.imageUrl,
          owner: clothingItem.owner,
          _id: clothingItem._id,
          likes: clothingItem.likes,
        },
      });
    })
    .catch((err) => handleError(err, res));
};
