const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("no token found");
    }
    const decodedData = jwt.verify(token, "tinder");

    const { userid } = decodedData;
    const user = await User.findById(userid);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

module.exports = userAuth;
