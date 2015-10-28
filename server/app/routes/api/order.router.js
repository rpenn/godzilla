var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order')
var OrderItem = mongoose.model('OrderItem')
//var restrict = require('../../../services/restrict');

//get all orders
router.get('/', function (req, res, next){
	Order.find()
    .then( fulfilled, error )

    function fulfilled (value) {
          res.json(value).status(200);
    }
    function error (err) {
         next(err);
    }

})

router.post('/add-to-order/guest', function (req, res, next) {
    Order.find({sid: req.sessionID})
        .then(function (doc) {
            if(doc.length === 0){
                req.body.sid = req.sessionID;
                Order.create(req.body).then(function(data){
                    res.json(data);
                });
            }
            else if(doc.length === 1){
                console.log(doc[0].orderList);
                doc[0].orderList.push(req.body)
                doc[0].save()
                .then(function(doc) {
                    res.json(doc);                    
                })
            }
            else {
                next();
            }
        })
        .then(null, next);
});

router.post('checkout/guest', function (req, res, next) {

})

router.post('checkout/')
// router.post('/', function (req, res){
// 	var orderItem = req.body;
// 	var orderID = req.sessionID;
//     OrderItem.findById(orderItem.item)
// 		.then(function(item){
// 			return item;
// 		})
// 		.then(function(result){
// 			checkForExistingOrder(orderID, function (response) 	{
// 				var order;
//                 if (response){
//                     order = response;
//                     order.orderItems.push({
//                         productId: result.id,
// 	      			    itemCount: result.itemCount
//                     });
//                     order.save()
//                         .then(function (order){
//                             res.sendStatus(201).json(order)
//                         });
//                 } else {
//                     order = new Order({
//                         sessionID: orderID,
//                         orderItems: {
//                             productId: result.id,
// 	      			        itemCount: result.itemCount
// 	      			    }
//                     });
//                     order.save()
//                         .then(function (order){
//                             res.sendStatus(201).json(order);
//                         });
//                 }
// 	        })
//         })
// });

router.get('/:id', function (req, res, next){
	Order.findById(req.params.id)
		.then(function (order) {
			res.json(order);
		})
		.then(null, next);
});

router.get('/created/:uid', function (req, res, next){
    Order.find({uid: req.params.uid, status: 'created'})
        .then(function (doc) {
            if(doc.length === 0){
                Order.create({uid: req.params.uid}).then(function(data){
                    res.json(data);
                });
            }
            else if(doc.length > 1){
                throw new Error('There is more than one cart');
            }
            else if(doc.length === 1){
                Order.findOne({sid: req.sessionID})
                .then(function(order){
                    var newOrderList = doc[0].orderList.concat(order.orderList);
                    doc[0].orderList = newOrderList;
                    res.json(doc[0]);
                    //* untested! 
                })
            }
            else {
                next();
            }
        })
        .then(null, next);
});

//this currently is working 10-27, modify cautiously
router.put('/', function (req, res, next){
    var order = req.body;

    for(var i=0; i<order.orderList.length; i++){
        order.orderList[i] = new OrderItem(order.orderList[i]);
    }
	Order.findById(order._id)
		.then(function (doc) {
			doc.orderList = order.orderList;
            return doc.save()
		})
        .then(function (newOrder) {
            res.json(newOrder);
        })
		.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	Order.findById(req.params.id).remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});

function checkForExistingOrder(orderID, cb) {
    Order.findById(orderID, function (err, order) {
    	if (err) { return next(err) }

    		return order
    }).then(cb);
}
module.exports = router;
