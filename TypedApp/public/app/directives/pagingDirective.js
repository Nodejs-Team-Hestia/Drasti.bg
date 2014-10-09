var App;
(function (App) {
    (function (Directives) {
        drastiBg.directive("paging", function () {
            return {
                restrict: "A",
                scope: false,
                replace: true,
                templateUrl: "app/templates/directives/paging.html",
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
