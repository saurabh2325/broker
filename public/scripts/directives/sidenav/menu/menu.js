'use strict';

angular.module('app')
	.directive('menu',function(){
		return {
	        templateUrl:'scripts/directives/sidenav/menu/menu.html?v='+window.app_version,
	        restrict: 'E',
	        replace: true,
        	controller: function($scope, $location, auth){

	        	$scope.selectedMenu = 'dashboard';
				$scope.showingSubNav = 0;

				//function for show option accroding to user type

				if(auth.isLoggedIn()){ 
					auth.getUserDetail().then(function(response){
						if(response.data.data){
							$scope.profile = response.data.data.permission
							if($scope.profile ==="admin"){
								$scope.admin = true;
								$scope.agent = false;
								$scope.solicitor = false;
								$scope.advisior = false;
							}else if($scope.profile ==="agent"){
								$scope.admin = false;
								$scope.agent = true;
								$scope.solicitor = false;
								$scope.advisior = false;
							}else if($scope.profile ==="solicitor"){
								$scope.admin = false;
								$scope.agent = false;
								$scope.solicitor = true;
								$scope.advisior = false;
							}else if($scope.profile ==="advisor"){
								$scope.admin = false;
								$scope.agent = false;
								$scope.solicitor = false;
								$scope.advisior = true;
							}
						} 
					})   		
				}
				

				$scope.showSubNav = function(x){
					if(x==$scope.showingSubNav)
						$scope.showingSubNav = 0;
					else
						$scope.showingSubNav = x;
				};				
	        },
    	}
	});