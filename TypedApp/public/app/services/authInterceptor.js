var App;
(function (App) {
    (function (Services) {
        var AuthInterceptor = (function () {
            function AuthInterceptor($q, $location, $identityService, $notifyService) {
                this.$q = $q;
                this.$location = $location;
                this.$identityService = $identityService;
                this.$notifyService = $notifyService;
                this.request = this._request.bind(this);
                this.responseError = this._responseError.bind(this);
            }
            AuthInterceptor.prototype._request = function (config) {
                config.headers = config.headers || {};

                var authData = this.$identityService.getCurrentUser();
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.access_token;
                }

                return config;
            };

            AuthInterceptor.prototype._responseError = function (rejection) {
                if (rejection.status === 401) {
                    this.$notifyService.error('Not authorizated.');
                } else if (rejection.status === 404) {
                    this.$notifyService.error('Not found.');
                } else {
                    var message = rejection.status;
                    if (rejection.data.error_description) {
                        message = rejection.data.error_description;
                    }

                    this.$notifyService.error('Error Status: ' + message);
                }
                return this.$q.reject(rejection);
            };
            return AuthInterceptor;
        })();
        Services.AuthInterceptor = AuthInterceptor;
    })(App.Services || (App.Services = {}));
    var Services = App.Services;
})(App || (App = {}));
//# sourceMappingURL=authInterceptor.js.map
