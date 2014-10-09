var App;
(function (App) {
    (function (Controllers) {
        var BaseController = (function () {
            function BaseController($scope) {
                this.$scope = $scope;
                $scope.model = this;
            }
            return BaseController;
        })();
        Controllers.BaseController = BaseController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=baseController.js.map
