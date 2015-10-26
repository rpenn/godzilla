var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/', function (req, res, next) {
    console.log('here!');
    Product.find()
        .then(function (products) {
            res.json(products);
        });
})

router.post('/', function (req, res, next) {
    console.log(req.body);
    Product.create(req.body)
        .then(function (product) {
            res.json(product);
        });
})

router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(function (product) {
            res.json(product);
        })
        .then(null, next);
})

router.put('/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(function (product) {
            product = req.body;
            _.extend(product, req.body);
            product.save()
                .then(function (newProduct) {
                    res.json(newProduct);
                })
        })
        .then(null, next);
})

router.delete('/:id', function (req, res, next) {
    Product.findById(req.params.id).remove()
        .then(function () {
            res.status(204).end();
        })
        .then(null, next);
});

module.exports = router;
