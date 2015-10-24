app.config(function ($stateProvider) {

    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'js/users/users.html',
        resolve: {
            users: function(userFactory){
                return userFactory.getAllUsers();
            },

        },
        controller: 'UsersCtrl'
    });

});

app.controller('UsersCtrl', function ($scope, AuthService, $state, users) {
    $scope.users = users;
   
});
