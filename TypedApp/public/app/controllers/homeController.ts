module App.Controllers {
	export class HomeController extends BaseController {
		public trips: Array<Trip>;
		public drivers: Array<Driver>;
		public stats: Stats;

		constructor($scope: IScope<HomeController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService) {
			super($scope);

			$appService.getLatestAvailableTrips().then((trips) => this.trips = trips.data);

			if (Services.AppService.cachedStats) {
				this.stats = Services.AppService.cachedStats;
			}
			else {
				$appService.getStats().then((stats) => this.stats = stats.data);
			}

			$appService.getDrivers().then((drivers) => this.drivers = drivers.data);
		}
	}
}