// require("dotenv").config();
// const mongoose = require("mongoose");
// const Sneaker = require("../models/Sneaker");

// const sneaker = [
//   {
//     name: "Sneaker 1",
//     ref: "011A",
//     sizes: [6, 7, 8],
//     description: "My sneaker",
//     price: 80,
//     category: "men",
//     // id_tags: ["urban", "sport", "summer"],
//   },
// ];

// mongoose
//   .connect("mongodb://localhost/sneaklove", { useNewUrlParser: true })
//   .then((self) => {
//     console.log(`Connected to ${self.connection.name}`);

//     // Seeds
//     Sneaker.create(sneaker)
//       .then((dbResponse) => {
//         console.log(dbResponse);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(`Error occured while connecting to the Database ${err}`);
//   });
