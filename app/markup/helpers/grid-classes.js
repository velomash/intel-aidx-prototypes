module.exports.register = function(Handlebars, options) {
  // content list blade grid classes
  Handlebars.registerHelper("contentListGridClasses", function(blade_total, block) {
    var total = parseInt(blade_total, 10);
    if (total === NaN) {
      throw new Error("Itemized blade cannot implement grid classes because the blade total is not a number.");
    }
    if (total === 1) {
      return 'col-xs-12';
    } else if (total === 2) {
      return 'col-xs-12 col-ms-6 col-sm-6';
    } else if (total === 3) {
      return 'col-xs-12 col-ms-6 col-sm-4 col-lg-3';
    } else if (total === 4) {
      return 'col-xs-12 col-ms-6 col-sm-4 col-md-3';
    } else {
      return 'col-xs-12 col-ms-6 col-sm-4 col-lg-3 col-xl-2';
    }
  });

  Handlebars.registerHelper("featuredContentGridClasses", function(blade_total, block) {
    var total = parseInt(blade_total, 10);
    if (total === NaN) {
      throw new Error("Itemized blade cannot implement grid classes because the blade total is not a number.");
    }
    if (total === 1) {
      return 'col-xs-12';
    } else if (total === 2) {
      return 'col-xs-12 col-ms-6 col-sm-6';
    } else if (total === 3) {
      return 'col-xs-12 col-ms-6 col-sm-6 col-lg-4';
    } else {
      return 'col-xs-12 col-ms-6 col-sm-6 col-lg-4 col-xl-3';
    }
  });

  // itemized blade grid classes
  Handlebars.registerHelper("itemizedGridClasses", function(blade_total, block) {
    var total = parseInt(blade_total, 10);
    if (total === NaN) {
      throw new Error("Itemized blade cannot implement grid classes because the blade total is not a number.");
    }
    if (total === 1) {
      return 'col-xs-12';
    } else if (total === 2) {
      return 'col-xs-12 col-ms-6 col-sm-6';
    } else if (total === 3) {
      return 'col-xs-12 col-ms-6 col-sm-4';
    } else if (total === 4) {
      return 'col-xs-12 col-ms-6 col-sm-4 col-md-3';
    } else {
      return 'col-xs-12 col-ms-6 col-sm-4 col-md-3 col-xl-2';
    }
  });

  // list blade grid classes
  Handlebars.registerHelper("listGridClasses", function(blade_total, block) {
    var total = parseInt(blade_total, 10);
    if (total === NaN) {
      throw new Error("Itemized blade cannot implement grid classes because the blade total is not a number.");
    }
    if (total === 1) {
      return 'col-xs-12';
    } else if (total === 2) {
      return 'col-xs-12 col-ms-6 col-sm-6';
    } else if (total === 3) {
      return 'col-xs-12 col-ms-6 col-sm-4';
    } else {
      return 'col-xs-12 col-ms-6 col-sm-4 col-xl-3';
    }
  });

  //Story Detail grid class
  Handlebars.registerHelper("storyDetailGridClasses", function(item_total, block) {
    var total = parseInt(item_total, 10);
    if (total === NaN) {
      throw new Error("Story Detail cannot implement grid classes because the item total is not a number.");
    }
    if (total === 2) {
      return 'col-ms-12 col-sm-6';
    } else {
      return 'col-ms-12 col-sm-6 col-lg-4 col-xl-4';
    }
  });
}


