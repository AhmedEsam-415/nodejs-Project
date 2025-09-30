const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const moment = require("moment");

const CustomerData = require("./models/customerSchema");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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

//! Get Requst
app.get("/", (req, res) => {
  CustomerData.find()
    .then((result) => {
      res.render("index", {
        currentPage: "index",
        arr: result,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add", { currentPage: "add" });
});

app.get("/edit/:id", (req, res) => {
  CustomerData.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { currentPage: "edit", arrEdit: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/view/:id", (req, res) => {
  CustomerData.findById(req.params.id)
    .then((result) => {
      res.render("user/view", {
        currentPage: "view",
        arrView: result,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//! End Get Requst

//@ Post Requst
app.post("/user/add.html", (req, res) => {
  const customerData = new CustomerData(req.body);
  customerData
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
//@ End Post Requst

//$ Delete Requst
app.delete("/delete/:id", (req, res) => {
  CustomerData.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
//$ End Delete Requst

//$ Update Data Requst
app.put("/edit/:id", (req, res) => {
  CustomerData.findByIdAndUpdate(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
//$ End Update Data Requst

//* Start Conection From DB
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
//* End Conection From DB
