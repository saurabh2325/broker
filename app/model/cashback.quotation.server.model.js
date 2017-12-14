'use strict'

//Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

var addressSubSchema = new Schema({
    number: { type: String },
    street: { type: String },
    area: { type: String },
    zip: { type: String },
    city: { type: String },
    country: { type: String }
})
var cashbackQuoteSchema = new Schema({
    quotation_id: {
        type: String,
        unique: true,
        trim: true,
        default: ""
    },
    quotation_branch: {
        type: String,
        trim: true,
        default: ""
    },
    applicant1_title: {
        type: String,
        trim: true,
        default: ""
    },
    applicant1_first_name: {
        type: String,
        trim: true,
        default: ""
    },
    applicant1_last_name: {
        type: String,
        trim: true,
        default: ""
    },
    applicant2_title: {
        type: String,
        trim: true,
        default: ""
    },
    applicant2_first_name: {
        type: String,
        trim: true,
        default: ""
    },
    applicant2_last_name: {
        type: String,
        trim: true,
        default: ""
    },
    price: {
        type: Number,
        default: 0,
        trim: true
    },
    address: [addressSubSchema],
    introducer_Fee: {
        type: Number
    },
    conveyancer_id: {
        type: Number,
        default: 0
    },
    conveyancer_fee: {
        type: Number,
        default: 0
    },
    bankruptcy_search:{
        type: Number,
        default: 0
    },
    priority_search:{
        type: Number,
        default: 0
    },
    electronic_hmlr_submission:{
        type: Number,
        default: 0
    },
    professiona_search:{
        type: Number,
        default: 0
    },
    stamp_duty:{
        type: Number,
        default: 0
    },
    land_registry:{
        type: Number,
        default: 0
    },
    vat:{
        type: Number,
        default: 0
    },
    vat_amount:{
        type: Number,
        default: 0
    },
    Quote_amount:{
        type: Number,
        default: 0
    },
    create_by: {
        type: mongoose.Schema.ObjectId,
        trim: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    valid_date:{
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false,
    }
})

// Expose the model to other object (similar to a 'public' setter).
module.exports = mongoose.model('tbl_cashback_quotation', cashbackQuoteSchema);