function PPTXImporter(file, container) {
  var _api = {}
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
		var slideHTML = '<section class="slide">';
		var shapes = slideinfo.shapes;
		for (var i = 0; i < shapes.length; i++) {
		  var shape = shapes[i];
			if (shape.type === 'presetShape') {
				slideHTML += shape.type + ":" + shape.presetType;
			} else {
				slideHTML += shape.type + ":" + shape.textContent;
			}
			if (shape.xfrm) {
				slideHTML += ", pos:" + JSON.stringify(shape.xfrm);
			}
			if (shape.fill) {
				slideHTML += ", fill:" + JSON.stringify(shape.fill);
			}
			slideHTML += '<br>';
		};
		slideHTML += '</section>';
		slide.innerHTML = slideHTML;
		slide.setAttribute('x', slideinfo.x);
		return slide;
  }
  _init();
  return _api;
}