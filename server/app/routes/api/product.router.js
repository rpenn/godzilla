var router = require('express').Router();

var Product = require('./product.model');

router.get('/', function (req, res, next){
	Product.find()
		.then(function (products) {
			res.json(products);
		})
		.then(null, next);
})

router.post('/', function (req, res, next){
	Product.create(req.body)
		.then(function (product){
			res.sendStatus(201).json(product)
		})
		.then(null, next);
})

router.get('/:id', function (req, res, next){
	Product.findById(req.params.id)
		.then(function (product) {
			res.json(product);
		})
		.then(null, next);
})

router.put('/:id', function (req, res, next){
	Product.findById(req.params.id)
		.then(function (product) {
			product = req.body;
			product.save()
				.then(function (newProduct) {
					res.json(newProduct);
				})
		})
		.then(null, next);
})

router.delete('/:id', function (req, res, next) {
	Product.findById(req.params.id).remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

module.exports = router;