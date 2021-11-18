const express = require("express");
const { Profile } = require("../model/profile");
const app = express.Router();
const { s3, s3Bucket } = require("../config/s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3FileUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    key: function (req, file, cb) {
      cb(
        null,
        "ProfilePhoto/" +
          req.params.userID +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  }),
});

app.post("/", (req, res) => {
  const { userID, userName, email, role } = req.body;
  Profile.findById(userID)
    .then((result) => {
      if (result) {
        res
          .status(200)
          .send({ message: "Profile already exists", payload: result });
      } else {
        Profile.create({ _id: userID, name: userName, email, role })
          .then((result2) => {
            res
              .status(200)
              .send({ message: "Profile created", payload: result2 });
          })
          .catch((err2) => {
            res.status(500).send({ message: err2 });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

app.get("/:userID", (req, res) => {
  const userID = req.params.userID;
  Profile.findById(userID)
    .then((result) => {
      res.status(200).send({ message: "User profile", payload: result });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

app.post("/updatePhoto/:userID", s3FileUploader.single("file"), (req, res) => {
  Profile.findByIdAndUpdate(
    req.params.userID,
    { photo: req.file.location },
    { new: true, useFindAndModify: false }
  ).then((result) => {
    res.status(200).send({ message: "Profile photo updated", payload: result });
  });
});

app.post("/updateDetails/:userID", (req, res) => {
  const data = req.body;
  console.log(data);
  Profile.findByIdAndUpdate(req.params.userID, data, {
    new: true,
    useFindAndModify: false,
  }).then((result) => {
    res
      .status(200)
      .send({ message: "Profile details updated", payload: result });
  });
});

module.exports = app;
