var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var visitor = require('../../app/model/visitor.server.model');
var route = express.Router();

// Visitor Registration  
route.post('/insertVisitor', function(request, response){
    var visitorModel = new visitor();
    visitorModel.uid = request.body.uid;
    visitorModel.company_name = request.body.company_name;
    visitorModel.company_contact_no = request.body.company_contact_no;
	visitorModel.first_name = request.body.first_name;
    visitorModel.last_name = request.body.last_name;
    visitorModel.email = request.body.email;
    visitorModel.territory = request.body.territory;
    visitorModel.description = request.body.description;
    visitorModel.work_contact_no = request.body.work_contact_no;
    visitorModel.mobile_contact_no = request.body.mobile_contact_no; 
    visitorModel.occupation = request.body.occupation;  
    visitorModel.address = request.body.address;
    visitorModel.status = request.body.status;
    visitorModel.create_date = Date.now();
    visitorModel.create_by = request.body.create_by;
    if(visitorModel.uid && visitorModel.first_name && visitorModel.last_name){
        visitorModel.save(function(err, visitor){
            if(err){
                response.json({ success: false, message: err });
            }else{
                response.json({ success: true, message:'New visitor successfully created'});
            }
        }) 
    }else{
        response.json({ success: false, message:'Ensure name, email'});
    }  
})

// function for getting visitor list 
route.get('/visitorList', function(request, response){
    visitor.find({}, function(err, visitorList){
        if(err){
            response.json({success: false, message: 'Something went wrong !, please contact to your service visitoristrator'});
        }else{
            var b = visitorList.length;
            if(!b){
                response.json({success: true, message: 'Sorry!, No Visitor available at this time.'});
            }else{
                response.json({success: true, data: visitorList});
            }      
        }
    })
});

// function for getting visitor Detail 
route.get('/visitorGetById/:id', function(request, response){
    var id = request.params.id;
    visitor.findOne({_id: id}, function(err, visitorDetail){
        if(err){
            response.json({success: false, message: 'Something went wrong !, please contact to your service visitoristrator'});
        }
        else{
            response.json({success: true, data: visitorDetail}); 
        }
    });
});

// function for updateing Detail
route.put('/updateVisitor', function(request, response){
    var id = request.body._id;
    visitor.findById(id, function(err, visitor){
        if(err){
          response.json({success: false, message: ' User detail not found'});
        }
        else{
            visitor.update(request.body ,function(err, success){
                if(err){
                    response.json({success: false, message: err});
                }
                else{
                    response.json({success: true, data:'User detail update successfully'});
                }
            });
        }
    })
});

// function for delete Detail
route.delete('/deleteVisitor/:id', function(request, response){
    var id = request.params.id;
    visitor.remove({_id: id}, function(err, success){
        if(err){
            response.json({success: false, message: err});
        }
        else{
            response.json({success: true, data: 'user Details delete successfully'});
        }
    });
});

module.exports = route;