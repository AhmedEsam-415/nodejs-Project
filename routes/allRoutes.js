const express = require("express");
const router = express.Router();

//* استدعاء الموديلز
const CustomerData = require("../models/customerSchema");
const Country = require("../views/user/country");

//* الأساسيات(Express + Mongoose + Moment);
const moment = require("moment");

//! Get Requst
router.get("/", (req, res) => {
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

router.get("/user/add.html", (req, res) => {
  res.render("user/add", { currentPage: "add", Country: Country });
});

router.get("/edit/:id", (req, res) => {
  CustomerData.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", {
        currentPage: "edit",
        arrEdit: result,
        Country: Country,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/view/:id", (req, res) => {
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

//@ Post Requst
router.post("/user/add.html", (req, res) => {
  CustomerData.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search", (req, res) => {
  const name = req.body.inpUserName.trim();
  CustomerData.find({ $or: [{ firstName: name }, { lastName: name }] })
    .then((result) => {
      res.render("user/search", { currentPage: "search", searchArr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//& PUT Requst
router.put("/edit/:id", (req, res) => {
  CustomerData.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//$ Delete Requst
router.delete("/delete/:id", (req, res) => {
  CustomerData.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
