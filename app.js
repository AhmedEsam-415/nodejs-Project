const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

const UserData = require("./models/mydataSchema");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Start About Auto Refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// End About Auto Refresh

//! Start main Page
app.get("/", (req, res) => {
  UserData.find()
    // result => Array Of Object From DB
    .then((result) => {
      res.render("home.ejs", { myTitle: "home bage", arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//! End main Page

//$ Start Linked To DB
mongoose
  .connect(
    "mongodb+srv://DB_user-1:EhpV6UmRZeec3hTP@db-1.ziizxy3.mongodb.net/all-data?retryWrites=true&w=majority&appName=DB-1"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
//$ End Linked To DB

//@ Start Send Data To DataBase
app.post("/", (req, res) => {
  const userData = new UserData(req.body);
  userData
    .save()
    .then(() => {
      res.send(`<h1>تم ارسال الداتا بنجاح</h1>`);
    })
    .catch((err) => {
      console.log(err);
    });
});
//@ End Send Data To DataBase
