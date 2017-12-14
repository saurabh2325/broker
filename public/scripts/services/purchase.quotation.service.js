'use strict';
angular.module('purchaseQuotationService', [])
.factory('purchaseQuotation', ['$http', function($http){
    var purQuoteFactory ={};

    // service for create quatation
    purQuoteFactory.create = function(quotationData){
        return $http.post('/insertPurQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for get quatation by id
    purQuoteFactory.getById = function(id){
        return $http.get('/purQuoteGetById/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for update quatation
    purQuoteFactory.update = function(quotationData){
        return $http.put('/updatePurQuote', quotationData).then(function(data){
     	    return data;
        })
    }

    // service for delete quatation
    purQuoteFactory.distroy = function(id){
        return $http.delete('/deletePurQuote/'+ id).then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    purQuoteFactory.getList = function(){
        return $http.get('/purQuoteList').then(function(data){
     	    return data;
        })
    }

    // service for get quatation list
    purQuoteFactory.sendPurQuotation = function(id){
		return $http.put('/sendPurQuote/'+ id);
    }

    return purQuoteFactory;
}]);    