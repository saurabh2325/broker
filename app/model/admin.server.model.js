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

var addressSubschema = {
    number: String,
    street: String, 
    area:String,
    zip: String,
    city:String,
    state: String,
    country: String
}

//User Schema
var adminSchema = new Schema({
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
    password: {
        type: String,
        trim: true,
        select: false 
 	   },
    permission:{
        type: String,
        trim: true,
        default:'admin',
       },
    description: {
 		type: String,
        default:'',
        trim: true
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
    address:[addressSubschema],
    image:{ 
        type: String,
        default:'',
        trim: true
       },
    create_date:{ 
        type: Date,
        default: Date.now
       },
    update_date:{ 
        type: Date,
        default: Date.now
       },   
    temporary_token: { 
        type: String
       },
    otp:{
        type: String
    },
    reset_token: { 
        type: String 
    }
});

// store hase to your password in DB
adminSchema.pre('save',function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

// Attach some mongoose hooks 
adminSchema.plugin(titlize, {
    paths: ['first_name'] // Array of paths 
});

// Attach some mongoose hooks 
adminSchema.plugin(titlize, {
    paths: ['last_name'] // Array of paths 
});

adminSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

// Expose the model to other object (similar to a 'public' setter).
module.exports = mongoose.model('tbl_admin', adminSchema);
