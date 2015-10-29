var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var restrict = require('../../../services/restrict');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var restrict = require('../../../services/restrict');

var populateQuery = [{path:'user', select:'email'}, {path:'product'}];

//get all reviews
router.get('/', function (req, res, next){

  Review.find()
 .populate(populateQuery)
 .execPopulate()
    .then( fulfilled, error )

function fulfilled (value) {

      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//get review by product ID
router.get('/product/:productId', function (req, res, next){
  Review.find( {
    product: req.params.productId
  } )
  .populate(populateQuery)
  .execPopulate()
  .then( reviews, error )

  function reviews (reviews) {
        res.json(reviews).status(200);
  }

  function error (err) {
       next(err);
  }

});

//create new review
router.post('/product/:productId/user/:userId/review', function (req, res, next) {
  var newReview = {
    product: req.params.id,
    user: req.params.userId,
    comment: req.body.comment,
    starRating: req.body.rating
  };
    Review.create(newReview)
    .then( fulfilled, error )

  function fulfilled (value) {
        res.json(value).status(200);
  }
  function error (err) {
       next(err);
  }

});

//delete a review
router.delete('/:id', restrict.admin, function (req, res, next) {
  User.findOneAndRemove( {_id: req.params.id} )
    .then(function() {
      res.status(204).end();
    })
    .then(null, next);
});

module.exports = router;

