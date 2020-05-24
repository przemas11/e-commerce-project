var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, unique: true, required: true }
},
{
  timestamps: true
});

module.exports = CategorySchema;