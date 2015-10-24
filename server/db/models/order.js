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
        type: String,
        enum: ['Created', 'Processing', 'Cancelled', 'Completed']
       }
});

module.exports = mongoose.model('Order', OrderSchema);

