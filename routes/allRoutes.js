const express = require("express");
const router = express.Router();

//* استدعاء الموديلز
const CustomerData = require("../models/customerSchema");
const userController = require("../controllers/userController");

//* الأساسيات(Express + Mongoose + Moment);

//! Get Requst
router.get("/", userController.indexpage_get);

router.get("/user/add.html", userController.addPage_get);

router.get("/edit/:id", userController.editPage_get);

router.get("/view/:id", userController.viewPage_get);

//@ Post Requst
router.post("/user/add.html", userController.addPage_post);

router.post("/search", userController.searchPage_post);

//& PUT Requst
router.put("/edit/:id", userController.editPage_put);

//$ Delete Requst
router.delete("/delete/:id", userController.deletePage_delete);

module.exports = router;
