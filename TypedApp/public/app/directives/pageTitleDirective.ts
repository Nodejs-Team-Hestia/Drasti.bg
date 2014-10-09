module App.Directives {
	drastiBg.directive("pageTitle", () => {
		return {
			restrict: "A",
			scope: {
				title: "@"
			},
			replace: true,
			templateUrl: "app/templates/directives/pageTitle.html",
			link: (scope, element: ng.IAugmentedJQuery, attrs) => { }
		};
	});
}