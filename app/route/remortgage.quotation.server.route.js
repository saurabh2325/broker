var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secrets = "6z7mfMW1GwKzG2sgsG9icqN1bfcJTooGwIOySP22";
var nodemailer = require('nodemailer');
var path = require('path');
var multer = require('multer');
var speakeasy = require("speakeasy");
var secret = speakeasy.generateSecret({ length: 10 });
var quotation = require('../../app/model/remortgage.quotation.server.model');
var route = express.Router();

// Quotation Post Method
route.post('/insertReMortgageQuote', function(req, response) {
    var quotationModel = new quotation();
    quotationModel.quotation_id = req.body.quotation_id;
    quotationModel.quotation_branch = req.body.quotation_branch;
    quotationModel.applicant1_title = req.body.applicant1_title;
    quotationModel.applicant1_first_name = req.body.applicant1_first_name;
    quotationModel.applicant1_last_name = req.body.applicant1_last_name;
    quotationModel.applicant2_title = req.body.applicant2_title;
    quotationModel.applicant2_first_name = req.body.applicant2_first_name;
    quotationModel.applicant2_last_name = req.body.applicant2_last_name;
    quotationModel.price = req.body.price;
    quotationModel.address = req.body.address;
    quotationModel.tenure = req.body.tenure;
    quotationModel.transfer_of_equity = req.body.transfer_of_equity;
    quotationModel.gifted_deposit = req.body.gifted_deposit;
    quotationModel.gifted_deposit_fee = req.body.gifted_deposit_fee;
    quotationModel.h2b_equity_loan = req.body.h2b_equity_loan;
    quotationModel.h2b_equity_loan_fee = req.body.h2b_equity_loan_fee;
    quotationModel.h2b_isa = req.body.h2b_isa;
    quotationModel.h2b_isa_fee = req.body.h2b_isa_fee;
    quotationModel.new_build = req.body.new_build;
    quotationModel.new_build_fee = req.body.new_build_fee;
    quotationModel.right_to_buy = req.body.right_to_buy;
    quotationModel.right_to_buy_fee = req.body.right_to_buy_fee;
    quotationModel.lenders = req.body.lenders;
    quotationModel.introducer_Fee = req.body.introducer_Fee;
    quotationModel.conveyancer_id = req.body.conveyancer_id;
    quotationModel.conveyancer_fee = req.body.conveyancer_fee;
    quotationModel.bankruptcy_search = req.body.bankruptcy_search;
    quotationModel.priority_search = req.body.priority_search;
    quotationModel.electronic_hmlr_submission = req.body.electronic_hmlr_submission;
    quotationModel.professiona_search = req.body.professiona_search;
    quotationModel.stamp_duty = req.body.stamp_duty;
    quotationModel.land_registry = req.body.land_registry;
    quotationModel.vat = req.body.vat;
    quotationModel.vat_amount = req.body.vat_amount;
    quotationModel.Quote_amount = req.body.Quote_amount;
    quotationModel.create_by = req.body.create_by;
    quotationModel.create_date = req.body.create_date;
    quotationModel.valid_date = req.body.valid_date;
    quotationModel.update_date = req.body.update_date;
    quotationModel.status = req.body.status;
    if (quotationModel.quotation_id) {
        quotationModel.save(function(err, quotation) {
            if (err) {
                response.json({ success: false, message: 'somthing went wrong! Please Contact to support' });
            } else {
                response.json({ success: true, message: 'Congratulations!, Remortgage quotation created successfully.' });
            }
        })
    } else {
        response.json({ success: false, message: 'Sorry!, Remortgage quotation not created. Please  ' });
    }
})

// This Function is Used for get the Single Quotation  Value and depend on Id 
route.get('/reMortgageQuoteGetById/:id', function(request, response) {
        var id = request.params.id;
        quotation.findOne({_id:id}, function(err, quotationDetail) {
            if (err) {
                response.json({ success: false, message: 'Something went wrong !, please contact to your service agentistrator' });
            } else {
                response.json({ success: true, data: quotationDetail, message: 'Successfully Data' });
            }
        });
    })
    // This Function is Used for get the  Quotation  Value  
route.get('/reMortgageQuoteList', function(request, response) {

    quotation.find(function(err, quotationDetail) {
        if (err) {
            response.json({ success: false, message: 'Something went wrong !, please contact to your service agentistrator' });
        } else {
            response.json({ success: true, data: quotationDetail, message: 'Successfully Data' });
        }
    });
})

// This Function is Used for Update the  Quotation  Value 
route.put('/updateReMortgageQuote', function(request, response) {
    var id = request.body._id;
    quotation.findById(id, function(err, quotation) {
        if (err) {
            response.json({ success: false, message: ' quotation detail not found' });
        } else {
            quotation.update(request.body, function(err, success) {
                if (err) {
                    response.json({ success: false, message: err });
                } else {
                    response.json({ success: true, data: ' quotation detail update successfully' });
                }
            });
        }
    })
});
// This Function is Used for Delete the  Quotation  Value 
route.delete('/deleteReMortgageQuote/:id', function(request, response) {
    var id = request.params.id;
    quotation.remove({ _id: id }, function(err, success) {
        if (err) {
            response.json({ success: false, message: err });
        } else {
            response.json({ success: true, data: 'quotation Details delete successfully' });
        }
    });
});

module.exports = route;