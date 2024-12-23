const ClothingItem = require("../models/clothingitems");
const handleError = require("../utils/handleErrors");

// controller that gets all clothing items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

// controller that creates a new item
module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(201).send({ data: clothingItem }))
    .catch((err) => handleError(err, res));
};

/// controller that deletes an item
module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res.send({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => handleError(err, res));
};

// controller that likes an item
module.exports.putLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail()
    .then((updatedItem) => {
      res.send({
        message: "Clothing item liked successfully",
        data: updatedItem,
      });
    })
    .catch((err) => handleError(err, res));
};

// controller that dislikes an item
module.exports.deleteLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Clothing item not found")) // Item not found error
    .then((updatedItem) => {
      res.send({
        message: "Clothing item disliked successfully",
        data: updatedItem,
      });
    })
    .catch((err) => handleError(err, res));
};
