app.factory('productFactory', ['$http', function($http) {
    var urlBase = '/api/product/';
    var productFactory = {};

    // Get all products
    productFactory.getAllProducts = function () {
      console.log("getall products")
      return $http.get(urlBase).then(function(result){
        return result.data;
      });
    };

    // Create a new product
    productFactory.createProduct = function (product) {
      return $http.post(urlBase, product);
    };

    // Get a product by id
    productFactory.getProduct = function (id) {
      return $http.get(urlBase + '/' + id).then(function(result){
        return result.data;
      });
    };

    // Update a product by id
    productFactory.updateProduct = function (id, productInfo) {
      return $http.put(urlBase + '/' + id, productInfo).then(function(result){
        return result;
      });
    };

    // Delete a product by id
    productFactory.deleteUser = function (id) {
      return $http.delete(urlBase + '/' + id).then(function(result){
        return result;
      });
    };

    return productFactory;
}]);
