app.directive("loginSignup", function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/login-signup/login-signup.html',
        scope: {
            user: "=",
            submitType: "@"
        },
        controller: function($scope, AuthService, $state, userFactory ){
            $scope.error = null;

            var createUser = function (signupInfo) {

                $scope.error = null;

                userFactory.createUser(signupInfo)
                    .then(function (doc) {
                        return AuthService.login(signupInfo);
                    })
                    .then(function (data) {
                        $state.go('home');
                    })
                    .catch(function (err) {
                        $scope.error = err;
                    });

            };

           var sendLogin = function (loginInfo) {

                $scope.error = null;

                AuthService.login(loginInfo).then(function (data) {
                    $state.go('home');
                }).catch(function () {
                    $scope.error = 'Invalid login credentials.';
                });

            };


            if($scope.submitType === 'login'){
                $scope.submit = 'Log In';
                $scope.sendAuth = sendLogin;
            }
            else if ($scope.submitType === 'signup') {
                $scope.submit = 'Sign Up';
                $scope.sendAuth = createUser;
            }


        }
    };
});
