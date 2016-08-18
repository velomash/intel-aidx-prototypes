module.exports.register = function (Handlebars, options) {
	// content list blade grid classes
	Handlebars.registerHelper("backgroundVideo", function (video){
		if(!video){
			return;
		}

		var attrs = "";
		if(video.source){
			attrs = attrs + "data-video-background-source=" + video.source + " ";
		}
		if(video.format){
			attrs = attrs + "data-video-background-format=" + video.format + " ";
		}
		if(video.width){
			attrs = attrs + "data-video-background-width=" + video.width + " ";
		}
		if(video.height){
			attrs = attrs + "data-video-background-height=" + video.height + " ";
		}
		return attrs;
	});
};
