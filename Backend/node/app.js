var express = require("express");

var app = express();
// var cors = require("cors");
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

//  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
// app.use("/student/job_list", require("./routes/Student/studentJobs"));
// app.use("/student/event_list", require("./routes/Student/studentEvents"));
// app.use("/student/profile", require("./routes/Student/studentProfile"));
// app.use(
//   "/student/applications",
//   require("./routes/Student/studentApplications")
// );
// app.use("/student/all_students", require("./routes/Student/studentAll"));
// app.use("/company/profile", require("./routes/Company/companyProfile"));
// app.use("/company/job/students", require("./routes/Company/companyJobStudent"));
// app.use("/company/event_list", require("./routes/Company/companyEvents"));
// app.use(
//   "/company/event/students",
//   require("./routes/Company/companyEventStudent")
// );

module.exports = app;