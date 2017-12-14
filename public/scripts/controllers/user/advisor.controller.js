(function(){
    'use strict';
    angular.module('app')
    .controller('advisorCtrl', ["$q", "$scope", "$log","advisor", function ($q, $scope, $log, advisor) {
        $scope.templateUrl = ''
        $scope.subtitle = "List"
        $scope.addPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "New"  
            $scope.templateUrl = './views/pages/advisor/advisorAdd.html?v='+window.app_version
            $scope.advisorData = {};
            getUid()
            $scope.advisorData.status = "1";
            $scope.advisorData.permission ="advisor";
            $scope.advisorData.create_date = new Date();
        };
  
        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/advisor/advisorEdit.html?v='+window.app_version
            $scope.advisorData.update_date = new Date();
            getById(id);
            
        };
        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/advisor/advisorView.html?v='+window.app_version;
            //getBrandViewById(id)
        };
        $scope.closePanel = function(){
            $scope.templateUrl = ''
        };
  
        $scope.totalItems = 64;
        $scope.currentPage = 4;
      
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
      
        $scope.pageChanged = function() {
          $log.log('Page changed to: ' + $scope.currentPage);
        };
      
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1; 
        
        $scope.advisorData = {};
        $scope.advisorListData = {};
        $scope.getList = getList;
        $scope.getUid = getUid;
        $scope.createAdvisor = createAdvisor;
        $scope.getById = getById;
        $scope.updateAdvisor = updateAdvisor;
        $scope.deleteAdvisor = deleteAdvisor;

        //get Advisor uid
        function getUid(){
            var now = new Date();
            var timestamp = now.getUTCMilliseconds();
            timestamp += now.getHours() + now.getMinutes() + now.getSeconds()+now.getMilliseconds().toString();
            $scope.advisorData.uid = timestamp + (Math.ceil(Math.random() * 9));
        };

        // function for create new Advisor
        function createAdvisor(valid, advisorForm){
            $scope.errorMsg = false;
            $scope.successMsg = false;
            if(valid){
                advisor.create($scope.advisorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.advisorData = {};
                        advisorForm.$setPristine();
                        $scope.firstPassword = " ";
                        $scope.confirm = " ";
                        getList();
                        getUid()
                        $scope.advisorData.status = "1";
                        $scope.advisorData.permission ="advisor";
                        $scope.advisorData.create_date = new Date();
                    }else{
                        $scope.errorMsg = response.data.message;
                    }
                }) 
            }else{
                $scope.errorMsg= "Please ensure from is filled our properly";
            }
        }

        function getById(id){
            advisor.getById(id).then(function (response){
                if(response.data.success){
                    $scope.advisorData = response.data.data
                    $scope.advisorData.address = $scope.advisorData.address[0]
                    $scope.advisorData.status = $scope.advisorData.status.toString();
                }
            })
        }

        function updateAdvisor(valid, advisorForm){
            if(valid){
                advisor.update($scope.advisorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.advisorData = {};
                        advisorForm.$setPristine();
                        $scope.closePanel();
                        getList();
                    }else{
                        $scope.errorMsg = response.data.message;
                    }
                })
            }else{
                $scope.errorMsg= "Please ensure from is filled our properly";
            }
        }

        function deleteAdvisor(id){
            advisor.distroy(id).then(function (response){
                if(response.data.success){
                    getList();
                }else{
                   $scope.errorMsg = response.data.message;
                }
            })
        }

        function getList(){
            advisor.getList().then(function (response){
                if(response.data.success){
                    $scope.advisorListData = response.data.data
                    if($scope.advisorListData){
                        $scope.totalAdvisor = $scope.advisorListData.length
                    }else{
                        $scope.totalAdvisor = 0;
                    } 
                    
                }
            })
        }
        getList();
    }])
})();