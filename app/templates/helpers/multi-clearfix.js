/**
 * A multi-clearfix generator for handlebars. This is meant for use with bootstrap's visibility classes.
 * This generator creates one clearfix div at each location required for multiple class types.
 * The purpose of this is to avoid multiple clearfix divs in one spot.
 *
 * Usage example:
 * To use, call the multiClearfix helper, and pass it two arguments:
 *
 * items {{string}} 	A space separated string defining the bootstrap visibility class along with
 * 						the interval at which it is supposed to appear. For instance, if a clearfix
 * 						div needs to appear after every 3 items in a loop that is only visible on medium
 * 						screen sizes, the call would be:
 *
 * 						{{#multiClearfix "visible-md-3" @index}}{{/multiClearfix}}
 *
 * 						Multiple classes can be passed. If the previous example also required that items be
 * 						cleared on small screens after every 4 entries, then the call would become:
 *
 * 						{{#multiClearfix "visible-md-3 visible-sm-4" @index}}{{/multiClearfix}}
 *
 * 						The order of the class definitions does not matter.
 *
 * 	index {{integer}}	The index of the current loop context. This can be accessed via the @index
 * 						handlebars property.
 */
module.exports.register = function (Handlebars, options) {
	Handlebars.registerHelper("multiClearfix", function (items, index, block) {
		//Filter unique array items
		var className = "";
		var sieve = {};
		var arr = items.split(" ");
		var clears;
		//Use an hash sieve to weed out duplicates
		for(var i = 0; i < arr.length; i++){
			sieve[arr[i]] = "";
		}
		clears = Object.keys(sieve);

		//Build out all classes
		for(var i = 0; i < clears.length; i++){
			//Parse the interval out of the current item, e.g.:
			//visible-xs-2 means that a clear with class "visible-xs" will be added at every second interval
			var clear = clears[i].split("-");
			var interval = clear.pop();
			clear = clear.join("-");
			if(parseInt(interval) == interval && (index + 1) % interval === 0){
				className = className + " " + clear;
			}
		}

		if(className.length > 0){
			return '<div class="clearfix ' + className + '"></div>';
		}
	});
};
