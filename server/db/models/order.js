'use strict';
var mongoose = require('mongoose');
var OrderItem = mongoose.model('OrderItem');

var OrderSchema = new mongoose.Schema({
       sessionId: {
          type: String
       },
       userID : {
          type: String
       },
       orderItems: {
        type: [OrderItem.schema]
       },
       status: {
        type: String,
        enum: ['Created', 'Processing', 'Cancelled', 'Completed']
       },
       shippingAddress : {
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
       creditCard: {
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
      }

       }

});

mongoose.model('Order', OrderSchema);

