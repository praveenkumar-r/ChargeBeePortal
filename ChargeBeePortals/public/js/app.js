var cbPortal=angular.module('cbportal',['ui.router']);
cbPortal.config(function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
		url: '/home',
		templateUrl: resource+'partials/home.html',
		controller: 'homeController'
	})
	.state('account', {
		url: '/account',
		templateUrl: resource+'partials/accountInfo.html',
		controller: 'accountInfoController'
	})
	.state('billing', {
		url: '/billing',
		templateUrl: resource+'partials/billingInfo.html',
		controller: 'billingInfoController'
	})
	.state('billinghistory', {
		url: '/billinghistory',
		templateUrl: resource+'partials/billingHistoryInfo.html',
		controller: 'billingHistoryInfoController'
	});
    

});
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


cbPortal.controller('homeController',['$scope','$rootScope','$location',function($scope,$rootScope,$location){
	
	/**
	 *  Validate customer has been selected, if selected redirect to selected path or alert information
	 *  @scope function toggleBilingView
	 *  @params null 
	 */
	$scope.changeview=function(path){
		if($rootScope.customerSelected==undefined)
			alert('Please select a customer from Account Information');
		else
			$location.path(path);
	};
}]);


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


/**
 *  To acheive lazy loading by monitoring element scroll stlyes
 *  @diretive whenScrolled
 *  @params null 
 */
cbPortal.directive("whenScrolled", function () {
    return{
        restrict: 'A',
        link: function (scope, elem, attrs) {
            raw = elem[0];
			angular.element(raw).bind('scroll', function() {
			if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
				if(scope.loaded)return;
				scope.$apply(attrs.whenScrolled); // Calling callback function passed as attribute
			}
		});
	
     }	
	};
});


/**
 *  To make http calls and to share the data to the controllers
 *  @ service customerService
 *  @params null 
 */
cbPortal.factory('serviceManager',['$http','$q',function serviceManager($http,$q){
	
	// Base URL to fetch and update information
	var baseURL='http://localhost:3000/api';

return{
		
	/**
	 *  To call backend url using HTTP and return $q promise to controller
	 *  @ service customerService
	 *  @params methodtype [POST/GET] urlMethod [url method] data [For updation]
	 */
		callBackend: function(methodType,urlMethod,data) {
			var deferred = $q.defer();
			var url=baseURL+urlMethod;
			
			$http({
				method: methodType,
				url: url,
				data:data
			})
			.then(function(response){
			   deferred.resolve(response.data);
			})
			.catch(function(response){
			  deferred.reject(response);
			});
			return deferred.promise;
		}
	
};
	
}]);

