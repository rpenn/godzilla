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
          type: Number
       },
       addressCountry: {
          type: String
       }
});

module.exports = mongoose.model('Address', addressSchema);

