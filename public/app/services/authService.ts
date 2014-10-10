module App.Services {
	export class AuthService {
		private _usersApiUrl: string;

		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private $identityService: IdentityService,
			private baseUrl: string) {
			this._usersApiUrl = this.baseUrl + "api/users/";
		}

		public register(userInfo: UserInfo) {
			var deferred = this.$q.defer();

			this.$http.post(this._usersApiUrl, userInfo)
				.success((data) => {
					this.$identityService.setCurrentUser(data);
					deferred.resolve();
				})
				.error((error) => {
					deferred.reject(error);
				});

			return deferred.promise;
		}

		public login(userInfo: UserInfo) {
			var deferred = this.$q.defer();

			this.$http.post(this.baseUrl + "login", userInfo)
				.success((response: any) => {
					if (response.user) {
						console.log(response.user);
						this.$identityService.setCurrentUser(response.user);
						deferred.resolve(true);
					} else {
						deferred.reject(false);
					}
				});

			return deferred.promise;
		}

		public logout() {
			var deferred = this.$q.defer();
			this.$http.post(this.baseUrl + 'logout', null)
				.success(() => {
					this.$identityService.setCurrentUser(undefined);
					deferred.resolve();
				});

			return deferred.promise;
		}
	}
}