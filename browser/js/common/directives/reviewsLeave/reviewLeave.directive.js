'use strict';

app.directive('reviewLeave', function () {
  return {
      restrict: 'E',
      scope: {
        productId: "@",
      },
      templateUrl: 'js/common/directives/reviewsLeave/reviewLeave.html',
      controller: function ($scope, $state, reviewFactory, AuthService, userFactory) {
          $scope.reviewUser = AuthService.getLoggedInUser();

          $scope.reviewUser.then(function(user){
              $scope.review = {
                user: user._id,
                product: $scope.productId
              };
          });
          $scope.getNumber = function (num) {
            return new Array(num);
          }

          $scope.review = {
            starRating : 1
          };
          //$scope.finalStarNumber = $scope.getNumber(1);
          $scope.showRating = function (num) {
            var t = parseInt(num);
            $scope.finalStarNumber = $scope.getNumber(t);
          };

          $scope.addReview = function () {
            reviewFactory.createReview($scope.review)
            .then(function(review){
              window.location.reload();
              console.log(review);
              // $state.go('products.list');
              });
             };
      }
      // link: function(scope){
      //   scope
      // };
    }
  })