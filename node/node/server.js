// Get the packages we need
var express = require('express');
var chargebee = require('chargebee');
var customerController = require('./controllers/customerController');
var cors = require('cors');
var bodyParser = require("body-parser"); 

// Create our Express application
var app = express();

app.use(cors({credentials: true, origin: true}));

app.options('*', cors());

app.use(bodyParser.json({
  extended: true
})); 

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api

router.get('/', function(req, res) {
  res.json({ message: 'Charge Bee sample node version' });
});

router.route('/customers')	
  .get(customerController.getCustomer)
  .post(customerController.updateCustomer)

router.route('/customerAddress')	
  .post(customerController.updateCustomerAddress)

router.route('/listInvoices')	
  .post(customerController.listInvoices)
  
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server Listening on port - ' + port);