'use strict';
var mongoose = require('mongoose');
var Review = mongoose.model('Review')

var ProductSchema = new mongoose.Schema({
       brand: {
           type: String,
       },
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
       availableSizes: {
           type: [String],
           enum: ['s','m','l','xl']
       },
       description: {
           type: String
       },
       price: {
           type: Number,
           default: 0,
           required: true
       },
       reviews: {
           type: [Review.schema]
       },
       modifiedDate: {
           type : Date, default: Date.now
       }
});

mongoose.model('Product', ProductSchema);

