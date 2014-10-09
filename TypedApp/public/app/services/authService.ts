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

			this.$http.post(this._usersApiUrl + 'register', userInfo)
				.success((data) => {
					deferred.resolve();
				})
				.error((error) => {
					deferred.reject(error);
				});

			return deferred.promise;
		}

		public login(userInfo: UserInfo) {
			var data = "grant_type=password&username=" + userInfo.email + "&password=" + userInfo.password;
			var deferred = this.$q.defer();

			this.$http.post(this._usersApiUrl + "login", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
				.success((response: AuthData) => {
					if (response.access_token) {
						this.$identityService.setCurrentUser(response);
						deferred.resolve(true);
					} else {
						deferred.reject(false);
					}
				});

			return deferred.promise;
		}

		public logout() {
			var deferred = this.$q.defer();
			this.$http.post(this._usersApiUrl + 'logout', null)
				.success(() => {
					this.$identityService.setCurrentUser(undefined);
					deferred.resolve();
				});

			return deferred.promise;
		}
	}
}