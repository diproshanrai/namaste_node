const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect(
    "mongodb+srv://diproshanrai:jameslimbu@namastenode.uopx3.mongodb.net/devTinder"
  );
};

module.exports = connection;