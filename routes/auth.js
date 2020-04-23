const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const { name, lastname, email, password } = req.body;
  // Check if user with that email already exists in the Database.
  User.findOne({ email: email })
    .then((foundUser) => {
      // If a user was found, it means the email is already used.
      if (foundUser) {
        res.redirect("/signup");
      } else {
        // Hash the password !
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = {
          name,
          lastname,
          email,
          password: hashedPassword,
        };

        User.create(newUser)
          .then((createdUser) => {
            // User created !
            console.log("here");
            res.redirect("/signin"); // Redirect to signin !
          })
          .catch((dbErr) => {
            console.log(dbErr);
          });
      }
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((foundUser) => {
      // If a user is not found, redirect to get("/signin") with an error message.
      if (!foundUser) {
        res.redirect("/signin");
      } else {
        // If we're here, it means a user was found, we compare the password
        // coming from the form with the password of the foundUser.
        if (bcrypt.compareSync(password, foundUser.password)) {
          req.session.currentUser = foundUser; // <== This is what allows us to have our user logged in !
          res.redirect("/"); // Redirect to home
          // Matching passwords...
          // Login user...
        } else {
          // If the password didn't match, redirect to signin with an error message.
          console.log("password wrong");
          res.redirect("/signin");
        }
      }
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/logout", (req, res) => {
  // Destroys the session.
  // Makes the user logged out.
  req.session.destroy((err) => {
    res.redirect("/");
  });
});
module.exports = router;
