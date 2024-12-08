const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth.js");
const User = require("../models/User");
const { validateEdit} = require("../utils/validation.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("Your profile is here : " + user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

profileRouter.patch("/update", async (req, res) => {
  try {
    const userid = req.body.id;
    const { id, ...data } = req.body; // Destructure to exclude 'id' from validation

    const allowedUpdates = ["name", "number", "age", "skills"];

    // Validate update keys
    const isUpdated = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );

    if (!isUpdated) {
      throw new Error("Update is not allowed");
    }

    // Validate skills array length
    if (data.skills && data.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }

    // Perform the update
    const upd = await User.findByIdAndUpdate({ _id: userid }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!upd) {
      throw new Error("User not found or update failed");
    }

    res.status(200).send("User has been updated");
  } catch (err) {
    res.status(400).send("Error message: " + err.message);
  }
});

profileRouter.patch("/profileEdit", userAuth, async (req, res) => {
  try {
    if (!validateEdit(req)) {
      throw new Error("Invalid data");
    }
    
    const loggedin = req.user;
    console.log(loggedin);
    Object.keys(req.body).forEach((key) => (loggedin[key] = req.body[key]));
    console.log(loggedin);
    loggedin.save();
    res.status(200).send(`${loggedin.name}, your profile edited successfully`);
  } catch (err) {
    res.status(500).send("error: " + err);
  }
});

module.exports = profileRouter;
