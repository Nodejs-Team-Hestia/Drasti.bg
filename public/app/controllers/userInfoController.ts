module App.Controllers {
	export class UserInfoController extends BaseController {
		public userInfo: AuthData;

		constructor($scope: IScope<UserInfoController>,
			private $appService: Services.AppService,
			$identityService: Services.IdentityService) {
			super($scope);

			this.userInfo = $identityService.currentUser;
		}
	}
}