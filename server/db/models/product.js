'use strict';
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
       name: {
          type: String
       },
       category: {
	        type: String
       },
       tags: {
          type: [String]
       },
       photo: {
          type: String,
          default: 'http://tattoolicious.com/assets/uploads/images/T-Shirt.jpg'
       },
       description: {
          type: String
       },
       price: {
          type: Number
       }
});

mongoose.model('Product', ProductSchema);

