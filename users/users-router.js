const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  if (req.session && req.session.user) {
    Users.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => res.send(err));
  } else {
    res.status(401).json({ message: "not logged in" });
  }
});

module.exports = router;
