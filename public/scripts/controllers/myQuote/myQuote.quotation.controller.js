(function(){
    'use strict';
    angular.module('app')
    .controller('myQuotePurchaseCtrl', ["$q", "$scope", "$log", function ($q, $scope, $log) {
        $scope.templateUrl = './views/pages/myQuote/purchase/purchaseSearch.html?v='+window.app_version;
        $scope.subtitle = "List"

        /* $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseEdit.html?v='+window.app_version
        }; */
  
        /* $scope.nextEditPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false;  
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseEdit1.html?v='+window.app_version
        }; */

        $scope.previousEditPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseEdit.html?v='+window.app_version
        };

        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseView.html?v='+window.app_version;
        };

        $scope.nextViewPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false;  
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseView1.html?v='+window.app_version
        };

        $scope.previousViewPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseView.html?v='+window.app_version
        };

        $scope.closePanel = function(){
            $scope.templateUrl = './views/pages/myQuote/purchase/purchaseSearch.html?v='+window.app_version;
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

        $scope.conveyancerData = [
            {
                conveyancer_id : 1,
                conveyancer_name : 'Conveyancer 1 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $430.00)'
            },
            {
                conveyancer_id : 2,
                conveyancer_name : 'Conveyancer 2 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $435.00)'
            },
            {
                conveyancer_id : 3,
                conveyancer_name : 'Conveyancer 3 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $450.00)'
            },
            {
                conveyancer_id : 4,
                conveyancer_name : 'Conveyancer 4 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $520.00)'
            },
            {
                conveyancer_id : 5,
                conveyancer_name : 'Conveyancer 5 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $680.00)'
            },
            {
                conveyancer_id : 6,
                conveyancer_name : 'Conveyancer 6 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $730.00)'
            },
            {
                conveyancer_id : 7,
                conveyancer_name : 'Conveyancer 7 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $550.00)'
            },

        ]
    }])
    .controller('myQuoteSaleCtrl', ["$q", "$scope", "$log", function ($q, $scope, $log) {
        $scope.templateUrl = './views/pages/myQuote/sale/saleSearch.html?v='+window.app_version;
        $scope.subtitle = "List"
  
        $scope.nextViewPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false;  
            $scope.templateUrl = './views/pages/myQuote/sale/saleView1.html?v='+window.app_version
        };

        $scope.previousViewPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.templateUrl = './views/pages/myQuote/sale/saleView.html?v='+window.app_version
        };

        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/myQuote/sale/saleView.html?v='+window.app_version;
        };

        $scope.closePanel = function(){
            $scope.templateUrl = './views/pages/myQuote/sale/saleSearch.html?v='+window.app_version;
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

        $scope.conveyancerData = [
            {
                conveyancer_id : 1,
                conveyancer_name : 'Conveyancer 1 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $430.00)'
            },
            {
                conveyancer_id : 2,
                conveyancer_name : 'Conveyancer 2 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $435.00)'
            },
            {
                conveyancer_id : 3,
                conveyancer_name : 'Conveyancer 3 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $450.00)'
            },
            {
                conveyancer_id : 4,
                conveyancer_name : 'Conveyancer 4 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $520.00)'
            },
            {
                conveyancer_id : 5,
                conveyancer_name : 'Conveyancer 5 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $680.00)'
            },
            {
                conveyancer_id : 6,
                conveyancer_name : 'Conveyancer 6 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $730.00)'
            },
            {
                conveyancer_id : 7,
                conveyancer_name : 'Conveyancer 7 (Birmingham)',
                conveyancer_fee : '$1,273.00 (Including a Legal Fee of $550.00)'
            },

        ]
    }])
    .controller('myQuoteSalePurchaseCtrl', ["$q", "$scope", "$log", function ($q, $scope, $log) {
        $scope.templateUrl = './views/pages/myQuote/sale-purchase/salePurchaseSearch.html?v='+window.app_version;
        $scope.subtitle = "List"

        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/myQuote/sale-purchase/salePurchaseEdit.html?v='+window.app_version
        };
  
        $scope.nextPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false;  
            $scope.templateUrl = './views/pages/myQuote/sale-purchase/salePurchaseEdit1.html?v='+window.app_version
        };

        $scope.previousPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.templateUrl = './views/pages/myQuote/sale-purchase/salePurchaseEdit.html?v='+window.app_version
        };

        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/myQuote/sale-purchase/salePurchaseView.html?v='+window.app_version;
        };

        $scope.closePanel = function(){
            $scope.templateUrl = './views/pages/myQuote/sale-purchase/salePurchaseSearch.html?v='+window.app_version;
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
    .controller('myQuoteRemortgageCtrl', ["$q", "$scope", "$log", function ($q, $scope, $log) {
        $scope.templateUrl = './views/pages/myQuote/re-mortgage/remortgageSearch.html?v='+window.app_version;
        $scope.subtitle = "List"

        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/myQuote/re-mortgage/remortgageEdit.html?v='+window.app_version
        };
  
        $scope.nextPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false;  
            $scope.templateUrl = './views/pages/myQuote/re-mortgage/remortgageEdit1.html?v='+window.app_version
        };

        $scope.previousPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.templateUrl = './views/pages/myQuote/re-mortgage/remortgageEdit.html?v='+window.app_version
        };

        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/myQuote/re-mortgage/remortgageView.html?v='+window.app_version;
        };

        $scope.closePanel = function(){
            $scope.templateUrl = './views/pages/myQuote/re-mortgage/remortgageSearch.html?v='+window.app_version;
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
    .controller('myQuoteCashbackCtrl', ["$q", "$scope", "$log", function ($q, $scope, $log) {
        $scope.templateUrl = './views/pages/myQuote/cashback/cashbackSearch.html?v='+window.app_version;
        $scope.subtitle = "List"

        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/myQuote/cashback/cashbackEdit.html?v='+window.app_version
        };
  
        $scope.nextPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false;  
            $scope.templateUrl = './views/pages/myQuote/cashback/cashbackEdit1.html?v='+window.app_version
        };

        $scope.previousPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.templateUrl = './views/pages/myQuote/cashback/cashbackEdit.html?v='+window.app_version
        };

        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/myQuote/cashback/cashbackView.html?v='+window.app_version;
        };

        $scope.closePanel = function(){
            $scope.templateUrl = './views/pages/myQuote/cashback/cashbackSearch.html?v='+window.app_version;
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