module App.Services {
	export class AppService {
		public static cachedStats: Stats;

		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private $authService: AuthService,
			private $notifyService: NotifyService,
			private baseUrl: string,
			private $identityService: Services.IdentityService) { }

		public getStats() {
			return <ng.IHttpPromise<Stats>>this._getRequest("api/stats")
				.success((stats: any) => {
					AppService.cachedStats = stats;
				});
		}

		public getCities() {
			return <ng.IHttpPromise<Array<string>>>this._getRequest("api/cities");
		}

		public getDrivers(page?: number, filter?: string) {
			var url = "api/drivers?";

			if (page) {
				url += "page=" + page + "&";
			}

			if (filter && filter !== "") {
				url += "username=" + filter;
			}

			return <ng.IHttpPromise<Array<Driver>>>this._getRequest(url);
		}

		public getDriverDetails(id: string) {
			var url = "api/drivers/" + id;
			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<Driver>>this._getRequest(url);
			}
		}

		public getTripDetails(id: string) {
			var url = "api/trips/" + id;
			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<Trip>>this._getRequest(url);
			}
		}

		public getLatestAvailableTrips() {
			return <ng.IHttpPromise<Array<Trip>>>this._getRequest("api/trips");
		}

		public getUserInfo() {
			var url = "api/users/userInfo";
			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<UserInfo>>this._getRequest(url);
			}
		}

		public getTrips(page: number,
			from: string,
			to: string,
			orderBy: string,
			orderType: string,
			onlyMine: boolean,
			finished: boolean) {
			var url = "api/trips?";
			if (page) {
				url += "page=" + page + "&";
			}

			if (from) {
				url += "from=" + from + "&";
			}

			if (to) {
				url += "to=" + to + "&";
			}

			if (orderBy) {
				url += "orderBy=" + orderBy + "&";
			}

			if (orderType) {
				url += "orderType=" + orderType + "&";
			}

			if (onlyMine) {
				url += "onlyMine=" + onlyMine + "&";
			}

			if (finished) {
				url += "finished=" + finished;
			}

			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<Array<Trip>>>this._getRequest(url);
			}
		}

		public joinTrip(trip: Trip) {
			var url = "api/trips/" + trip.id;
			var data: TripData = {
				from: trip.from,
				to: trip.to,
				availableSeats: trip.numberOfFreeSeats,
				departureTime: trip.departureDate
			}

			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<Trip>>this._putRequest(url, data);
			}
		}

		public createTrip(tripData: TripData) {
			var url = "api/trips/";

			if (this.$identityService.isAuthenticated()) {
				return <ng.IHttpPromise<Trip>>this._postRequest(url, tripData);
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