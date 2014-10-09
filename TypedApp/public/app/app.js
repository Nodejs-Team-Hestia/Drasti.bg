var drastiBg = angular.module('drastiBg', ['ngRoute', 'ngCookies']);

var routeUserChecks = {
    authenticated: {
        authenticate: function ($identityService, $location) {
            if (!$identityService.isAuthenticated()) {
                $location.path('/unauthorized');
                return false;
            }
            return true;
        }
    }
};

// Configs
drastiBg.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/templates/home.html',
        controller: 'homeController'
    }).when('/login', {
        templateUrl: 'app/templates/login.html',
        controller: 'accountController'
    }).when('/userInfo', {
        templateUrl: 'app/templates/userInfo.html',
        controller: 'userInfoController',
        resolve: routeUserChecks.authenticated
    }).when('/register', {
        templateUrl: 'app/templates/register.html',
        controller: 'accountController'
    }).when('/trips', {
        templateUrl: 'app/templates/trips.html',
        controller: 'tripsController'
    }).when('/trips/create', {
        templateUrl: 'app/templates/tripCreate.html',
        controller: 'tripCreateController',
        resolve: routeUserChecks.authenticated
    }).when('/trips/:id', {
        templateUrl: 'app/templates/tripDetails.html',
        controller: 'tripDetailsController',
        resolve: routeUserChecks.authenticated
    }).when('/drivers', {
        templateUrl: 'app/templates/drivers.html',
        controller: 'driversController'
    }).when('/drivers/:id', {
        templateUrl: 'app/templates/driverDetails.html',
        controller: 'driverDetailsController',
        resolve: routeUserChecks.authenticated
    }).when('/unauthorized', {
        templateUrl: 'app/templates/unauthorized.html'
    }).otherwise({ redirectTo: '/' });
}).config(function ($httpProvider) {
    $httpProvider.interceptors.push('$authInterceptor');
}).constant('baseUrl', 'http://spa2014.bgcoder.com/').constant('footer', 'Telerik Academy 2014').value('toastr', toastr).factory("$authService", [
    "$http", "$q", "$identityService", "baseUrl",
    function ($http, $q, $identityService, baseUrl) {
        return new App.Services.AuthService($http, $q, $identityService, baseUrl);
    }]).factory("$authInterceptor", [
    "$q", "$location", "$identityService", "$notifyService",
    function ($q, $location, $identityService, $notifyService) {
        return new App.Services.AuthInterceptor($q, $location, $identityService, $notifyService);
    }]).factory("$appService", [
    "$http", "$q", "$authService", "$notifyService", "baseUrl", "$identityService",
    function ($http, $q, $authService, $notifyService, baseUrl, $identityService) {
        return new App.Services.AppService($http, $q, $authService, $notifyService, baseUrl, $identityService);
    }]).factory("$identityService", [
    "$cookieStore",
    function ($cookieStore) {
        return new App.Services.IdentityService($cookieStore);
    }]).factory("$notifyService", [
    "toastr",
    function (toastr) {
        return new App.Services.NotifyService(toastr);
    }]).controller("baseController", App.Controllers.BaseController).controller("accountController", App.Controllers.AccountController).controller("userInfoController", App.Controllers.UserInfoController).controller("homeController", App.Controllers.HomeController).controller("tripsController", App.Controllers.TripsController).controller("tripDetailsController", App.Controllers.TripDetailsController).controller("tripCreateController", App.Controllers.TripCreateController).controller("driversController", App.Controllers.DriversController).controller("driverDetailsController", App.Controllers.DriverDetailsController).controller("pageController", App.Controllers.PageController);

drastiBg.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        debugger;
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    });
});
//# sourceMappingURL=app.js.map
