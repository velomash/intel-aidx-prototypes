module.exports.register = function(Handlebars, options) {
	Handlebars.registerHelper("showEvery", function(index_count, each_count, block) {
		var index = parseInt(index_count) + 1,
			modulus = parseInt(each_count);
		if (index % modulus === 0) {
			return block.fn(this);
		}
	});
}
