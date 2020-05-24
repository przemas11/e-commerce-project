var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  shipping: String,
  warranty: Number,
  quantity: Number,
  category: String,
},
{
  timestamps: true
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;