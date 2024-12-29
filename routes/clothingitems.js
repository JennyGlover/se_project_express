const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  putLike,
  deleteLike,
} = require("../controllers/clothingitems");

// Defining routes for items
router.get("/", getItems);
router.post("/", authMiddleware, createItem);
router.delete("/:itemId", authMiddleware, deleteItem);
router.put("/:itemId/likes", authMiddleware, putLike);
router.delete("/:itemId/likes", authMiddleware, deleteLike);

module.exports = router;
