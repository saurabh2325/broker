(function(){
    'use strict';
    angular.module('app')
    .controller('solicitorCtrl', ["$q", "$scope", "$log","solicitor", function ($q, $scope, $log, solicitor) {
        $scope.templateUrl = ''
        $scope.subtitle = "List"
        $scope.addPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "New"  
            $scope.templateUrl = './views/pages/solicitor/solicitorAdd.html?v='+window.app_version
            $scope.solicitorData = {};
            getUid()
            $scope.solicitorData.status = "1";
            $scope.solicitorData.permission ="solicitor";
            $scope.solicitorData.create_date = new Date();
        };
  
        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/solicitor/solicitorEdit.html?v='+window.app_version
            $scope.solicitorData.update_date = new Date();
            getById(id);
            
        };
        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/solicitor/solicitorView.html?v='+window.app_version;
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
        
        $scope.solicitorData = {};
        $scope.solicitorListData = {};
        $scope.getList = getList;
        $scope.getUid = getUid;
        $scope.createSolicitor = createSolicitor;
        $scope.getById = getById;
        $scope.updateSolicitor = updateSolicitor;
        $scope.deleteSolicitor = deleteSolicitor;

        //get Solicitor uid
        function getUid(){
            var now = new Date();
            var timestamp = now.getUTCMilliseconds();
            timestamp += now.getHours() + now.getMinutes() + now.getSeconds()+now.getMilliseconds().toString();
            $scope.solicitorData.uid = timestamp + (Math.ceil(Math.random() * 9));
        };

        // function for create new Solicitor
        function createSolicitor(valid, solicitorForm){
            $scope.errorMsg = false;
            $scope.successMsg = false;
            if(valid){
                solicitor.create($scope.solicitorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.solicitorData = {};
                        solicitorForm.$setPristine();
                        getList();
                        getUid()
                        $scope.solicitorData.status = "1";
                        $scope.solicitorData.permission ="solicitor";
                        $scope.solicitorData.create_date = new Date();
                    }else{
                        $scope.errorMsg = response.data.message;
                    }
                }) 
            }else{
                $scope.errorMsg= "Please ensure from is filled our properly";
            }
        }

        function getById(id){
            solicitor.getById(id).then(function (response){
                if(response.data.success){
                    $scope.solicitorData = response.data.data
                    $scope.solicitorData.address = $scope.solicitorData.address[0]
                    $scope.solicitorData.status = $scope.solicitorData.status.toString();
                }
            })
        }

        function updateSolicitor(valid, solicitorForm){
            if(valid){
                solicitor.update($scope.solicitorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.solicitorData = {};
                        solicitorForm.$setPristine();
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

        function deleteSolicitor(id){
            solicitor.distroy(id).then(function (response){
                if(response.data.success){
                    getList();
                }else{
                   $scope.errorMsg = response.data.message;
                }
            })
        }

        function getList(){
            solicitor.getList().then(function (response){
                if(response.data.success){
                    $scope.solicitorListData = response.data.data
                    if($scope.solicitorListData){
                        $scope.totalSolicitor = $scope.solicitorListData.length
                    }else{
                        $scope.totalSolicitor = 0;
                    } 
                }
            })
        }
        getList();
    }])
})();