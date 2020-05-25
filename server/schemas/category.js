var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, unique: true, required: true }
},
{
  timestamps: true,
  collation: { locale: 'pl', strength: 1 }
},
);

module.exports = CategorySchema;