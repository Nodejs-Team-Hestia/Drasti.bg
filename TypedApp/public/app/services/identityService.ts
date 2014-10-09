module App.Services {
	export class IdentityService {
		private currentUser: any;
		private cookieStorageUserKey: string = "CurrentUser";

		public getCurrentUser: () => AuthData;
		public isAuthenticated: () => boolean;
		public setCurrentUser: (user: AuthData) => void;

		constructor(private $cookieStore: ng.cookies.ICookieStoreService) {
			this.getCurrentUser = this._getCurrentUser.bind(this);
			this.isAuthenticated = this._isAuthenticated.bind(this);
			this.setCurrentUser = this._setCurrentUser.bind(this);
		}

		private _getCurrentUser() {
			var savedUser = this.$cookieStore.get(this.cookieStorageUserKey);
			if (savedUser) {
				return savedUser;
			}

			return this.currentUser;
		}

		private _setCurrentUser(user: AuthData) {
			if (user) {
				this.$cookieStore.put(this.cookieStorageUserKey, user);
			}
			else {
				this.$cookieStore.remove(this.cookieStorageUserKey);
			}

			this.currentUser = user;
		}

		private _isAuthenticated() {
			return !!this.getCurrentUser();
		}
	}
}