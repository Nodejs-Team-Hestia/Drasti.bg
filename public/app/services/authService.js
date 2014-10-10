var App;
(function (App) {
    (function (Services) {
        var AuthService = (function () {
            function AuthService($http, $q, $identityService, baseUrl) {
                this.$http = $http;
                this.$q = $q;
                this.$identityService = $identityService;
                this.baseUrl = baseUrl;
                this._usersApiUrl = this.baseUrl + "api/users/";
            }
            AuthService.prototype.register = function (userInfo) {
                var _this = this;
                var deferred = this.$q.defer();

                this.$http.post(this._usersApiUrl, userInfo).success(function (data) {
                    _this.$identityService.setCurrentUser(data);
                    deferred.resolve();
                }).error(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            AuthService.prototype.login = function (userInfo) {
                var _this = this;
                var deferred = this.$q.defer();

                this.$http.post(this.baseUrl + "login", userInfo).success(function (response) {
                    if (response.user) {
                        console.log(response.user);
                        _this.$identityService.setCurrentUser(response.user);
                        deferred.resolve(true);
                    } else {
                        deferred.reject(false);
                    }
                });

                return deferred.promise;
            };

            AuthService.prototype.logout = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.$http.post(this.baseUrl + 'logout', null).success(function () {
                    _this.$identityService.setCurrentUser(undefined);
                    deferred.resolve();
                });

                return deferred.promise;
            };
            return AuthService;
        })();
        Services.AuthService = AuthService;
    })(App.Services || (App.Services = {}));
    var Services = App.Services;
})(App || (App = {}));
//# sourceMappingURL=authService.js.map
