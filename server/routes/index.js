const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/room", require("./room.routes"));
router.use("/quality", require("./quality.routes"));

module.exports = router;
