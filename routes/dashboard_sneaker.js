const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const requireAuth = require("../middlewares/requireAuth");

router.get("/prod-add", requireAuth, (req, res) => {
  Tag.find()
    .then((dbResult) => {
      res.render("products_add", {
        tags: dbResult,
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.post("/prod-add", requireAuth, (req, res) => {
  Sneaker.create(req.body)
    .then((dbResult) => {
      res.redirect("/prod-add");
    })
    .catch((dbErr) => {
      res.redirect("/prod-add");
    });
});

router.post("/tag-add", requireAuth, (req, res) => {
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

router.get("/prod-manage", requireAuth, (req, res) => {
  Sneaker.find()
    .then((dbResult) => {
      res.render("products_manage", {
        sneakers: dbResult,
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/product-delete/:id", requireAuth, (req, res) => {
  Sneaker.findByIdAndDelete(req.params.id)
    .then((dbResult) => {
      res.redirect("/prod-manage");
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/product-edit/:id", requireAuth, (req, res) => {
  Tag.find().then((dbResultTags) => {
    Sneaker.findById(req.params.id)
      .populate("id_tags")
      .then((dbResult) => {
        res.render("product_edit", {
          tags: dbResultTags,
          sneakers: dbResult,
        });
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  });
});

router.post("/prod-edit/:id", requireAuth, (req, res) => {
  Sneaker.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((dbResult) => {
      res.redirect("/prod-manage");
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});
module.exports = router;
