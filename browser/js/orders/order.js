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
    });

});

app.controller('OrderCtrl', function ($scope, $state, orders) {
    console.log(orders);
    $scope.orders = orders.filter(function(order){
        return order.status !== 'created';
    });
});
