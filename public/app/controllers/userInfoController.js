﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var UserInfoController = (function (_super) {
            __extends(UserInfoController, _super);
            function UserInfoController($scope, $appService, $identityService) {
                _super.call(this, $scope);
                this.$appService = $appService;

                this.userInfo = $identityService.currentUser;
            }
            return UserInfoController;
        })(Controllers.BaseController);
        Controllers.UserInfoController = UserInfoController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=userInfoController.js.map
