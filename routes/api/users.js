const express = require("express");
const router = express.Router();
const { user: ctrl } = require("../../controllers");

const { auth } = require("../../middlewares");

router.get("/current", auth, ctrl.currentUser);

router.patch("/", auth, ctrl.handleSubscribe);

module.exports = router;
