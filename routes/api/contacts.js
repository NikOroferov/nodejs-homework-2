const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { auth, upload } = require("../../middlewares");
const fs = require("fs/promises");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateFavorite);

module.exports = router;
