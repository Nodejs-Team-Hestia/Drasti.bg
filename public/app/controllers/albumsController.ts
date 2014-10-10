module App.Controllers {
	export class AlbumsController extends BaseController {
		public albums: Array<any>;
		public album: any;
		public photo: any;
		public filter: string;
		public page: number;
		public create: Function;
		public add: Function;

		public showPageAndFilter: boolean;

		constructor($scope: IScope<UsersController>,
			private $location: ng.ILocationService,
			private $notifyService: Services.NotifyService,
			private $appService: Services.AppService,
			private $identityService: Services.IdentityService,
			private $routeParams,
			$timeout: ng.ITimeoutService) {
			super($scope);

			this.album = { _id: $routeParams["id"] };
			this.create = this._create.bind(this);
			this.add = this._add.bind(this);
			this.filter = "";

			var onEvent = (newValue, oldValue) => {
				if (newValue !== oldValue) {
					this.update();
				}
			};

			$scope.$watch("model.filter", onEvent.bind(this));
			$scope.$watch("model.page", onEvent.bind(this));

			if (this.album._id) {
				this.$appService.getAlbum(this.album._id)
					.success((album: any) => this.album = album.data);
			}
			else {
				this.showPageAndFilter = true;
				$timeout(() => this.update());
			}
		}

		private update() {
			if (this.page > 0) {
				this.$appService.getAlbums(this.page, this.filter)
					.then((users) => this.albums = users.data);
			}
		}

		private _create(form) {
			this.$appService.createAlbum(this.album)
				.then(() => {
					this.$location.path("/albums");
				});
		}

		private _add(form) {
			this.$appService.addPhotoToAlbum(this.album._id, this.photo)
				.then(() => {
					this.$location.path("/albums/this.album._id");
				});
		}
	}
}