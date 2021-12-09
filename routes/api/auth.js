const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares");
const { authotization: ctrl } = require("../../controllers");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

module.exports = router;
