var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var UserDetailsController = (function (_super) {
            __extends(UserDetailsController, _super);
            function UserDetailsController($scope, $location, $notifyService, $appService, $identityService, $routeParams) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$identityService = $identityService;
                this.$routeParams = $routeParams;

                this.$appService.getUserDetails(this.$routeParams.id).then(function (user) {
                    _this.user = user.data;
                });
            }
            return UserDetailsController;
        })(Controllers.BaseController);
        Controllers.UserDetailsController = UserDetailsController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=userDetailsController.js.map
