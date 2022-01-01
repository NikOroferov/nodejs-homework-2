const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw NotFound();
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      message: "Verify successful",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = verifyEmail;
