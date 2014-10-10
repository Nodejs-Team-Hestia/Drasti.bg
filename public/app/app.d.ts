declare module App {
	export interface IScope<TModel> extends ng.IScope {
		model: TModel;
	}

	export interface AuthData {
		_id?: string;
		username?: string;
		email?: string;
		firstName?: string;
		lastName?: string;
		dateOfBirth?: Date;
		location?: {
			city?: string;
			country?: string;
		};
		isOnline?: boolean;
		salt?: string;
		hashPass?: string;
		roles?: Array<string>;
		albums?: Array<any>;
		friends?: Array<any>;
		messages?: Array<any>;
		authenticate?: (password: string) => boolean;
	}

	export interface UserInfo {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
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

	export interface User {
		id: string;
		name: string;
		numberOfUpcomingTrips: number;
		numberOfTotalTrips: number;
		trips: Array<Trip>;
	}
}