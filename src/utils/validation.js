const validator = require("validator");

const validateSign = (req) => {
  const { name, email, password, skills } = req.body;

  if (!name) {
    throw new Error("Name is not valid. Name cannot be empty");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must contain ");
  } else if (skills.length > 5) {
    throw new Error("Skills can't be more than 5");
  }
};

module.exports = {
  validateSign,
};
