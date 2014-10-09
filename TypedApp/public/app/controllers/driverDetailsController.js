var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var DriverDetailsController = (function (_super) {
            __extends(DriverDetailsController, _super);
            function DriverDetailsController($scope, $location, $notifyService, $appService, $identityService, $routeParams) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$identityService = $identityService;
                this.$routeParams = $routeParams;

                this.sortByCondition = [
                    { name: "None", value: "driverName" },
                    { name: "From", value: "from" },
                    { name: "To", value: "to" },
                    { name: "DepartureTime", value: "departureTime" }
                ];
                this.sortBy = this.sortByCondition[0];

                this.onlyMine = false;
                this.onlyMeAsDriverTrips = false;

                this.$appService.getDriverDetails(this.$routeParams.id).then(function (driver) {
                    _this.driver = driver.data;
                    _this.trips = _this.driver.trips;
                });
            }
            return DriverDetailsController;
        })(Controllers.BaseController);
        Controllers.DriverDetailsController = DriverDetailsController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=driverDetailsController.js.map
