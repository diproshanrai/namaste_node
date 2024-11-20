const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      required: [true, "Email id cannot be empty"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    password: {
      type: String,
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

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign({ userid: user._id }, "tinder", {
    expiresIn: "1hr",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputUser) {
  const user = this;

  const isPassValidate = bcrypt.compare(passwordInputUser, user.password);

  return isPassValidate;
  //or we can also write like thisdirectly returning the output
  // return bcrypt.compare(passwordInputUser, user.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
