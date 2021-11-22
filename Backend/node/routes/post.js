const express = require("express");
const { Profile } = require("../model/profile");
const { Post } = require("../model/post");
const app = express.Router();

app.post("/:userID", (req, res) => {
  const newPostContent = req.body.newPostContent;
  const userID = req.params.userID;
  Post.create({ userID, content: newPostContent }).then((res1) => {
    if (res1) {
      const postID = res1._id;
      Profile.findByIdAndUpdate(
        userID,
        { $push: { myPosts: postID } },
        { new: true, upsert: true, useFindAndModify: false }
      )
        // .populate({
        //   path: "myPosts",
        //   options: { sort: { createdAt: -1 } },
        //   populate: {
        //     path: "userID",
        //   },
        // })
        .then((res2) => {
          if (res2) {
            Post.findById(postID)
              .populate("userID")
              .then((res3) => {
                res
                  .status(200)
                  .send({ message: "Created new post", payload: res3 });
              });
          }
        });
    }
  });
});

module.exports = app;
