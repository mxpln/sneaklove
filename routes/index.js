const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  if (req.params.cat === "collection") {
    Sneaker.find({})
      .then((dbResult) => {
        res.render("products", {
          sneakers: dbResult,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Sneaker.find({ category: req.params.cat })
      .then((dbResult) => {
        res.render("products", {
          sneakers: dbResult,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get("/one-product/:id", (req, res) => {
  console.log(req.params.id);
  Sneaker.findById(req.params.id)
    .then((dbResult) => {
      res.render("one_product", {
        sneakers: dbResult,
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

module.exports = router;
