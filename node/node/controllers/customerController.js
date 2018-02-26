var chargebee = require('chargebee');


exports.getCustomer = function(req, res) {
    chargebee.configure({site : "rpksharaj-test", 
    api_key : "test_rrfXs1GL9gDjnYnzhgHLHsFlI5GdSDx1"});
	chargebee.customer.list({

	}).request(function(error,result){
		if(error){
			//handle error
			console.log(error);
			res.send(error);
		  }else{
			res.send(result);
		  } 
	});
};

exports.updateCustomer = function(req, res) {
    chargebee.configure({site : "rpksharaj-test", 
    api_key : "test_rrfXs1GL9gDjnYnzhgHLHsFlI5GdSDx1"});
	
	console.log('req',req.body);
	chargebee.customer.update(req.body.id,req.body).request(function(error,result){
	  if(error){
	    //handle error
	    console.log(error);
		res.send(error);
	  }else{
	    console.log(result);
		res.send(result);
	  }
	}); 
};

exports.updateCustomerAddress = function(req, res) {
    chargebee.configure({site : "rpksharaj-test", 
    api_key : "test_rrfXs1GL9gDjnYnzhgHLHsFlI5GdSDx1"});
	
	console.log('req',req.body);
	chargebee.customer.update_billing_info(req.body.billing_address.id,req.body).request(function(error,result){
	  if(error){
	    //handle error
	    console.log(error);
		res.send(error);
	  }else{
	    console.log(result);
		res.send(result);
	  }
	}); 	
};


exports.listInvoices = function(req, res) {
    chargebee.configure({site : "rpksharaj-test", 
    api_key : "test_rrfXs1GL9gDjnYnzhgHLHsFlI5GdSDx1"});
	
	console.log('req',req.body);
	chargebee.invoice.list(req.body).request(function(error,result){
	  if(error){
	    //handle error
	    console.log(error);
		res.send(error);
	  }else{
	    console.log(result);
		res.send(result);
	  }
	}); 	
};

