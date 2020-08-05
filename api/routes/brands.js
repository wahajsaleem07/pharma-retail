const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const BrandController = require('../controllers/brands');
const ImageUploader = require('../middleware/image-upload');

router.post("", checkAuth, ImageUploader.upload.single('logo'), BrandController.brand_register);

router.get("/", checkAuth, BrandController.brands_list);

router.get("/:brandId", checkAuth, BrandController.brand_detail);

router.patch("/:brandId", checkAuth, BrandController.brand_patch);

router.delete("/:brandId", checkAuth, BrandController.brand_delete);

module.exports = router;