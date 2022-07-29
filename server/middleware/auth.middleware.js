const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized (token)" });
    }

    const data = tokenService.validateAccess(token);
    console.log(data);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized (data)" });
    }

    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized (error)" });
  }
};
