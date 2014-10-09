var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var HomeController = (function (_super) {
            __extends(HomeController, _super);
            function HomeController($scope, $location, $notifyService, $appService) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;

                $appService.getLatestAvailableTrips().then(function (trips) {
                    return _this.trips = trips.data;
                });

                if (App.Services.AppService.cachedStats) {
                    this.stats = App.Services.AppService.cachedStats;
                } else {
                    $appService.getStats().then(function (stats) {
                        return _this.stats = stats.data;
                    });
                }

                $appService.getDrivers().then(function (drivers) {
                    return _this.drivers = drivers.data;
                });
            }
            return HomeController;
        })(Controllers.BaseController);
        Controllers.HomeController = HomeController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=homeController.js.map
