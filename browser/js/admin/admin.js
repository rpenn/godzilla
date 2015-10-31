app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        data: {
            authenticate: true,
            admin: true
        },
        resolve: {
            orders: function(orderFactory){
                return orderFactory.getAll();
            },
            users: function(userFactory){
                return userFactory.getAllUsers();
            }
        }
    });
});

app.controller('AdminCtrl', function ($scope, AuthService, $state, orderFactory, orders, users, userFactory) {
    $scope.orders = orders;
    $scope.users = users;
    $scope.changeStatus = function(status, order){
        orderFactory.updateOrderState(status, order).then(function(res){
            return orderFactory.getAll();
        }).then(function(data){
            $scope.orders = data;
        });
    };

    $scope.removeUser = function(uid){
        userFactory.deleteUser(uid).then(function(){
            return userFactory.getAllUsers();
        }).then(function(data){
            $scope.users = data;
        });
    };

//Orders
    //Show all orders
    //Show orders by status - filter

// Users
    //Show all users
    //Show user
    //




});

