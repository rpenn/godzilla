app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/product',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl'
    });

});

app.controller('ProductCtrl', function ($scope, AuthService, $state) {

    $scope.message = 'this is also product';

});