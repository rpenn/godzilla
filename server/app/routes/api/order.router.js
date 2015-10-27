var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order')
var OrderItem = mongoose.model('OrderItem')
var restrict = require('../../../services/restrict');


router.get('/', function (req, res, next){
	Order.find()
		.then(function (orders) {
			res.json(orders);
		})
		.then(null, next);
})

// router.post('/', function (req, res, next){
// 	Order.create(req.body)
// 		.then(function (order){
// 			res.sendStatus(201).json(order)
// 		})
// 		.then(null, next);
// })

router.post('/', function (req, res, next){
	var orderItem = req.body;
	var orderID = req.sessionID;
	Item.findById(orderItem.item)
		.then(function(item){
			return item
		})
		.then(function(result){
			checkForExistingOrder(orderID, function (response) 	{
				var order;

						if (response){
							order = response;
							order.orderItems.push({
								productId: result.id,
	      			  itemCount: result.itemCount
							})
							order.save()
								.then(function (order){
									res.sendStatus(201).json(order)
								})
						} else {
						order = new Order({
							sessionID: orderID,
							orderItems: {
								productId: result.id,
	      			  itemCount: result.itemCount
	      			}
						});
						order.save()
								.then(function (order){
									res.sendStatus(201).json(order);
								})
						}


	       })
				})


})


router.get('/:id', function (req, res, next){
	Order.findById(req.params.id)
		.then(function (order) {
			res.json(order);
		})
		.then(null, next);
})

router.put('/:id', function (req, res, next){
	Order.findById(req.params.id)
		.then(function (order) {
			order = req.body;
			order.save()
				.then(function (newOrder) {
					res.json(newOrder);
				})
		})
		.then(null, next);
})

router.delete('/:id', function (req, res, next) {
	Order.findById(req.params.id).remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});




function checkForExistingOrder(orderID, cb) {
    Order.findById(orderID, function (err, order) {
    	if (err) { return next(err) }

    		return order
    }).then(cb);
}


module.exports = router;
