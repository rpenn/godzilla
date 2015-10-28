app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            user: function(AuthService){
                return AuthService.getLoggedInUser();
            },
            order: function(orderFactory, user){
                return orderFactory.getCreatedOrder(user._id);
            }
        }
    });
});

app.controller('CheckoutCtrl', function ($scope, AuthService, $state, userFactory, order, user) {
    console.log('test', order);

    $scope.user = {
        address: []
    };

    $scope.address = {};
    $scope.orderItems = order.orderList;

    $scope.createUser = function(){
        $scope.user.address.push($scope.address);
        userFactory.createUser($scope.user);
    }
});
