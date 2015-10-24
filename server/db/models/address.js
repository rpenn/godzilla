'use strict';
var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({
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
          type: String
       },
       addressCountry: {
          type: String
       }
});

mongoose.model('Address', AddressSchema);

