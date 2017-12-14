'use strict';

/**
* @ngdoc home
* @name app
* @description
* # app
*
* Main module of the application.
*/
window.app_version = 6;

angular
.module('app', [
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'perfect_scrollbar',
    'growlNotifications',
    'ngAnimate',
    'authService',
    'agentService',
    'advisorService',
    'solicitorService',
    'visitorService',
    'purchaseQuotationService',
    'saleQuotationService',
    'reMortgageQuotationService',
    'salePurchaseQuotationService',
    'cashbackQuotationService'
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 5;
    cfpLoadingBarProvider.includeSpinner = false;
}])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptors');

    $urlRouterProvider.when('/boxed', '/boxed/login');
    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('plain', {
        abstract: true,
        url: '',
        templateUrl: 'views/layouts/plain.html?v='+window.app_version,
        authenticated: true
    })
    .state('boxed', {
        abstract: true,
        url: '',
        parent: 'plain',
        templateUrl: 'views/layouts/boxed.html?v='+window.app_version,
        authenticated: false
    })
    .state('/admin/login', {
        url: '/admin/login',
        parent: 'boxed',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        authenticated: false,
        permission: 'admin'
    })
    .state('/admin/forgot-password', {
        url: '/admin/forgot-password',
        parent: 'boxed',
        templateUrl: 'views/pages/forgot-password.html?v='+window.app_version,
        controller: 'LoginCtrl',
        authenticated: false,
        permission: 'admin'
    })
    .state('/agent/login', {
        url: '/agent/login',
        parent: 'boxed',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'mainCtrl',
        authenticated: false,
        
    })
    .state('/agent/activate/:token', {
        url: '/agent/activate/:token',
        parent: 'boxed',
        templateUrl: 'views/pages/activate.html?v='+window.app_version,
        controller:'agentActiveCtrl',
        authenticated: false,
        permission: 'agent'
    })
    .state('/agent/forgot-password', {
        url: '/agent/forgot-password',
        parent: 'boxed',
        templateUrl: 'views/pages/forgot-password.html?v='+window.app_version,
        controller: 'LoginCtrl',
        authenticated: false,
        permission: 'agent'
    })
    .state('/solicitor/login', {
        url: '/solicitor/login',
        parent: 'boxed',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'mainCtrl',
        authenticated: false,
        permission: 'solicitor'
    })
    .state('/solicitor/activate/:token', {
        url: '/solicitor/activate/:token',
        parent: 'boxed',
        templateUrl: 'views/pages/activate.html?v='+window.app_version,
        controller:'solicitorActiveCtrl',
        authenticated: false,
        permission: 'solicitor'
    })
    .state('/solicitor/forgot-password', {
        url: '/solicitor/forgot-password',
        parent: 'boxed',
        templateUrl: 'views/pages/forgot-password.html?v='+window.app_version,
        controller: 'LoginCtrl',
        authenticated: false,
        permission: 'solicitor'
    })
    .state('login', {
        url: '/login',
        parent: 'boxed',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'mainCtrl',
        authenticated: false,
        permission: 'advisor'
    })
    .state('signup',{
        url:'/signup',
        templateUrl:'views/pages/signup.html?v='+window.app_version,
        parent:'boxed',
        controller:'LoginCtrl',
        authenticated: false,
        permission: 'advisor'
    })
    .state('/activate/:token', {
        url: '/activate/:token',
        parent: 'boxed',
        templateUrl: 'views/pages/activate.html?v='+window.app_version,
        controller:'advisorActiveCtrl',
        authenticated: false,
        permission: 'advisor'
    })
    .state('forgot-password', {
        url: '/forgot-password',
        parent: 'boxed',
        templateUrl: 'views/pages/forgot-password.html?v='+window.app_version,
        controller: 'LoginCtrl',
        authenticated: false,
        permission: 'advisor'
    })
    .state('dashboard', {
        url: '',
        parent: 'plain',
        templateUrl: 'views/layouts/dashboard.html?v='+window.app_version,
        controller: 'DashboardCtrl',
        authenticated: true
    })
    .state('home', {
        url: '/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        permission: 'advisor',
    })
    .state('profile', {
        url: '/profile',
        parent: 'dashboard',
        templateUrl: 'views/pages/advisor/advisorProfile.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'advisorProfileCtrl'
    })
    .state('purchaseQuotation', {
        url: '/purchase/quotation',
        parent: 'dashboard',
        templateUrl: 'views/pages/quotation/purchase/purchase.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'purchaseQuoteCtrl'
    })
    .state('saleQuotation', {
        url: '/sale/quotation',
        parent: 'dashboard',
        templateUrl: 'views/pages/quotation/sale/sale.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'saleQuoteCtrl'
    })
    .state('remortgageQuotation', {
        url: '/re-mortgage/quotation',
        parent: 'dashboard',
        templateUrl: 'views/pages/quotation/re-mortgage/remortgage.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'reMortgageQuoteCtrl'
    })
    .state('salePurchaseQuotation', {
        url: '/sale-purchase/quotation',
        parent: 'dashboard',
        templateUrl: 'views/pages/quotation/sale-purchase/salePurchase.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'salePurchaseQuoteCtrl'
    })
    .state('cashbackQuotation', {
        url: '/cashback/quotation',
        parent: 'dashboard',
        templateUrl: 'views/pages/quotation/cashback/cashback.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'cashbackQuoteCtrl'
    })
    .state('purchaseQuote', {
        url: '/myQuote/purchase',
        parent: 'dashboard',
        templateUrl: 'views/pages/myQuote/purchase/purchase.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'myQuotePurchaseCtrl'
    })
    .state('saleQuote', {
        url: '/myQuote/sale',
        parent: 'dashboard',
        templateUrl: 'views/pages/myQuote/sale/sale.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'myQuoteSaleCtrl'
    })
    .state('remortgageQuote', {
        url: '/myQuote/remortgage',
        parent: 'dashboard',
        templateUrl: 'views/pages/myQuote/re-mortgage/remortgage.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'myQuoteSalePurchaseCtrl'
    })
    .state('salePurchaseQuote', {
        url: '/myQuote/salePurchase',
        parent: 'dashboard',
        templateUrl: 'views/pages/myQuote/sale-purchase/salePurchase.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'myQuoteRemortgageCtrl'
    })
    .state('cashbackQuote', {
        url: '/myQuote/cashback',
        parent: 'dashboard',
        templateUrl: 'views/pages/myQuote/cashback/cashback.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'myQuoteCashbackCtrl'
    })
    .state('tracking', {
        url: '/tracking',
        parent: 'dashboard',
        templateUrl: 'views/pages/matter/matter.html?v='+window.app_version,
        authenticated: true,
        permission: 'advisor',
        controller: 'matterCtrl'
    })
    .state('/admin/home', {
        url: '/admin/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        authenticated: true,
        permission: 'admin'
    })
    .state('/admin/agent', {
        url: '/admin/agent',
        parent: 'dashboard',
        templateUrl: 'views/pages/agent/agent.html?v='+window.app_version,
        authenticated: true,
        permission: 'admin',
        controller: 'agentCtrl'
    })
    .state('/admin/solicitor', {
        url: '/admin/solicitor',
        parent: 'dashboard',
        templateUrl: 'views/pages/solicitor/solicitor.html?v='+window.app_version,
        authenticated: true,
        permission: 'admin',
        controller: 'solicitorCtrl'
    })
    .state('/admin/advisor', {
        url: '/admin/advisor',
        parent: 'dashboard',
        templateUrl: 'views/pages/advisor/advisor.html?v='+window.app_version,
        authenticated: true,
        permission: 'admin',
        controller: 'advisorCtrl'
    })
    .state('/agent/home', {
        url: '/agent/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        authenticated: true,
        permission: 'agent'
    })
    .state('/agent/visitor', {
        url: '/agent/visitor',
        parent: 'dashboard',
        templateUrl: 'views/pages/visitor/visitor.html?v='+window.app_version,
        authenticated: true,
        permission: 'agent',
        controller: 'visitorCtrl'
    })
    .state('/agent/advisor', {
        url: '/agent/advisor',
        parent: 'dashboard',
        templateUrl: 'views/pages/advisor/advisor.html?v='+window.app_version,
        authenticated: true,
        permission: 'agent',
        controller: 'advisorCtrl'
    })
    .state('/solicitor/home', {
        url: '/solicitor/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        authenticated: true,
        permission: 'solicitor'
    })
    .state('404-page',{
        url:'/forgot-password',
        parent:'boxed',
        templateUrl:'views/pages/404-page.html?v='+window.app_version,
        controller:'LoginCtrl',
        authenticated: false
    })

    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    });
})
/* .run(function($transitions) {
    $transitions.onStart({ to: 'auth.**' }, function(trans) {
        console.log(trans)
      var auth = trans.injector().get('auth');
      if (!auth.isLoggedIn()) {
        // User isn't authenticated. Redirect to a new Target State
        return trans.router.stateService.target('/login');
      }
    });
  }) */
