(function(){
    'use strict';
    angular.module('app')
    .controller('visitorCtrl', ["$q", "$scope", "$log","visitor", "auth", function ($q, $scope, $log, visitor, auth) {
        $scope.templateUrl = ''
        $scope.subtitle = "List"
        $scope.addPanel= function(){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "New"  
            $scope.templateUrl = './views/pages/visitor/visitorAdd.html?v='+window.app_version
            $scope.visitorData = {};
            getUid()
            $scope.visitorData.status = "0";
            $scope.visitorData.create_date = new Date();
        };
  
        $scope.editPanel = function(id){
            $scope.successMsg = false;
            $scope.errorMsg = false; 
            $scope.subtitle = "Edit"  
            $scope.templateUrl = './views/pages/visitor/visitorEdit.html?v='+window.app_version
            $scope.visitorData.update_date = new Date();
            getById(id);
            
        };
        $scope.viewPanel = function(id){
            $scope.subtitle = "View"
            $scope.templateUrl = './views/pages/visitor/visitorView.html?v='+window.app_version;
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
        
        $scope.visitorData = {};
        $scope.visitorListData = [];
        $scope.profileData = {};
        $scope.getUser = getUser;
        $scope.getList = getList;
        $scope.getUid = getUid;
        $scope.createVisitor = createVisitor;
        $scope.getById = getById;
        $scope.updateVisitor = updateVisitor;
        $scope.deleteVisitor = deleteVisitor;

        function getUser(){
            if(auth.isLoggedIn()){ 
                auth.getUserDetail().then(function(response){
                    if(response.data.data){
                        $scope.profileData = response.data.data
                    } 
                })   		
            }
        }
        getUser();

        //get Visitor uid
        function getUid(){
            var now = new Date();
            var timestamp = now.getUTCMilliseconds();
            timestamp += now.getHours() + now.getMinutes() + now.getSeconds()+now.getMilliseconds().toString();
            $scope.visitorData.uid = timestamp + (Math.ceil(Math.random() * 9));
        };
        // function for create new Visitor
        function createVisitor(valid, visitorForm){
            $scope.errorMsg = false;
            $scope.successMsg = false;
            $scope.visitorData.create_by = $scope.profileData._id
            if(valid){
                visitor.create($scope.visitorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.visitorData = {};
                        visitorForm.$setPristine();
                        getList();
                        getUid()
                        $scope.visitorData.status = "0";
                        $scope.visitorData.create_date = new Date();
                    }else{
                        $scope.errorMsg = response.data.message;
                    }
                }) 
            }else{
                $scope.errorMsg= "Please ensure from is filled our properly";
            }
        }

        function getById(id){
            visitor.getById(id).then(function (response){
                if(response.data.success){
                    $scope.visitorData = response.data.data
                    $scope.visitorData.address = $scope.visitorData.address[0]
                    $scope.visitorData.status = $scope.visitorData.status.toString();
                }
            })
        }

        function updateVisitor(valid, visitorForm){
            if(valid){
                visitor.update($scope.visitorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.visitorData = {};
                        visitorForm.$setPristine();
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

        function deleteVisitor(id){
            visitor.distroy(id).then(function (response){
                if(response.data.success){
                    getList();
                }else{
                   $scope.errorMsg = response.data.message;
                }
            })
        }

        function getList(){
            visitor.getList().then(function (response){
                if(response.data.success){
                    $scope.visitorListData = response.data.data
                    if($scope.visitorListData){
                        $scope.totalVisitor = $scope.visitorListData.length
                    }else{
                        $scope.totalVisitor = 0;
                    } 
                }
            })
        }
        getList();
    }])
})();