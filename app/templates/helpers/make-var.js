module.exports.register = function(Handlebars, options) {
	Handlebars.registerHelper('makeVar', function (name, value, options) {
		if (options.data) {
			options.data[name] = value;
			options.data["merged"] = extendObject(this, {mergedProp: value});
		}

		function extendObject(originalObj,newObj){
			for(key in newObj){
				if (newObj.hasOwnProperty(key)) {
					originalObj[key] = newObj[key];
				}
			}
		}
	});
}