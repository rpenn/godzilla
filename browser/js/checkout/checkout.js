app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            user: function(AuthService){
                return AuthService.getLoggedInUser();
            },
            order: function(orderFactory, user){
                var uid = user ? user._id : null;

                return orderFactory.getCreatedOrder(uid).then(function(res){
                    return res.data;
                });

            }
        }
    })
        .state('checkout.info', {
            url: '/info/:id',
            templateUrl: 'js/checkout/info.html',
            controller: 'CheckoutCtrl',
            data: {
                authenticate: true
            }
        });
});

app.controller('CheckoutCtrl', function ($scope, $state, userFactory, orderFactory, order, user) {
    $scope.address = {};
    $scope.orderItems = order.orderList;
    $scope.user = user;
    var uid = user ? user._id : null;

    $scope.removeOrderItem = function(item){
        item.quantity = 0;
        updateOrderItem(item);
    };

    $scope.updateOrderItem = function(item){
        updateOrderItem(item);
    };

    function updateOrderItem(item){
        orderFactory.updateOrderItem(uid, item).then(function(res){
            console.log('test', res);
            $scope.orderItems = res.data.orderList;
        });
    }
    //$scope.createUser = function(){
    //    $scope.user.address.push($scope.address);
    //    userFactory.createUser($scope.user);
    //}
});
