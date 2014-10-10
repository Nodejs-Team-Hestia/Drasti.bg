module App.Services {
	export class NotifyService {
		constructor(private toastr: Toastr) { }

		public success(msg) {
			if (!msg) return;

			this.toastr.success(msg);
		}

		public error(msg) {
			if (!msg) return;

			if (msg.modelState) {
				for (var key in msg.modelState) {
					if (msg.modelState.hasOwnProperty(key)) {
						this.toastr.error(msg.modelState[key]);
					}
				}
			}
			else if (msg.message) {
				this.toastr.error(msg.message);
			}
			else {
				this.toastr.error(msg);
			}
		}
	}
}