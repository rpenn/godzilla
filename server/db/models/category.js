'use strict';
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    unique: true
  }

});

mongoose.model('Categories', CategorySchema);

