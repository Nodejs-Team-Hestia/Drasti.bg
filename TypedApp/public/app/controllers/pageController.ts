module App.Controllers {
	export class PageController extends BaseController {
		public user: { isAuth: boolean; username: string };

		constructor($scope: IScope<PageController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			public footer: string,
			private $identityService: Services.IdentityService,
			private $authService: Services.AuthService) {
			super($scope);

			$scope.$watch($identityService.isAuthenticated, (newValue) => {
				this.user = {
					isAuth: newValue,
					username: newValue ? $identityService.getCurrentUser().userName : undefined
				}
			});
		}

		public logout() {
			this.$authService.logout().then(() => {
				this.$notifyService.success('Successfully logged out.')
                this.$location.path('/');
			});
		}
	}
}