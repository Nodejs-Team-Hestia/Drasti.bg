var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var TripsController = (function (_super) {
            __extends(TripsController, _super);
            function TripsController($scope, $location, $notifyService, $appService, $identityService, $timeout) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$identityService = $identityService;

                this.showIsMine = $identityService.isAuthenticated();

                this.sortByCondition = [
                    { name: "Date", value: "date" },
                    { name: "Driver", value: "driver" },
                    { name: "Seats", value: "seats" },
                    { name: "From", value: "from" },
                    { name: "To", value: "to" }
                ];
                this.sortBy = this.sortByCondition[0];

                this.orderByCondition = [
                    { name: "Asc", value: "asc" },
                    { name: "Desc", value: "desc" }
                ];
                this.orderBy = this.orderByCondition[0];

                this.$appService.getCities().then(function (cities) {
                    cities.data.unshift("");
                    _this.fromCities = cities.data;
                    _this.toCities = cities.data;
                });

                this.from = "";
                this.to = "";

                var onEvent = function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        _this.updateTrips();
                    }
                };

                $scope.$watch("model.page", onEvent.bind(this));
                $scope.$watch("model.from", onEvent.bind(this));
                $scope.$watch("model.to", onEvent.bind(this));
                $scope.$watch("model.sortBy", onEvent.bind(this));
                $scope.$watch("model.orderBy", onEvent.bind(this));
                $scope.$watch("model.onlyMine", onEvent.bind(this));
                $scope.$watch("model.includeFinished", onEvent.bind(this));

                this.isAuth = $identityService.isAuthenticated();
                $timeout(function () {
                    return _this.updateTrips();
                });
            }
            TripsController.prototype.createTrip = function () {
                this.$location.path("/trips/create");
            };

            TripsController.prototype.updateTrips = function () {
                var _this = this;
                if (!this.$identityService.isAuthenticated()) {
                    this.$appService.getLatestAvailableTrips().then(function (trips) {
                        return _this.trips = trips.data;
                    });
                } else if (this.page > 0) {
                    this.$appService.getTrips(this.page, this.from, this.to, this.sortBy.value, this.orderBy.value, this.onlyMine, this.includeFinished).then(function (trips) {
                        return _this.trips = trips.data;
                    });
                }
            };
            return TripsController;
        })(Controllers.BaseController);
        Controllers.TripsController = TripsController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=tripsController.js.map
