const express = require("express");
const app = express();
const dbConnection = require("./dbconnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const UserModel = require("./Models/UserModel");
const BlogModel = require("./Models/BlogModel");
const CommentModel = require("./Models/CommentModel");
require("dotenv").config();
const nodemailer = require("nodemailer");

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// In-memory OTP store (for demo purposes)
const otpStore = new Map();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP via email
function sendOTP(email) {
  const otp = generateOTP();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
  otpStore.set(email, { otp, expiry });

  const mailOptions = {
    from: '"Blogverse" <no-reply@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes. Please do not share your OTP with anyone.`,
  };

  return new Promise((resolve, reject) => {
    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return reject(false);
        }
        console.log("Email sent: " + info.response);
        return resolve(true);
      });
    } catch (error) {
      return reject(false);
    }
  });
}

// Function to verify OTP
function verifyOTP(email, inputOtp) {
  const record = otpStore.get(email);
  if (!record) return false;
  const { otp, expiry } = record;
  if (Date.now() > expiry) {
    otpStore.delete(email); // Remove expired OTP
    return false;
  }
  if (otp === inputOtp) {
    otpStore.delete(email); // Invalidate OTP after successful verification
    return true;
  }
  return false;
}

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

// register
app.post("/getotp", async (req, res) => {
  try {
    const { email, login } = req.body;
    if (email) {
      const users = await UserModel.findOne({ email });
      if (!login && users) {
        return res.status(201).json({
          success: false,
          message: "User already exist",
        });
      }
      if (login && !users) {
        return res.status(201).json({
          success: false,
          message: "User doesn't exist. Please register.",
        });
      }
      const result = await sendOTP(email);
      if (result) {
        return res
          .status(200)
          .json({ success: true, message: "OTP has been sent to your email" });
      } else {
        return res
          .status(201)
          .json({ success: false, message: "Failed to send OTP" });
      }
    } else {
      return res
        .status(201)
        .json({ success: false, message: "Please enter the proper email" });
    }
  } catch (error) {
    return res.status(201).json({ success: false, message: error.message });
  }
});

// Sign-in
app.post("/sign-in", async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (verifyOTP(email, otp)) {
      await UserModel.create({ name, email, password });

      return res.status(200).json({
        success: true,
        message: "User added successfully please log in to continue",
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "Wrong OTP",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password }).select(
      "_id email name"
    );

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

// Forgot Password
app.post("/forgotpassword", async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    if (verifyOTP(email, otp)) {
      const result = await UserModel.updateOne(
        { email: email }, // filter
        { $set: { password: password } } // update
      );
      if (result) {
        return res.status(200).json({
          success: false,
          message: "Password changed successfully",
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "Failed to change password",
        });
      }
    } else {
      return res.status(201).json({
        success: false,
        message: "Wrong OTP",
      });
    }
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

app.post("/update/blog", async (req, res) => {
  try {
    const { id, title, category, about, posterImage, data } = req.body;

    const blogData = await BlogModel.findByIdAndUpdate(
      id,
      {
        title,
        category,
        about,
        posterImage,
        data,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Blog updated successfully",
      blogData,
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
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap
      }
      return array;
    }

    res.status(200).json({
      success: true,
      message: "Blogs found",
      blogs: shuffleArray(blogs),
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
      .populate(
        "blogs",
        "title category about posterImage views likes postedBy"
      );
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

// Editing profile
app.post("/post/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, profileImage, socialLinks } = req.body;
    let userData;
    if (name) {
      userData = await UserModel.findByIdAndUpdate(id, {
        name: name,
      }).select("profile");
    } else {
      res.status(201).json({ message: "Please enter a valid name" });
    }
    const data = await UserModel.findByIdAndUpdate(
      id,
      {
        profile: { ...userData.profile, bio, profileImage, socialLinks },
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
          blogs: data.blogs,
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
      await UserModel.findByIdAndUpdate(
        followerId,
        { $addToSet: { "profile.following": bloggerId } },
        { new: true }
      );

      followList = await UserModel.findByIdAndUpdate(
        bloggerId,
        { $addToSet: { "profile.followers": followerId } },
        { new: true }
      );
    } else {
      await UserModel.findByIdAndUpdate(
        followerId,
        { $pull: { "profile.following": bloggerId } },
        { new: true }
      );

      followList = await UserModel.findByIdAndUpdate(
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
        blogs: followList.blogs,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

// category wise analytics
app.get("/get/blogs/analytics", async (req, res) => {
  try {
    const data = await BlogModel.aggregate([
      {
        $group: {
          _id: "$category", // Group by category (it will be stored in _id by default)
          totalBlogs: { $sum: 1 }, // Count total blogs per category
          totalViews: { $sum: "$views" }, // Sum of views per category
          totalLikes: { $sum: "$likes" }, // Sum of likes per category
        },
      },
      {
        $project: {
          category: "$_id", // Rename _id to category
          totalBlogs: 1, // Keep totalBlogs
          totalViews: 1, // Keep totalViews
          totalLikes: 1, // Keep totalLikes
          _id: 0, // Exclude the _id field
        },
      },
    ]);
    if (data.length > 0) {
      res.status(200).json({
        message: "Category wise blogs",
        data,
      });
    } else {
      res.status(201).json({
        message: "Blogs not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// users wise analytics
app.get("/get/users/analytics", async (req, res) => {
  try {
    const data = await UserModel.find({ email: { $ne: "admin@e.com" } })
      .select("name email profile blogs")
      .populate("blogs", "title about posterImage category views likes");
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Delete User
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    const blogs = await deletedUser.blogs;
    const comments = await CommentModel.deleteMany({ commentedUser: id });
    blogs.map(async (blog) => {
      await BlogModel.findByIdAndDelete(blog);
    });
    if (deletedUser) {
      res.status(200).json({
        message: "User deleted successfully",
        deletedUser,
      });
    } else {
      res.status(201).json({
        message: "User not exist",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Search
app.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const results = await BlogModel.find({
      $text: { $search: query },
    })
      .sort({ score: { $meta: "textScore" } }) // Sort by relevance
      .select("title category about posterImage views likes"); // Select only needed fields

    if (results)
      return res.status(200).json({
        success: true,
        results,
      });
    else
      return res.status(201).json({
        success: false,
        message: "No results for your search",
      });
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/delete/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await BlogModel.findByIdAndDelete(id);
    const response1 = await UserModel.findByIdAndUpdate(response.postedBy, {
      $pull: { blogs: response._id },
    });
    if (response && response1) {
      return res.status(200).json({
        message: "Blog deleted successfully",
      });
    } else {
      return res.status(201).json({
        message: "Blog is not deleted",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
