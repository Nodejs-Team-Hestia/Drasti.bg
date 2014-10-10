module App.Controllers {
	export class UserDetailsController extends BaseController {
		public user: User;

		constructor($scope: IScope<UserDetailsController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $identityService: Services.IdentityService,
			private $routeParams) {
			super($scope);

			this.$appService.getUserDetails(this.$routeParams.id)
				.then((user) => {
					this.user = user.data;
				});
		}
	}
}