const router = require("express").Router();
const { BAD_REQUEST } = require("../utils/errors");

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

// Handling non-existent routes for /items
router.use((req, res) => {
  res
    .status(BAD_REQUEST)
    .send({ message: "Requested resource not found for items" });
});

module.exports = router;
