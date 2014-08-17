var express = require('express');
var stripe = require('stripe');
var client = require('swagger-client');

client.authorizations.add("apiKey", new client.ApiKeyAuthorization("private_token", "SamplePrivateTestKey1", "query"));

function initApp (taxamo) {
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
    
    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });
}


var taxamo = new client.SwaggerApi({
  url: 'http://localhost:3007/swagger',
  success: function() {
    if(taxamo.ready === true) {
        initApp(taxamo);
    }
  }
});