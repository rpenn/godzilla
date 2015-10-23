var router = require('express').Router();

var Order = require('./order.model');

router.get('/', function (req, res, next){
	Order.find()
		.then(function (orders) {
			res.json(orders);
		})
		.then(null, next);
})

router.post('/', function (req, res, next){
	Order.create(req.body)
		.then(function (order){
			res.sendStatus(201).json(order)
		})
		.then(null, next);
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

module.exports = router;