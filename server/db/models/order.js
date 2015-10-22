'use strict';
var mongoose = require('mongoose');
var Products = require('./products');

var OrderSchema = new mongoose.Schema({
       products: {
        type: [Products.schema]
       },
       subtotal: {
        type: Number
       },
       status: {
        type: [String]
       }
});

module.exports = mongoose.model('Order', orderSchema);

