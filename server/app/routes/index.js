'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/orders', require('./api/order.router.js'));
router.use('/product', require('./api/product.router.js'));
router.use('/user', require('./api/user.router.js'));
router.use('/reviews', require('./api/reviews.router.js'));
router.use('/categories', require('./api/category.router.js'));
router.use('/brands', require('./api/brand.router.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
