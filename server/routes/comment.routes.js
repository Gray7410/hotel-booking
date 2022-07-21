const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Comment.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Порробуйте позже",
    });
  }
});

module.exports = router;
