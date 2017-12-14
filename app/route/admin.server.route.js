var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secrets = "6z7mfMW1GwKzG2sgsG9icqN1bfcJTooGwIOySP22";
var nodemailer = require('nodemailer');
var path = require('path');
var multer  = require('multer');
var admin = require('../../app/model/admin.server.model');
var route = express.Router();

// send mail function
var options = {
    host:"smtp.gmail.com",
    secureConnection:true,
    port:465,  
    service: 'gmail',
    auth: {
        user: 'saurabh.sixthsense@gmail.com',
        pass: 'saurabh2325'
    }
}
var client = nodemailer.createTransport(options);

// Define storage path of upload admin image
var imageStorage = multer.diskStorage({
    destination: './public/images/user/',
    filename: function (request, file, cb) {
      cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Upload admin image function
var upload = multer({ storage: imageStorage });
route.post('/uploadAdminImg', upload.single('file'), function(request, response){
    var myFile = request.file;
    var newName = myFile.filename;
    response.send(myFile);
})

// Admin Registration  
route.post('/insertAdmin', function(request, response){
    var adminModel = new admin();
    adminModel.uid = request.body.uid;
	adminModel.first_name = request.body.first_name;
    adminModel.last_name = request.body.last_name;
    adminModel.email = request.body.email;
    adminModel.password = request.body.password;  
    adminModel.permission = request.body.permission;
    adminModel.description = request.body.description;
    adminModel.work_contact_no = request.body.work_contact_no;
    adminModel.mobile_contact_no = request.body.mobile_contact_no;  
    adminModel.address = request.body.address;
    adminModel.image = request.body.image;
    adminModel.create_date = Date.now();
    if(adminModel.uid && adminModel.first_name && adminModel.last_name && adminModel.email && adminModel.password){
        adminModel.save(function(err, admin){
            if(err){
                // Check if any validation errors exists (from user model)
                if (err.errors !== null && err.errors !== undefined ) {
                    if (err.errors.uid) {
                        response.json({ success: false, message: err.errors.uid.message }); // Display error in validation (uid)
                    }else if (err.errors.first_name) {
                        response.json({ success: false, message: err.errors.first_name.message }); // Display error in validation (first name)
                    }if (err.errors.last_name) {
                        response.json({ success: false, message: err.errors.last_name.message }); // Display error in validation (last name)
                    }else if (err.errors.email) {
                        response.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
                    }else {
                        response.json({ success: false, message: err }); // Display any other errors with validation
                    }
                }else if (err){
                    // Check if duplication error exists 
                    if (err.code === 11000){
                        response.json({ success: false, message: 'That email is already taken' }); // Display error if username already taken     
                    }else{
                        response.json({ success: false, message: err }); // Display any other error
                    }
                }
            }else{
                // Create e-mail object to send to user
                var email = {
                    from: 'test@india.com',
                    to: admin.email,
                    subject: 'Thank you mail',
                    text: 'Hello ' + admin.first_name + ' ' + admin.last_name + ', Thank you.',
                    html: 'Hello<strong> ' + admin.first_name + ' ' + admin.last_name + '</strong>,<br><br> Thank you sir.'
                };
                // Function to send e-mail to the user
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                        console.log(info); // Log success message to console
                        console.log('sent to: ' + admin.email); // Log e-mail 
                    }
                });
                response.json({ success: true, message:'New admin successfully created'});
            }
        }) 
    }else{
        response.json({ success: false, message:'Ensure full name, email, password were provided correctly'});
    }  
})

// function for getting admin list 
route.get('/adminList', function(request, response){
    admin.find({}, function(err, adminList){
        if(err){
            response.json({success: false, message: 'Something went wrong !, please contact to your service administrator'});
        }else{
            var b = adminList.length;
            if(!b){
                response.json({success: true, message: 'Sorry!, No artist available at this time.'});
            }else{
                response.json({success: true, data: adminList});
            }      
        }
    })
});

// function for getting admin Detail 
route.get('/adminGetById/:id', function(request, response){
    var id = request.params.id;
    admin.findOne({_id: id}, function(err, adminDetail){
        if(err){
            response.json({success: false, message: 'Something went wrong !, please contact to your service administrator'});
        }
        else{
            response.json({success: true, data: adminDetail}); 
        }
    });
});

