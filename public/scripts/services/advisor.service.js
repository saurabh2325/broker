'use strict';
angular.module('advisorService', [])
.factory('advisor', ['$http', function($http){
    var advisorFactory ={};

	advisorFactory.upload = function(fd){
        return $http.post('/uploadAdvisorImg', fd, { transFormRequest: angular.identity, headers: {'Content-Type': undefined}} ).then(function(data){
     	    return data;
        })
    }
    advisorFactory.create = function(advisorData){
        return $http.post('/insertAdvisor', advisorData).then(function(data){
     	    return data;
        })
    }

    advisorFactory.getById = function(id){
        return $http.get('/advisorGetById/'+ id).then(function(data){
     	    return data;
        })
    }
    advisorFactory.update = function(advisorData){
        return $http.put('/updateAdvisor', advisorData).then(function(data){
     	    return data;
        })
    }
    advisorFactory.distroy = function(id){
        return $http.delete('/deleteAdvisor/'+ id).then(function(data){
     	    return data;
        })
    }
    advisorFactory.getList = function(){
        return $http.get('/advisorList').then(function(data){
     	    return data;
        })
    }
    advisorFactory.activateAccount = function(token){
		return $http.put('/activate/'+ token);
    }
	return advisorFactory;
}]);