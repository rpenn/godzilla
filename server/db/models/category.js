'use strict';
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  category: {
    main: {
            type: String,
            unique: true
          },
    subCat: {
              type: [String],
              unique: true
            }
  }
});

mongoose.model('Categories', CategorySchema);

