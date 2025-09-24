const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
const UserData = require("./models/mydataSchema");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

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

//@ Send Data To DataBase
app.post("/", (req, res) => {
  const userData = new UserData(req.body);
  userData
    .save()
    .then(() => {
      console.log(req.body);
      res.send(`<h1>تم ارسال الداتا بنجاح</h1>`);
    })
    .catch((err) => {
      console.log(err);
    });
});
