const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  putLike,
  deleteLike,
} = require("../controllers/clothingitems");

// Defining routes for items
router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", putLike);
router.delete("/:itemId/likes", deleteLike);

module.exports = router;
