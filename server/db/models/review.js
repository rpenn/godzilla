'use strict';
var mongoose = require('mongoose');


var ReviewSchema = new mongoose.Schema({
       user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
       },
       starRating: {
          type: Number,
          min: 1,
          max: 5
       },
       comments: {
          type: String
       }


});

module.exports = mongoose.model('review', ReviewSchema);

