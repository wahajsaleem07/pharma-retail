const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ProdCategoriesController = require('../controllers/product-categories');

router.post("", checkAuth, ProdCategoriesController.register);

router.get("/", checkAuth, ProdCategoriesController.listall);

router.get("/:pCatId", checkAuth, ProdCategoriesController.detail);

router.patch("/:pCatId", checkAuth, ProdCategoriesController.patch);

router.delete("/:pCatId", checkAuth, ProdCategoriesController.delete);

module.exports = router;