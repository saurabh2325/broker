'use strict'

//Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

// User E-mail Validator
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var addressSubschema = new Schema({
    number: {type: String},
    street: {type: String}, 
    area:{type: String},
    zip: {type: String},
    city:{type: String},
    country: {type: String}
})

//Visitor Schema
var visitorSchema = new Schema({
    uid:{
        type: String,
        unique:true,
        trim: true,
        default:""
       },
    first_name:{
        type: String,
        trim: true,
        default:""
    },
    last_name: {
        type: String,
        trim: true,
 		default:""
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique:true,
        validate: emailValidator  
    },
    work_contact_no: {
        type: Number,
       default: 0,
       trim: true
    },
    mobile_contact_no: {
        type: Number,
       default:'',
    },
    occupation:{
        type: String,
        trim: true,
 		default:""
    },
    territory:{
        type: String,
        trim: true,
 		default:""
    },
    company_name:{
        type: String,
        trim: true,
        default:""
    },
    company_contact_no: {
        type: String,
        trim: true,
 		default:""
    },
    description: {
        type: String,
        trim: true,
 		default:""
    },  
    address:[addressSubschema],
    create_date:{ 
        type: Date,
        default: Date.now
    },
    update_date:{ 
        type: Date,
        default: Date.now
    },   
    status: {
        type: Number,
        default:0,
    },
    create_by: {
        type: mongoose.Schema.ObjectId,
        trim: true
    }
});

// Attach some mongoose hooks 
visitorSchema.plugin(titlize, {
    paths: ['first_name'] // Array of paths 
});

// Attach some mongoose hooks 
visitorSchema.plugin(titlize, {
    paths: ['last_name'] // Array of paths 
});

// Expose the model to other object (similar to a 'public' setter).
module.exports = mongoose.model('tbl_visitor', visitorSchema);
