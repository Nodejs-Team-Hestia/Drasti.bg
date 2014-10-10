module App.Services {
	export class IdentityService {
		public currentUser: AuthData;

		public isAuthenticated: () => boolean;
		public setCurrentUser: (user: AuthData) => void;

		constructor($window) {
			if ($window.bootstrappedUserObject) {
				this.currentUser = $window.bootstrappedUserObject;
			}
			this.isAuthenticated = this._isAuthenticated.bind(this);
			this.setCurrentUser = this._setCurrentUser.bind(this);
		}

		private _setCurrentUser(user: AuthData) {
			this.currentUser = user;
		}

		private _isAuthenticated() {
			return !!this.currentUser;
		}
	}
}