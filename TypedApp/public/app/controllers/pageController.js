var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var PageController = (function (_super) {
            __extends(PageController, _super);
            function PageController($scope, $location, $notifyService, footer, $identityService, $authService) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.footer = footer;
                this.$identityService = $identityService;
                this.$authService = $authService;

                $scope.$watch($identityService.isAuthenticated, function (newValue) {
                    _this.user = {
                        isAuth: newValue,
                        username: newValue ? $identityService.getCurrentUser().userName : undefined
                    };
                });
            }
            PageController.prototype.logout = function () {
                var _this = this;
                this.$authService.logout().then(function () {
                    _this.$notifyService.success('Successfully logged out.');
                    _this.$location.path('/');
                });
            };
            return PageController;
        })(Controllers.BaseController);
        Controllers.PageController = PageController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=pageController.js.map
