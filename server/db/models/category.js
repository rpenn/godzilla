'use strict';
var mongoose = require('mongoose');



var CategorySchema = new mongoose.Schema({
  cat1: {
    type: [String],
    unique: true
  },

  cat2: {
    type: [String],
    unique: true
  }

  // cat1: {
  //   pant: {
  //     cat3: {type: String,
  //       unique: true
  //     }
  //   }
  //   shirt: {
  //     cat3: {type: String,
  //       unique: true
  //     }
  //   }

  //   shoe: {
  //     cat3: {type: String,
  //       unique: true
  //     }
  //   }
  // }



});

mongoose.model('Categories', CategorySchema);

