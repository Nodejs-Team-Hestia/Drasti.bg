var App;
(function (App) {
    (function (Directives) {
        drastiBg.directive("paging", function () {
            return {
                restrict: "A",
                scope: false,
                replace: true,
                templateUrl: "/templates/paging",
                link: function (scope, element, attrs) {
                    scope.model.page = 1;

                    scope.model.goToNext = function () {
                        scope.model.page++;
                    };

                    scope.model.goToPrevious = function () {
                        if (scope.model.page > 1) {
                            scope.model.page--;
                        }
                    };
                }
            };
        });
    })(App.Directives || (App.Directives = {}));
    var Directives = App.Directives;
})(App || (App = {}));
//# sourceMappingURL=pagingDirective.js.map
