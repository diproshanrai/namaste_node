const mongoose = require("mongoose");
const validator = require("validator");

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
      required: [true, "Email id cannot be empty"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    password: {
      type: String
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender given is invalid: " + value);
        }
      },
    },
    number: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, "en-IN")) {
          throw new Error("Invalid mobile number: " + value);
        }
      },
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
