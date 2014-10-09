module App.Controllers {
	export class DriversController extends BaseController {
		public drivers: Array<Driver>;
		public filter: string;
		public page: number;
		public isAuth: boolean;

		constructor($scope: IScope<DriversController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $identityService: Services.IdentityService,
			$timeout: ng.ITimeoutService) {
			super($scope);

			this.filter = "";

			var onEvent = (newValue, oldValue) => {
				if (newValue !== oldValue) {
					this.updateDrivers();
				}
			};

			$scope.$watch("model.filter", onEvent.bind(this));
			$scope.$watch("model.page", onEvent.bind(this));

			this.isAuth = $identityService.isAuthenticated();
			$timeout(() => this.updateDrivers());
		}

		private updateDrivers() {
			if (!this.$identityService.isAuthenticated()) {
				this.$appService.getDrivers()
					.then((drivers) => this.drivers = drivers.data);
			}
			else if (this.page > 0) {
				this.$appService.getDrivers(this.page, this.filter)
					.then((drivers) => this.drivers = drivers.data);
			}
		}
	}
}