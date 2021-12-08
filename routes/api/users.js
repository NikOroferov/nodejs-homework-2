const express = require("express");
const router = express.Router();
const { User, joiSubscribeSchema } = require("../../models/user");
const { auth } = require("../../middlewares");

router.get("/current", auth, async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/", auth, async (req, res, next) => {
  try {
    const { error } = joiSubscribeSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      message: "subscription updated",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
