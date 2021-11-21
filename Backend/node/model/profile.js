const Mongoose = require("mongoose");

const profileSchema = new Mongoose.Schema({
  _id: String,
  email: String,
  role: String,
  photo: String,
  name: String,
  age: Number,
  pronoun: String,
  bio: String,
  hobby: [String],
  interest: [String],
  myPosts: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Post" }], //postIDs
  recommendedPosts: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Post" }],
  tags: [String],
  friends: [String],
  friendRequested: [String],
  friendRequests: [String],
});

module.exports = { Profile: Mongoose.model("Profile", profileSchema) };
