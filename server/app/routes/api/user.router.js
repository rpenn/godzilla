var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Order = mongoose.model('Order');
var restrict = require('../../../services/restrict');

//get all users
router.get('/', function (req, res, next){
	User.find().exec()
		.then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

});

//create a new user
//restrict.admin
router.post('/', function (req, res, next){
    console.log(req.body);
    if(req.body){
       var user = new User(req.body);
        user.save()
            .then(function (user) {
                res.status(201).json(user)
            })
            .then(null, next);
    }
});

//get by id
router.get('/:id', function (req, res, next){
  User.findById(req.params.id)
  .populate('orderHistory')
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

})

//get Order history by id
router.get('/:id/orders', function (req, res, next){
	User.findById(req.params.id)
    .populate()
    .then( fulfilled, error )

function fulfilled (value) {
      res.json(value).status(200);
}
function error (err) {
     next(err);
}

})

//edit by id
router.put('/:id', function (req, res, next){
    var userUpdate = req.body;

	User.findById(req.params.id)
		.then(function (user) {
            for (var key in userUpdate) {
                user[key] = userUpdate[key];
            }
            return user.save()
        })
        .then( fulfilled, error );
    function fulfilled (response) {
        console.log(response);
        res.status(201);
    }
    function error (err) {
        next(err);
    }

});

//delete by id
router.delete('/:id', restrict.admin, function (req, res, next) {
	User.findOneAndRemove( {_id: req.params.id} )
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

module.exports = router;

