module App.Services {
	export class AuthInterceptor {
		public request: (config: ng.IRequestConfig) => ng.IRequestConfig;
		public responseError: (rejection) => void;

		constructor(
			private $q: ng.IQService,
			private $location: ng.ILocationService,
			private $identityService: IdentityService,
			private $notifyService: NotifyService) {
			this.request = this._request.bind(this);
			this.responseError = this._responseError.bind(this);
		}

		private _request(config: ng.IRequestConfig) {
			config.headers = config.headers || {};

			var authData = this.$identityService.getCurrentUser();
			if (authData) {
				config.headers.Authorization = 'Bearer ' + authData.access_token;
			}

			return config;
		}

		private _responseError(rejection) {
			if (rejection.status === 401) {
				this.$notifyService.error('Not authorizated.');
			} else if (rejection.status === 404) {
				this.$notifyService.error('Not found.');
			}
			else {
				var message = rejection.status;
				if (rejection.data.error_description) {
					message = rejection.data.error_description;
				}

				this.$notifyService.error('Error Status: ' + message);
			}
			return this.$q.reject(rejection);
		}
	}
}