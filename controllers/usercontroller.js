const { Router } = require("express");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/signup", async function (req, res) {
  try {
    const { email, username, password } = req.body.user;
    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    // check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    // create the new user in the table
    const newUser = await User.create({
      email: email,
      username: username,
      passwordhash: bcrypt.hashSync(password, 13),
    });
    // create a token with the newUser id
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    // send a success message and token with the repsonse
    res.status(200).json({
      message: "User sucessfully created!",
      sessionToken: token,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body.user;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user !== null) {
      bcrypt.compare(password, user.passwordhash, (err, matches) => {
        if (!err && matches) {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
          });
          res.status(200).json({
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
      res.status(409).json({
        emailMessage: "Email not registered.",
      });
    }
  } catch (e) {
    res.status(500).json({
      mesage: "Something went wront please try again.",
      error: error,
    });
  }
});

module.exports = router;
