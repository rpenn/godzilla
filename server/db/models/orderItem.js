'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


var OrderItemSchema = new mongoose.Schema({
     //the reason use schema instead of reference, because if product is removed some time,
    //when we come back check the order, it is still there
      product: {
          type: [Product.Schema],
          required: true
      },
      size: {
          type: String,
          enum: ['s','m','l','xl']
      },
      quantity: {
          type: Number,
          default: 1
      },

      discount: {
          type: Number,
          default: 0
      }
});

mongoose.model('OrderItem', OrderItemSchema);
//final version
