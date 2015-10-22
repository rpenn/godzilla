'use strict';
var mongoose = require('mongoose');
var Review = require('./review');
var Product = require('./product');

var ProductsSchema = new mongoose.Schema({
       products: {
          type: [Product.schema]
       },
       quantity: {
          type: Number
       },
       subtotal: {
          type: Number
       }
       
});

module.exports = mongoose.model('Products', productsSchema);

