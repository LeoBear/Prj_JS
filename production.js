
		// Should we append digits to the display?  It depends on whether
		// we've just hit an operation button or a number button.  This
		// variable keeps track of what we're supposed to do.
		var appendDigits = false;

		// In order to successfully calculate, we need to remember the number
		// that was in the display
		var prevResult = 0;

		// Since we're doing a form of infix calculation, we need to remember
		// the operation.
		var op = "=";

		function clearDisplay()
		{
			document.calculator.display.value = 0;
			prevResult = 0;
			appendDigits = false;
			op = "=";
		}

		//   Executes the *previous* operation (e.g., when the user types
		//   2 + 4 - 2, when the "-" is clicked, the "+" should be executed).
		function doOp( newop )
		{
			// Get the argument
			var newArg = eval( document.calculator.display.value );

			// Do the operation
			if( op == "+" ) {
				prevResult = prevResult + newArg;
			}
			else if( op == "-" ) {
				prevResult = prevResult - newArg;
			} 
			else if( op == "/" ) {
				prevResult = prevResult / newArg;
			}
			else if( op == "*" ) {
				prevResult = prevResult * newArg;
			}
			else if( op == "=" ) {
				prevResult = newArg;
			}
			else { // something's wrong
				prevResult = newArg;
			}

			document.calculator.display.value = prevResult;
			appendDigits = false;
			op = newop;
		}

		// --- Reacts to the user typing a digit --- //
		function digit( dig )
		{
			if( appendDigits ) {
				document.calculator.display.value += dig;
			}
			else {
				document.calculator.display.value = dig;
				appendDigits = true;
			}
		}
;