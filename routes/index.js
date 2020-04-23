const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  console.log(req.params.cat);
  Sneaker.find({ category: req.params.cat })
    .then((dbResult) => {
      res.render("products", {
        sneakers: dbResult,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
