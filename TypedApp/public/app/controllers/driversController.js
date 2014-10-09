var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var DriversController = (function (_super) {
            __extends(DriversController, _super);
            function DriversController($scope, $location, $notifyService, $appService, $identityService, $timeout) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$identityService = $identityService;

                this.filter = "";

                var onEvent = function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        _this.updateDrivers();
                    }
                };

                $scope.$watch("model.filter", onEvent.bind(this));
                $scope.$watch("model.page", onEvent.bind(this));

                this.isAuth = $identityService.isAuthenticated();
                $timeout(function () {
                    return _this.updateDrivers();
                });
            }
            DriversController.prototype.updateDrivers = function () {
                var _this = this;
                if (!this.$identityService.isAuthenticated()) {
                    this.$appService.getDrivers().then(function (drivers) {
                        return _this.drivers = drivers.data;
                    });
                } else if (this.page > 0) {
                    this.$appService.getDrivers(this.page, this.filter).then(function (drivers) {
                        return _this.drivers = drivers.data;
                    });
                }
            };
            return DriversController;
        })(Controllers.BaseController);
        Controllers.DriversController = DriversController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=driversController.js.map
