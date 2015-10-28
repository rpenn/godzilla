app.config(function ($stateProvider) {

    $stateProvider
        .state('products', {
            url: '/products',
            templateUrl: 'js/products/products.html',
            resolve: {
                user: function(AuthService){
                    return AuthService.getLoggedInUser();
                }
            },
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
        .state('products.category', {
            url: '/list/:cat1',
            templateUrl: 'js/products/list.html',
            controller: 'ProductListCategoryCtrl',
            resolve: {
                products: function (productFactory) {
                    return productFactory.getAllProducts();
                }
            }
        })
        .state('products.category2', {
            url: '/list/:cat1/:cat2',
            templateUrl: 'js/products/list.html',
            controller: 'ProductListCategoryCtrl',
            resolve: {
                products: function (productFactory) {
                    return productFactory.getAllProducts();
                }
            }
        })
        .state('products.category3', {
            url: '/list/:cat1/:cat2/:cat3',
            templateUrl: 'js/products/list.html',
            controller: 'ProductListCategoryCtrl',
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
            controller: 'ProductItemCtrl',
            resolve: {
                product: function (productFactory, $stateParams) {
                    return productFactory.getProduct($stateParams.id);
                }
            }
        });

});

app.controller('ProductListCtrl', function ($scope, $state, products, orderFactory, user, $uibModal, $stateParams) {

    $scope.orderItems = [];

    console.log($stateParams);

    angular.forEach(products, function(product){
        $scope.orderItems.push({product: angular.copy(product)});
    });

    $scope.user = user;

    $scope.cart;

    orderFactory.getCreatedOrder($scope.user._id).then(function(data){
        $scope.cart = data;
        console.log($scope.cart);
    });

    //function emailModal(){
    //    var modalInstance = $uibModal.open({
    //        animation: true,
    //        templateUrl: 'myModalAddEmail.html',
    //        controller: 'AddEmailCtrl'
    //    });
    //
    //    modalInstance.result.then(function (email) {
    //        $scope.order.email = email;
    //    }, function () {
    //        console.log('Modal dismissed at: ' + new Date());
    //    });
    //}

    $scope.addToCart = function(orderItem){
        //todo, need to consider if user is not created
        if($scope.user !== null ){
            var hasInOrder = false;

            angular.forEach($scope.cart.orderList, function(item){
                if(item.product[0]._id === orderItem.product._id && item.size === orderItem.size){
                    hasInOrder = true;
                    item.quantity = item.quantity + orderItem.quantity;
                }
            });

            if(!hasInOrder) {
                $scope.cart.orderList.push(angular.copy(orderItem));
            }

            orderFactory.addToOrder($scope.cart).then(function(data){
                console.log(data);
            });
        }
    };


});
app.controller('ProductListCategoryCtrl', function ($scope, $state, products, orderFactory, user, $stateParams, $uibModal) {

    $scope.orderItems = [];
    $scope.category = $stateParams;
    //console.log($scope.category);

    var filterProducts = [];

    angular.forEach($scope.category, function(value, key){
        filterProducts = products.filter(function(product){
            return product[key] === value;
        });
    });

    angular.forEach(filterProducts, function(product){
        $scope.orderItems.push({product: angular.copy(product)});
    });

    $scope.user = user;

    $scope.cart;

    orderFactory.getCreatedOrder($scope.user._id).then(function(data){
        $scope.cart = data;
        //console.log($scope.cart);
    });

    $scope.addToCart = function(orderItem){
        //todo, need to consider if user is not created
        if($scope.user !== null ){
            var hasInOrder = false;

            angular.forEach($scope.cart.orderList, function(item){
                if(item.product[0]._id === orderItem.product._id && item.size === orderItem.size){
                    hasInOrder = true;
                    item.quantity = item.quantity + orderItem.quantity;
                }
            });

            if(!hasInOrder) {
                $scope.cart.orderList.push(angular.copy(orderItem));
            }

            orderFactory.addToOrder($scope.cart).then(function(data){
                console.log(data);
            });
        }
    };

});

app.controller('AddEmailCtrl', function ($scope, $uibModalInstance) {

    $scope.ok = function () {
        $uibModalInstance.close($scope.anon.email);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
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

app.controller('ProductItemCtrl', function ($scope, $state, product) {

    $scope.orderItem = {product: angular.copy(product)};

});
