'use strict';

angular.module('app')
.controller('advisorActiveCtrl', function($scope, $stateParams, advisor, $location, $timeout){
     advisor.activateAccount($stateParams.token).then(function(response){

     	$scope.successMsg = false;
     	$scope.errorMsg = false;

     	if(response.data.success){
     		$scope.successMsg = "Your" + response.data.message + "...redirecting";
     		$timeout(function(){
     			$location.path('/login');
     		}, 2000);
     	}else{
            $scope.errorMsg = response.data.message;
     	}
     });
})
.controller('agentActiveCtrl', function($scope, $stateParams, agent, $location, $timeout){
 
  agent.activateAccount($stateParams.token).then(function(response){
    
    $scope.successMsg = false;
    $scope.errorMsg = false;
    if(response.data.success){
      $scope.successMsg = "Your" + response.data.message + "...redirecting";
      $timeout(function(){
        $location.path('/agent/login');
      }, 2000);
    }else{
         $scope.errorMsg = response.data.message;
    }
  });
})
.controller('solicitorActiveCtrl', function($scope, $stateParams, solicitor, $location, $timeout){
  solicitor.activateAccount($stateParams.token).then(function(response){
    $scope.successMsg = false;
    $scope.errorMsg = false;

    if(response.data.success){
      $scope.successMsg = "Your" + response.data.message + "...redirecting";
      $timeout(function(){
        $location.path('/solicitor/login');
      }, 2000);
    }else{
         $scope.errorMsg = response.data.message;
    }
  });
})
/* .controller('resendCtrl', function($scope, User){
        $scope.errorMsg = false;
        $scope.successMsg  = false;
    $scope.checkcredentials = function(resendData){
    	//console.log($scope.resendData);
      User.checkCredentials($scope.resendData).then(function(response){
      	if(response.data.success){
               User.resendActivationLink($scope.resendData).then(function(data){
               	if(response.data.success){
               		$scope.successMsg = data.data.message;
               	}
               });
               //console.log(response);
      	}else{
      		$scope.errorMsg = response.data.message;
      	}
      });
    };
})
.controller('forgateCtrl', function($scope, $location, $http, $stateParams) {
  $scope.forgateData = {};
  $scope.sendResetMail = function() {
    console.log($scope.forgateData)
    $http.put('/sendResetLink', $scope.forgateData).success(function(response){
      if(response.success){
        alert("Send reset link successfully to your account please check your email account");
        //$location.path('/dashboard/customer/info/' + $scope.customerData._id);
      }  
    });
  }
}); */



