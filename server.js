const express = require("express");
const app = express();
const connection = require("./src/config/db");
const authRouter = require("./src/routes/auth");
const profile = require("./src/routes/profile");
const request = require("./src/routes/request");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profile);
app.use("/", request);

connection()
  .then(() => {
    console.log("DataBase is up and live");
    app.listen(7777, () => {
      console.log("server is good");
    });
  })
  .catch((err) => console.error("Error: ", err));
