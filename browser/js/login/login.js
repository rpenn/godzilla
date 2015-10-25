app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/login/signup.html',
        controller: 'SignupCtrl'
    });



});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});

app.controller('SignupCtrl', function ($scope, AuthService, userFactory, $state) {

    $scope.error = null;

    $scope.user = {};

    $scope.createUser = function () {

        $scope.error = null;

        userFactory.createUser($scope.user)
            .then(function (doc) {
                //return AuthService.login({email: doc.data.email, password: doc.data.password});
                console.log(doc);
            })
            .catch(function (err) {
                $scope.error = err;
            });

    };

});
