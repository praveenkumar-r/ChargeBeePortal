cbPortal.controller('billingHistoryInfoController',['$scope','serviceManager','$rootScope','customerService','$location',function billingHistoryInfoController($scope,serviceManager,$rootScope,customerService,$location){
	
	//Variable declarations
	$scope.invoices=false; // Parent copy of invoices to acheive client side lazyloading
	$scope.selInvoices=[]; //For binding to UI
	$scope.offset=0;	   //Lazy loading offset	
	$scope.limit=3;		   //Lazy loading limit

	/**
	 *  To get List of Invoices
	 *  @function getCustomers
	 *  @params null
	 */
	function getInvoices(){
		serviceManager.callBackend('POST','/listInvoices')
		.then(function(data){
			$scope.invoices=data.list;			
			$scope.loadData();
	   })
	   .catch(function(response){
		  console.log(response.status);
	   });
	}

	/**
	 *  To Lazy load Invoice with respect to limit and offset
	 *  @scope function loadData
	 *  @params null
	 */
	$scope.loadData=function loadData(){
		if($scope.offset<=$scope.invoices.length){
			var InvoiceCopy=angular.copy($scope.invoices);
			var partialData=InvoiceCopy.splice($scope.offset,$scope.limit);
			$scope.selInvoices=$scope.selInvoices.concat(partialData);
			$scope.offset=$scope.offset+3;
		}else{
			$scope.loaded=true;
		}
		
	};
	
	// Self call to get Invoices
	getInvoices();
		
}]);

