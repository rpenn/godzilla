angular.module('godzillaApp') .factory('orderFactory', ['$http', function($http) {
    var urlBase = '/api/orders/';
    var orderFactory = {};

    // Get all orders
    orderFactory.getAllOrders = function () {
      return $http.get(urlBase).then(function(result){
        return result;
      });
    };

    // Place an order
    orderFactory.placeOrder = function (order) {
      return $http.post(urlBase, order).then(function(result){
        return result;
      });
    };

    // Get an individual order by id
    orderFactory.getOrder = function (id) {
      return $http.get(urlBase + '/' + id).then(function(result){
        return result;
      });
    };

    // Update an order by id
    orderFactory.updateOrder = function (id, orderInfo) {
      return $http.put(urlBase + '/' + id, orderInfo).then(function(result){
        return result;
      });
    };

    // Delete an order by id
    orderFactory.deleteOrder = function (id) {
      return $http.delete(urlBase + '/' + id).then(function(result){
        return result;
      });
    };

    return orderFactory;
}]);
