var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var UsersController = (function (_super) {
            __extends(UsersController, _super);
            function UsersController($scope, $location, $notifyService, $appService, $identityService, $timeout) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$identityService = $identityService;

                this.filter = "";

                var onEvent = function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        _this.update();
                    }
                };

                $scope.$watch("model.filter", onEvent.bind(this));
                $scope.$watch("model.page", onEvent.bind(this));

                $timeout(function () {
                    return _this.update();
                });
            }
            UsersController.prototype.update = function () {
                var _this = this;
                if (!this.$identityService.isAuthenticated()) {
                    this.$appService.getUsers().then(function (users) {
                        return _this.users = users.data;
                    });
                } else if (this.page > 0) {
                    this.$appService.getUsers(this.page, this.filter).then(function (users) {
                        return _this.users = users.data;
                    });
                }
            };
            return UsersController;
        })(Controllers.BaseController);
        Controllers.UsersController = UsersController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=usersController.js.map
