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
            controller: 'CheckoutCtrl'
        });
});

app.controller('CheckoutCtrl', function ($scope, $state, userFactory, orderFactory, order, user) {
    $scope.address = {};
    $scope.order = order || {};
    $scope.orderItems = $scope.order.orderList || [];
    $scope.user = user || {};
    var uid = user ? user._id : null;
console.log(user);
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
    $scope.checkout = function(){
        //find out the created order and change status to pending, adding shipping and credit info
        $scope.order.shippingAddress = angular.copy($scope.user.shippingAddress);
        $scope.order.creditCard = angular.copy($scope.user.creditCard);
        orderFactory.placeOrder($scope.order).then(function(data){
            console.log(data);
            if(uid){
                $scope.user.shippingAddress = angular.copy($scope.user.shippingAddress);
                $scope.order.creditCard = angular.copy($scope.user.creditCard);
                var userUpdate = {
                    shippingAddress: angular.copy($scope.user.shippingAddress),
                    creditCard: angular.copy($scope.user.creditCard)
                };
                userFactory.updateUser(uid,userUpdate).then(function(){
                    $state.go('orders');
                });
            }
        });

        //push order to order history

        //update user information


    }

    $scope.status = {
        isFirstOpen: true
    };
});
