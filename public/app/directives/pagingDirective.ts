module App.Directives {
	drastiBg.directive("paging", () => {
		return {
			restrict: "A",
			scope: false,
			replace: true,
			templateUrl: "/templates/paging",
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