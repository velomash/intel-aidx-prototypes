var intelPatternLib = intelPatternLib || {};
intelPatternLib.contextIntegers = {
	contexts: []
};

module.exports.register = function(Handlebars, options) {
	Handlebars.registerHelper("uniqueContextInteger", function(currentContext) {
		var cI = intelPatternLib.contextIntegers;
		var ind = cI.contexts.indexOf(currentContext);

		if(ind === -1){
			cI.contexts.push(currentContext);
		}

		return cI.contexts.indexOf(currentContext);
	});
};
