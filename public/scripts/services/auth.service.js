'use strict';
angular.module('authService', [])
.factory('auth', ['$http', 'authToken', function($http, authToken){
    var authFactory = {};
    authFactory.login = function(loginData){
	    //console.log(loginData);
        return $http.post('/authentication', loginData).then(function(data){
        	//console.log(data.data.token);
        	authToken.setToken(data.data.token);
     	    return data;
        }) 
    }
    
    // AuthToken.getToken();
	authFactory.isLoggedIn = function(){
		if(authToken.getToken()){
			//console.log("user is login")
			return true;
		}else{
			return false;
		}	
    };
    
    //Auth.getUser(); this service create for get user detail from token
	authFactory.getUser = function(){
		var userToken = authToken.getToken();
		//console.log("this is testing token" + usertoken);
		if(userToken){
			return $http.post('/me')
		}else{
			$q.reject({message:'User has no token'});
		}
	}
	
	authFactory.getUserDetail = function(userDetail){
		return $http.get('/permission', userDetail);
	}
    
    //Auth.logout(); , this service create for distroy token and logout
	authFactory.logout = function(){
        authToken.setToken();
     };

    return authFactory;
}])
// factory for set token from window local storage. 
.factory('authToken', ['$window', function($window){
    var authTokenFactory = {};
    //AuthToken.setToken(token)
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token', token);
		}else{
			$window.localStorage.removeItem('token');
		}	
    };
    
    //AuthToken.getToken();
    authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};
    return authTokenFactory;
}])
.factory('authInterceptors', function(authToken){
	var authInterceptorFactory = {};

    authInterceptorFactory.request = function(config){
    	var token = authToken.getToken();

    	if(token){
    	config.headers['x-access-token'] = token;
    	//console.log('get token from x-access' + token);
    	//console.log(config);
        }
    	
    	return config;
    };
    return authInterceptorFactory;
});