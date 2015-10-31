app.factory('reviewFactory', ['$http', function($http) {
    var urlBase = '/api/reviews/';
    var reviewFactory = {};

    //Get all reviews
    reviewFactory.getAllReviews = function () {
      return $http.get(urlBase).then(function(result){
        return result.data;
      });
    };

    //createReview
    reviewFactory.createReview = function (review) {
      return $http.post(urlBase+'/create', review);
    };

    //Get a review by product ID
    reviewFactory.getReviewByProduct = function (productId) {
      return $http.get(urlBase + 'product/' + productId).then(function(result){
        return result.data;
      });
    };

    reviewFactory.getReviewByUser = function (userId) {
      return $http.get(urlBase + '/' + userId).then(
        function(result) {
          return result.data;
        });
    };

    return reviewFactory;

  }]);
