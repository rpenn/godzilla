'use strict';
var mongoose = require('mongoose');



var CategorySchema = new mongoose.Schema({
  cat: {
    type: String,
      unique: true
  },
  subCat: {
    type: [String]
  }

});

mongoose.model('Category', CategorySchema);

