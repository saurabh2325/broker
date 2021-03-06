(function(){
    "use strict";
    angular.module('app')
        .directive('sidenav', function() {
            return {
                templateUrl:'scripts/directives/sidenav/sidenav.html',
                restrict: 'E',
                replace: 'true',
                controller: function($scope, $timeout, $rootScope){
                    
                    $scope.tabActive = [];       	
    
                    $scope.$watch('tabActive', function(){
                        if($scope.perfectSCrollbarObj) {
                            setTimeout(function(){
                                $scope.perfectSCrollbarObj.perfectScrollbar('update');
                            }, 100);
                        }
                    }, true);
                    
                    $scope.menuToggle = function () {
                        $('body').toggleClass('menu-hidden');	
                        $scope.tabActive = [1];	
                        console.log($('body').hasClass('menu-hidden'));
                        if ($('body').hasClass('menu-hidden')== 1) 
                        {
                            $rootScope.$broadcast('resize');
                            $scope.perfectSCrollbarObj.perfectScrollbar('destroy');	        			
                            $(document).click(function (e)
                            {
                                if (!$(".sidenav-sub-menu").is(e.target) )
                                {
                                    $(".sidenav-sub-menu").hide();
                                }
                            }); 			
                        } else {
                        $timeout(function () {
                            $rootScope.$broadcast('resize');	
                            $scope.perfectSCrollbarObj.perfectScrollbar();	
                            }, 100);
                            $(document).click(function (e)
                            {
                                
                                if (!$(".sidenav-sub-menu").is(e.target) )
                                {
                                    $(".sidenav-sub-menu").show();
                                }
                            }); 	
                        }		
                    }	
                },	
                link: function(scope, el, attrs){
                                    
                    setTimeout(function(){
                        scope.perfectSCrollbarObj = el.find('.tab-content').perfectScrollbar();
                    }, 0);
                    
                }
            }
        })
})();