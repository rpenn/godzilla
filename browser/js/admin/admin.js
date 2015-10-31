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

app.controller('AdminCtrl', function ($scope, AuthService, $state, orderFactory, orders, users) {
    $scope.orders = orders;
    $scope.users = users;

    $scope.changeStatus = function(status, order){
        orderFactory.updateOrderState(status, order).then(function(res){
            console.log(res);
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

