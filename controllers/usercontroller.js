const { Router } = require("express");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/signup", async function (req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      passwordhash,
    } = req.body.user;
    // Validate user input
    if (!(firstName && lastName && email && passwordhash && username)) {
      res.status(400).send("All input is required");
    }

    // create the new user in the table
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      passwordhash: bcrypt.hashSync(passwordhash, 13),
    });
    // create a token with the newUser id
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    // send a success message and token with the repsonse
    res.status(200).json({
      user: user,
      message: "User sucessfully created!",
      sessionToken: token,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { email, passwordhash } = req.body.user;
    // Validate user input
    if (!(email && passwordhash)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user !== null) {
      bcrypt.compare(passwordhash, user.passwordhash, (err, matches) => {
        if (!err && matches) {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
          });
          res.status(200).json({
            user: user,
            message: "User sucessfully logged in!",
            sessionToken: token,
          });
        } else {
          res.status(400).json({
            passwordMessage: "Incorrect password.",
          });
        }
      });
    } else {
      res.status(404).json({
        emailMessage: "Email not registered.",
      });
    }
  } catch (e) {
    res.status(500).json({
      mesage: "Something went wrong please try again.",
      error: error,
    });
  }
});

module.exports = router;
