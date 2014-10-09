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
            AppService.prototype.getStats = function () {
                return this._getRequest("api/stats").success(function (stats) {
                    AppService.cachedStats = stats;
                });
            };

            AppService.prototype.getCities = function () {
                return this._getRequest("api/cities");
            };

            AppService.prototype.getDrivers = function (page, filter) {
                var url = "api/drivers?";

                if (page) {
                    url += "page=" + page + "&";
                }

                if (filter && filter !== "") {
                    url += "username=" + filter;
                }

                return this._getRequest(url);
            };

            AppService.prototype.getDriverDetails = function (id) {
                var url = "api/drivers/" + id;
                if (this.$identityService.isAuthenticated()) {
                    return this._getRequest(url);
                }
            };

            AppService.prototype.getTripDetails = function (id) {
                var url = "api/trips/" + id;
                if (this.$identityService.isAuthenticated()) {
                    return this._getRequest(url);
                }
            };

            AppService.prototype.getLatestAvailableTrips = function () {
                return this._getRequest("api/trips");
            };

            AppService.prototype.getUserInfo = function () {
                var url = "api/users/userInfo";
                if (this.$identityService.isAuthenticated()) {
                    return this._getRequest(url);
                }
            };

            AppService.prototype.getTrips = function (page, from, to, orderBy, orderType, onlyMine, finished) {
                var url = "api/trips?";
                if (page) {
                    url += "page=" + page + "&";
                }

                if (from) {
                    url += "from=" + from + "&";
                }

                if (to) {
                    url += "to=" + to + "&";
                }

                if (orderBy) {
                    url += "orderBy=" + orderBy + "&";
                }

                if (orderType) {
                    url += "orderType=" + orderType + "&";
                }

                if (onlyMine) {
                    url += "onlyMine=" + onlyMine + "&";
                }

                if (finished) {
                    url += "finished=" + finished;
                }

                if (this.$identityService.isAuthenticated()) {
                    return this._getRequest(url);
                }
            };

            AppService.prototype.joinTrip = function (trip) {
                var url = "api/trips/" + trip.id;
                var data = {
                    from: trip.from,
                    to: trip.to,
                    availableSeats: trip.numberOfFreeSeats,
                    departureTime: trip.departureDate
                };

                if (this.$identityService.isAuthenticated()) {
                    return this._putRequest(url, data);
                }
            };

            AppService.prototype.createTrip = function (tripData) {
                var url = "api/trips/";

                if (this.$identityService.isAuthenticated()) {
                    return this._postRequest(url, tripData);
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
