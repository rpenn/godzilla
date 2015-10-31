'use strict';

app.directive('reviewsSection', function () {
  return {
      restrict: 'E',
      templateUrl: 'js/common/directives/reviews/review.html',
      link: function(scope){
        scope.getNumber = function (num) {
          return new Array(num);
        };
      }
    }
  })