# taxamo-nodejs-example

Taxamo, Stripe and NodeJS integration example - simplistic approach to processing EU VAT compliant transactions using Stripe on node.js.

Built using swagger.js and express.js.

## Usage

To run this example, clone the repository, then run:

```
$ npm install
```

This will install dependencies. Then run:

```
$ node app.js
```

And navigate to http://localhost:3000 in your browser.

Taxamo provisional tokens are used - as the example uses taxamo.js and Taxamo RESTful API, it is advised to update them with your own test tokens in index.html and app.js files.


## Connecting to Taxamo from Node.js

The easiest way to access Taxamo RESTful API from Node.js is to generate client bindings on the fly with [swagger-js](https://github.com/swagger-api/swagger-js/) for Node.js.

First, let’s add swagger dependency to our `package.json`:

```json
{
  //...
  "dependencies": {
    //...
    "swagger-client": "2.0.x"
  }
}
```
    
Next, we can reference the Taxamo API in our application’s JavaScript file (for example `app.js` or `server.js`):

```javascript
var client = require('swagger-client');

//use private token here, since we're talking server-server
client.authorizations.add("apiKey", new client.ApiKeyAuthorization("private_token", "***************", "query"));

//...

var taxamo = new client.SwaggerApi({
  url: 'https://api.taxamo.com/swagger',
  success: function() {
    if(taxamo.ready === true) {
        //app initializations - e.g. server startup can go here
    }
  }
});
```

### Invoking the API

As our [Node.js example](https://github.com/taxamo/taxamo-nodejs-example) uses the [taxamo.js](/doc/taxamojs) library to pre-calculate VAT and [gather payment data from Stripe](/doc/integration/stripe/checkout_form) in JavaScript, all we have to do is:

1.  Invoke the Taxamo API to get stored transaction details – so we can validate the transaction data – amounts, currencies, etc.
2.  Invoke the Taxamo API to capture payment.

The example `express.js` route that implements the features listed above, looks as following:

```javascript
app.get('/stripe', function index(req, res){
    taxamo.apis.transactions.getTransaction({key: req.query.transaction_key}, 
        function(data) {
            var transaction = JSON.parse(data.data).transaction;
            //merchants can check if transaction amounts/products make sense here
            taxamo.apis.payments.capturePayment({key: req.query.transaction_key}, 
            function(data) {
                res.send("Payment accepted.");
            }, function (error) {
                var errorResponse = JSON.parse(error.data);
                res.send(errorResponse);
        });
    });
});
```

Naturally, if using different PSP, such as Braintree, the `/stripe` url should be changed to a something more universal.


## License
Copyright 2017 Taxamo, Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
