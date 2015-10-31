app.factory('productFactory', ['$http', function($http) {
    var urlBase = '/api/product';
    var productFactory = {};

    // Get all products
    productFactory.getAllProducts = function () {
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
      return $http.get(urlBase + id).then(function(result){
        return result.data;
      });
    };

    // Update a product by id
    productFactory.updateProduct = function (product) {
        console.log(product);
      return $http.put(urlBase + '/', product);
    };

    // Delete a product by id
    productFactory.deleteProduct = function (id) {
      return $http.delete(urlBase + '/' + id);
    };

    return productFactory;
}]);
