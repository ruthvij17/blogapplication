const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    posterImage: {
      type: String,
      required: false,
    },
    data: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
      required: false,
    },
    views: {
      type: Number,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comments",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema);
