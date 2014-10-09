var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var AccountController = (function (_super) {
            __extends(AccountController, _super);
            function AccountController($scope, $location, $notifyService, $authService) {
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$authService = $authService;
            }
            AccountController.prototype.login = function (loginForm) {
                var _this = this;
                if (loginForm.$valid) {
                    this.$authService.login(this.userInfo).then(function (token) {
                        _this.$notifyService.success('Successfully logged in.');
                        _this.$location.path('/');
                    }, function (error) {
                        _this.$notifyService.error(error.error_description);
                    });
                }
            };

            AccountController.prototype.register = function (regForm) {
                var _this = this;
                if (regForm.$valid) {
                    if (this.userInfo.password !== this.userInfo.confirmPassword) {
                        this.$notifyService.error("Password and Confirm password must match!");
                    } else if (this.userInfo.isDriver && (!this.userInfo.car || this.userInfo.car.length < 3)) {
                        this.$notifyService.error("The \"Car\" field is required!");
                    } else {
                        this.$authService.register(this.userInfo).then(function () {
                            _this.$location.path('/login');
                            _this.$notifyService.success('Successfully registered.');
                        }, function (error) {
                            return _this.$notifyService.error(error);
                        });
                    }
                }
            };
            return AccountController;
        })(Controllers.BaseController);
        Controllers.AccountController = AccountController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=accountController.js.map
