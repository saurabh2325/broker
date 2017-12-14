var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secrets = "6z7mfMW1GwKzG2sgsG9icqN1bfcJTooGwIOySP22";
var nodemailer = require('nodemailer');
var path = require('path');
var multer  = require('multer');
var advisor = require('../../app/model/advisor.server.model');
var route = express.Router();
var speakeasy = require("speakeasy");
var secret = speakeasy.generateSecret({length: 10});

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

// Define storage path of upload advisor image
var imageStorage = multer.diskStorage({
    destination: './public/images/user/',
    filename: function (request, file, cb) {
      cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Upload advisor image function
var upload = multer({ storage: imageStorage });
route.post('/uploadAdvisorImg', upload.single('file'), function(request, response){
    var myFile = request.file;
    var newName = myFile.filename;
    response.send(myFile);
})

// Advisor Registration  
route.post('/insertAdvisor', function(request, response){
    var advisorModel = new advisor();
    advisorModel.uid = request.body.uid;
    advisorModel.company_name = request.body.company_name;
    advisorModel.company_contact_no = request.body.company_contact_no;
	advisorModel.first_name = request.body.first_name;
    advisorModel.last_name = request.body.last_name;
    advisorModel.email = request.body.email;
    advisorModel.territory = request.body.territory;
    advisorModel.permission = request.body.permission;
    advisorModel.bank_detail = request.body.bank_detail;
    advisorModel.description = request.body.description;
    advisorModel.work_contact_no = request.body.work_contact_no;
    advisorModel.mobile_contact_no = request.body.mobile_contact_no;  
    advisorModel.address = request.body.address;
    advisorModel.status = request.body.status;
    advisorModel.image = request.body.image;
    advisorModel.create_date = Date.now();
    advisorModel.temporary_token = jwt.sign({ uid: request.body.uid, first_name: request.body.first_name, last_name: request.body.last_name, email: request.body.email }, secrets, { expiresIn: '24h' }); // Create a token for activating account through e-mail
    if(advisorModel.uid && advisorModel.first_name && advisorModel.last_name && advisorModel.email){
        advisorModel.save(function(err, advisor){
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
                    to: advisor.email,
                    subject: 'Account Activation.',
                    text: 'Hello ' + advisor.first_name + ' ' + advisor.last_name + ', Thank you.',
                    html: `<!DOCTYPE html>
                            <html>
                                <head>
                                    <title>Confirmation Mail</title>
                                    <meta charset="utf-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i" rel="stylesheet">
                                    <style type="text/css">
                                        body{
                                            margin: 0px;
                                            padding: 0px;
                                        }
                                        .table{
                                            background-repeat: no-repeat;
                                            background-size: cover;
                                            background-position: center;
                                            max-width: 600px;
                                            margin: 0px auto;
                                            display: block;
                                            font-family: 'PT Sans', sans-serif;
                                            padding-top:20px;
                                            padding-bottom: 40px;
                                            color: darkslategray;
                                            font-weight: 600;
                                        }
                                        .btn-confirm{
                                                padding: 10px 15px;
                                                background-color: #ee7f2c;
                                                border: 0px;
                                                border-radius: 4px;
                                                line-height: 10px;
                                                color: #fff;
                                                cursor: pointer;
                                        }
                                        .btn-confirm:hover{
                                            background-color: rgba(238, 127, 44, 0.90);
                                        }
                                        td{
                                            padding: 0px 15px;
                                        }
                                        h1,h2,h3,h4,h5,h6,p{
                                            margin:0px 0px;
                                        }
                                        a{
                                            color: orangered;
                                        }
                                        @media screen and (max-width: 767px){
                                            .table{
                                                max-width: 100%;
                                            }
                                            h1, h2, h3, h4, h5, h6, p {
                                                margin: 5px 0px;
                                            }
                                        } 
                                    </style>
                                </head>
                                <body>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3 style="color: darkslategray;margin: 10px 0px 5px;"> Dear` + advisor.first_name + ' ' + advisor.last_name + `</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 style="color: darkslategray;margin: 0px 0px;"> Broker Conveyancing</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 20px;">
                                                    Please confirm your email address. <a href="http://localhost:8030/activate/` + advisor.temporary_token + `"><button class="btn btn-confirm">Confirm Account</button> </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 20px;">
                                                    If you have any questions, please do not hesitate to contact us at <a href="">info@brokerconveyancing.com</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 40px;">
                                                    Kind Regards,
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Broker Conveyancing Limited
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </body>
                            </html>`
                };
                // Function to send e-mail to the user
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                        console.log(info); // Log success message to console
                        console.log('sent to: ' + advisor.email); // Log e-mail 
                    }
                });
                response.json({ success: true, message:'New advisor successfully created'});
            }
        }) 
    }else{
        response.json({ success: false, message:'Ensure full name, email, password were provided correctly'});
    }  
})

