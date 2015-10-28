var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
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
router.post('/', restrict.admin, function (req, res, next){
    if(req.body){
    	for(var x=0; x < req.body.address.length; x++){
    		req.body.address[x] = new Address(req.body.address[x]);
    	}
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

    for(var x=0; x < req.body.address.length; x++){
        req.body.address[x] = new Address(req.body.address[x]);
    }
	User.findById(req.params.id)
		.then(function (user) {
			for (var key in req.body) {
        user[key] = req.body[key]
      }
			user.save()
    .then( fulfilled, error )
  })
})

//delete by id
router.delete('/:id', restrict.admin, function (req, res, next) {
	User.findOneAndRemove( {_id: req.params.id} )
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

module.exports = router;

