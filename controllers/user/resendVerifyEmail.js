const { User, resendVerifyEmail } = require("../../models/user");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = resendVerifyEmail.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user.verify) {
      throw new Error("Verification has already been passed");
    }

    const verificationToken = user.verificationToken;

    const mail = {
      to: email,
      subject: "Confirm email",
      html: `<a target='_blank' href='http://localhost:3006/api/users/verify/${verificationToken}'>Click for email confirmation</a>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
        },
      },
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
