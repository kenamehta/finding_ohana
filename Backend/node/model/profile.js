const Mongoose = require("mongoose");

const profileSchema = new Mongoose.Schema({
  _id: String,
  photo: String,
  name: String,
  age: Number,
  pronoun: String,
  hobby: [String],
  interest: [String],
  bio: String,
  posts: [{ type: Mongoose.Schema.ObjectId, ref: "Post" }],
});

module.exports = { Profile: Mongoose.model("Profile", profileSchema) };
