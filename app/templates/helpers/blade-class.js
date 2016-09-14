module.exports.register = function(Handlebars, options) {
  // content list blade grid classes
  Handlebars.registerHelper("bladeClass", function(blade) {
      var classes = ["blade"];
      if(!blade){
          return classes[0];
      }
      for(var x in blade){
          classes.push(blade[x]);
      }
      return classes.join(" ");
  });
};
