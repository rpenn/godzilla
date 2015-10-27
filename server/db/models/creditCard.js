'use strict';
var mongoose = require('mongoose');

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
    billingAddress: {
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
    },
    default: {
      type: Boolean
     }
});

mongoose.model('CreditCard', creditCardSchema);

