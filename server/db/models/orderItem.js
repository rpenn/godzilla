'use strict';
var mongoose = require('mongoose');

var OrderItemSchema = new mongoose.Schema({
       product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
       },
       size: {
          type: String,
          enum: ['s','m','l','xl']
        },
       quantity: {
          type: Number,
          default: 0
        }
})

mongoose.model('OrderItem', OrderItemSchema);


