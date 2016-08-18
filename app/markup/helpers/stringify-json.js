module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper("json", function(context) {
    return JSON.stringify(context);
  });
}