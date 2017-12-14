'use strict';
angular.module('cashbackQuotationService', [])
.factory('cashbackQuotation', ['$http', function($http){
    var cashbackQuoteFactory ={};

    // service for create quatation
    cashbackQuoteFactory.create = function(quotationData){
        return $http.post('/insertCashbackQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for get quatation by id
    cashbackQuoteFactory.getById = function(id){
        return $http.get('/cashbackQuoteGetById/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    cashbackQuoteFactory.getList = function(){
        return $http.get('/cashbackQuoteList').then(function(data){
     	    return data;
        })
    }

    // service for update quatation
    cashbackQuoteFactory.update = function(quotationData){
        return $http.put('/updateCashbackQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for delete quatation
    cashbackQuoteFactory.distroy = function(id){
        return $http.delete('/deleteCashbackQuote/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    cashbackQuoteFactory.sendCashbackQuotation = function(id){
		return $http.put('/sendCashbackQuote/'+ id);
    }

    return cashbackQuoteFactory;
}]);    