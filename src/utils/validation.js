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

const validateEdit = (req) => {
  const allowedKeys = ["name", "age", "number", "skills"];
  const { name, age, number, skills } = req.body;
  if (!name) {
    throw new Error("Name is not valid. Name cannot be empty");
  }
  if (!age && age > 18) {
    throw new Error("Age is not valid. Name cannot be empty");
  }
  if (!number) {
    throw new Error("Number is not valid. Name cannot be empty");
  }
  if (!skills) {
    throw new Error("Skills is not valid. Name cannot be empty");
  }

  const isAllowedEdit = Object.keys(req.body).every((fields) =>
    allowedKeys.includes(fields)
  );

  return isAllowedEdit;
};

module.exports = {
  validateSign,
  validateEdit,
};
