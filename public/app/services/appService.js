var App;
(function (App) {
    (function (Services) {
        var AppService = (function () {
            function AppService($http, $q, $authService, $notifyService, baseUrl, $identityService) {
                this.$http = $http;
                this.$q = $q;
                this.$authService = $authService;
                this.$notifyService = $notifyService;
                this.baseUrl = baseUrl;
                this.$identityService = $identityService;
            }
            AppService.prototype.getUsers = function (page, filter) {
                var url = "api/users?";

                if (page) {
                    url += "page=" + page + "&";
                }

                if (filter && filter !== "") {
                    url += "username=" + filter;
                }

                return this._getRequest(url);
            };

            AppService.prototype.getAlbums = function (page, filter) {
                var url = this.$identityService.currentUser._id + "/albums?";

                if (page) {
                    url += "page=" + page + "&";
                }

                if (filter && filter !== "") {
                    url += "filter=" + filter;
                }

                return this._getRequest(url);
            };

            AppService.prototype.getAlbum = function (albumId) {
                var url = this.$identityService.currentUser._id + "/albums/" + albumId;
                return this._getRequest(url);
            };

            AppService.prototype.createAlbum = function (album) {
                var url = this.$identityService.currentUser._id + "/albums";
                return this._postRequest(url, album);
            };

            AppService.prototype.updateAlbum = function (album) {
                var url = this.$identityService.currentUser._id + "/albums";
                return this._putRequest(url, album);
            };

            AppService.prototype.addPhotoToAlbum = function (albumId, photo) {
                var url = this.$identityService.currentUser._id + "/" + albumId;
                return this._postRequest(url, photo);
            };

            AppService.prototype.getUserDetails = function (id) {
                var url = "api/drivers/" + id;
                if (this.$identityService.isAuthenticated()) {
                    return this._getRequest(url);
                }
            };

            AppService.prototype._postRequest = function (address, data) {
                var _this = this;
                var promise = this.$http.post(this.baseUrl + address, data);
                promise.error(function (error) {
                    return _this.$notifyService.error(error);
                });

                return promise;
            };

            AppService.prototype._putRequest = function (address, data) {
                var _this = this;
                var promise = this.$http.put(this.baseUrl + address, data);
                promise.error(function (error) {
                    return _this.$notifyService.error(error);
                });

                return promise;
            };

            AppService.prototype._getRequest = function (address) {
                var _this = this;
                var promise = this.$http.get(this.baseUrl + address);
                promise.error(function (error) {
                    return _this.$notifyService.error(error);
                });

                return promise;
            };
            return AppService;
        })();
        Services.AppService = AppService;
    })(App.Services || (App.Services = {}));
    var Services = App.Services;
})(App || (App = {}));
//# sourceMappingURL=appService.js.map
