app.config(function ($stateProvider) {

    $stateProvider
        .state('products', {
            url: '/products',
            templateUrl: 'js/products/products.html',
            controller: function(){}
        })
        .state('products.list', {
            url: '/list',
            templateUrl: 'js/products/list.html',
            controller: 'ProductListCtrl',
            resolve: {
                products: function (productFactory) {
                    return productFactory.getAllProducts();
                }
            }
        })
        .state('products.add', {
            url: '/add',
            templateUrl: 'js/products/add.html',
            controller: 'ProductAddCtrl',
            data: {
                authenticate: true
            }
        })
        .state('products.detail', {
            url: '/detail/:id',
            templateUrl: 'js/products/item.html',
            controller: 'ProductItemCtrl'
        });

});

app.controller('ProductListCtrl', function ($scope, $state, products) {

    $scope.products = products;

});

app.controller('ProductAddCtrl', function ($scope, $state, productFactory) {

    $scope.product = {
        tags: [],
        photo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Polo_Shirt_Basic_Pattern.png'
    };

    function removeItem(item, arr){
        for(var i = 0; i<arr.length; i++){
            if(arr[i] === item){
                arr.splice(i, 1);
            }
        }
    }

    $scope.addToTags = function(){
        removeItem($scope.oneTag, $scope.product.tags);
        $scope.product.tags.push($scope.oneTag);
        $scope.oneTag = null;
    };

    $scope.removeFromTags = function(tag){
        removeItem(tag, $scope.product.tags);
    };

    $scope.addProduct = function(){
        productFactory.createProduct($scope.product).then(function(){
            $state.go('products.list');
        });
    };

});

app.controller('ProductItemCtrl', function ($scope, $state, $stateParams) {

    $scope.id = $stateParams;

});
