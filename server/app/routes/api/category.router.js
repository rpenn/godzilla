var router = require('express').Router();
var mongoose = require('mongoose');
var Categories = mongoose.model('Categories');
var restrict = require('../../../services/restrict');

//get all categories
router.get('/', function (req, res, next){
  Categories.find().exec()
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//create a new category
router.post('/', restrict.admin, function (req, res, next){
  Categories.create(req.body)
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
  Categories.findOneAndRemove( {_id: req.params.id} )
    .then(function() {
      res.status(204).end();
    })
    .then(null, next);
});

module.exports = router;

