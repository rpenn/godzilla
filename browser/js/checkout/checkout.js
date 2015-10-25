app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        data: {
            authenticate: true
        }
    });

});

app.controller('CheckoutCtrl', function ($scope, AuthService, $state, userFactory) {

    $scope.user = {
        address: []
    };

    $scope.address = {};

    $scope.createUser = function(){
        $scope.user.address.push($scope.address);
        userFactory.createUser($scope.user);
    }
});
