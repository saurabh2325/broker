var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secrets = "6z7mfMW1GwKzG2sgsG9icqN1bfcJTooGwIOySP22";
var path = require('path');
var admin = require('../../app/model/admin.server.model');
var advisor = require('../../app/model/advisor.server.model');
var agent = require('../../app/model/agent.server.model');
var solicitor = require('../../app/model/solicitor.server.model');
var route = express.Router();


//admin login function
route.post('/authentication', function(request, response){
    if(request.body.email && request.body.password && request.body.permission){
        var type = request.body.permission; 
        if(type === 'admin'){
            admin.findOne({email : request.body.email}).select('uid first_name last_name email password permission').exec(function(err, user){
                if(err) throw err;
                if(!user){
                    response.json({success: false, message: 'Could not authenticate user'});
                }else if(user){
                    if(request.body.password){
                        var validPassword = user.comparePassword(request.body.password);
                    }else{
                        response.json({success:false, message:'No password Provided'})
                    }
                    if(!validPassword){
                        response.json({success: false, message: 'Could not authenticate password'});
                    }else{
                        var token = jwt.sign({id:user._id , first_name: user.first_name , last_name: user.last_name, email: user.email, permission: user.permission}, secrets, { expiresIn: '24h'});
                        response.json({success: true, message: 'success', data: user, token: token});
                    }
                }
            })
        }else if(type === 'agent'){
            agent.findOne({email : request.body.email}).select('uid first_name last_name email password permission').exec(function(err, user){
                if(err) throw err;
                if(!user){
                    response.json({success: false, message: 'Could not authenticate user'});
                }else if(user){
                    if(request.body.password){
                        var validPassword = user.comparePassword(request.body.password);
                    }else{
                        response.json({success:false, message:'No password Provided'})
                    }
                    if(!validPassword){
                        response.json({success: false, message: 'Could not authenticate password'});
                    }else{
                        var token = jwt.sign({id:user._id , first_name: user.first_name , last_name: user.last_name, email: user.email, permission: user.permission}, secrets, { expiresIn: '24h'});
                        response.json({success: true, message: 'success', data: user, token: token});
                    }
                }
            })
        }else if(type === 'solicitor'){
            solicitor.findOne({email : request.body.email}).select('uid first_name last_name email password permission').exec(function(err, user){
                if(err) throw err;
                if(!user){
                    response.json({success: false, message: 'Could not authenticate user'});
                }else if(user){
                    if(request.body.password){
                        var validPassword = user.comparePassword(request.body.password);
                    }else{
                        response.json({success:false, message:'No password Provided'})
                    }
                    if(!validPassword){
                        response.json({success: false, message: 'Could not authenticate password'});
                    }else{
                        var token = jwt.sign({id:user._id , first_name: user.first_name , last_name: user.last_name, email: user.email, permission: user.permission}, secrets, { expiresIn: '24h'});
                        response.json({success: true, message: 'success', data: user, token: token});
                    }
                }
            })
        }else if(type === 'advisor'){
            advisor.findOne({email : request.body.email}).select('uid first_name last_name email password permission').exec(function(err, user){
                if(err) throw err;
                if(!user){
                    response.json({success: false, message: 'Could not authenticate user'});
                }else if(user){
                    if(request.body.password){
                        var validPassword = user.comparePassword(request.body.password);
                    }else{
                        response.json({success:false, message:'No password Provided'})
                    }
                    if(!validPassword){
                        response.json({success: false, message: 'Could not authenticate password'});
                    }else{
                        var token = jwt.sign({id:user._id , first_name: user.first_name , last_name: user.last_name, email: user.email, permission: user.permission}, secrets, { expiresIn: '24h'});
                        response.json({success: true, message: 'success', data: user, token: token});
                    }
                }
            })
        }      
    }else{
        response.json({success:false, message:'Invalid user'}) 
    }  
});

// Get user information from token
route.post('/me',function(request, response){
    var token = request.body.token || request.body.query || request.headers['x-access-token'];
    if(token){
        //veryfy token
        jwt.verify(token, secrets , function(err, decoded) {
            if(err){
                response.json({sucess: false, message: "Token Invalid"});
            }else{
                request.decoded = decoded;
                response.send(request.decoded);
            } 
        })
    }else{
        response.json({success: false, message: 'No token provieded'});
    }
});

// Get user permission from token
route.get('/permission', function(request, response){  
    var token = request.body.token || request.body.query || request.headers['x-access-token'];
    if(token){  
        //veryfy token
        jwt.verify(token, secrets , function(err, decoded) {
            if(err){
                response.json({sucess: false, message: "Token invalid"});
            }else{
                request.decoded = decoded;
                var id = request.decoded.id;
                var type = request.decoded.permission;
                if(type === 'admin'){
                    admin.findOne({_id : id}).select('uid first_name last_name email permission image').exec(function(err, user){
                        if(err) throw err;
                        if(!user){
                            response.json({success:false, message: 'No user has found'});
                        }else{
                            response.json({success: false, data: user})
                        } 
                    });
                }else  if(type === 'agent'){
                    agent.findOne({_id : id}).select('uid first_name last_name email permission image').exec(function(err, user){
                        if(err) throw err;
                        if(!user){
                            response.json({success:false, message: 'No user has found'});
                        }else{
                            response.json({success: false, data: user})
                        } 
                    });
                }else  if(type === 'solicitor'){
                    solicitor.findOne({_id : id}).select('uid first_name last_name email permission image').exec(function(err, user){
                        if(err) throw err;
                        if(!user){
                            response.json({success:false, message: 'No user has found'});
                        }else{
                            response.json({success: false, data: user})
                        } 
                    });
                }else{
                    advisor.findOne({_id : id}).select('uid first_name last_name email permission image').exec(function(err, user){
                        if(err) throw err;
                        if(!user){
                            response.json({success:false, message: 'No user has found'});
                        }else{
                            response.json({success: false, data: user})
                        } 
                    });
                }
            } 
        })
    }else{
        response.json({success: false, message: 'No token provieded'});
    }
});

module.exports = route;