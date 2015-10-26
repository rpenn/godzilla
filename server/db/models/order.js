'use strict';
var mongoose = require('mongoose');
var OrderItem = mongoose.model('OrderItem');

var OrderSchema = new mongoose.Schema({
    uid: String,
    orderList: {
        type: [OrderItem.schema]
    },
    status: {
        type: String,
        enum: ['created', 'processing', 'cancelled', 'completed'],
        default: 'created'
    },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

