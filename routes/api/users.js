const express = require("express");
const router = express.Router();
const { user: ctrl } = require("../../controllers");

const { auth, upload } = require("../../middlewares");

router.get("/current", auth, ctrl.currentUser);

router.patch("/", auth, ctrl.handleSubscribe);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

module.exports = router;
