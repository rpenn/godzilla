app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
        	products: function(productFactory){
        		return productFactory.getAllProducts();
        	}
        }
    });

});

app.controller('ProductsCtrl', function ($scope, $state, products) {

    $scope.products = products;

});