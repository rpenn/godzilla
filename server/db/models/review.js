'use strict';
var mongoose = require('mongoose');


var ReviewSchema = new mongoose.Schema({
       userId: {
          type: String
       },
       starRating: {
          type: Number,
          min: 1,
          max: 5
       },
       Comment: {
          type: String
       }
});

mongoose.model('Review', ReviewSchema);

