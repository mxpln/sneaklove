const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res) => {
  //   console.log(req.body);
  Sneaker.create(req.body)
    .then((dbResult) => {
      //   console.log(dbResult);
      res.redirect("/prod-add");
    })
    .catch((dbErr) => {
      //   console.log(dbErr);
      res.redirect("/prod-add");
    });
});

router.post("/tag-add", (req, res) => {
  Tag.create(req.body)
    .then((dbResult) => {
      console.log(dbResult);
      res.redirect("/prod-add");
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.redirect("/prod-add");
    });
  console.log(req.body);
});
module.exports = router;
