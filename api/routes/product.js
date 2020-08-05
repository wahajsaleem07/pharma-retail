const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/product');
const ImageUploader = require('../middleware/image-upload');

router.get("", checkAuth, ProductController.getall);

router.post("", checkAuth, ImageUploader.upload.single('image'), ProductController.register);

router.get("/:productId", checkAuth, ProductController.get);

router.patch("/:productId", checkAuth, ProductController.update);

router.delete("/:productId", checkAuth, ProductController.remove);

module.exports = router;