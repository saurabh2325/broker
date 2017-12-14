(function(){
    'use strict';
    angular.module('app')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
            }
        }
    }])
    .controller('advisorProfileCtrl', ["$q", "$scope", "$http", "$log","advisor","auth", function ($q, $scope, $http, $log, advisor, auth) {
        $scope.profile = {};
        $scope.subtitle = "Edit";
        $scope.getById = getById;
        $scope.updateProfile = updateProfile;
       
        // Funtion for getting user id from token
        if(auth.isLoggedIn()){ 
            auth.getUserDetail().then(function(response){
                if(response.data.data){
                    $scope.profile = response.data.data
                    getById();
                } 
            })   		
        }
        
        // Funtion for getting user profile Data 
        function getById(){
            var id = $scope.profile._id
            advisor.getById(id).then(function (response){
                if(response.data.success){
                    $scope.advisorData = response.data.data
                    $scope.advisorData.address = response.data.data.address[0]
                    //$scope.advisorData.use_logo =  $scope.advisorData.use_logo.toString();
                    console.log($scope.advisorData)
                }
            })
        }

        $scope.uploadLogo = function(){
            var file = $scope.myFile;
            console.log($scope.myFile);
            if(file){
                var fd = new FormData();
                fd.append('file', file);
                advisor.upload(fd).then(function (response){
                    if(response.status == 200){
                        $scope.successMsg = "Image upload successfully."
                        $scope.advisorData.image = response.data.filename;
                    }else{
                        $scope.errorMsg = "Image uploading failed, Please try again"
                    }
                    console.log(response)
                }) 
            }else{
              $scope.errorMsg = "Please select image first"  
            }
        };

        // Funtion for update user profile  
        function updateProfile(valid, advisorForm){
            $scope.successMsg = false;
            $scope.errorMsg = false;
            if(valid){
                advisor.update($scope.advisorData).then(function (response){
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        getById();
                    }else{
                        $scope.errorMsg = response.data.message;
                    }
                })
            }else{
                $scope.errorMsg= "Please ensure from is filled our properly";
            }
        }

    }])
})();