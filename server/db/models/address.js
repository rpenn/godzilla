'use strict';
var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({
       address1: {
          type: String
       },
       address2: {
	        type: String
       },
       city: {
          type: String
       },
       state: {
          type: String
       },
       zip: {
          type: String
       },
       country: {
          type: String
       }
});

mongoose.model('Address', AddressSchema);

