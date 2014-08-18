taxamo-nodejs-example
=====================

Taxamo, Stripe and NodeJS integration example - simplistic approach to processing EU VAT compliant transactions using Stripe on node.js.

Built using swagger.js and express.js.

Usage
=====================

To run this example, clone the repository, then run:

```
$ npm install
```

This will install dependencies, next run:

```
$ node app.js
```

And navigate to http://localhost:3000 in your browser.

Taxamo provisional tokens are used - as the example uses taxamo.js and Taxamo RESTful API, it is advised to update them with your own test tokens in index.html and app.js files.

License
=====================
Copyright 2014 Taxamo, Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
