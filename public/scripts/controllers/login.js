'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of app
 */
angular.module('app')
  .controller('LoginCtrl',function($scope, $location, $state) {

    //function for show option accroding to user type
    if($location.$$path ==="/admin/login" || $location.$$path ==="/agent/login" || $location.$$path ==="/solicitor/login"){
      $scope.test = false;
    }else if($location.$$path ==="/login"){
      console.log("this is advisior panal")
      $scope.test = true;
    }

    //function for redirect to password forgate page accroding to user type
    $scope.forgatePage = function(){
      console.log("location path"+ $location.$$path)
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

    //function for redirect to login page accroding to user type
    $scope.loginPage = function(){
      if($location.$$path ==="/admin/forgot-password"){
        $location.path('/admin/login');
      }else if($location.$$path ==="/agent/forgot-password"){
        $location.path('/agent/login');
      } else if($location.$$path ==="/solicitor/forgot-password"){
        $location.path('/solicitor/login');
      }else{
        $location.path('/login');
      }
    }

    $scope.submit = function() {
      if($location.$$path ==="/admin/login"){
        $location.path('/admin/home');
      }else if($location.$$path == "/agent/login"){
        $location.path('/agent/home');
      }else if($location.$$path == "/solicitor/login"){
        $location.path('/solicitor/home');
      }else{
        $location.path('/home');
      }
      return false;
    }
  });
