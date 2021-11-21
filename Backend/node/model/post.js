const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema(
  {
    content: String,
    userId: { type: Mongoose.Schema.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

module.exports = { Post: Mongoose.model("Post", postSchema) };
