'use strict';
var mongoose = require('mongoose');

var BrandSchema = new mongoose.Schema({
  brand: {
    type: String,
    unique: true
  }

});

mongoose.model('Brands', BrandSchema);

