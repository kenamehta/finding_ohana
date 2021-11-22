const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema(
  {
    content: String,
    userID: { type: String, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

module.exports = { Post: Mongoose.model("Post", postSchema) };
