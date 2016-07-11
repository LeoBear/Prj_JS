/*


                                                                          */


var calcApplication = angular.module('calcApplication', ['ngRoute']);

/*________________________________________________________________________*/

calcApplication.config(function($routeProvider){

	$routeProvider

		.when('/student/', {
			templateUrl: 'calcStudent.html',
			controller: 'studentCalcController'
		})

		.when('/advanced/', {
			templateUrl: 'calcAdvanced.html',
			controller: 'advancedCalcController'
		})
});
/*___________________________________________________________________*/

// --- Create model of numbers.
calcApplication.factory('serviceCalcDigits', function() {
	return{
		modelDigit : {
			digits: [
				{ dig: "1"}, { dig: "2"}, { dig: "3"},
				{ dig: "4"}, { dig: "5"}, { dig: "6"},
				{ dig: "7"}, { dig: "8"}, { dig: "9"},
			]
		}
	};
});
/*________________________________________________________________________*/

