module App.Controllers {
	export class TripCreateController extends BaseController {
		public fromCities: Array<any>;
		public from: string;
		public toCities: Array<any>;
		public to: string;

		public availableSeats: number;
		public departureTime: string;

		constructor($scope: IScope<TripCreateController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $routeParams) {
			super($scope);

			this.$appService.getCities()
				.then((cities) => {
					this.fromCities = cities.data;
					this.toCities = cities.data;
				});
		}

		public createTrip(createForm) {
			var tripData: TripData = {
				from: this.from,
				to: this.to,
				availableSeats: this.availableSeats,
				departureTime: this.departureTime
			};

			this.$appService.createTrip(tripData).then((trip) => {
				this.$location.path("/trips/" + trip.data.id);
			});
		}
	}
}