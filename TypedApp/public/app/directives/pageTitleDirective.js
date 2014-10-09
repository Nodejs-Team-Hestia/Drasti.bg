var App;
(function (App) {
    (function (Directives) {
        drastiBg.directive("pageTitle", function () {
            return {
                restrict: "A",
                scope: {
                    title: "@"
                },
                replace: true,
                templateUrl: "app/templates/directives/pageTitle.html",
                link: function (scope, element, attrs) {
                }
            };
        });
    })(App.Directives || (App.Directives = {}));
    var Directives = App.Directives;
})(App || (App = {}));
//# sourceMappingURL=pageTitleDirective.js.map
