module App.Controllers {
	export class PageController extends BaseController {
		public user: { isAuth: boolean; username: string };
		public time: Date;

		constructor($scope: IScope<PageController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			public footer: string,
			private $identityService: Services.IdentityService,
			private $authService: Services.AuthService,
			$window: ng.IWindowService) {
			super($scope);

			$scope.$watch($identityService.isAuthenticated, (newValue) => {
				this.user = {
					isAuth: newValue,
					username: newValue ? $identityService.currentUser.username : undefined
				}
			});

			var socket = $window["io"]();

			socket.on("time", (date) => {
				this.time = new Date(date);
				if (!$scope.$$phase) {
					$scope.$digest();
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