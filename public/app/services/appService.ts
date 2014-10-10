module App.Services {
	export class AppService {
		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private $authService: AuthService,
			private $notifyService: NotifyService,
			private baseUrl: string,
			private $identityService: Services.IdentityService) { }

		public getUsers(page?: number, filter?: string) {
			var url = "api/users?";

			if (page) {
				url += "page=" + page + "&";
			}

			if (filter && filter !== "") {
				url += "username=" + filter;
			}

			return <ng.IHttpPromise<Array<User>>>this._getRequest(url);
		}

		public getAlbums(page?: number, filter?: string) {
			var url = this.$identityService.currentUser._id + "/albums?";

			if (page) {
				url += "page=" + page + "&";
			}

			if (filter && filter !== "") {
				url += "filter=" + filter;
			}

			return <ng.IHttpPromise<Array<User>>>this._getRequest(url);
		}

		public getAlbum(albumId: string) {
			var url = this.$identityService.currentUser._id + "/albums/" + albumId;
			return this._getRequest(url);
		}

		public createAlbum(album: any) {
			var url = this.$identityService.currentUser._id + "/albums";
			return this._postRequest(url, album);
		}

		public updateAlbum(album: any) {
			var url = this.$identityService.currentUser._id + "/albums";
			return this._putRequest(url, album);
		}

		public addPhotoToAlbum(albumId: string, photo: any) {
			var url = this.$identityService.currentUser._id + "/" + albumId;
			return this._postRequest(url, photo);
		}

		public getUserDetails(id: string) {
			var url = "api/drivers/" + id;
			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<User>>this._getRequest(url);
			}
		}

		private _postRequest(address: string, data) {
			var promise = this.$http.post(this.baseUrl + address, data);
			promise.error(error => this.$notifyService.error(error));

			return promise;
		}

		private _putRequest(address: string, data) {
			var promise = this.$http.put(this.baseUrl + address, data);
			promise.error(error => this.$notifyService.error(error));

			return promise;
		}

		private _getRequest(address: string) {
			var promise = this.$http.get(this.baseUrl + address);
			promise.error(error => this.$notifyService.error(error));

			return promise;
		}
	}
}