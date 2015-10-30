'use strict';

app.directive('oauthButton', function () {
  return {
    scope: {
      providerName: '@'
    },
    restrict: 'E',
    templateUrl: 'js/common/directives/oauth-button/oauth-button.html',
      controller: function($scope){
          console.log($scope.providerName);
          $scope.imgLink = {
              'Google': 'https://developers.google.com/+/images/branding/sign-in-buttons/Red-signin_Google_base_44dp.png',
              'Facebook': 'http://i.stack.imgur.com/pZzc4.png'
          };

      }
  }
});
