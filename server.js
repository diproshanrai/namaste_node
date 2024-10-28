const express = require("express");
const app = express();
const connection = require("./src/config/db");
const User = require("./src/models/User.js");
const { validateSign } = require("./src/utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/sign", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    const signin = await bcrypt.compare(password, user.password);
    console.log(signin);
    if (!signin) {
      throw new Error("Password not match");
    }
    res.status(200).send("Login succesfull");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.patch("/update", async (req, res) => {
  try {
    const userid = req.body.id;
    const data = req.body;

    const allowedUpdates = ["gender", "number", "age", "skills"];

    const isUpdated = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );

    if (!isUpdated) {
      throw new Error("Update is not allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    const upd = await User.findByIdAndUpdate({ _id: userid }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).send("User has been updated");
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
