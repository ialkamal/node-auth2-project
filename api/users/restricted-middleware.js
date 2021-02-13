const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = function (req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not authorized" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You are not authorized" });
  }
};
