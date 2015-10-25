app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'products.list'},
                //{ label: 'Home', state: 'home' },
                //{ label: 'About', state: 'about' },
                //{ label: 'Documentation', state: 'docs' },
                //{ label: 'Checkout', state: 'checkout'},
                //{ label: 'Orders', state: 'orders', auth: true},
                //{ label: 'Product', state: 'product', auth: true},
                //{ label: 'Users', state: 'users', auth: true},
                //{ label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.loginUserDropdown = [
                {label:'Check Out', state:'checkout'},
                {label:'Orders', state:'orders'}
            ];

            scope.status = {
                isopen: true
            };

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {

                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };


            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
