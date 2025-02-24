const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    posterimage: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
    comments: {
      type: [
        {
          email: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
        {
          timestamps: true,
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
