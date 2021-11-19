const Mongoose = require("mongoose");

export const postSchema = new Mongoose.Schema({
  _id: String,
  content: String,
  userId: String,
});

module.exports = { Post: Mongoose.model("Post", postSchema) };
