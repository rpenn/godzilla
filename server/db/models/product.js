'use strict';
var mongoose = require('mongoose');
var Review = require('./review');

var ProductSchema = new mongoose.Schema({
       name: {
          type: String
       },
       category: {
	        type: [String]
       },
       tags: {
          type: [String]
       },
       photo: {
          type: String,
          default: 'placehold'
       },
       description: {
          type: [String]
       },
       price: {
          type: [String]
       },
       review: {
          type: [Review.schema]
       }
});

module.exports = mongoose.model('Product', productSchema);

