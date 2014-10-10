var App;
(function (App) {
    (function (Services) {
        var IdentityService = (function () {
            function IdentityService($window) {
                if ($window.bootstrappedUserObject) {
                    this.currentUser = $window.bootstrappedUserObject;
                }
                this.isAuthenticated = this._isAuthenticated.bind(this);
                this.setCurrentUser = this._setCurrentUser.bind(this);
            }
            IdentityService.prototype._setCurrentUser = function (user) {
                this.currentUser = user;
            };

            IdentityService.prototype._isAuthenticated = function () {
                return !!this.currentUser;
            };
            return IdentityService;
        })();
        Services.IdentityService = IdentityService;
    })(App.Services || (App.Services = {}));
    var Services = App.Services;
})(App || (App = {}));
//# sourceMappingURL=identityService.js.map
