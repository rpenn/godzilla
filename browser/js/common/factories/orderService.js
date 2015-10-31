app.factory('orderFactory', ['$http', function($http) {
    var urlBase = '/api/orders';
    var orderFactory = {};

    var currentCart = null;

    //Get order of which state is CREATED
    ////by user id
    orderFactory.getCreatedOrder = function (uid) {
        if(uid){
            return $http.get(urlBase+'/'+uid+'/created');
        }
        else {
            return $http.get(urlBase+'/guest/created');
        }

    };

    //pass uid, on the other end, api check uid, if no uid, then create order with session
    orderFactory.addToOrder= function (uid, orderItem) {
        return $http.post(urlBase+'/addtoorder', {uid: uid, orderItem: orderItem})
            .then(function(result){
                return result.data;
            });
    };

    orderFactory.updateOrderItem = function(uid, orderItem){
        return $http.put(urlBase+'/updateorderitem', {uid: uid, orderItem: orderItem});
    };

    // Get all orders
    orderFactory.getAllOrders = function (uid) {
      return $http.get(urlBase + '/' + uid).then(function(result){
        return result.data;
      });
    };

    orderFactory.getAll = function () {
        return $http.get(urlBase).then(function(result){
            return result.data;
        });
    };

    // Place an order
    orderFactory.placeOrder = function (order) {
      return $http.post(urlBase+'/checkout', order);
    };

    // Get an individual order by id
    orderFactory.getOrder = function (uid, oid) {
      return $http.get(urlBase + '/order_detail/'+ oid).then(function(result){
        return result.data;
      });
    };

    // Update an order by id
    orderFactory.updateOrder = function (id, orderInfo) {
      return $http.put(urlBase + '/' + id, orderInfo).then(function(result){
        return result;
      });
    };

    orderFactory.updateOrderState = function (state, orderInfo) {
        return $http.put(urlBase + '/orderstate/'+state, {state: state, order: orderInfo});
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
