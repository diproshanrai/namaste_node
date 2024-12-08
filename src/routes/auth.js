const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validateSign } = require("../utils/validation.js");

authRouter.post("/sign", async (req, res) => {
  try {
    const { name, email, age, number, password, skills } = req.body;
    validateSign(req);

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      throw new Error("Email found");
    }
    // if (User.findOne({ email })) {
    //   res.status(400).send("User already exist");
    // }
    const passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash);

    const user = new User({
      name,
      email,
      age,
      number,
      skills,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Success");
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Something went wrong: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    const signin = await user.validatePassword(password);

    if (signin) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
    } else {
      throw new Error("Password not match");
    }
    res.status(200).send("Login succesfull");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successfull");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
module.exports = authRouter;
