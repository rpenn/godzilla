'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Address = mongoose.model('Address');
var CreditCard = mongoose.model('CreditCard');
//var Order = mongoose.model('Order');

var userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
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
            type: String
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
    },
    //orderHistory : [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    password: {
        type: String
    },
    group: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', userSchema);
