'use strict';
angular.module('saleQuotationService', [])
.factory('saleQuotation', ['$http', function($http){
    var saleQuoteFactory ={};

    // service for create quatation
    saleQuoteFactory.create = function(quotationData){
        return $http.post('/insertSaleQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for get quatation by id
    saleQuoteFactory.getById = function(id){
        return $http.get('/saleQuoteGetById/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    saleQuoteFactory.getList = function(){
        return $http.get('/saleQuoteList').then(function(data){
     	    return data;
        })
    }

    // service for update quatation
    saleQuoteFactory.update = function(quotationData){
        return $http.put('/updateSaleQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for delete quatation
    saleQuoteFactory.distroy = function(id){
        return $http.delete('/deleteSaleQuote/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    saleQuoteFactory.sendSaleQuotation = function(id){
		return $http.put('/sendSaleQuote/'+ id);
    }

    return saleQuoteFactory;
}]);    