app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, userFactory) {

    $scope.user = {
        address: []
    };

    $scope.address = {};

    $scope.createUser = function(){
        $scope.user.address.push($scope.address);
        userFactory.createUser($scope.user);
    }
});
