var App;
(function (App) {
    (function (Directives) {
        drastiBg.directive("pageAction", function () {
            return {
                restrict: "A",
                scope: {
                    action: "=",
                    actionName: "@",
                    form: "="
                },
                replace: true,
                templateUrl: "/templates/pageAction",
                link: function (scope, element, attrs) {
                    scope.onAction = function () {
                        scope.action.call(scope.$parent.model, scope.form);
                    };
                }
            };
        });
    })(App.Directives || (App.Directives = {}));
    var Directives = App.Directives;
})(App || (App = {}));
//# sourceMappingURL=pageAction.js.map
