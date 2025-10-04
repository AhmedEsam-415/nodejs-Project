//* الأساسيات(Express + Mongoose + Moment);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

//* Middleware أساسية
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//* method-override (عشان PUT و DELETE)
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//! import All Routes
const allRoutes = require("./routes/allRoutes");
app.use(allRoutes);

//* Start Auto Refresh
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

//* Conection To DB
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
