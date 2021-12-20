const { Conflict } = require("http-errors");
const { joiRegisterSchema, User } = require("../../models/user");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
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

    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: "starter",
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
