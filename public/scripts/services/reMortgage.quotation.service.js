'use strict';
angular.module('reMortgageQuotationService', [])
.factory('reMortgageQuotation', ['$http', function($http){
    var reMortgageQuoteFactory ={};

    // service for create quatation
    reMortgageQuoteFactory.create = function(quotationData){
        return $http.post('/insertReMortgageQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for get quatation by id
    reMortgageQuoteFactory.getById = function(id){
        return $http.get('/reMortgageQuoteGetById/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    reMortgageQuoteFactory.getList = function(){
        return $http.get('/reMortgageQuoteList').then(function(data){
     	    return data;
        })
    }

    // service for update quatation
    reMortgageQuoteFactory.update = function(quotationData){
        return $http.put('/updateReMortgageQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for delete quatation
    reMortgageQuoteFactory.distroy = function(id){
        return $http.delete('/deleteReMortgageQuote/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    reMortgageQuoteFactory.sendReMortgageQuotation = function(id){
		return $http.put('/sendReMortgageQuote/'+ id);
    }

    return reMortgageQuoteFactory;
}]);    