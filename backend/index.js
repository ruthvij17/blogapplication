const express = require("express");
const app = express();
const dbConnection = require("./dbconnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const UserModel = require("./Models/UserModel");
const BlogModel = require("./Models/BlogModel");

dbConnection();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.send("Hello world!");
  } catch (error) {
    console.log(error.message);
  }
});

// Sign-in
app.post("/sign-in", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await UserModel.findOne({ email });
    if (users) {
      return res.status(201).json({
        success: false,
        message: "User already exist",
      });
    }

    await UserModel.create({ name, email, password });

    return res.status(200).json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password }).select("_id");

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Post blog
app.post("/post/blog", async (req, res) => {
  try {
    const { title, category, about, posterImage, data } = req.body;

    const blogData = await BlogModel.create({
      title,
      category,
      about,
      posterImage,
      data,
    });

    res.status(200).json(blogData);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all blogs
app.get("/get/blogs", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