/* .run(['$rootScope', '$transitions', 'auth', '$state', function($rootScope, $transitions, auth, $state) {
     $transitions.onStart({}, function($transition) {
        if($transition.$to().authenticated){
            //console.log('Need to be authenticated');
            //console.log(auth.isLoggedIn())
            if(!auth.isLoggedIn()){
                console.log("go to login path")
                //$state.go('/login');
                if($transition.$to.permission == 'admin'){
                    $state.go('/admin/login');
                    return $transition.router.stateService.target('/admin/login');
                } else if($transition.$to.permission == 'agent'){
                    $state.go('/agent/login');
                    return $transition.router.stateService.target('/agent/login');
                } else if($transition.$to.permission == 'solicitor'){
                    $state.go('/solicitor/login');
                    return $transition.router.stateService.target('/solicitor/login');
                } else {
                    $state.go('login');
                    return $transition.router.stateService.target('login');
                }
            }
        }else if(!$transition.$to().authenticated){
            //console.log('should not needs to be authenticated')
            //console.log('home')
            if(auth.isLoggedIn()){
                if($transition.$to.permission == 'admin'){
                    $state.go('/admin/home');
                    return $transition.router.stateService.target('/admin/home');
                } else if($transition.$to.permission == 'agent'){
                    $state.go('/agent/home');
                    return $transition.router.stateService.target('/agent/home');
                } else if($transition.$to.permission == 'solicitor'){
                    $state.go('/solicitor/home');
                    return $transition.router.stateService.target('/solicitor/home');
                } else {
                    $state.go('/home');
                    return $transition.router.stateService.target('home');
                }
            } 
        }
    })
}]) */
.run(function(){
    var switchValue = JSON.parse(localStorage.getItem("switched"));
    if(switchValue)
        $('body').addClass('box-section');  
});