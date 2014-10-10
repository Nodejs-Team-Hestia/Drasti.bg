var drastiBg = angular.module('drastiBg', ['ngRoute']);

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
				templateUrl: '/templates/home',
				controller: 'homeController'
			})
			.when('/login', {
				templateUrl: '/templates/login',
				controller: 'accountController'
			})
			.when('/register', {
				templateUrl: '/templates/register',
				controller: 'accountController'
			})
			.when('/userInfo', {
				templateUrl: '/templates/userInfo',
				controller: 'userInfoController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/users', {
				templateUrl: '/templates/users',
				controller: 'usersController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/users/:id', {
				templateUrl: '/templates/userDetails',
				controller: 'userDetailsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/albums', {
				templateUrl: '/templates/albums',
				controller: 'albumsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/albums/:id', {
				templateUrl: '/templates/albumDetails',
				controller: 'albumsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/create-album', {
				templateUrl: '/templates/create-album',
				controller: 'albumsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/add-photo/:id', {
				templateUrl: '/templates/add-photo',
				controller: 'albumsController',
				resolve: <any>routeUserChecks.authenticated
			})
			.when('/unauthorized', {
				templateUrl: '/templates/unauthorized'
			})
			.otherwise({ redirectTo: '/' });
	})
	.config(($httpProvider: ng.IHttpProvider) => {})
// Constants
	.constant('baseUrl', '/')
	.constant('footer', 'Telerik Academy 2014')
// Values
	.value('toastr', toastr)
// Services
	.factory("$authService", ["$http", "$q", "$identityService", "baseUrl",
		($http: ng.IHttpService,
			$q: ng.IQService,
			$identityService: App.Services.IdentityService,
			baseUrl: string) => new App.Services.AuthService($http, $q, $identityService, baseUrl)])
	.factory("$appService", ["$http", "$q", "$authService", "$notifyService", "baseUrl", "$identityService",
		($http: ng.IHttpService,
			$q: ng.IQService,
			$authService: App.Services.AuthService,
			$notifyService: App.Services.NotifyService,
			baseUrl: string,
			$identityService: App.Services.IdentityService) => new App.Services.AppService($http, $q, $authService, $notifyService, baseUrl, $identityService)])
	.factory("$identityService", ["$window",
		($window) => new App.Services.IdentityService($window)])
	.factory("$notifyService", ["toastr",
		(toastr) => new App.Services.NotifyService(toastr)])
// Controllers
	.controller("baseController", App.Controllers.BaseController)
	.controller("accountController", App.Controllers.AccountController)
	.controller("userInfoController", App.Controllers.UserInfoController)
	.controller("homeController", App.Controllers.HomeController)
	.controller("usersController", App.Controllers.UsersController)
	.controller("userDetailsController", App.Controllers.UserDetailsController)
	.controller("albumsController", App.Controllers.AlbumsController)
	.controller("pageController", App.Controllers.PageController);

drastiBg.run(($rootScope: ng.IRootScopeService, $location: ng.ILocationService) => {
	$rootScope.$on('$routeChangeError', (ev, current, previous, rejection) => {
		if (rejection === 'not authorized') {
			$location.path('/unauthorized');
		}
	})
});