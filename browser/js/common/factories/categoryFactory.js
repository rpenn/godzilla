app.factory('categoryFactory',  function($http) {
    var url = '/api/category';
    var cat={};

    cat.findSubCategory = function(cat){
        return $http.get(url+'/'+cat);
    };

    return cat;

});
