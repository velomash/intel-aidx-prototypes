module.exports.register = function(Handlebars, options) {
  // content list blade grid classes
  Handlebars.registerHelper("proofPointColumns", function(itemsTotal) {
    var total = parseInt(itemsTotal) || 0,
	  	result = "col-xs-12";
		
	if (total > 2){
		result += " col-sm-4";
	} else if (total > 1) {
		result += " col-sm-6";
	}
	return result;
  });

}