route.put('/activate/:token', function(request, response){
    advisor.findOne({temporary_token: request.params.token}, function(err, user){
        if(err) throw err;
        var token = request.params.token;
        jwt.verify(token, secrets , function(err, decoded) {
            if(err){
              response.json({success: false, message: err});
            }else if(!user){
              response.json({success: false, message: "activation link has expired"});
            }else{
                user.temporary_token = " ";
                user.status = 0;
                var otp = speakeasy.totp({
                    secret: secret.base32,
                    encoding: 'base32'
                });
                user.password = otp; 
                user.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        var email = {
                        from: 'Test@123.com',
                        to: user.email,
                        subject: 'Account activated',
                        html:   `<!DOCTYPE html>
                                <html>
                                    <head>
                                    <title>Confirmation Mail</title>
                                    <meta charset="utf-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i" rel="stylesheet">
                                    <style type="text/css">
                                        body{
                                            margin: 0px;
                                            padding: 0px;
                                        }
                                        .table{
                                            background-repeat: no-repeat;
                                            background-size: cover;
                                            background-position: center;
                                            max-width: 600px;
                                            margin: 0px auto;
                                            display: block;
                                            font-family: 'PT Sans', sans-serif;
                                            padding-top:20px;
                                            padding-bottom: 40px;
                                            color: darkslategray;
                                            font-weight: 600;
                                        }
                                        .btn-confirm{
                                            padding: 10px 15px;
                                            background-color: #ee7f2c;
                                            border: 0px;
                                            border-radius: 4px;
                                            line-height: 10px;
                                            color: #fff;
                                            cursor: pointer;
                                        }
                                        .btn-confirm:hover{
                                            background-color: rgba(238, 127, 44, 0.90);
                                        }
                                        td{
                                            padding: 0px 15px;
                                        }
                                        h1,h2,h3,h4,h5,h6,p{
                                            margin:0px 0px;
                                        }
                                        a{
                                            color: orangered;
                                        }
                                        @media screen and (max-width: 767px){
                                            .table{
                                                max-width: 100%;
                                            }
                                            h1, h2, h3, h4, h5, h6, p {
                                                margin: 5px 0px;
                                            }
                                        } 
                                    </style>
                                </head>
                                <body>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3 style="color: darkslategray;margin: 10px 0px 5px;"> Dear `+ user.first_name + ' ' + user.last_name +` </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 style="color: darkslategray;margin: 0px 0px;"> Broker Conveyancing</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 20px;">
                                                    Thank you, your account has been activated. your password is <strong>`+ otp +`.</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 20px;">
                                                    If you have any questions, please do not hesitate to contact us at <a href="">info@brokerconveyancing.com</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 40px;">
                                                    Kind Regards,
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Broker Conveyancing Limited
                                                </td>
                                            </tr>
                                        </tbody>
                                </table>
                            </body>
                        </html>`
                    };
                    client.sendMail(email, function(err, info){
                        if (err ){
                        console.log(error);
                        }
                        else {
                        console.log('Message sent: ' + info.response);
                        }
                    });
                    response.json({success: true, message: "Account Activated "});
                }
              });  
            } 
        });
    })
})

// function for getting agent list 
route.get('/advisorList', function(request, response){
    advisor.find({}, function(err, advisorList){
        if(err){
            response.json({success: false, message: 'Something went wrong !, please contact to your service agentistrator'});
        }else{
            var b = advisorList.length;
            if(!b){
                response.json({success: true, message: 'Sorry!, No artist available at this time.'});
            }else{
                response.json({success: true, data: advisorList});
            }      
        }
    })
});

// function for getting advisor Detail 
route.get('/advisorGetById/:id', function(request, response){
    var id = request.params.id;
    advisor.findOne({_id: id}, function(err, advisorDetail){
        if(err){
            response.json({success: false, message: 'Something went wrong !, please contact to your service advisoristrator'});
        }
        else{
            response.json({success: true, data: advisorDetail}); 
        }
    });
});

// function for updateing Detail
route.put('/updateAdvisor', function(request, response){
    var id = request.body._id;
    advisor.findById(id, function(err, advisor){
        if(err){
          response.json({success: false, message: ' User detail not found'});
        }
        else{
            advisor.update(request.body ,function(err, success){
                if(err){
                    response.json({success: false, message: err});
                }
                else{
                    response.json({success: true, message:'User detail update successfully'});
                }
            });
        }
    })
});

// function for delete Detail
route.delete('/deleteAdvisor/:id', function(request, response){
    var id = request.params.id;
    advisor.remove({_id: id}, function(err, success){
        if(err){
            response.json({success: false, message: err});
        }
        else{
            response.json({success: true, data: 'user Details delete successfully'});
        }
    });
});

