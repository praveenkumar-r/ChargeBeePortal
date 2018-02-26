cbPortal.controller('accountInfoController',['$scope','serviceManager','$rootScope','customerService','$location',function accountInfoController($scope,serviceManager,$rootScope,customerService,$location){
	
	//Variable declarations
	$scope.customers=false; //To Bind to UI and to maintain state for intital view
	$scope.accountInfo=true; //To maintain state for toggle
	
	/**
	 *  To get List of Customers
	 *  @function getCustomers
	 *  @params null
	 */
	function getCustomers(){
		serviceManager.callBackend('GET','/customers')
		.then(function(data){
			$scope.customers=data.list;
	   })
	   .catch(function(response){
		  console.log(response.status);
	   });
	};
	
	// Self call to get customers
	getCustomers();
	
	/**
	 *  To maintain selectedcustomer and to call toggle view after selection
	 *  @scope function showDetailedInfo
	 *  @params inp [selectedCsutomer data] 
	 */
	$scope.showDetailedInfo=function(inp){
		customerService.customeradd(inp);
		$rootScope.customerSelected=inp.id;
		$scope.selectedCustomer=inp;
		$scope.toggleAccountView();	
	};
	
	/**
	 *  Toggle view to show detailed information about customer from customer summary and viceversa
	 *  @scope function toggleAccountView
	 *  @params null
	 */
	$scope.toggleAccountView=function(){
		$scope.accountInfo=!$scope.accountInfo;
	};
	
	/**
	 *  To update the customer information and to redirect to home page after updation
	 *  @scope function updateCustomer
	 *  @params null
	 */	
	$scope.updateCustomer=function(){
		var inp={
					first_name : $scope.selectedCustomer.first_name, 
		  			last_name : $scope.selectedCustomer.last_name, 
		  			email: $scope.selectedCustomer.email,
					id: $scope.selectedCustomer.id
				};
		
		serviceManager.callBackend('POST','/customers',inp)
		.then(function(data){
			alert('Customer Updated Succefully!!');
			$location.path('/home');
			
	   })
	   .catch(function(response){
		  console.log(response.status);
	   });
	};
	
}]);

