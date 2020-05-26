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
// mongoose.connect('mongodb://localhost:27017/products');

const ProductConnection = mongoose.createConnection('mongodb://localhost:27017/products')
const CategoryConnection = mongoose.createConnection('mongodb://localhost:27017/categories')

const ProductSchema = require("../schemas/product");
const CategorySchema = require("../schemas/category")

const Product = ProductConnection.model('Product', ProductSchema)
const Category = CategoryConnection.model('Category', CategorySchema)

// connection informations =====================================================

ProductConnection.on("error", console.error.bind(console, "Product connection error"));
ProductConnection.once("open", function(callback){
    console.log("Product connection Succeeded");
});
CategoryConnection.on("error", console.error.bind(console, "Category connection error"));
CategoryConnection.once("open", function(callback){
    console.log("Category connection Succeeded");
});


// routes =======================================================================
// API/Product ==================================================================
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
      quantity: req.body.quantity,
      category: req.body.category
    },
    function(err) {
      if (err) res.send(err);
      else {
        Product.find(function(err, products) {
          if (err) res.send(err);
          res.json(products);
        })
      }
    }
  )
})

// Update existing product in the database
app.put("/api/products/:product_id", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) res.send(err);

    product.update(req.body, {overwrite: true}, function(err, writeOpResult) {
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

// Fetch all products from given category
app.get('/api/products/category:category_id', function(req, res) {
  if (req.params.category_id === 'other') {
    Product.find({category:''}, function (err, products) {
      if (err) res.send(err);
      res.json(products);
    })
  } else {
    Product.find({category: req.params.category_id}, function (err, products) {
      if (err) res.send(err);
      res.json(products);
    })
  }
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

// API/Category =================================================================
// Add new category
app.post('/api/categories', function(req, res) {
  Category.create(
    {
      name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase()
    },
    function(err) { 
      if (err) res.send(err);
      else {
        Category.find({}, null, {sort: {name:1}},function (err, categories) {
          if (err) res.send(err);
          res.json(categories);
        })
      }
    }
  )
})

// Update existing category in the database
app.put("/api/categories/:category_id", function(req, res) {
  Category.findById(req.params.category_id, function(err, category) {
    if (err) res.send(err);

    category.update(req.body, {overwrite: true}, function(err, writeOpResult) {
      if (err) res.send(err);

      Category.find({}, null, {sort: {name:1}},function (err, categories) {
        if (err) res.send(err);
        res.json(categories);
      })
    });
  });
});

// Fetch all categories
app.get('/api/categories', function(req, res) {
  Category.find({}, null, {sort: {name:1}},function (err, categories) {
    if (err) res.send(err);
    res.json(categories);
  })
})

// Delete a category
app.delete("/api/categories/:category_id", function(req, res) {
  Product.find({category: req.params.category_id}, function(err, products) {
    if (err) res.send(err);
    
    products.forEach(p => {
      p.update({ category: '' }, function(err) {
        if (err) res.send(err);
      });
    });

    Category.remove(
      {
        _id: req.params.category_id
      },
      function(err, category) {
        if (err) res.send(err);
  
        Category.find({}, null, {sort: {name:1}},function (err, categories) {
          if (err) res.send(err);
          res.json(categories);
        })
      }
    );
  });
});

app.listen(process.env.PORT || 8081)