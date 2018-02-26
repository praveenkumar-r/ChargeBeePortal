cbPortal.controller('billingInfoController',['$scope','serviceManager','customerService','$location',function billingInfoController($scope,serviceManager,customerService,$location){
	
	//Variable declarations
	$scope.billingInfo=true; //To bind billing inforamtion to UI and to maintain state for intital view
	$scope.selectedCustomeraddress=customerService.customerlist().billing_address; //Fetching address from customer service
	
	/**
	 *  Toggle view to show detailed billing address information from billing summary and viceversa
	 *  @scope function toggleBilingView
	 *  @params null 
	 */
	$scope.toggleBilingView=function(){
		$scope.billingInfo=!$scope.billingInfo;
	};

	/**
	 *  To update the billing address information and to redirect to home page after updation
	 *  @scope function updateBillingAddress
	 *  @params null 
	 */	
	$scope.updateBillingAddress=function(){
		var inp={	billing_address :{
						id:  customerService.customerlist().id,
						first_name : $scope.selectedCustomeraddress.first_name, 
						last_name : $scope.selectedCustomeraddress.last_name, 
						line1 : $scope.selectedCustomeraddress.line1, 
						line2 : $scope.selectedCustomeraddress.line2, 
						city : $scope.selectedCustomeraddress.city, 
						state : $scope.selectedCustomeraddress.state, 
						zip : $scope.selectedCustomeraddress.zip, 
						country : $scope.selectedCustomeraddress.country
					}
				};
				
		
		serviceManager.callBackend('POST','/customerAddress',inp)
		.then(function(data){
			alert('Customer Details Updated Succefully!!');
			$location.path('/home');		
	   })
	   .catch(function(response){
		  console.log(response.status);
	   });
	};

}]);

