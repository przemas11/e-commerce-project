var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
},
{
  timestamps: true
});

module.exports = CategorySchema;