const User = require("../models/User");

module.exports = function hasRole(roles) {
  return async function (req, res, next) {
    const user = await User.findById(req.user._id);
    if (!user || !roles.includes(user.role)) {
      return res
        .status(403)
        .send({ error: { status: 403, message: "Access denied." } });
    }
    next();
  };
};
