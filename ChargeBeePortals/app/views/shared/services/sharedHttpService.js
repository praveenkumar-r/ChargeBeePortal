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

