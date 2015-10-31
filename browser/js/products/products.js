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
            controller: function(orderFactory){}
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
                reviews: function (reviewFactory, $stateParams) {
                    return reviewFactory.getReviewByProduct($stateParams.id);
                        },
                product: function (productFactory, $stateParams) {
                    return productFactory.getProduct($stateParams.id);
                },
                isUser: function(AuthService){
                    return AuthService.getLoggedInUser();
                }
            }
        });

});

app.controller('ProductListCtrl', function ($scope, $state, orderFactory, products, user, $uibModal, $stateParams) {

    $scope.orderItems = [];

    angular.forEach(products, function(product){
        $scope.orderItems.push({product: angular.copy(product)});
    });

    $scope.user = user || null;

    $scope.cart;

    $scope.addToCart = function(orderItem){

        var uid = $scope.user ? $scope.user._id : null;
        orderFactory.addToOrder(uid, orderItem).then(function(data){
            console.log(data);
        });

    };


});

app.controller('ProductListCategoryCtrl', function ($scope, $state, products, orderFactory, user, $stateParams, $uibModal) {

    $scope.orderItems = [];
    $scope.category = $stateParams;

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



    $scope.addToCart = function(orderItem){
        //todo, need to consider if user is not created
        //if($scope.user !== null ){
        //    var hasInOrder = false;
        //    console.log($scope.cart);
        //    angular.forEach($scope.cart.orderList, function(item){
        //        console.log(item);
        //        if(item.product._id === orderItem.product._id && item.size === orderItem.size){
        //            hasInOrder = true;
        //            item.quantity = item.quantity + orderItem.quantity;
        //        }
        //    });
        //
        //    if(!hasInOrder) {
        //        $scope.cart.orderList.push(angular.copy(orderItem));
        //    }
        //
        //    orderFactory.addToOrder($scope.cart).then(function(data){
        //        console.log(data);
        //    });
        //}
        var uid = $scope.user ? $scope.user._id : null;
        orderFactory.addToOrder(uid, orderItem).then(function(data){
            console.log(data);
        });
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

app.controller('ProductAddCtrl', function ($scope, $state, productFactory, categoryFactory) {

    $scope.product = {
        cat1: 'clothing',
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

    $scope.catoptions1 = ['clothing', 'shoes', 'accessories', 'grooming'];
    $scope.popSubOptions = function(n, cat){
        categoryFactory.findSubCategory(cat).then(function(res){
            $scope['catoptions'+n] = res.data ? res.data.subCat : [];
        }).catch(function(err){

        });

    };

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

app.controller('ProductItemCtrl', function ($scope, $state, product, reviews, isUser) {

    $scope.isUser = isUser;
    $scope.orderItem = {product: angular.copy(product)};
    $scope.reviews = reviews;
});
