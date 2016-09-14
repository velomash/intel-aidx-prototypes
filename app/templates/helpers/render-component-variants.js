/**
 * This helper renders all variants of a component indiscriminately.
 *
 * @param Handlebars
 * @param options
 */

var intelPatternLib = intelPatternLib || {};
intelPatternLib.renderComponentVariantsHelper = {};

module.exports.register = function(Handlebars, options) {

	Handlebars.registerHelper("renderComponentVariants", function(componentName, prefixOverride) {
		//If there are multiple calls to the renderer, we need to track the variant count
		//to allow variant IDs to continue to be unique between calls.
		intelPatternLib.renderComponentVariantsHelper.staticVariantCounter = intelPatternLib.renderComponentVariantsHelper.staticVariantCounter || 0;
		var variantCountOffset = intelPatternLib.renderComponentVariantsHelper.staticVariantCounter;
		//Parse variant type
		var prefix = "variant-" + componentName;
		//Allow variant prefix overrides
		if(prefixOverride && prefixOverride.length){
			prefix = "variant-" + prefixOverride
		}
		//Separate the queue by language
		var queue = {};
		//Variants will have a similar structure to queue
		var variants = {};
        //Compile the template into a callable function if necessary (returns the function if it already is one)
        var componentTemplate = compileTemplate(componentName);
        //Bootstrap "tab" wrapper goes around the compiled template - prepare the template
        var tabTemplate = compileTemplate("variant-tab");
		var missingLang = [];

		//Get all variants of passed componentName type
		for(var key in options.data){
			var config;
			var lang;
			if(key.indexOf(prefix) === 0){
				config = options.data[key]["pattern-nav-config"];
				if(!config){
					throw new Error("pattern-nav-config property required on all variants.");
				}
				lang = config.language;
				if(!lang){
					missingLang.push(key);
				}
				queue[lang] = queue[lang] || [];
				variants[lang] = variants[lang] || [];
				queue[lang].push(options.data[key]);
			}
		}

		//Sort by nav order
		for(var lang in queue) {
			var q = queue[lang];
			q.sort(function (a, b) {
				var aOrder;
				var bOrder;
				if (typeof a["pattern-nav-config"] != "undefined") {
					aOrder = parseInt(a["pattern-nav-config"].order);
				}
				if (typeof b["pattern-nav-config"] != "undefined") {
					bOrder = parseInt(b["pattern-nav-config"].order);
				}

				if (typeof aOrder != "undefined") {
					if (typeof bOrder != "undefined") {
						if (aOrder < bOrder) {
							return -1;
						}
						if (aOrder > bOrder) {
							return 1;
						}
						return 0;
					}
					else {
						return -1;
					}
				}
				else if (typeof bOrder != "undefined") {
					return 1;
				}

				return 0;
			});
		}

		//Render the variants to HTML
		for(var qSet in queue) {
			var q = queue[qSet];
			var v = variants[qSet];
			for (var i = 0; i < q.length; i++) {
				var obj = q[i];
				var conf = obj["pattern-nav-config"];
				var render = componentTemplate(q[i]);

				//If this partial requests that other partials be rendered and prepended/appended, do so
				if (conf && conf.appendList || conf.prependList) {
					conf.prependList = conf.prependList || [];
					conf.appendList = conf.appendList || [];
					var list = [].concat(conf.prependList, conf.appendList);
					var temp;
					var partialData;

					for (var j = 0; j < list.length; j++) {
						temp = compileTemplate(list[j].template);
						partialData = options.data[list[j].data] || {};
						//Prepend if we're still in the prepend list
						render = (j < conf.prependList.length) ? temp(partialData) + render : render = render + temp(partialData);
					}
				}

				//Create a safestring out of the rendered/appended set of templates
				render = new Handlebars.SafeString(render);

				//Build variant config, and compile all of the rendered HTML into the variant tab wrapper
				var variantConfig = {
					"variantID": "variant" + (i + variantCountOffset + qSet),
					"navOrder": conf && conf.order || "",
					"navLabel": conf.label && conf.label || "",
					"isActive": conf && conf.isActive,
					"isVariant": conf && conf.isVariant !== false, //isVariant must explicitly be false to turn off
					"isJumplink": conf && conf.isJumplink,
					"navbar": conf && conf.navbar,
					"renderedTemplate": render,
					"pattern-library-details": obj["pattern-library-details"] || false
				};

				v.push(new Handlebars.SafeString(tabTemplate(variantConfig)));
			}
		}

		intelPatternLib.renderComponentVariantsHelper.staticVariantCounter = intelPatternLib.renderComponentVariantsHelper.staticVariantCounter + i;

		//Compile variants into language groups.
		var langGroup = "";
		for(var lang in variants){
			var groupContent = {"content": variants[lang].join(""), "lang": lang};
			var groupTemplate = compileTemplate("variant-group");
			langGroup += new Handlebars.SafeString(groupTemplate(groupContent));
		}
		if(missingLang.length){
			console.warn("pattern-nav-config highly suggests a language be set on all variants. \r\nThe navigation will most likely break if one is not set. \r\npattern-nav-config.language is not set in the following file(s): \r\n - " + missingLang.join("\r\n - "));
		}
        return new Handlebars.SafeString(langGroup);
	});



	/**
	 * Compiles a template if it isn't already done.
	 * @param componentName
	 * @returns {*}
	 */
	var compileTemplate = function(componentName){
		var componentTemplate = Handlebars.partials[componentName];
		if (typeof componentTemplate !== "function") {
			componentTemplate = Handlebars.compile(componentTemplate);
		}
		return componentTemplate;
	}
};
