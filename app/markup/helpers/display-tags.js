module.exports.register = function(Handlebars, options) {
	Handlebars.registerHelper("displayTags", function(tags, block) {
		var output = '';
		if (tags.length > 4) {
			for (var i=0; i<3; i++) {
				output += '<a class="tag" href="' + tags[i].url + '">' + tags[i].text + '</a>';
			}
			output += '<span class="tag-overflow">';
			for (var i=3; i<tags.length; i++) {
				output += '<a class="tag" href="' + tags[i].url + '">' + tags[i].text + '</a>';
			}
			output += '</span>';
		} else {
			for (var i=0; i<tags.length; i++) {
				output += '<a class="tag" href="' + tags[i].url + '">' + tags[i].text + '</a>';
			}
		}
		return output;
	});
}
