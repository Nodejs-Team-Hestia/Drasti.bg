module App.Controllers {
	export class TripsController extends BaseController {
		public trips: Array<Trip>;

		public fromCities: Array<any>;
		public from: string;
		public toCities: Array<any>;
		public to: string;

		public sortByCondition: Array<any>;
		public sortBy: { name: string; value: string };
		public orderByCondition: Array<any>;
		public orderBy: { name: string; value: string };

		public onlyMine: boolean;
		public includeFinished: boolean;
		public page: number;
		public showIsMine: boolean;

		public isAuth: boolean;

		constructor($scope: IScope<TripsController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $identityService: Services.IdentityService,
			$timeout: ng.ITimeoutService) {
			super($scope);

			this.showIsMine = $identityService.isAuthenticated();

			this.sortByCondition = [
				{ name: "Date", value: "date" },
				{ name: "Driver", value: "driver" },
				{ name: "Seats", value: "seats" },
				{ name: "From", value: "from" },
				{ name: "To", value: "to" },
			];
			this.sortBy = this.sortByCondition[0];

			this.orderByCondition = [
				{ name: "Asc", value: "asc" },
				{ name: "Desc", value: "desc" }
			];
			this.orderBy = this.orderByCondition[0];

			this.$appService.getCities()
				.then((cities) => {
					cities.data.unshift("");
					this.fromCities = cities.data;
					this.toCities = cities.data;
				});

			this.from = "";
			this.to = "";

			var onEvent = (newValue, oldValue) => {
				if (newValue !== oldValue) {
					this.updateTrips();
				}
			};

			$scope.$watch("model.page", onEvent.bind(this));
			$scope.$watch("model.from", onEvent.bind(this));
			$scope.$watch("model.to", onEvent.bind(this));
			$scope.$watch("model.sortBy", onEvent.bind(this));
			$scope.$watch("model.orderBy", onEvent.bind(this));
			$scope.$watch("model.onlyMine", onEvent.bind(this));
			$scope.$watch("model.includeFinished", onEvent.bind(this));

			this.isAuth = $identityService.isAuthenticated();
			$timeout(() => this.updateTrips());
		}

		public createTrip() {
			this.$location.path("/trips/create");
		}

		private updateTrips() {
			if (!this.$identityService.isAuthenticated()) {
				this.$appService.getLatestAvailableTrips()
					.then((trips) => this.trips = trips.data);
			}
			else if (this.page > 0) {
				this.$appService.getTrips(this.page, this.from, this.to, this.sortBy.value, this.orderBy.value, this.onlyMine, this.includeFinished)
					.then((trips) => this.trips = trips.data);
			}
		}
	}
}