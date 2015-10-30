app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'CLOTHING', category: 'clothing', state: 'products.category({cat1: "clothing"})'},
                { label: 'SHOES', category: 'shoes', state: 'products.category({cat1: "shoes"})'},
                { label: 'ACCESSORIES', category: 'accessories', state: 'products.category({cat1: "accessories"})'},
                { label: 'GROOMING', category: 'grooming', state: 'products.category({cat1: "grooming"})'},
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
                {label:'Cart', state:'checkout'},
                {label:'Order History', state:'orders', auth: true},
                {label:'Admin', state:'admin', auth: true, admin: true},
                {label:'Create Product', state:'products.add', auth: true, admin: true}
            ];

            scope.status = {
                isopen: true
            };

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function () {
                return AuthService.isAuthenticatedAndAdmin();
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
