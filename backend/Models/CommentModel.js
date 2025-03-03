const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    commentedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    commentData: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);
