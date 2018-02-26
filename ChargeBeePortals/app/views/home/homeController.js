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

