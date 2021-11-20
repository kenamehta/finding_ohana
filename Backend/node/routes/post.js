const express = require("express");
const { Profile } = require("../model/profile");
const { Post } = require("../model/post");
const app = express.Router();

app.post("/:userID", (req, res) => {
  const newPostContent = req.body.newPostContent;
  const userID = req.params.userID;
  Post.create({ userID, content: newPostContent }).then((res1) => {
    if (res1) {
      Profile.findByIdAndUpdate(
        userID,
        { $push: { myPosts: res1._id } },
        { new: true, upsert: true, useFindAndModify: false }
      )
        .populate({ path: "myPosts", options: { sort: { createdAt: -1 } } })
        .then((res2) => {
          if (res2) {
            res
              .status(200)
              .send({ message: "Created new post", payload: res2 });
          }
        });
    }
  });
});

module.exports = app;
