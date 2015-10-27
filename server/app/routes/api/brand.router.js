var router = require('express').Router();
var mongoose = require('mongoose');
var Brands = mongoose.model('Brands');
var restrict = require('../../../services/restrict');

//get all brands
router.get('/', function (req, res, next){
  Brands.find().exec()
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//create a new brand
router.post('/', restrict.admin, function (req, res, next){
  Brands.create(req.body)
  .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

})

//delete by id
router.delete('/:id', restrict.admin, function (req, res, next) {
  Brands.findOneAndRemove( {_id: req.params.id} )
    .then(function() {
      res.status(204).end();
    })
    .then(null, next);
});

module.exports = router;

