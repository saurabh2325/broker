(function(){
    'use strict';
    angular.module('app')
    .controller('purchaseQuoteCtrl', ["$q", "$scope", "$log", "$timeout", "purchaseQuotation", function ($q, $scope, $log, $timeout, purchaseQuotation) {
        $scope.templateUrl = './views/pages/quotation/purchase/purchaseAdd.html?v='+window.app_version
        $scope.subtitle = "New"

        //Function for change page  
        $scope.nextPanel= function(valid){
            if(valid){
                $scope.successMsg = false;
                $scope.errorMsg = false;   
                $scope.templateUrl = './views/pages/quotation/purchase/purchaseAdd1.html?v='+window.app_version
            }else{
                $scope.errorMsg = "Invalid Form"
            }
        };

        //Function for change page  
        $scope.previousPanel= function(){ 
            $scope.successMsg = false;
            $scope.errorMsg = false;   
            $scope.templateUrl = './views/pages/quotation/purchase/purchaseAdd.html?v='+window.app_version
        };

        $scope.quoteData = {}
        $scope.value = "true";
        $scope.quoteData.tenure = 'Freehold';
        $scope.quoteData.buy_to_let = 'N/A';
        $scope.quoteData.gifted_deposit = true;
        $scope.quoteData.lenders = 'N/A'; 
        $scope.quoteData.introducer_Fee = '0';
        $scope.quoteData.create_date = new Date();

        $scope.getQuoteId = getQuoteId;
        $scope.clearApplicant = clearApplicant;
        $scope.getValidDate = getValidDate;
        $scope.saveQuote = saveQuote;

        //Function for get quotation id  
        function getQuoteId(){
            var now = new Date();
            var timestamp = now.getUTCMilliseconds();
            timestamp += now.getHours() + now.getMinutes()+now.getSeconds()+now.getMilliseconds().toString();
            $scope.quoteData.quotation_id = timestamp +(Math.ceil(Math.random() * 9));
        };
        getQuoteId();

        function clearApplicant(aplicant){
            if(!aplicant){
                $scope.quoteData.applicant2_title = "";
                $scope.quoteData.applicant2_first_name = "";
                $scope.quoteData.applicant2_last_name = "";
            }
            console.log(aplicant);
        }


        function getValidDate(){
            var time = new Date();
            time.setDate(time.getDate()+ 7);
            $scope.quoteData.valid_date = new Date(time);  
        }
        getValidDate();

        //Function for get quotation id
        function saveQuote(valid, quoteForm){
            $scope.successMsg = false;
            $scope.errorMsg = false;
            if(valid){
                purchaseQuotation.create($scope.quoteData).then(function(response){
                    console.log(response.data);
                    if(response.data.success){
                        $scope.successMsg = response.data.message;
                        $scope.quoteData = {}
                        quoteForm.$setPristine();
                        $scope.value = "true";
                        $scope.quoteData.tenure = 'Freehold';
                        $scope.quoteData.buy_to_let = 'N/A';
                        $scope.quoteData.gifted_deposit = true;
                        $scope.quoteData.lenders = 'N/A'; 
                        $scope.quoteData.introducer_Fee = '0';
                        getQuoteId();
                        $timeout(function(){
                            $scope.previousPanel();
                        },1000)
                        
 
                    }else{
                        $scope.errorMsg = response.data.message; 
                    }
                }) 
            }else{
              $scope.errorMsg = "Invalid quotation, Please ensure form is filled properly"
            }
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
})();    