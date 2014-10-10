var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (Controllers) {
        var AlbumsController = (function (_super) {
            __extends(AlbumsController, _super);
            function AlbumsController($scope, $location, $notifyService, $appService, $identityService, $routeParams, $timeout) {
                var _this = this;
                _super.call(this, $scope);
                this.$location = $location;
                this.$notifyService = $notifyService;
                this.$appService = $appService;
                this.$identityService = $identityService;
                this.$routeParams = $routeParams;

                this.album = { _id: $routeParams["id"] };
                this.create = this._create.bind(this);
                this.add = this._add.bind(this);
                this.filter = "";

                var onEvent = function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        _this.update();
                    }
                };

                $scope.$watch("model.filter", onEvent.bind(this));
                $scope.$watch("model.page", onEvent.bind(this));

                if (this.album._id) {
                    this.$appService.getAlbum(this.album._id).success(function (album) {
                        return _this.album = album.data;
                    });
                } else {
                    this.showPageAndFilter = true;
                    $timeout(function () {
                        return _this.update();
                    });
                }
            }
            AlbumsController.prototype.update = function () {
                var _this = this;
                if (this.page > 0) {
                    this.$appService.getAlbums(this.page, this.filter).then(function (users) {
                        return _this.albums = users.data;
                    });
                }
            };

            AlbumsController.prototype._create = function (form) {
                var _this = this;
                this.$appService.createAlbum(this.album).then(function () {
                    _this.$location.path("/albums");
                });
            };

            AlbumsController.prototype._add = function (form) {
                var _this = this;
                this.$appService.addPhotoToAlbum(this.album._id, this.photo).then(function () {
                    _this.$location.path("/albums/this.album._id");
                });
            };
            return AlbumsController;
        })(Controllers.BaseController);
        Controllers.AlbumsController = AlbumsController;
    })(App.Controllers || (App.Controllers = {}));
    var Controllers = App.Controllers;
})(App || (App = {}));
//# sourceMappingURL=albumsController.js.map
