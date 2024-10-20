const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be Empty"],
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          res.status(400).send("Gender given is invalid");
        }
      },
    },
    number: {
      type: Number,
    },
    age: {
      type: Number,
      min: 18,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
