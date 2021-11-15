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
  posts: [String], //postIDs
  tags: [String],
  friends: [String],
  friendRequested: [String],
  friendRequests: [String],
});

module.exports = { Profile: Mongoose.model("Profile", profileSchema) };
