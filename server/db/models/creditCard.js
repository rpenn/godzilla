'use strict';
var mongoose = require('mongoose');
var Address = require('./address');

var creditCardSchema = new mongoose.Schema({
       nameOnCard: {
          type: String
       },
       cardNumber: {
	        type: String
       },
       lastFourCard: {
          type: String
       },
       expMonth: {
          type: String
       },
       expYear: {
          type: Number
       },
       address: {
          type: [Address.schema]
       }
});

module.exports = mongoose.model('CreditCard', creditCardSchema);

