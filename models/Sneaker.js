// {name, ref, sizes, description, price, category: [men, women, kids], id_tags: [ObjectId] }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: [Number],
  description: String,
  price: Number,
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  id_tags: { type: Schema.Types.ObjectId, ref: "Tag" },
});

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;
