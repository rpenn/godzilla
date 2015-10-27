var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var restrict = require('../../../services/restrict');

router.get('/', function (req, res, next){
	User.find().exec()
		.then(function (users) {
			res.json(users);
		})
		.then(null, next);
})

router.post('/', function (req, res, next){



    if(req.body){
    	for(var x=0; x < req.body.address.length; x++){
    		req.body.address[x] = new Address(req.body.address[x]);
    	}

       var user = new User(req.body);

        console.log(user);
        user.save()
            .then(function (user){
                res.status(201).json(user)
            });
    }

})

router.get('/:id', function (req, res, next){
	User.findById(req.params.id)
		.then(function (user) {
			res.json(user);
		})
		.then(null, next);
})

router.put('/:id', function (req, res, next){
	User.findById(req.params.id)
		.then(function (user) {
			user = req.body;
			user.save()
				.then(function (newUser) {
					res.json(newUser);
				})
		})
		.then(null, next);
})

router.delete('/:id', function (req, res, next) {
	User.findOneAndRemove({_id: req.params.id})
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

module.exports = router;