(function(){
    'use strict';
    angular.module('app')
    .controller('matterCtrl', ["$q", "$scope", "$log", function ($q, $scope, $log) {
        $scope.templateUrl = './views/pages/matter/matterSearch.html?v='+window.app_version;
        $scope.subtitle = "List"

        $scope.addPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "New"  
            $scope.templateUrl = './views/pages/matter/matterAdd.html?v='+window.app_version
        };
  
        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/matter/matterEdit.html?v='+window.app_version
        };

        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/matter/matterView.html?v='+window.app_version;
        };

        $scope.closePanel = function(){
            $scope.templateUrl = './views/pages/matter/matterSearch.html?v='+window.app_version;
        };

        $scope.pageSize = [{id: 1 , size: 10}, {id: 2 , size: 25}, {id: 3, size: 50}, {id: 4 , size: 100}, {id: 5 , size: 125}, {id: 6 , size: 150}] 
        
        // Function for pagination 
        
        //Function for number of pager buttons to show
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
  
        //Function for item length in per page  
        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }
    }])
})();