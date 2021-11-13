const Mongoose = require("mongoose");

const profileSchema = new Mongoose.Schema({
  _id: String,
  photo: String,
  name: String,
  age: Number,
  pronoun: String,
  bio: String,
  hobby: [String],
  interest: [String],
  posts: [{ type: Mongoose.Schema.ObjectId, ref: "Post" }],
  tags: [String],
});

module.exports = { Profile: Mongoose.model("Profile", profileSchema) };
