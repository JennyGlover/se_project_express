const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingitems");
const handleError = require("../utils/handleErrors");
const Errors = require("../utils/errors");

// controller that gets all clothing items
module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .populate("owner")
    .then((clothingItems) =>
      res.status(200).send({
        message: "Clothing items retrieved successfully",
        data: clothingItems.map((clothingItem) => ({
          name: clothingItem.name,
          weather: clothingItem.weather,
          imageUrl: clothingItem.imageUrl,
          owner: clothingItem.owner._id,
          _id: clothingItem._id,
          likes: clothingItem.likes,
        })),
      })
    )
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!weather) missingFields.push("weather");
  if (!imageUrl) missingFields.push("imageUrl");

  // If there are missing fields, return an error message
  if (missingFields.length > 0) {
    throw new Errors.NotFoundError(
      `Missing required field(s): ${missingFields.join(", ")}`
    );
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
    .catch(next);
};

/// controller that deletes an item
module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const currentUser = req.user._id;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new Errors.BadRequestError("Invalid itemId format");
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      // if the item does not exist, return an error
      if (!item) {
        throw new Errors.NotFoundError("Item not found");
      }

      // Checking if user has permission to delete item
      if (item.owner.toString() !== currentUser.toString()) {
        throw new Errors.ForbiddenError(
          "You do not have permission to delete this item"
        );
      }

      // If ownership matches, delete the item
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({ message: "Clothing item deleted successfully" })
      );
    })
    .catch(next);
};

// controller that likes an item
module.exports.putLike = (req, res, next) => {
  const { itemId } = req.params;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new Errors.BadRequestError("Invalid itemId format");
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(new Errors.NotFoundError("Item not found"))
    .then((clothingItem) => {
      res.status(200).send({
        message: "Clothing item liked successfully",
        data: {
          name: clothingItem.name,
          weather: clothingItem.weather,
          imageUrl: clothingItem.imageUrl,
          owner: clothingItem.owner._id,
          _id: clothingItem._id,
          likes: clothingItem.likes,
        },
      });
    })
    .catch(next);
};

// controller that dislikes an item
module.exports.deleteLike = (req, res, next) => {
  const { itemId } = req.params;

  // Checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new Errors.BadRequestError("Invalid itemId format");
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Errors.NotFoundError("Item not found")) // Item not found error
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
    .catch(next);
};
