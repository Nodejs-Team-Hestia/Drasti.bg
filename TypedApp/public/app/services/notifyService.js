var App;
(function (App) {
    (function (Services) {
        var NotifyService = (function () {
            function NotifyService(toastr) {
                this.toastr = toastr;
            }
            NotifyService.prototype.success = function (msg) {
                this.toastr.success(msg);
            };

            NotifyService.prototype.error = function (msg) {
                if (msg.modelState) {
                    for (var key in msg.modelState) {
                        if (msg.modelState.hasOwnProperty(key)) {
                            this.toastr.error(msg.modelState[key]);
                        }
                    }
                } else if (msg.message) {
                    this.toastr.error(msg.message);
                } else {
                    this.toastr.error(msg);
                }
            };
            return NotifyService;
        })();
        Services.NotifyService = NotifyService;
    })(App.Services || (App.Services = {}));
    var Services = App.Services;
})(App || (App = {}));
//# sourceMappingURL=notifyService.js.map
