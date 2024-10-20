const express = require("express");
const app = express();
const connection = require("./src/config/db");
const User = require("./src/models/User.js");

app.use(express.json());

app.post("/sign", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Success");
  } catch (err) {
    console.error("Error: ", err);
  }
});

app.patch("/update", async (req, res) => {
  try {
    const userid = req.body.id;
    const upd = await User.findByIdAndUpdate(userid);
    res.status(200).send("User has been updated")
  } catch (err) {
    res.status(400).send("Error mesage" + err.message);
  }
});

app.get("/find", async (req, res) => {
  try {
    const name = req.body.firstName;
    console.log(name);
    const find = await User.find({ firstName: name });
    res.status(200).send(find);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.status(200).send(feed);
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

connection()
  .then(() => {
    console.log("DataBase is up and live");
    app.listen(7777, () => {
      console.log("server is good");
    });
  })
  .catch((err) => console.error("Error: ", err));
