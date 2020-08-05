const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdminAuth = require('../middleware/check-admin-auth');

const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');

router.post("/login", AuthController.login);

router.post("/register", checkAuth, checkAdminAuth, UserController.user_register);

router.get("", checkAuth, checkAdminAuth, UserController.users_list);

router.get("/:userId", checkAuth, checkAdminAuth, UserController.user_detail);

router.patch("/:userId", checkAuth, checkAdminAuth, UserController.user_patch);

router.delete("/:userId", checkAuth, checkAdminAuth, UserController.user_delete);

module.exports = router;