const router = require("express").Router();
const Users = require("./usersModel");
const checkToken = require("../users/restricted-middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

router.get("/users", checkToken, (req, res) => {
  const tk = req.decodedToken;
  Users.getUsersByDepartment(tk.department)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Server failed to get users", error: err });
    });
});

router.post("/register", (req, res) => {
  const { username, password, department } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  Users.addUser({ username, password: hash, department })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Server failed to add user", error: err })
    );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.find(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Server failed to find user", error: err })
    );
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
