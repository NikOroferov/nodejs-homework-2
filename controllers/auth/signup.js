const { Conflict } = require("http-errors");
const { joiRegisterSchema, User } = require("../../models/user");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const verificationToken = nanoid();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with email ${email} alredy exist`);
    }

    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);

    await newUser.save();

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a> href="http://localhost:3006/api/users/verify/${verificationToken}"</a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: "starter",
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
