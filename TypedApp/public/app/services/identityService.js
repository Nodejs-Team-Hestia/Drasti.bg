var App;
(function (App) {
    (function (Services) {
        var IdentityService = (function () {
            function IdentityService($cookieStore) {
                this.$cookieStore = $cookieStore;
                this.cookieStorageUserKey = "CurrentUser";
                this.getCurrentUser = this._getCurrentUser.bind(this);
                this.isAuthenticated = this._isAuthenticated.bind(this);
                this.setCurrentUser = this._setCurrentUser.bind(this);
            }
            IdentityService.prototype._getCurrentUser = function () {
                var savedUser = this.$cookieStore.get(this.cookieStorageUserKey);
                if (savedUser) {
                    return savedUser;
                }

                return this.currentUser;
            };

            IdentityService.prototype._setCurrentUser = function (user) {
                if (user) {
                    this.$cookieStore.put(this.cookieStorageUserKey, user);
                } else {
                    this.$cookieStore.remove(this.cookieStorageUserKey);
                }

                this.currentUser = user;
            };

            IdentityService.prototype._isAuthenticated = function () {
                return !!this.getCurrentUser();
            };
            return IdentityService;
        })();
        Services.IdentityService = IdentityService;
    })(App.Services || (App.Services = {}));
    var Services = App.Services;
})(App || (App = {}));
//# sourceMappingURL=identityService.js.map
