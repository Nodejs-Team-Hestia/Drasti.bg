var drastiBg = angular.module('drastiBg', ['ngRoute']);

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
        templateUrl: '/templates/home',
        controller: 'homeController'
    }).when('/login', {
        templateUrl: '/templates/login',
        controller: 'accountController'
    }).when('/register', {
        templateUrl: '/templates/register',
        controller: 'accountController'
    }).when('/userInfo', {
        templateUrl: '/templates/userInfo',
        controller: 'userInfoController',
        resolve: routeUserChecks.authenticated
    }).when('/users', {
        templateUrl: '/templates/users',
        controller: 'usersController',
        resolve: routeUserChecks.authenticated
    }).when('/users/:id', {
        templateUrl: '/templates/userDetails',
        controller: 'userDetailsController',
        resolve: routeUserChecks.authenticated
    }).when('/albums', {
        templateUrl: '/templates/albums',
        controller: 'albumsController',
        resolve: routeUserChecks.authenticated
    }).when('/albums/:id', {
        templateUrl: '/templates/albumDetails',
        controller: 'albumsController',
        resolve: routeUserChecks.authenticated
    }).when('/create-album', {
        templateUrl: '/templates/create-album',
        controller: 'albumsController',
        resolve: routeUserChecks.authenticated
    }).when('/add-photo/:id', {
        templateUrl: '/templates/add-photo',
        controller: 'albumsController',
        resolve: routeUserChecks.authenticated
    }).when('/unauthorized', {
        templateUrl: '/templates/unauthorized'
    }).otherwise({ redirectTo: '/' });
}).config(function ($httpProvider) {
}).constant('baseUrl', '/').constant('footer', 'Telerik Academy 2014').value('toastr', toastr).factory("$authService", [
    "$http", "$q", "$identityService", "baseUrl",
    function ($http, $q, $identityService, baseUrl) {
        return new App.Services.AuthService($http, $q, $identityService, baseUrl);
    }]).factory("$appService", [
    "$http", "$q", "$authService", "$notifyService", "baseUrl", "$identityService",
    function ($http, $q, $authService, $notifyService, baseUrl, $identityService) {
        return new App.Services.AppService($http, $q, $authService, $notifyService, baseUrl, $identityService);
    }]).factory("$identityService", [
    "$window",
    function ($window) {
        return new App.Services.IdentityService($window);
    }]).factory("$notifyService", [
    "toastr",
    function (toastr) {
        return new App.Services.NotifyService(toastr);
    }]).controller("baseController", App.Controllers.BaseController).controller("accountController", App.Controllers.AccountController).controller("userInfoController", App.Controllers.UserInfoController).controller("homeController", App.Controllers.HomeController).controller("usersController", App.Controllers.UsersController).controller("userDetailsController", App.Controllers.UserDetailsController).controller("albumsController", App.Controllers.AlbumsController).controller("pageController", App.Controllers.PageController);

drastiBg.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    });
});
//# sourceMappingURL=app.js.map
