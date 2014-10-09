declare module App {
	export interface IScope<TModel> extends ng.IScope {
		model: TModel;
	}

	export interface AuthData {
		access_token: string;
		userName: string;
	}

	export interface UserInfo {
		password: string;
		confirmPassword: string;
		email: string;
		isDriver: boolean;
		car: string;
	}

	export interface Trip {
		id: string;
		driverId: string;
		driverName: string;
		from: string;
		to: string;
		departureDate: string;
		numberOfFreeSeats: number;
		isMine: boolean;
		passengers: Array<string>;
	}

	export interface TripData {
		from: string;
		to: string;
		availableSeats: number;
		departureTime: string;
	}

	export interface Stats {
		trips: number;
		finishedTrips: number;
		users: number;
		drivers: number;
	}

	export interface Driver {
		id: string;
		name: string;
		numberOfUpcomingTrips: number;
		numberOfTotalTrips: number;
		trips: Array<Trip>;
	}
}