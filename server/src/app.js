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
mongoose.connect('mongodb://localhost:27017/products');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// API ENDPOINTS

// Add new product
app.post('/products', (req, res) => {
  Product.create(
    {
      productName: req.body.productName,
      seller: req.body.seller,
      price: req.body.price,
      description: req.body.description,
      shipping: req.body.shipping,
      warranty: req.body.warranty,
      quantity: req.body.quantity
    },
    function(err) {
      if (err) res.send(err);

      res.send({
        success: true,
        message: 'Product saved successfully!'
      })
    }
  )
})

// Fetch all products
app.get('/products', (req, res) => {
  Product.find(function (err, products) {
    if (err) res.send(err);
    res.json(products);
  })
})

app.listen(process.env.PORT || 8081)