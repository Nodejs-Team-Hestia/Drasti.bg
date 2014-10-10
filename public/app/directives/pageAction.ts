module App.Directives {
	drastiBg.directive("pageAction", () => {
		return {
			restrict: "A",
			scope: {
				action: "=",
				actionName: "@",
				form: "="
			},
			replace: true,
			templateUrl: "/templates/pageAction",
			link: function (scope, element: ng.IAugmentedJQuery, attrs) {
				scope.onAction = () => {
					scope.action.call(scope.$parent.model, scope.form);
				}
			}
		};
	});
}