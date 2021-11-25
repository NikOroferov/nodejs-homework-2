const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template messages" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template messages" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template messages" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template messages" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template messages" });
});

module.exports = router;
