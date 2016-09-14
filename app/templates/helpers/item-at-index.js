module.exports.register = function(Handlebars, options) {
  // Handlebars dynamic array accessor, because they forgot to include one.
  Handlebars.registerHelper("itemAtIndex", function(index, array) {
	  return array[index];
  });
};
