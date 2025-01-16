const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const validation = require("../middlewares/validation");

const {
  getItems,
  createItem,
  deleteItem,
  putLike,
  deleteLike,
} = require("../controllers/clothingitems");

// Defining routes for items
router.get("/", getItems);
router.post("/", authMiddleware, validation.validateClothingItems, createItem);
router.delete("/:itemId", authMiddleware, validation.id, deleteItem);
router.put("/:itemId/likes", authMiddleware, validation.id, putLike);
router.delete("/:itemId/likes", authMiddleware, validation.id, deleteLike);

module.exports = router;
