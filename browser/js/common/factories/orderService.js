app.factory('orderFactory', ['$http', function($http) {
    var urlBase = '/api/orders';
    var orderFactory = {};



    var currentCart = null;

    //Get order of which state is CREATED
    //by user id
    orderFactory.getCreatedOrder = function (userId) {
        if(orderFactory.currentCart !== null){
            return $http.get(urlBase+'/created/'+userId).then(function(result){
                currentCart = result.data;
                return currentCart;
            });
        }
        else {
            return currentCart;
        }
    };

    // Get all orders
    orderFactory.getAllOrders = function () {
      return $http.get(urlBase).then(function(result){
        return result.data;
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

    orderFactory.addToOrder = function () {
        return $http.put(urlBase + '/', currentCart).then(function(result){
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
