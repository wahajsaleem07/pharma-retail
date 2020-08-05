const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ProdTypeController = require('../controllers/product-type');

router.post("", checkAuth, ProdTypeController.register);

router.get("/", checkAuth, ProdTypeController.listall);

router.get("/:pTypeId", checkAuth, ProdTypeController.detail);

router.patch("/:pTypeId", checkAuth, ProdTypeController.patch);

router.delete("/:pTypeId", checkAuth, ProdTypeController.delete);

module.exports = router;