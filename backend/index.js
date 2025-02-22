const express = require("express");
const app = express();
const dbConnection = require("./dbconnection");
const dotenv = require("dotenv").config();

dbConnection();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  try {
    res.send("Hello world!");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/login", (req, res) => {
  res.send("Login");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
