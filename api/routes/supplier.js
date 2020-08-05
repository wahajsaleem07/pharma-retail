const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SupplierController = require('../controllers/supplier');

router.post("", checkAuth, SupplierController.supplier_register);

router.get("/", checkAuth, SupplierController.supplier_list);

router.get("/:supplierId", checkAuth, SupplierController.supplier_detail);

router.patch("/:supplierId", checkAuth, SupplierController.supplier_patch);

router.delete("/:supplierId", checkAuth, SupplierController.supplier_delete);

module.exports = router;