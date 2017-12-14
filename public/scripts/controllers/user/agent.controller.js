(function(){
    'use strict';
    angular.module('app')
    .controller('agentCtrl', ["$q", "$scope", "$log","agent", function ($q, $scope, $log, agent) {
        $scope.templateUrl = ''
        $scope.subtitle = "List"
        $scope.addPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "New"  
            $scope.templateUrl = './views/pages/agent/agentAdd.html?v='+window.app_version
            $scope.agentData = {};
            getUid()
            $scope.agentData.status = "1";
            $scope.agentData.permission ="agent";
            $scope.agentData.create_date = new Date();
        };
  
        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/agent/agentEdit.html?v='+window.app_version
            $scope.agentData.update_date = new Date();
            getById(id);
            
        };
        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/agent/agentView.html?v='+window.app_version;
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
        
        $scope.agentData = {};
        $scope.agentListData = {};
        $scope.getList = getList;
        $scope.getUid = getUid;
        $scope.createAgent = createAgent;
        $scope.getById = getById;
        $scope.updateAgent = updateAgent;
        $scope.deleteAgent = deleteAgent;

        //get Agent uid
        function getUid(){
            var now = new Date();
            var timestamp = now.getUTCMilliseconds();
            timestamp += now.getHours() + now.getMinutes() + now.getSeconds()+now.getMilliseconds().toString();
            $scope.agentData.uid = timestamp + (Math.ceil(Math.random() * 9));
        };

        // function for create new Agent
        function createAgent(valid, agentForm){
            $scope.errorMsg = false;
            $scope.successMsg = false;
            if(valid){
                agent.create($scope.agentData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.agentData = {};
                        agentForm.$setPristine();
                        getList();
                        getUid()
                        $scope.agentData.status = "1";
                        $scope.agentData.permission ="agent";
                        $scope.agentData.create_date = new Date();
                    }else{
                        $scope.errorMsg = response.data.message;
                    }
                }) 
            }else{
                $scope.errorMsg= "Please ensure from is filled our properly";
            }
        }

        function getById(id){
            agent.getById(id).then(function (response){
                if(response.data.success){
                    $scope.agentData = response.data.data
                    $scope.agentData.address = $scope.agentData.address[0]
                    $scope.agentData.status = $scope.agentData.status.toString();
                }
            })
        }

        function updateAgent(valid, agentForm){
            if(valid){
                agent.update($scope.agentData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.agentData = {};
                        
                        agentForm.$setPristine();
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

        function deleteAgent(id){
            agent.distroy(id).then(function (response){
                if(response.data.success){
                    getList();
                }else{
                   $scope.errorMsg = response.data.message;
                }
            })
        }

        function getList(){
            agent.getList().then(function (response){
                if(response.data.success){
                    $scope.agentListData = response.data.data
                    if(response.data.data){
                        $scope.totalAgent = $scope.agentListData.length
                    }else{
                        $scope.totalAgent = 0;
                    } 
                }
            })
        }
        getList();
    }])
})();