const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

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
