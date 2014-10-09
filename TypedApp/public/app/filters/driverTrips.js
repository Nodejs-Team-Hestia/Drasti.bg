var App;
(function (App) {
    (function (Filters) {
        drastiBg.filter('driverTrips', function () {
            return function (items, model) {
                if (items && model && model.onlyMeAsDriverTrips) {
                    var filtered = [];
                    angular.forEach(items, function (item) {
                        if (model.driver.id === item.driverId) {
                            filtered.push(item);
                        }
                    });

                    return filtered;
                }

                return items;
            };
        });
    })(App.Filters || (App.Filters = {}));
    var Filters = App.Filters;
})(App || (App = {}));
//# sourceMappingURL=driverTrips.js.map
