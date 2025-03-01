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
    const { id, title, category, about, posterImage, data } = req.body;

    const blogData = await BlogModel.create({
      title,
      category,
      about,
      posterImage,
      data,
    });
    await UserModel.findByIdAndUpdate(id, { $push: { blogs: blogData._id } });

    res.status(200).json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Get all blogs
app.get("/get/trending/blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find().select(
      "title category about posterImage views likes"
    );
    res.status(200).json({
      success: true,
      message: "Blogs found",
      blogs,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get/suggested/blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find().select(
      "title category about posterImage views likes"
    );
    res.status(200).json({
      success: true,
      message: "Blogs found",
      blogs: blogs.reverse(),
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get/:category/blogs", async (req, res) => {
  try {
    let { category } = req.params;
    const blogs = await BlogModel.find({ category }).select(
      "title category about posterImage views likes"
    );
    res.status(200).json({
      success: true,
      message: "Blogs found",
      blogs,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      { $inc: { views: 0.5 } }, // Increment views by 1
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blogs found",
      blog,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/liked/:id/:blogId", async (req, res) => {
  try {
    const { id, blogId } = req.params;
    const likedBlogs = await UserModel.findById(id).select("likedBlogs");

    const liked = likedBlogs.likedBlogs.find(
      (likedBlogs) => likedBlogs == blogId
    );

    res.status(200).json({ success: true, liked: liked ? true : true });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/like/blog/:id/:liked", async (req, res) => {
  try {
    const { id, liked } = req.params;
    let blog;
    if (liked == "true") {
      blog = await BlogModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 0.5 } }, // Increment views by 1
        { new: true }
      );
    } else {
      blog = await BlogModel.findByIdAndUpdate(
        id,
        { $inc: { likes: -0.5 } }, // Increment views by 1
        { new: true }
      );
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
