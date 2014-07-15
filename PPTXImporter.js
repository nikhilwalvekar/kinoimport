function PPTXImporter(file, container) {
	var _api = {}
	var fileNameToLookFor = "/ppt\/slides\/slide\d+.xml/";
	var slides = [];
	function _init() {
		parseFile();
	}

	function parseFile() {
		var parser = new PPTXParser(file, onSuccess, onError);
	}

	function onSuccess(allSlideInfo) {
	    slides = allSlideInfo;
	    render();
	}

	function onError(err) {
		console.log(err);
	}

	function render() {
        var stage = document.getElementById(container.ref);
        var kino_pres = document.createElement('kino-pres');
        var x = 0;
        var incX = 1000;
        if (stage) {
            for (var i = 0; i < slides.length; i++, x=x+incX) {
            	slides[i].x = x;
            	var slide = renderSlide(slides[i]);
                kino_pres.appendChild(slide);                        
            };
            container.style.visibility = 'hidden';
            stage.appendChild(kino_pres);
        }
	}
	function renderSlide(slideinfo) {
        var slide = document.createElement('kino-slide');
        if (slideinfo['subTitle']) {
        	slide.innerHTML = '<section class="slide"> title : ' + slideinfo.ctrTitle + ' <br> subtitle : ' 
        					+ slideinfo.subTitle + '</section>';
        } else {
        	slide.innerHTML = '<section class="slide"> title : ' + slideinfo.title + ' <br> content : ' 
        					+ slideinfo.content + '</section>';
        }
        slide.setAttribute('x', slideinfo.x);
        return slide;
	}
	_init();
	return _api;
}