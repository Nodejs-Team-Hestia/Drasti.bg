var drastiBg = angular.module('drastiBg', ['ngRoute', 'ngCookies']);

var routeUserChecks = {
	authenticated: {
		authenticate: ($identityService: App.Services.IdentityService, $location: ng.ILocationService) => {
			if (!$identityService.isAuthenticated()) {
				$location.path('/unauthorized');
				return false;
			}
			return true;
		}
	}
};

// Configs
drastiBg
	.config(($routeProvider: ng.route.IRouteProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'app/templates/home.html',
				controller: 'homeController'
			})
			.when('/login', {
				templateUrl: 'app/templates/login.html',
				controller: 'accountController'
			})
			.when('/userInfo', {
				templateUrl: 'app/templates/userInfo.html',
				controller: 'userInfoController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/register', {
				templateUrl: 'app/templates/register.html',
				controller: 'accountController'
			})
			.when('/trips', {
				templateUrl: 'app/templates/trips.html',
				controller: 'tripsController'
			})
			.when('/trips/create', {
				templateUrl: 'app/templates/tripCreate.html',
				controller: 'tripCreateController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/trips/:id', {
				templateUrl: 'app/templates/tripDetails.html',
				controller: 'tripDetailsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/drivers', {
				templateUrl: 'app/templates/drivers.html',
				controller: 'driversController'
			})
			.when('/drivers/:id', {
				templateUrl: 'app/templates/driverDetails.html',
				controller: 'driverDetailsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/unauthorized', {
				templateUrl: 'app/templates/unauthorized.html'
			})
			.otherwise({ redirectTo: '/' });
	})
	.config(($httpProvider: ng.IHttpProvider) => {
		$httpProvider.interceptors.push('$authInterceptor');
	})
// Constants
	.constant('baseUrl', 'http://spa2014.bgcoder.com/')
	.constant('footer', 'Telerik Academy 2014')
// Values
	.value('toastr', toastr)
// Services
	.factory("$authService", ["$http", "$q", "$identityService", "baseUrl",
		($http: ng.IHttpService,
			$q: ng.IQService,
			$identityService: App.Services.IdentityService,
			baseUrl: string) => new App.Services.AuthService($http, $q, $identityService, baseUrl)])
	.factory("$authInterceptor", ["$q", "$location", "$identityService", "$notifyService",
		($q: ng.IQService,
			$location: ng.ILocationService,
			$identityService: App.Services.IdentityService,
			$notifyService: App.Services.NotifyService) => new App.Services.AuthInterceptor($q, $location, $identityService, $notifyService)])
	.factory("$appService", ["$http", "$q", "$authService", "$notifyService", "baseUrl", "$identityService",
		($http: ng.IHttpService,
			$q: ng.IQService,
			$authService: App.Services.AuthService,
			$notifyService: App.Services.NotifyService,
			baseUrl: string,
			$identityService: App.Services.IdentityService) => new App.Services.AppService($http, $q, $authService, $notifyService, baseUrl, $identityService)])
	.factory("$identityService", ["$cookieStore",
		($cookieStore) => new App.Services.IdentityService($cookieStore)])
	.factory("$notifyService", ["toastr",
		(toastr) => new App.Services.NotifyService(toastr)])
// Controllers
	.controller("baseController", App.Controllers.BaseController)
	.controller("accountController", App.Controllers.AccountController)
	.controller("userInfoController", App.Controllers.UserInfoController)
	.controller("homeController", App.Controllers.HomeController)
	.controller("tripsController", App.Controllers.TripsController)
	.controller("tripDetailsController", App.Controllers.TripDetailsController)
	.controller("tripCreateController", App.Controllers.TripCreateController)
	.controller("driversController", App.Controllers.DriversController)
	.controller("driverDetailsController", App.Controllers.DriverDetailsController)
	.controller("pageController", App.Controllers.PageController);

drastiBg.run(($rootScope: ng.IRootScopeService, $location: ng.ILocationService) => {
	$rootScope.$on('$routeChangeError', (ev, current, previous, rejection) => {
		debugger;
		if (rejection === 'not authorized') {
			$location.path('/unauthorized');
		}
	})
});