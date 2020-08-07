const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const InventoryController = require('../controllers/inventory');

router.get("", checkAuth, InventoryController.getall);

router.post("", checkAuth, InventoryController.register);

router.get("/:inventoryId", checkAuth, InventoryController.get);

router.patch("/:inventoryId", checkAuth, InventoryController.update);

router.delete("/:inventoryId", checkAuth, InventoryController.remove);

module.exports = router;