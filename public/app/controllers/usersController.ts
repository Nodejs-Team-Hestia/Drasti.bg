module App.Controllers {
	export class UsersController extends BaseController {
		public users: Array<User>;
		public filter: string;
		public page: number;

		constructor($scope: IScope<UsersController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $identityService: Services.IdentityService,
			$timeout: ng.ITimeoutService) {
			super($scope);

			this.filter = "";

			var onEvent = (newValue, oldValue) => {
				if (newValue !== oldValue) {
					this.update();
				}
			};

			$scope.$watch("model.filter", onEvent.bind(this));
			$scope.$watch("model.page", onEvent.bind(this));

			$timeout(() => this.update());
		}

		private update() {
			if (!this.$identityService.isAuthenticated()) {
				this.$appService.getUsers()
					.then((users) => this.users = users.data);
			}
			else if (this.page > 0) {
				this.$appService.getUsers(this.page, this.filter)
					.then((users) => this.users = users.data);
			}
		}
	}
}