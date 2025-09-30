const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

const UserData = require("./models/mydataSchema");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Start Auto Refresh
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
// End Auto Refresh

//! Start Pages
app.get("/", (req, res) => {
  res.render("index", { currentPage: "index" });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add", { currentPage: "add" });
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view", { currentPage: "view" });
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit", { currentPage: "edit" });
});
//! End Pages

//$ Start Conection From DB
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
//$ End Conection From DB
