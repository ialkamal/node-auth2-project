require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET ?? "the big secret is out",
};
