const express = require("express");
const router = express.Router();
const { user: ctrl } = require("../../controllers");

const { auth, upload } = require("../../middlewares");

router.get("/current", auth, ctrl.currentUser);

router.patch("/", auth, ctrl.handleSubscribe);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
