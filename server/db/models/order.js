'use strict';
var mongoose = require('mongoose');
var OrderItem = mongoose.model('OrderItem');
var Promise = require('bluebird');

var OrderSchema = new mongoose.Schema({
    orderList: {
        type: [OrderItem.schema]
    },
    ModifiedDate : { type : Date, default: Date.now },
    sid: {
        type: String
    },
    uid : {
        type: String
    },
    status: {
        type: String,
        enum: ['created', 'processing', 'cancelled', 'completed'],
        default: 'created'
    },
    shippingAddress : {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
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

