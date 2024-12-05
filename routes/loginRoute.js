const express = require("express");
const router = express.Router();

const { LoginUser, logOutUser } = require("../controllers/auth");

router.route("/login").post(LoginUser);
router.route("/logout").delete(logOutUser);

module.exports = router;
