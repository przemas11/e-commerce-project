const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

require("dotenv").config();
var cfg = process.env;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


var Product = require("../models/product");
var mongoose = require('mongoose');
//var connectionString = "mongodb+srv://"+cfg.DB_USER+":"+cfg.DB_PASS+"@"+cfg.DB_HOST;
mongoose.connect('mongodb://localhost:27017/posts');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// API ENDPOINTS
app.get('/products', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

// Add new product
app.post('/products', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_product = new Product({
    productName: productName,
    seller: seller,
    price: price,
    description: description,
    shipping: shipping,
    warranty: warranty,
    quantity: quantity
  })

  new_product.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Product saved successfully!'
    })
  })
})

// Fetch all products
app.get('/products', (req, res) => {
  Product.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      products: products
    })
  }).sort({_id:-1})
})

app.listen(process.env.PORT || 8081)