const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdminAuth = require('../middleware/check-admin-auth');

const BranchController = require('../controllers/branch');

router.post("", checkAuth, checkAdminAuth, BranchController.branch_register);

router.get("/", checkAuth, checkAdminAuth, BranchController.branches_list);

router.get("/:branchId", checkAuth, checkAdminAuth, BranchController.branch_detail);

router.patch("/:branchId", checkAuth, checkAdminAuth, BranchController.branch_patch);

router.delete("/:branchId", checkAuth, checkAdminAuth, BranchController.branch_delete);

module.exports = router;