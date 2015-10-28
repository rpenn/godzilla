app.config(function ($stateProvider) {

    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'js/orders/order.html',
        resolve: {
        	orders: function(orderFactory){
        		return orderFactory.getAllOrders();
        	}
        },
        controller: 'OrderCtrl',
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
