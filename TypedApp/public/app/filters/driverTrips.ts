module App.Filters {
	drastiBg.filter('driverTrips', () => {
		return (items: Array<Trip>, model: { driver: Driver; onlyMeAsDriverTrips: boolean }) => {
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
		}
	});
}