var express = require('express');
var client = require('swagger-client');

var app = express();
app.get('/stripe', function index(req, res){
    taxamo.apis.transactions.getTransaction({key: req.query.transaction_key}, function(data) {
        var transaction = JSON.parse(data.data).transaction;
        //you can check if transaction amounts/products make sense here
        taxamo.apis.payments.capturePayment({key: req.query.transaction_key}, function(data) {
            res.send("Payment accepted.");
        }, function (error) {
            var errorResponse = JSON.parse(error.data);
            res.send(errorResponse);
        });
    });
});

app.use(express.static(__dirname + '/public'));
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

//initialize the API with swagger.js client, and then start the server on port 3000
//for swagger-client 2.1.x it should be new client({
var taxamo = new client.SwaggerApi({
  url: 'https://beta.taxamo.com/swagger',
  success: function() {
    if(taxamo.ready === true) {
        var server = app.listen(3000, function() {
            console.log('Listening on port %d', server.address().port);
        });
    }
  }
});

//use your private token here, since we're talking server-server
taxamo.clientAuthorizations.add('apiKey', new client.ApiKeyAuthorization('private_token', 'SamplePrivateTestKey1', 'query'));
