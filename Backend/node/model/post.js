const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema(
  {
    content: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = { Post: Mongoose.model("Post", postSchema) };
