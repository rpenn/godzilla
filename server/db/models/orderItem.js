'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


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
      },

      discount: {
          type: Number,
          default: 0
      }
});


// var OrderItemSchema = new mongoose.Schema({
//        product: {
//           type: [Product.Schema],
//           required: false
//        },
//        size: {
//           type: String,
//           enum: ['s','m','l','xl']
//        },
//        quantity: {
//            type: Number,
//            default: 0
//        },
//         discount: {
//             type: Number,
//             default: 0
//         }
// })

mongoose.model('OrderItem', OrderItemSchema);
