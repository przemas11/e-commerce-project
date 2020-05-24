var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  shipping: { type: String, required: true },
  warranty: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
},
{
  timestamps: true
});

module.exports = ProductSchema;