'use strict';
angular.module('agentService', [])
.factory('agent', ['$http', function($http){
    var agentFactory ={};

	agentFactory.create = function(agentData){
        return $http.post('/insertAgent', agentData).then(function(data){
     	    return data;
        })
    }
    agentFactory.getById = function(id){
        return $http.get('/agentGetById/'+ id).then(function(data){
     	    return data;
        })
    }

    agentFactory.update = function(agentData){
        return $http.put('/updateAgent', agentData).then(function(data){
     	    return data;
        })
    }
    agentFactory.distroy = function(id){
        return $http.delete('/deleteAgent/'+ id).then(function(data){
     	    return data;
        })
    }
    agentFactory.getList = function(){
        return $http.get('/agentList').then(function(data){
     	    return data;
        })
    }
    agentFactory.activateAccount = function(token){
		return $http.put('/agent/activate/'+ token);
    }
	return agentFactory;
}]);