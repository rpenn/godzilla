var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product')
var restrict = require('../../../services/restrict');

//get all prodcuts
router.get('/', function (req, res, next) {
    Product.find()
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//create new product
//restrict.admin,
router.post('/', function (req, res, next) {
    Product.create(req.body)
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//get product by id
router.get('/:id', function (req, res, next) {
    Product.findById(req.params.id)
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//edit producy by id
router.put('/', function (req, res, next) {
;    Product.findById(req.body._id)
        .then(function (product) {
            for (var key in req.body) {
                if(key === 'price'){
                    console.log(product[key], req.body[key]);
                }

                product[key] = req.body[key]
            }
            console.log(product);
            product.save()
                .then(function (newProduct) {
                    res.status(203).json(newProduct);
                })
        }, error );
    function error (err) {
        next(err);
    }
});

//delete product by id
router.delete('/:id', function (req, res, next) {
    Product.remove({_id: req.params.id})
        .then(function () {
            res.status(204).end();
        })
        .then(null, next);
});

module.exports = router;