route.post('/sendMail', function(request, response){
    // Create e-mail object to send to user
    var email = {
        from: 'test@india.com',
        to: 'saurabh.sixthsense@gmail.com',
        subject: 'Thank you mail',
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>Confirmation Mail</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i" rel="stylesheet">
                        <style type="text/css">
                            body{
                                margin: 0px;
                                padding: 0px;
                            }
                            .table{
                                background-repeat: no-repeat;
                                background-size: cover;
                                background-position: center;
                                max-width: 600px;
                                margin: 0px auto;
                                display: block;
                                font-family: 'PT Sans', sans-serif;
                                padding-top:20px;
                                padding-bottom: 40px;
                                color: darkslategray;
                                font-weight: 600;
                            }
                            .btn-confirm{
                                    padding: 10px 15px;
                                    background-color: #ee7f2c;
                                    border: 0px;
                                    border-radius: 4px;
                                    line-height: 10px;
                                    color: #fff;
                                    cursor: pointer;
                            }
                            .btn-confirm:hover{
                                background-color: rgba(238, 127, 44, 0.90);
                            }
                            td{
                                padding: 0px 15px;
                            }
                            h1,h2,h3,h4,h5,h6,p{
                                margin:0px 0px;
                            }
                            a{
                                color: orangered;
                            }
                            @media screen and (max-width: 767px){
                                .table{
                                    max-width: 100%;
                                }
                                h1, h2, h3, h4, h5, h6, p {
                                    margin: 5px 0px;
                                }
                            } 
                        </style>
                    </head>
                    <body>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <h3 style="color: darkslategray;margin: 10px 0px 5px;"> Dear` + advisor.first_name + ' ' + advisor.last_name + `</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3 style="color: darkslategray;margin: 0px 0px;"> Broker Conveyancing</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 20px;">
                                        Please confirm your email address. <a href="http://localhost:8030/admin/login"><button class="btn btn-confirm">Confirm Account</button> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 20px;">
                                        If you have any questions, please do not hesitate to contact us at <a href="">info@brokerconveyancing.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 40px;">
                                        Kind Regards,
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Broker Conveyancing Limited
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                </html>`
    };
    // Function to send e-mail to the user
    client.sendMail(email, function(err, info) {
        if (err) {
            console.log(err); // If error with sending e-mail, log to console/terminal
        } else {
            console.log(info); // Log success message to console
            console.log('sent to: ' + advisor.email); // Log e-mail 
        }
    });
    response.json({ success: true, message:'New advisor successfully created'});
});

// function to send reset link 
route.put('/sendAdvisorResetLink', function(request, response) {
    advisor.findOne({ email: request.body.email }).select('uid email reset_token first_name last_name').exec(function(err, user) {
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
route.put('/resetAdvisorPassword/:resettoken', function(request, response) {
    var id = request.params.resettoken;
    advisor.findOne({ reset_token: id }).select('uid first_name last_name email reset_token').exec(function(err, user) {
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

/* `<!DOCTYPE html>
    <html>
        <head>
            <title>Confirmation Mail</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i" rel="stylesheet">
            <style type="text/css">
                body{
                    margin: 0px;
                    padding: 0px;
                }
                .table{
                    background-image: url(bg.jpg);
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    max-width: 600px;
                    margin: 0px auto;
                    display: block;
                    font-family: 'PT Sans', sans-serif;
                    padding-top:20px;
                    padding-bottom: 40px;
                    color: darkslategray;
                    font-weight: 600;
                }
                .btn-confirm{
                        padding: 10px 15px;
                        background-color: #ee7f2c;
                        border: 0px;
                        border-radius: 4px;
                        line-height: 10px;
                        color: #fff;
                        cursor: pointer;
                }
                .btn-confirm:hover{
                    background-color: rgba(238, 127, 44, 0.90);
                }
                td{
                    padding: 0px 15px;
                }
                h1,h2,h3,h4,h5,h6,p{
                    margin:0px 0px;
                }
                a{
                    color: orangered;
                }
                @media screen and (max-width: 767px){
                    .table{
                        max-width: 100%;
                    }
                    h1, h2, h3, h4, h5, h6, p {
                        margin: 5px 0px;
                    }
                } 
            </style>
        </head>
        <body>
            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <h3 style="color: darkslategray;margin: 10px 0px 5px;"> Dear Mr. John Doe</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3 style="color: darkslategray;margin: 0px 0px;"> Broker Conveyancing</h3>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 20px;">
                            Please confirm your email address. <button class="btn btn-confirm">Confirm Account</button>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 20px;">
                            If you have any questions, please do not hesitate to contact us at <a href="">info@brokerconveyancing.com</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 40px;">
                            Kind Regards,
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Broker Conveyancing Limited
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
</html>` */