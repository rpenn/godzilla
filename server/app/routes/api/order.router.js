var router = require('express').Router();

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var OrderItem = mongoose.model('OrderItem');

router.get('/', function (req, res, next){
	Order.find()
		.then(function (orders) {
			res.json(orders);
		})
		.then(null, next);
});

router.post('/', function (req, res, next){
	Order.create(req.body)
		.then(function (order){
			res.sendStatus(201).json(order)
		})
		.then(null, next);
});

router.get('/:id', function (req, res, next){
	Order.findById(req.params.id)
		.then(function (order) {
			res.json(order);
		})
		.then(null, next);
});

router.get('/created/:uid', function (req, res, next){
    Order.find({uid: req.params.uid, status: 'created'})
        .then(function (doc) {
            if(doc.length === 0){
                Order.create({uid: req.params.uid}).then(function(data){
                    res.json(data);
                });
            }
            else if(doc.length > 1){
                throw new Error('There are more than one cart');
            }
            else if(doc.length === 1){
                res.json(doc[0]);
            }
            else {
                next();
            }
        })
        .then(null, next);
});

//router.put('/:id', function (req, res, next){
//	Order.findById(req.params.id)
//		.then(function (order) {
//			order = req.body;
//			order.save()
//				.then(function (newOrder) {
//					res.json(newOrder);
//				})
//		})
//		.then(null, next);
//});
router.put('/', function (req, res, next){
    var order = req.body;
    console.log(order.orderList);
    for(var i=0; i<order.orderList.length; i++){
        order.orderList[i] = new OrderItem(order.orderList[i]);
    }
    console.log(order);
	Order.findById(order._id)
		.then(function (doc) {
            console.log(doc);
			doc.orderList = order.orderList;
            return doc.save()
		})
        .then(function (newOrder) {
            console.log(newOrder);
            res.json(newOrder);
        })
		.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	Order.findById(req.params.id).remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

module.exports = router;
