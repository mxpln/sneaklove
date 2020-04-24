const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  Tag.find()
    .then((dbResultTags) => {
      console.log(dbResultTags);
      if (req.params.cat === "collection") {
        Sneaker.find({})
          .then((dbResult) => {
            res.render("products", {
              sneakers: dbResult,
              tags: dbResultTags,
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
              tags: dbResultTags,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/one-product/:id", (req, res) => {
  console.log(req.params);
  Sneaker.findById(req.params.id)
    .populate("id_tags")
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
