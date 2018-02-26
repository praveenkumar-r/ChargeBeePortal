/**
 *  To maintain selected customer information and to share data between controllers
 *  @ service customerService
 *  @params null 
 */
cbPortal.service('customerService',[function customerService(){
	
	//customer object to maintain selected customer
	this.customer={};

	/**
	 *  To store customer data in customer object
	 *  @ service customerService
	 *  @params inp [selected customer data] 
	 */
	this.customeradd=function(inp){
		this.customer=inp;
	};

	/**
	 *  To retreive selected customer data
	 *  @ service customerService
	 *  @params inp [selected customer data] 
	 */
	this.customerlist=function(){
		return this.customer;
	};
	
}]);

