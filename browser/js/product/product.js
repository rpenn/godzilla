app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/product',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl'
    });

});

app.controller('ProductCtrl', function ($scope, productFactory, $state) {
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
            $state.go('home');
        });
    };

});
