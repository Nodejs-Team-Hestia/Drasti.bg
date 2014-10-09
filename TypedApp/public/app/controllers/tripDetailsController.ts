module App.Controllers {
	export class TripDetailsController extends BaseController {
		public trip: Trip;

		constructor($scope: IScope<TripDetailsController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $routeParams,
			private $identityService: Services.IdentityService) {
			super($scope);

			this.$appService.getTripDetails(this.$routeParams.id)
				.then((trip) => {
					this.trip = trip.data;
				});
		}

		public joinTrip() {
			this.$appService.joinTrip(this.trip).then((trip) => {
				this.trip = trip.data;
				this.$notifyService.success("You have joined the trip!");
			});
		}
	}
}