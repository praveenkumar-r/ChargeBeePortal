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