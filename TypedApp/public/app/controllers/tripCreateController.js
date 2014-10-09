var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var TripCreateController = (function (_super) {
            __extends(TripCreateController, _super);
            function TripCreateController($scope, $location, $notifyService, $appService, $routeParams) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$routeParams = $routeParams;

                this.$appService.getCities().then(function (cities) {
                    _this.fromCities = cities.data;
                    _this.toCities = cities.data;
                });
            }
            TripCreateController.prototype.createTrip = function (createForm) {
                var _this = this;
                var tripData = {
                    from: this.from,
                    to: this.to,
                    availableSeats: this.availableSeats,
                    departureTime: this.departureTime
                };

                this.$appService.createTrip(tripData).then(function (trip) {
                    _this.$location.path("/trips/" + trip.data.id);
                });
            };
            return TripCreateController;
        })(Controllers.BaseController);
        Controllers.TripCreateController = TripCreateController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=tripCreateController.js.map
