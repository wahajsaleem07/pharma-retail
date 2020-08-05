const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ProdOriginController = require('../controllers/product-origin');

router.post("", checkAuth, ProdOriginController.register);

router.get("/", checkAuth, ProdOriginController.listall);

router.get("/:pOriginId", checkAuth, ProdOriginController.detail);

router.patch("/:pOriginId", checkAuth, ProdOriginController.patch);

router.delete("/:pOriginId", checkAuth, ProdOriginController.delete);

module.exports = router;