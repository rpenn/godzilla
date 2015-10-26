'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    //product: {type: [Product.Schema]},
    quantity: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
});

mongoose.model('OrderItem', OrderItemSchema);
