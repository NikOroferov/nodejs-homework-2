const express = require("express");
const router = express.Router();
const { Conflict, Unauthorized } = require("http-errors");
const {
  joiRegisterSchema,
  joiSubscribeSchema,
  User,
} = require("../../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcrypt");
const { auth } = require("../../middlewares");

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with email ${email} alredy exist`);
    }
    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", auth, async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
});

module.exports = router;
