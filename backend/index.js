const express = require("express");
const app = express();
const dbConnection = require("./dbconnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const UserModel = require("./Models/UserModel");
const BlogModel = require("./Models/BlogModel");
const CommentModel = require("./Models/CommentModel");

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
      message: "User added successfully please log in to continue",
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
      postedBy: id,
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
    ).populate("postedBy", "name email profile.profileImage");

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

    res.status(200).json({ success: true, liked: liked ? true : false });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/like/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, liked } = req.body;
    console.log(liked);

    let blog;
    if (!liked) {
      blog = await BlogModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );

      await UserModel.findByIdAndUpdate(userId, {
        $addToSet: { likedBlogs: id },
      });
    } else {
      blog = await BlogModel.findByIdAndUpdate(
        id,
        { $inc: { likes: -1 } },
        { new: true }
      );

      await UserModel.findByIdAndUpdate(userId, {
        $pull: { likedBlogs: id },
      });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/saved/:id/:blogId", async (req, res) => {
  try {
    const { id, blogId } = req.params;
    const savedBlogs = await UserModel.findById(id).select("savedBlogs");

    const saved = savedBlogs.savedBlogs.find(
      (savedBlogs) => savedBlogs == blogId
    );

    res.status(200).json({ success: true, saved: saved ? true : false });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/save/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, saved } = req.body;
    //console.log(saved);

    let blog;
    if (!saved) {
      await UserModel.findByIdAndUpdate(userId, {
        $addToSet: { savedBlogs: id },
      });
    } else {
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { savedBlogs: id },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
  }
});

// Retrieving the liked blogs
app.get("/get/liked/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserModel.findById(id)
      .select("likedBlogs")
      .populate("likedBlogs", "title category about posterImage views likes");
    if (data) {
      res.status(200).json({
        message: "List of liked blogs",
        likedBlogs: data.likedBlogs.reverse(),
      });
    } else {
      res.status(201).json({
        message: "There are no liked blogs",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get/saved/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserModel.findById(id)
      .select("savedBlogs")
      .populate("savedBlogs", "title category about posterImage views likes");
    if (data) {
      res.status(200).json({
        message: "List of saved blogs",
        savedBlogs: data.savedBlogs.reverse(),
      });
    } else {
      res.status(201).json({
        message: "There are no liked blogs",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//get the blogs posted by the particular user
app.get("/get/posted/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserModel.findById(id)
      .select("blogs")
      .populate("blogs", "title category about posterImage views likes");
    if (data) {
      res.status(200).json({
        message: "List of posted blogs",
        postedBlogs: data.blogs.reverse(),
      });
    } else {
      res.status(201).json({
        message: "There are no posted blogs",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// To add coments to the database
app.post("/post/comment", async (req, res) => {
  try {
    const { userId, blogId, commentData, time } = req.body;
    const data = await CommentModel.create({
      commentedUser: userId,
      commentData: commentData,
      time: time,
    });
    const blogData = await BlogModel.findByIdAndUpdate(blogId, {
      $addToSet: { comments: data._id },
    });

    res.status(200).json({
      data: data,
      message: "Comments added",
    });
  } catch (error) {
    console.log(error.message);
  }
});

//To retrieve comments
app.get("/get/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BlogModel.findById(id)
      .select("comments") // Select the comments field from the BlogModel
      .populate({
        path: "comments",
        select: "commentData time", // Populate the comments field (which is an array of ObjectIds)
        populate: {
          path: "commentedUser", // Populate the commentedUser field from CommentModel
          select: "name", // Only select the name field from the User model
        },
      });
    if (data) {
      res.status(200).json({
        message: "The retrieved comments",
        comments: data.comments,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/post/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, profileImage, socialLinks } = req.body;
    if (name) {
      const userData = await UserModel.findByIdAndUpdate(id, { name: name });
    }
    const data = await UserModel.findByIdAndUpdate(
      id,
      {
        profile: { bio, profileImage, socialLinks },
      },
      { new: true }
    );
    if (data) {
      res.status(200).json({
        message: "Profile updated successfully",
        data,
      });
    } else {
      res.status(201).json({
        message: "Profile not updated",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// app.get("/get/profile/:id", async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.get("/get/profile/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserModel.findById(id).select(
      "name profile email blogs"
    );

    if (data) {
      res.status(200).json({
        message: "Profile retrieved successfully",
        profile: {
          ...data.profile,
          name: data.name,
          email: data.email,
          blogs: data.blogs.length,
        },
      });
    } else {
      res.status(201).json({
        message: "Profile not updated",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//To know whether the user followed or not
app.get("/get/followed/:followerId/:bloggerId", async (req, res) => {
  try {
    const { followerId, bloggerId } = req.params;
    const followList = await UserModel.findById(followerId).select(
      "profile.following"
    );

    const followed = followList.profile.following.includes(String(bloggerId));

    res.status(200).json({ success: true, followed });
  } catch (error) {
    console.log(error.message);
  }
});

//To update followers count
app.post("/post/follow/user", async (req, res) => {
  try {
    const { followerId, bloggerId, followed } = req.body;

    let followList;
    if (!followed) {
      followList = await UserModel.findByIdAndUpdate(
        followerId,
        { $addToSet: { "profile.following": bloggerId } },
        { new: true }
      );

      await UserModel.findByIdAndUpdate(
        bloggerId,
        { $addToSet: { "profile.followers": followerId } },
        { new: true }
      );
    } else {
      followList = await UserModel.findByIdAndUpdate(
        followerId,
        { $pull: { "profile.following": bloggerId } },
        { new: true }
      );

      await UserModel.findByIdAndUpdate(
        bloggerId,
        {
          $pull: { "profile.followers": followerId },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      profile: {
        ...followList.profile,
        name: followList.name,
        email: followList.email,
        blogs: followList.blogs.length,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
