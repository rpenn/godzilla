'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User')
var Product = mongoose.model('Product')

var ReviewSchema = new mongoose.Schema({
       user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
       },
       product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
       },
       starRating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
       },
       comment: {
          type: String,
          requied: false
       },
       timestamp: {
          type: Date,
          defaule: Date.now,
       }
});

ReviewSchema.methods.findUser = function findUser() {
  var review = this;
  return User.findOne({"_id": review.user}).exec();
};

ReviewSchema.methods.findProduct = function findProduct() {
  var review = this;
  return Product.findOne({"_id": review.user}).exec();
};

mongoose.model('Review', ReviewSchema);

