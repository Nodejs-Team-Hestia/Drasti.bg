module App.Controllers {
	export class DriverDetailsController extends BaseController {
		public driver: Driver;
		public trips: Array<Trip>;

		public onlyMine: boolean;
		public onlyMeAsDriverTrips: boolean;

		public sortByCondition: Array<any>;
		public sortBy: { name: string; value: string };

		constructor($scope: IScope<DriverDetailsController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $identityService: Services.IdentityService,
			private $routeParams) {
			super($scope);

			this.sortByCondition = [
				{ name: "None", value: "driverName" },
				{ name: "From", value: "from" },
				{ name: "To", value: "to" },
				{ name: "DepartureTime", value: "departureTime" }
			];
			this.sortBy = this.sortByCondition[0];

			this.onlyMine = false;
			this.onlyMeAsDriverTrips = false;

			this.$appService.getDriverDetails(this.$routeParams.id)
				.then((driver) => {
					this.driver = driver.data;
					this.trips = this.driver.trips;
				});
		}
	}
}