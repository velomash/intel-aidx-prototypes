/**
 * Embeds a partial by string name, and uses a data file by string name. Do not pass objects for either.
 *
 * @param Handlebars
 * @param options
 */
module.exports.register = function (Handlebars, options) {
	/**
	 * Create a helper to render a partial that is named by the following args:
	 *
	 * @param partial   {string}    The name of the partial, as a string
	 * @param data      {string}    The name of the data file to use, as a string
	 * @param thisArg   {object}    A "this" argument passed from the calling partial/scope. Generally is literally
	 *                              the "this" from the parent scope
	 */
	Handlebars.registerHelper('embedPartial', function (partial, data, thisArg) {
		var p = Handlebars.partials;
		var d = options.data[data];
		if (typeof p[partial] !== 'function')
			p[partial] = Handlebars.compile(p[partial]);
		return p[partial](d, thisArg);
	});
};