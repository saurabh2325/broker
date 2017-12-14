var express = require('express');
var app = express();
var port = process.env.PORT || '8030';
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');
var expressValidator = require('express-validator');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer  = require('multer');
var mime = require('mime');
var login = require('./app/route/login.server.route');
var admin = require('./app/route/admin.server.route');
var advisor = require('./app/route/advisor.server.route');
var agent = require('./app/route/agent.server.route');
var solicitor = require('./app/route/solicitor.server.route');
var visitor = require('./app/route/visitor.server.route');
var purchaseQuote = require('./app/route/purchase.quotation.server.route.js');
var saleQuote = require('./app/route/sale.quotation.server.route.js');
var salePurchaseQuote = require('./app/route/sale_purchase.quotation.server.route.js');
var remortgageQuote = require('./app/route/remortgage.quotation.server.route.js');
var cashbackQuote = require('./app/route/cashback.quotation.server.route.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(__dirname + '/public'));
app.use('/', login);
app.use('/', admin);
app.use('/', advisor);
app.use('/', agent);
app.use('/', solicitor);
app.use('/', visitor);
app.use('/', purchaseQuote);
app.use('/', saleQuote);
app.use('/', salePurchaseQuote);
app.use('/', remortgageQuote);
app.use('/', cashbackQuote);


// Function for connect database 
var db = "mongodb://testbroker:test123@ds111066.mlab.com:11066/broker";
mongoose.connect(db, function(err, response){
  if(err){
    console.log(' Failed to connected to ' + db);
  }
  else{
    console.log('Connected to' + db);
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, function(){
  console.log('Running the server on port:'+ port);
});

/* app.listen(3007, '172.104.43.153');
console.log('Running the server on port:http://172.104.43.153:3006'); */
