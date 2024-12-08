const express = require("express");
const requestRouter = express.Router();
const User = require("../models/User.js")
const userAuth = require("../middleware/userAuth.js");

requestRouter.post("/sentConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user.name + " your connection is sent");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

requestRouter.get("/find", async (req, res) => {
  try {
    const name = req.body.firstName;
    console.log(name);
    const find = await User.find({ firstName: name });
    res.status(200).send(find);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

requestRouter.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.status(200).send(feed);
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

module.exports = requestRouter;
