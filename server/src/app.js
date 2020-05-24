// set up ======================================================================
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

require("dotenv").config();
const cfg = process.env;
// configuration ===============================================================
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
//var connectionString = "mongodb+srv://"+cfg.DB_USER+":"+cfg.DB_PASS+"@"+cfg.DB_HOST;
mongoose.connect('mongodb://localhost:27017/products');
var Product = require("../models/product");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// routes =======================================================================
// Add new product
app.post('/api/products', function(req, res) {
  Product.create(
    {
      name: req.body.name,
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

// Update existing product in the database
app.put("/api/products/:product_id", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) res.send(err);

    console.log(req.body)
    product.update(req.body, {overwrite: true}, function(error, writeOpResult) {
      if (err) res.send(err);

      Product.find(function(err, products) {
        if (err) res.send(err);
        res.json(products);
      });
    });
  });
});

// Fetch all products
app.get('/api/products', function(req, res) {
  Product.find(function (err, products) {
    if (err) res.send(err);
    res.json(products);
  })
})

// Delete a product
app.delete("/api/products/:product_id", function(req, res) {
  Product.remove(
    {
      _id: req.params.product_id
    },
    function(err, product) {
      if (err) res.send(err);

      Product.find(function(err, products) {
        if (err) res.send(err);
        res.json(products);
      });
    }
  );
});

app.listen(process.env.PORT || 8081)