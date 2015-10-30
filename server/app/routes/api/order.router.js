var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var OrderItem = mongoose.model('OrderItem');
var _ = require('lodash');
//var restrict = require('../../../services/restrict');



router.get('/', function (req, res, next){
    Order.find()
        .populate('orderList.product')
        .exec()
        .then( fulfilled, error )

    function fulfilled (value) {
        res.json(value).status(204);
    }
    function error (err) {
        next(err);
    }

});

router.get('/:uid', function (req, res, next){
	Order.find({uid: req.params.uid})
    .populate('orderList.product')
    .exec()
    .then( fulfilled, error )

    function fulfilled (value) {
          res.json(value).status(200);
    }
    function error (err) {
         next(err);
    }

});

//MJS new route
router.get('/guest/created', function(req, res, next){
    Order.findOne({sid: req.sessionID, 'status': 'created'})
        .populate('orderList.product')
        .exec()
        .then( fulfilled, error )

    function fulfilled (value) {
        res.json(value);
    }
    function error (err) {
        next(err);
    }
});

//MJS new route
router.get('/:uid/created', function(req, res, next){
    Order.findOne({uid: req.params.uid, 'status': 'created'})
        .populate('orderList.product')
        .exec()
        .then( fulfilled, error )

    function fulfilled (value) {
        res.json(value);
    }
    function error (err) {
        next(err);
    }
});




//get order by ID
router.get('/get-order/:id', function (req, res, next){
    Order.findById(req.params.id)
        .populate('orderList.product')
        .exec()
        .then(function (order) {
            res.json(order);
        })
        .then(null, next);
});

////get current cart
//router.get('/get-order/:id', function (req, res, next){
//    Order.findById( {'user': req.params.id, 'status': 'created'} )
//        .populate('orderList.product')
//        .exec()
//        .then(function (order) {
//            res.json(order);
//        })
//        .then(null, next);
//});


router.post('/add-to-order/guest', function (req, res, next) {
    Order.find({sid: req.sessionID})
        .then(function (doc) {
            if(doc.length === 0){
                req.body.sid = req.sessionID;
                Order.create(req.body).then(function(data){
                    res.json(data);
                });
            }
            else if(doc.length === 1){
                //console.log(doc[0].orderList);
                doc[0].orderList.push(req.body)
                doc[0].save()
                .then(function(doc) {
                    res.json(doc);
                })
            }
            else {
                next();
            }
        })
        .then(null, next);
});

router.put('/remove/:orderId/:')

//ACCOMPLISHED No Need to change
///MJS new router for adding new product
router.post('/addtoorder', function (req, res, next) {
    var body = req.body;
    var uid = body.uid;
    if(body.uid){
        Order.findOne({'uid': uid, 'status': 'created'})
            .then(function(doc){
                console.log(doc);
                if(doc){
                    var orderList = doc.orderList;
                    var hasOrder = false;
                    for(var i = 0; i < orderList.length; i++) {
                        if (orderList[i].product[0]._id === body.orderItem.product._id && orderList[i].size === body.orderItem.size) {
                            hasOrder = true;
                            orderList[i].quantity = orderList[i].quantity + body.orderItem.quantity;
                        }

                    }
                    if(!hasOrder){
                        orderList.push(body.orderItem);
                    }
                    doc.save()
                        .then(function(data){
                            res.json(data);
                        })

                } else {
                    Order.create({'uid': uid, 'orderList': [new OrderItem(body.orderItem)]})
                        .then(function(data){
                            res.json(data);
                        });
                }
            });
    }
    else {
        Order.findOne({'sid': req.sessionID, 'status': 'created'})
            .then(function(doc){
                if(doc){
                    var orderList = doc.orderList;
                    var hasOrder = false;
                    for(var i = 0; i < orderList.length; i++) {
                        if (orderList[i].product[0]._id === body.orderItem.product._id && orderList[i].size === body.orderItem.size) {
                            hasOrder = true;
                            orderList[i].quantity = orderList[i].quantity + body.orderItem.quantity;
                        }
                    }
                    if(!hasOrder){
                        orderList.push(body.orderItem);
                    }
                    doc.save()
                        .then(function(data){
                            res.json(data);
                        })

                } else {
                    Order.create({sid: req.sessionID, orderList: [new OrderItem(body.orderItem)]})
                        .then(function(data){
                            res.json(data);
                        });
                }
            });
    }
    //console.log('test', order);
    res.json(body);
});

