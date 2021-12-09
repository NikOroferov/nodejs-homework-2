const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
      return;
    }
    res.json({
      message: "contact deleted",
      status: "successs",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
