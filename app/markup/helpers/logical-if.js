module.exports.register = function(Handlebars, options) {
	Handlebars.registerHelper("logicalIf", function(left, operator, right, options) {
		
		var test = null;
		
		switch(operator){
			case "<":
				test = left < right;
				break;
			case ">":
				test =  left > right;
				break;
			case "==":
				test = left == right;
				break;
			case "===":
				test = left === right;
				break;
			case "!=":
				test = left != right;
				break;
			case "truthy && truthy":
				test = left && right;
				break;
			case "truthy || truthy":
				test = left || right;
				break;
			case "falsy && falsy":
				test = !left && !right;
				break;
			case "falsy || falsy":
				test = !left || !right;
				break;
			case "truthy && falsy":
				test = left && !right;
				break;
			case "truthy || falsy":
				test = left || !right;
				break;
			default:
				return;
		}

		if(test !== null){
			return test ? options.fn(this) : options.inverse(this);
		}
	});
};
