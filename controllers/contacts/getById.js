const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId).populate(
      "owner",
      "email subscription"
    );
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
