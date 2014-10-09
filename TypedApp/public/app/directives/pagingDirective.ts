module App.Directives {
	drastiBg.directive("paging", () => {
		return {
			restrict: "A",
			scope: false,
			replace: true,
			templateUrl: "app/templates/directives/paging.html",
			link: function (scope, element: ng.IAugmentedJQuery, attrs) {
				scope.model.page = 1;

				scope.model.goToNext = () => {
					scope.model.page++;
				};

				scope.model.goToPrevious = () => {
					if (scope.model.page > 1) {
						scope.model.page--;
					}
				};
			}
		};
	});
}