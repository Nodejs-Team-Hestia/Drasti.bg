module App.Directives {
	drastiBg.directive("pageTitle", () => {
		return {
			restrict: "A",
			scope: {
				title: "@"
			},
			replace: true,
			templateUrl: "/templates/pageTitle",
			link: (scope, element: ng.IAugmentedJQuery, attrs) => { }
		};
	});
}