// function for updateing Detail
route.put('/updateAdmin/:id', function(request, response){
    var id = request.params.id;
    admin.findById(id, function(err, admin){
        if(err){
          response.json({success: false, message: ' User detail not found'});
        }
        else{
            admin.update(request.body ,function(err, success){
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
route.delete('/deleteAdmin/:id', function(request, response){
    var id = request.params.id;
    admin.remove({_id: id}, function(err, success){
        if(err){
            response.json({success: false, message: err});
        }
        else{
            response.json({success: true, data: 'user Details delete successfully'});
        }
    });
});

// function to send reset link 
route.put('/sendAdminResetLink', function(request, response) {
    admin.findOne({ email: request.body.email }).select('uid email reset_token first_name last_name').exec(function(err, user) {
        if (err) {
            // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
            var email = {
                from: 'test@india.com',
                to: 'saurabh.sixthsense@gmail.com',
                subject: 'Error Logged',
                text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
            };
            // Function to send e-mail to myself
            client.sendMail(email, function(err, info) {
                if (err) {
                    console.log(err); // If error with sending e-mail, log to console/terminal
                }else {
                    console.log(info); // Log success message to console if sent
                     console.log(user.email); // Display e-mail that it was sent to
                }
            });
            response.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
        } else {
            if (!user) {
                response.json({ success: false, message: 'user was not found' }); // Return error if username is not found in database
            }else {
                user.reset_token = jwt.sign({uid: user.uid, first_name: user.first_name, last_name: user.last_name, email: user.email}, secrets, { expiresIn: '24h' }); // Create a token for activating account through e-mail
                    // Save token to user in database
                user.save(function(err) {
                    if (err) {
                        response.json({ success: false, message: err }); // Return error if cannot connect
                    } else {
                        // Create e-mail object to send to user
                        var email = {
                            from: 'test@india.com',
                            to: user.email,
                            subject: 'Reset Password Request',
                            text: 'Hello ' + user.first_name + ' ' + user.last_name + ', You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8030/reset/' + user.reset_token,
                            html: 'Hello<strong> ' + user.first_name + ' ' + user.last_name + '</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8030/reset/' + user.reset_token + '">http://localhost:8030/reset/</a>'
                        };
                        // Function to send e-mail to the user
                        client.sendMail(email, function(err, info) {
                            if (err) {
                                console.log(err); // If error with sending e-mail, log to console/terminal
                            } else {
                                console.log(info); // Log success message to console
                                console.log('sent to: ' + user.email); // Log e-mail 
                            }
                        });
                        response.json({ success: true, message: 'Please check your e-mail for password reset link' }); // Return success message
                    }
                });
            }
        }
    });
});
// function to send reset link
route.put('/resetAdminPassword/:resettoken', function(request, response) {
    var id = request.params.resettoken;
    admin.findOne({ reset_token: id }).select('uid first_name last_name email reset_token').exec(function(err, user) {
        if (err) {
            // Function to send e-mail to myself
            response.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
        }else{
            if (!user) {
                response.json({ success: false, message: 'Email was not found' }); // Return error if username is not found in database
            }else {
                user.password = request.body.password;
                user.reset_token = '';
                user.save(function(err) {
                    if (err) {
                        response.json({ success: false, message: err }); // Return error if cannot connect
                    } else {
                        var email = {
                            from: 'test@india.com',
                            to: user.email,
                            subject: 'Reset Password Confirmation',
                            text: 'Hello ' + user.first_name + ' ' + user.last_name +',Your Password successfully Reset',
                            html: 'Hello<strong> ' + user.first_name + ' ' + user.last_name +'</strong>,<br><br>Your Password successfully Reset'
                        };
                        // Function to send e-mail to the user
                        client.sendMail(email, function(err, info) {
                            if (err) {
                                console.log(err); // If error with sending e-mail, log to console/terminal
                            } else {
                                console.log(info); // Log success message to console
                                console.log('sent to: ' + user.email); // Log e-mail 
                            }
                        });
                        response.json({ success: true, message: 'Your Password successfully Reset' }); // Return success message
                    }
                });
            }
        }
    })
})

module.exports = route;