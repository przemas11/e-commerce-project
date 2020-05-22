var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  productName: String,
  seller: String,
  price: Number,
  description: String,
  shipping: Array,
  warranty: Number,
  quantity: Number,
},
{
  timestamps: true
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;