app.factory('userFactory', ['$http', function($http) {
    var urlBase = '/api/user';
    var userFactory = {};

    // Get all users
    userFactory.getAllUsers = function () {
      return $http.get(urlBase).then(function(result){
        return result.data;
      });
    };

    // Create a new user
    userFactory.createUser = function (user) {
      return $http.post(urlBase, user);
    };

    // Get an individual user by id
    userFactory.getUser = function (id) {
      return $http.get(urlBase + '/' + id).then(function(result){
        return result;
      });
    };

    // Update an existing user by id
    userFactory.updateUser = function (id, userUpdate) {
      return $http.put(urlBase + '/'+id, userUpdate);
    };

    // Delete a user
    userFactory.deleteUser = function (id) {
      return $http.delete(urlBase + '/' + id).then(function(result){
        return result;
      });
    };

    return userFactory;
}]);