///MJS new router for adding new product
//take uid and item order number
//if uid does not exist, take sid
router.put('/updateorderitem', function (req, res, next) {
    var body = req.body;
    var uid = body.uid;

    if(body.uid){
        Order.findOne({'uid': uid, 'status': 'created'}).populate('orderList.product')
            .exec()
            .then(function(doc){
                if(doc){
                    for(var i = 0; i < doc.orderList.length; i++) {
                        //console.log(doc.orderList[i]._id, body.orderItem._id);
                        if (doc.orderList[i]._id == body.orderItem._id) {
                            if(body.orderItem.quantity <= 0){
                                doc.orderList.splice(i, 1);
                            }
                            else {
                                doc.orderList[i].quantity = body.orderItem.quantity;
                            }
                        }

                    }
                    doc.save()
                        .then(function(data){
                            res.json(data);
                        })

                } else {
                    throw new Error('No Open Order need to be updated!');
                }
            });
    }
    else {
        Order.findOne({'sid': req.sessionID, 'status': 'created'})
            .then(function(doc){
                if(doc){
                    for(var i = 0; i < doc.orderList.length; i++) {
                        //console.log(doc.orderList[i]._id, body.orderItem._id);
                        if (doc.orderList[i]._id == body.orderItem._id) {
                            if(body.orderItem.quantity <= 0){
                                doc.orderList.splice(i, 1);
                            }
                            else {
                                doc.orderList[i].quantity = body.orderItem.quantity;
                            }
                        }

                    }
                    doc.save()
                        .then(function(data){
                            res.json(data);
                        })

                } else {
                    throw new Error('No Open Order need to be updated!');
                }
            });
    }
});

router.post('/checkout', function(req, res, next){
    var body = req.body;
    Order.findOne({_id: body._id}).then(function(doc){
        doc.status = 'processing';
        doc.shippingAddress=body.shippingAddress;
        doc.creditCard = body.creditCard;
        doc.save().then(function(response){
            res.json(response);
        })
    });

});

router.get('/created/:uid', function (req, res, next){
    Order.find({uid: req.params.uid, status: 'created'})
        .then(function (doc) {
           // console.log(doc);
            if(doc.length === 0){
                Order.create({uid: req.params.uid}).then(function(data){
                    res.json(data);
                });
            }
            else if(doc.length > 1){
                throw new Error('There is more than one cart');
            }
            else if(doc.length === 1){
               // Order.findOne({sid: req.sessionID})
               // .then(function(order){
                //    var newOrderList = doc[0].orderList.concat(order.orderList);
               //     doc[0].orderList = newOrderList;
                    res.json(doc[0]);
                    //* untested!
                //})
            }
            else {
                next();
            }
        })
        .then(null, next);
});

//this currently is working 10-27, modify cautiously
router.put('/user_order', function (req, res, next){
    var order = req.body;
    for(var i=0; i<order.orderList.length; i++){
        order.orderList[i] = new OrderItem(order.orderList[i]);
    }
	Order.findById(order._id)
		.then(function (doc) {
			doc.orderList = order.orderList;
            return doc.save()
		})
        .then(function (newOrder) {
            res.json(newOrder);
        })
		.then(null, next);
});

router.delete('/delete/:id', function (req, res, next) {
	Order.findById(req.params.id).remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

module.exports = router;
