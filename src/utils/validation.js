const validator = require("validator");

const validateSign = (req) => {
  const { name, password, skills } = req.body;

  if (!name) {
    throw new Error("Name is not valid. Name cannot be empty");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1,minSymbols: 1 "
    );
  } else if (skills.length > 5) {
    throw new Error("Skills can't be more than 5");
  }
};

module.exports = {
  validateSign,
};
