
// --- Create model of calc metadata.
calcApplication.factory('serviceCalcStudentOperation', function() {
	return{
		modelCalcVersions : {
			user: "Home&Student",
			operations: [
				{ name: "+", operation: "'+'", method: "doOperation('+')" },
				{ name: "-", operation: "'-'", method: "doOperation('-')" },
				{ name: "*", operation: "'*'", method: "doOperation('*')" },
				{ name: "/", operation: "'/'", method: "doOperation('/')" }
			]
		}
	};
});
/*___________________________________________________________________*/

// --- Create service with operations.
calcApplication.service('serviceCalc', function(){

	this.add = function(a, b){
		return a + b;
	};
    
	this.subtract = function(a, b){
		return a - b;
	};
    
	this.multiply = function(a, b){
		return a * b;
	};
    
	this.divide = function(a, b){
		return a / b;
	};
});
/*___________________________________________________________________*/

// --- Create AngularJS "controller" for calc module.
calcApplication.controller("studentCalcController", function ($scope,
																serviceCalc,
																serviceCalcLog,
																serviceCalcDigits,
																serviceCalcClickCounter,
																serviceCalcStudentOperation ) {
		
	// Models of the calculator
	$scope.modelCalcVersions = serviceCalcStudentOperation.modelCalcVersions;
	$scope.modelDigit        = serviceCalcDigits.modelDigit;

	$scope.logLines          = serviceCalcLog.logLines;

	// Input data and result of calculation
	$scope.display = '';

	$scope.getFiltered= function(obj, idx){
        obj._index = idx;
		var rest = !(obj._index % 3 );
        return rest;
	}
	
	// Should we append digits to the display?  It depends on whether
	// we've just hit an operation button or a number button.  This
	// variable keeps track of what we're supposed to do.
	$scope.appendDigits = false;

	// In order to successfully calculate, we need to remember the number
	// that was in the display
	$scope.prevResult = '';

	// Since we're doing a form of infix calculation, we need to remember
	// the operation.
	$scope.op = "=";
	
	$scope.clearDisplay = function() {

		serviceCalcClickCounter.insertClick();
		serviceCalcLog.reset();

		$scope.display = '';
		$scope.prevResult = '';
		$scope.appendDigits = false;
		$scope.op = "=";
	}

	//   Executes the *previous* operation (e.g., when the user types
	//   2 + 4 - 2, when the "-" is clicked, the "+" should be executed).
	$scope.doOperation = function( newOperation )
	{
		serviceCalcClickCounter.insertClick();

		// Get the argument
		var newArg = eval( $scope.display );
		
		// Do the operation
		if( $scope.op == '+' ) {
			$scope.prevResult = serviceCalc.add($scope.prevResult, newArg); 
		}
		else if( $scope.op == '-' ) {
			$scope.prevResult = serviceCalc.subtract($scope.prevResult, newArg);
		} 
		else if( $scope.op == '/' ) {
			$scope.prevResult = serviceCalc.divide($scope.prevResult, newArg);
		}
		else if( $scope.op == '*' ) {
			$scope.prevResult = serviceCalc.multiply($scope.prevResult, newArg);
		}
		else if( $scope.op == '=' ) {
			$scope.prevResult = newArg;
		}
		else { // something's wrong
			$scope.prevResult = newArg;
		}

		$scope.display = $scope.prevResult;
		$scope.appendDigits = false;
		$scope.op = newOperation;
	}

	// --- Reacts to the user typing a digit --- //
	$scope.setDigit = function ( dig )
	{
		serviceCalcClickCounter.insertClick();
		serviceCalcLog.add(dig);
		
		if( $scope.appendDigits ) {
			$scope.display += dig;
		}
		else {
			$scope.display = dig;
			$scope.appendDigits = true;
		}
	}	
});
/*___________________________________________________________________*/
