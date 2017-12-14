'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of app
 */
 
angular.module('app')
.controller('mainCtrl',['$scope', '$http', '$state', '$transitions', '$rootScope', '$location', '$log', '$timeout', '$window', '$interval', '$uibModal', 'auth', 'authToken', function($scope, $http, $state, $transitions, $rootScope, $location, $log, $timeout, $window, $interval, $uibModal, auth, authToken) {
    $scope.loginData = {}
    $scope.getPermission =  getPermission;
    $scope.submit = submit;
    $scope.checkSession = checkSession;
    $scope.logout = logout;
    
    //function for show option accroding to user type
    function getPermission(){
        if($location.$$path ==="/admin/login"){
            $scope.register = false;
            $scope.loginData.permission = 'admin'
        }else if($location.$$path ==="/agent/login"){
            $scope.register = false;
            $scope.loginData.permission = 'agent'
        }else if($location.$$path ==="/solicitor/login"){
            $scope.register = false;
            $scope.loginData.permission = 'solicitor'
        }else if($location.$$path ==="/login"){
            $scope.register = true;
            $scope.loginData.permission = 'advisor'
        }
    }
    getPermission();
    //function for redirect to password forgate page accroding to user type
    $scope.forgatePage = function(){
        if($location.$$path ==="/admin/login"){
          $location.path('/admin/forgot-password');
        }else if($location.$$path == "/agent/login"){
          $location.path('/agent/forgot-password');
        }else if($location.$$path == "/solicitor/login"){
          $location.path('/solicitor/forgot-password');
        }else{
          $location.path('/forgot-password');
        }
    }

    function checkSession(){
        if(auth.isLoggedIn()){
            $scope.checkingSession = true;
            var token = $window.localStorage.getItem('token');
            self.parseJwt = function(token){
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            }
            var expireTime = self.parseJwt(token);
            var timeStamp = Math.floor(Date.now() / 1000)
            var timeCheck =(expireTime.exp - timeStamp);
            if(timeCheck <= 0){
                $scope.logout();
            }else{
                var interval = $interval(function(){
                    var token = $window.localStorage.getItem('token');
                    if(token === null){
                      $interval.cancel(interval);
                    }else{
                      self.parseJwt = function(token){
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        return JSON.parse($window.atob(base64));
                      }
                      var expireTime = self.parseJwt(token);
                      var timeStamp = Math.floor(Date.now() / 1000)
                      var timeCheck =(expireTime.exp - timeStamp);
                      if(timeCheck < 0){
                        showModal('sm');
                        $interval.cancel(interval);
                      }
                    }
                },5000);
            }
        }else{
            console.log("Session stop")
        }
    }
    checkSession();

    // Show model
    $scope.items = ['item1', 'item2', 'item3'];
    var showModal = function(size) {
    	var modalInstance = $uibModal.open({
    		template:  '<div class="modal-content">'+
                            '<div class="modal-header">'+
                                '<button ng-hide="hideButton" type="button" ng-click="endSession();" class="close" data-dismiss="modal">&times;</button>'+
                                      '<!-- Modal Header -->'+
                                  '<h4 class="modal-title">{{modalHeader}}</h4>'+
                            '</div>'+
                            '<!-- Modal Body -->'+
                            '<div class="modal-body">'+
                                '<p>{{modalBody}}</p>'+
                                '<div ng-show="hideButton" class="dizzy-gillespie"></div>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                                '<!-- Modal Yes & No Buttons -->'+
                                '<button type="button" ng-hide="hideButton" ng-click="endSession();" class="btn btn-danger" data-dismiss="modal">OK</button>'+
                            '</div>'+
                        '</div>',
            controller: function($scope, $uibModalInstance, auth){
                $scope.choiceMade = false;
                $scope.modalHeader = "Timeout Warning";
                $scope.modalBody ="Your session will please Login again";
                $timeout(function(){
                    if(!$scope.choiceMade){
                        logout();
                        hideModal();
                    }
                }, 4000);

                $scope.renewSession = function(){
                $scope.choiceMade = true;
                    hideModal();
                };
                $scope.endSession = function(){
                    $scope.choiceMade = true;
                    logout();
                    hideModal();
                };
                var hideModal = function(){
                    $uibModalInstance.close();
                }
                var logout = function(){
                    auth.logout();
                    $timeout(function(){
                        $location.path('/admin/login');
                    }, 1000);
                };
            },            
            size: size,
            resolve:{
                items: function () {
                return $scope.items;
                }
            }
    	})
    }
    
    //function for check user login or logout on state change
    $scope.profileData = {};
    $transitions.onStart({}, function($transition) {
        if(!$scope.checkingSession) $scope.checkSession();
        if(auth.isLoggedIn()){ 
            auth.getUserDetail().then(function(response){
                if(response.data.data){
                    $scope.profileData = response.data.data
                } 
            })   		
        }
    });
    

    //function for user login
    function submit() {
        $scope.errorMsg = false;
        $scope.successMsg = false;
        $scope.expired = false;
        auth.login($scope.loginData).then(function(response){
            if(response.data.success){
                var permission = response.data.data.permission;
                if(permission === "admin"){
                    $timeout(function(){
                        $state.go('/admin/home');
                        $scope.loginData = '';
                    }, 1000);
                }else if(permission === "agent") {
                    $timeout(function(){
                        $location.path('/agent/home');
                        $scope.loginData = '';
                    }, 1000);
                }else if(permission === "solictor") {
                    $timeout(function(){
                        $state.go('/solicitor/home');
                        $scope.loginData = '';
                    }, 1000);
                }else{
                    $timeout(function(){
                        $location.path('/home');
                        $scope.loginData = '';
                    }, 1000);
                }
    		}else{
    			if(response.data.expired){
                    $scope.expired = true;
                    $scope.errorMsg = response.data.message;
                }else{
                    $scope.errorMsg = response.data.message;
                    $scope.loginData = {};
                    getPermission();
                }
    		}	
        })
    }
    
    //function for user log out
    function logout(){
        /* auth.logout(); */
        if($scope.profileData.permission === "admin" && !$scope.profileData.permission === undefined){
            auth.logout();
            $timeout(function(){
                $location.path('/admin/login');
            }, 1000);
        }else if($scope.profileData.permission === "agent" && !$scope.profileData.permission === undefined){
            auth.logout();
            $timeout(function(){
                $location.path('/agent/login');
            }, 1000);
        }else if($scope.profileData.permission === "solicitor" && !$scope.profileData.permission === undefined){
            auth.logout();
            $timeout(function(){
                $location.path('/solicitor/login');
            }, 1000);
        }else if($scope.profileData.permission === "advisor" && !$scope.profileData.permission === undefined){
            auth.logout();
            $timeout(function(){
                $location.path('/login');
            }, 1000);
        }else{
            auth.logout();
            $timeout(function(){
                $location.path('/login');
            }, 1000);
        }
        
    }; 
}])