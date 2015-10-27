'use strict';
var mongoose = require('mongoose');

var OrderItemSchema = new mongoose.Schema({
       productId: {
          type: String,
          required: true
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


