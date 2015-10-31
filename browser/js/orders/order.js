app.config(function ($stateProvider) {

    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'js/orders/order.html',
        resolve: {
            user: function(AuthService){
                return AuthService.getLoggedInUser();
            },
            orders: function(orderFactory, user){
                return orderFactory.getAllOrders(user._id);
            }
        },
        controller: 'OrderCtrl',
        data: {
            authenticate: true
        }
    })
        .state('orders.detail', {
        url: '/:id',
        templateUrl: 'js/orders/detail.html',
        resolve: {
            order: function(orderFactory, user, $stateParams){
                var oid = $stateParams.id;
                return orderFactory.getOrder(user._id, oid);
            }
        },
        controller: 'OrderDetailCtrl',
        data: {
            authenticate: true
        }
    });

});

app.controller('OrderCtrl', function ($scope, $state, orders) {
    $scope.orders = orders.filter(function(order){
        return order.status !== 'created';
    });
});

app.controller('OrderDetailCtrl', function ($scope, $state, order) {
    console.log(order);
    $scope.order = order;
    $scope.charges = {
        merchandise: 0,
        discount: 0,
        shipping: 7,
        tax: 0
    };
    angular.forEach($scope.order.orderList, function(v, k){
        $scope.charges.merchandise += v.product[0].price * v.quantity;
        $scope.charges.discount += v.discount;
    });

    $scope.charges.tax = ($scope.charges.merchandise - $scope.charges.discount) * 0.887;

});
