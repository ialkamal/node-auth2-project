const router = require("express").Router();
const Users = require("./usersModel");
const checkToken = require("../users/restricted-middleware");

router.get("/", checkToken, (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Server failed to get users", error: err });
    });
});

module.exports = router;
