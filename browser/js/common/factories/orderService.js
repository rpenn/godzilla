app.factory('orderFactory', ['$http', function($http) {
    var urlBase = '/api/orders';
    var orderFactory = {};

    var currentCart = null;

    //Get order of which state is CREATED
    //by user id
    orderFactory.getCreatedOrder = function (uid) {
        if(currentCart === null){
            return $http.get(urlBase+'/created/'+uid).then(function(result){
                currentCart = result.data;
                return currentCart;
            });
        }
        else {
            return currentCart;
        }
    };

    //pass uid, on the other end, api check uid, if no uid, then create order with session
    orderFactory.addToOrder= function (uid, orderItem) {
        return $http.post(urlBase+'/addtoorder', {uid: uid, orderItem: orderItem})
            .then(function(result){
                return result.data;
            });
    };

    // Get all orders
    orderFactory.getAllOrders = function (uid) {
      return $http.get(urlBase + '/' + uid).then(function(result){
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

    //orderFactory.addToOrder = function () {
    //    return $http.put(urlBase + '/user_order', currentCart).then(function(result){
    //        return result;
    //    });
    //};

    // Delete an order by id
    orderFactory.deleteOrder = function (id) {
      return $http.delete(urlBase + '/' + id).then(function(result){
        return result;
      });
    };

    return orderFactory;
}]);
