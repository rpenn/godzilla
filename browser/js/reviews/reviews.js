app.config(function ($stateProvider) {
  $stateProvider
  .state('reviews', {
    url: '/review',
    templateUrl: 'js/reviews/reviews.html',
    controller: 'ReviewsListCtrl'
    // resolve: {
    //   reviews: function(reviewFactory) {
    //     return reviewFactory.getAllReviews();
    //   }
    // },
    // data: {
    //   authenticate: true
    // }
  })
  .state('addReview', {
    url: '/addReview',
    templateUrl: 'js/reviews/add.html',
    controller: 'ReviewsAddCtrl',
    data: {
      authenticate: true
    }
  })

});

app.controller('ReviewsAddCtrl', function ($scope, $state, reviewFactory) {
  $scope.review = {
  };

  $scope.addReview = function () {
    reviewFactory.createReview($scope.review)
    .then(function(review){
      console.log(review);
      $state.go('products.list');
    });
  };
});

// app.controller('ReviewsListCtrl', function ($scope, $state, reviewFactory, reviews) {
//   $scope.reviews = reviews;
// });
app.controller('ReviewsListCtrl', function ($scope, $state, reviewFactory) {
  $scope.reviews = [
    {
      user: "reviews",
      product: "product",
      starRating: "1",
      comment: "qweoiuqioweuoiquweoiqwueio",
      timestamp: "2323"
    },
    {
      user: "reviews2",
      product: "product",
      starRating: "1",
      comment: "qweoiuqioweuoiquweoiqwueio",
      timestamp: "2323"
    }
  ]
});

// user,
// product,
// starRating,
// comment
// timestamp