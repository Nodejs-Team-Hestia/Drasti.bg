module App.Controllers {
	export class HomeController extends BaseController {
		public users: Array<User>;

		constructor($scope: IScope<HomeController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService) {
			super($scope);

			$appService.getUsers().then((users) => this.users = users.data);
		}
	}
}