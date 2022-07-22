const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/room", require("./room.routes"));
router.use("/quality", require("./quality.routes"));
router.use("/promo", require("./promo.routes"));
router.use("/comment", require("./comment.routes"));

module.exports = router;
