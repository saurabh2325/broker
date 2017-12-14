'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of app
 */
angular
    .module('app')
    .controller('DashboardCtrl', function($scope, $state, $rootScope, $timeout, $log    ) {
        $scope.$state = $state;

        $scope.date = new Date();
        $scope.eventSources = [];

    	$rootScope.$on('$stateChangeSuccess', function() { 
            $timeout(function() {
                $('#body-container').scrollTop(0);
            }, 200);
        });
        if ($(window).width()<768) {
            $rootScope.$on('$stateChangeSuccess', function(){ 
                $( '#app-container' ).removeClass('push-right');
            });
        }
    });