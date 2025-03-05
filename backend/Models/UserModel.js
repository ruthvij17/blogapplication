const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Blogs",
    },
    likedBlogs: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Blogs",
    },
    savedBlogs: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Blogs",
    },
    profile: {
      bio: {
        type: String,
        required: false,
      },
      followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Users",
      },
      following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Users",
      },
      profileImage: {
        type: String,
        default:
          "https://verdantfox.com/static/images/avatars_default/av_blank.png",
        required: false,
      },
      socialLinks: {
        type: [
          {
            socialName: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
