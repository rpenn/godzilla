'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
       addressLine1: {
          type: String
       },
       addressLine2: {
	  type: String
       },
       addressCity: {
          type: String
       },
       addressState: {
          type: String
       },
       addressZip: {
          type: Number
       },
       addressCountry: {
          type: String
       }
});

mongoose.model('Address', schema);
