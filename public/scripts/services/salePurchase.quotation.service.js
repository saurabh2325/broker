'use strict';
angular.module('salePurchaseQuotationService', [])
.factory('salePurchaseQuotation', ['$http', function($http){
    var salePurQuoteFactory ={};

    // service for create quatation
    salePurQuoteFactory.create = function(quotationData){
        return $http.post('/insertSalePurQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for get quatation by id
    salePurQuoteFactory.getById = function(id){
        return $http.get('/salePurQuoteGetById/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for update quatation
    salePurQuoteFactory.update = function(quotationData){
        return $http.put('/updateSalePurQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for delete quatation
    salePurQuoteFactory.distroy = function(id){
        return $http.delete('/deleteSalePurQuote/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    salePurQuoteFactory.getList = function(){
        return $http.get('/salePurQuoteList').then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    salePurQuoteFactory.sendPurQuotation = function(id){
		return $http.put('/sendSalePurQuote/'+ id);
    }

    return salePurQuoteFactory;
}]);    