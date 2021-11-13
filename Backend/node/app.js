var express = require("express");
var app = express();
const Mongoose = require("mongoose");

Mongoose.connect(
  "mongodb+srv://archit:qazwsxedc@cluster0.ocdka.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
app.use("/profile", require("./routes/profile"));

module.exports = app;