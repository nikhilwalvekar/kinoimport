function PPTXParser(file, onParsingComplete, onFileReadError) {
	var _api = {}
	var slides = [];
	function _init() {
		parseFile();
	}

	function parseFile() {
		var ooxmlparser = new OOXMLParser(file, onSuccess, onFileReadError);
	}

	function onSuccess(ooxmlfiles) {
		var filenames = Object.keys(ooxmlfiles);
		var slides = [];
		for (var i = 0; i < filenames.length; i++) {
			if (/ppt\/slides\/slide\d+\.xml/.test(filenames[i])) {
				slides.push(filenames[i]);
			}
		};
	    
	    var totalSlides = slides.length;
	    var parsedSlideCount = 0;
	    var slideInfoObj = [];
	    for (var i = 0; i < slides.length; i++) {
	    	PPTXSlideParser(slides[i], ooxmlfiles[slides[i]], function(slideinfo) {
	    		parsedSlideCount++;
    			slideInfoObj.push(slideinfo);
	    		if (parsedSlideCount == totalSlides) {
	    			onParsingComplete(slideInfoObj);
	    		}
	    	}, onFileReadError);
	    };
	}

	_init();
	return _api;
}