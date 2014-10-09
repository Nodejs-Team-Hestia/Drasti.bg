module App.Controllers {
	export class UserInfoController extends BaseController {
		public userInfo: UserInfo;

		constructor($scope: IScope<UserInfoController>,
			private $appService: Services.AppService) {
			super($scope);

			this.$appService.getUserInfo()
				.then((userInfo) => {
					this.userInfo = userInfo.data;
				});
		}
	}
}