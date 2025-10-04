//* استدعاء الموديلز
const CustomerData = require("../models/customerSchema");
const Country = require("../views/user/country");

//* الأساسيات(Express + Mongoose + Moment);
const moment = require("moment");

//! Get Requst Functions (الصفحات)
const indexpage_get = (req, res) => {
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
};

const addPage_get = (req, res) => {
  res.render("user/add", { currentPage: "add", Country: Country });
};

const editPage_get = (req, res) => {
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
};

const viewPage_get = (req, res) => {
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
};

//@ Post Requst Functions (الصفحات)
const addPage_post = (req, res) => {
  CustomerData.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchPage_post = (req, res) => {
  const name = req.body.inpUserName.trim();
  CustomerData.find({ $or: [{ firstName: name }, { lastName: name }] })
    .then((result) => {
      res.render("user/search", { currentPage: "search", searchArr: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//& PUT Requst Functions (الصفحات)
const editPage_put = (req, res) => {
  CustomerData.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

//$ Delete Requst Functions
const deletePage_delete = (req, res) => {
  CustomerData.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  indexpage_get,
  addPage_get,
  editPage_get,
  viewPage_get,
  addPage_post,
  searchPage_post,
  editPage_put,
  deletePage_delete,
};
