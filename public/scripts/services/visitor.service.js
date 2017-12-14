'use strict';
angular.module('visitorService', [])
.factory('visitor', ['$http', function($http){
    var visitorFactory ={};

	visitorFactory.create = function(visitorData){
        return $http.post('/insertVisitor', visitorData).then(function(data){
     	    return data;
        })
    }
    visitorFactory.getById = function(id){
        return $http.get('/visitorGetById/'+ id).then(function(data){
     	    return data;
        })
    }
    visitorFactory.update = function(visitorData){
        return $http.put('/updateVisitor', visitorData).then(function(data){
     	    return data;
        })
    }
    visitorFactory.distroy = function(id){
        return $http.delete('/deleteVisitor/'+ id).then(function(data){
     	    return data;
        })
    }
    visitorFactory.getList = function(){
        return $http.get('/visitorList').then(function(data){
     	    return data;
        })
    }
	return visitorFactory;
}]);