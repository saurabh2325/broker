'use strict';
angular.module('solicitorService', [])
.factory('solicitor', ['$http', function($http){
    var solicitorFactory ={};

	solicitorFactory.create = function(solicitorData){
        return $http.post('/insertSolicitor', solicitorData).then(function(data){
     	    return data;
        })
    }
    solicitorFactory.getById = function(id){
        return $http.get('/solicitorGetById/'+ id).then(function(data){
     	    return data;
        })
    }
    solicitorFactory.update = function(solicitorData){
        return $http.put('/updateSolicitor', solicitorData).then(function(data){
     	    return data;
        })
    }
    solicitorFactory.distroy = function(id){
        return $http.delete('/deleteSolicitor/'+ id).then(function(data){
     	    return data;
        })
    }
    solicitorFactory.getList = function(){
        return $http.get('/solicitorList').then(function(data){
     	    return data;
        })
    }
    solicitorFactory.activateAccount = function(token){
		return $http.put('/solicitor/activate/'+ token);
    }
	return solicitorFactory;
}]);