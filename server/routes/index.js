const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/rooms", require("./room.routes"));
router.use("/quality", require("./quality.routes"));
router.use("/promo", require("./promo.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
