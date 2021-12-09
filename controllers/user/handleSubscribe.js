const { User, joiSubscribeSchema } = require("../../models/user");

const handleSubscribe = async (req, res, next) => {
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
};

module.exports = handleSubscribe;
