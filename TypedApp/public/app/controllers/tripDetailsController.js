var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var TripDetailsController = (function (_super) {
            __extends(TripDetailsController, _super);
            function TripDetailsController($scope, $location, $notifyService, $appService, $routeParams, $identityService) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$routeParams = $routeParams;
                this.$identityService = $identityService;

                this.$appService.getTripDetails(this.$routeParams.id).then(function (trip) {
                    _this.trip = trip.data;
                });
            }
            TripDetailsController.prototype.joinTrip = function () {
                var _this = this;
                this.$appService.joinTrip(this.trip).then(function (trip) {
                    _this.trip = trip.data;
                    _this.$notifyService.success("You have joined the trip!");
                });
            };
            return TripDetailsController;
        })(Controllers.BaseController);
        Controllers.TripDetailsController = TripDetailsController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=tripDetailsController.js.map
