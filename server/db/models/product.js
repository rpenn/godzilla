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
          main: {
                  type: String,
                  unique: true
                },
          subCat: {
                    type: String,
                    unique: true
                  }
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
       reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
});

ProductSchema.methods.findReviews = function findReviews(){
  var product = this;

  var reviewFinds = [];

  product.reviews.forEach(function(reviewId){
    reviewFinds.push
      (
        Review.findOne( {"_id": reviewID} ).exec()
      );
  });

  return reviewFinds
}

mongoose.model('Product', ProductSchema);

