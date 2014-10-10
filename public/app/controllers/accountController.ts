module App.Controllers {
	export class AccountController extends BaseController {
		public userInfo: UserInfo;

		constructor($scope: IScope<AccountController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $authService: Services.AuthService) {
			super($scope);
		}

		public login(loginForm) {
			if (loginForm.$valid) {
				this.$authService.login(this.userInfo)
					.then((token) => {
						this.$notifyService.success('Successfully logged in.');
						this.$location.path('/');
					}, (error) => {
						this.$notifyService.error(error.error_description);
					});
			}
		}

		public register(regForm) {
			if (regForm.$valid) {
				if (this.userInfo.password !== this.userInfo.confirmPassword) {
					this.$notifyService.error("Password and Confirm password must match!");
				}
				else {
					this.$authService.register(this.userInfo).then(
						() => {
							this.$location.path('/home');
							this.$notifyService.success('Successfully registered.');
						},
						error => this.$notifyService.error(error));
				}
			}
		}
	}
}