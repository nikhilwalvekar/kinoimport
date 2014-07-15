function Shape() {
	var type;
	var textContent;
}
function Fill() {
	var color;
}
function PPTXSlideParser(name, xmldoc, onSuccess, onFileReadError) {
	var _api = {}
	var slideinfo = {};
	var shapes = [];
	var xmlElementMap = {
		'p:ph': parsePlaceHolder,
		'p:sp': parseShape,
		'a:prstGeom': parsePresetShape,
		'a:t' : parseText,
		'a:xfrm' : parseTransforms,
		'a:off' : parseOffset,
		'a:ext' : parseExtents,
		'a:solidFill' : parseSolidFill,
		'a:srgbClr' : parseSRGBColor
	}
	var lastShape = undefined;
	var lastFill = undefined;
	function _init() {
		slideinfo['name'] = name;
		parseFile();
		onSuccess(slideinfo);
	}

	function parseFile() {
		parse(xmldoc.documentElement);
		if (lastShape) {
			shapes.push(lastShape);
		}
		slideinfo.shapes = shapes;
	}

	function parse(xmlnode) {
		var parseFunction = xmlElementMap[xmlnode.nodeName];
		if (parseFunction) {
			parseFunction(xmlnode);
		}

		var children = xmlnode.children;
		for (child in children) {
			parse(children[child]);
		}
	}
	function parsePresetShape(xmlnode) {
		lastShape.type = 'presetShape';
		lastShape.presetType = xmlnode.getAttribute('prst');
	}

	function parseShape(xmlnode) {
		if (lastShape) {
			shapes.push(lastShape);
		}
		lastShape = new Shape();
	}
	function parseTransforms(xmlnode) {
		if (lastShape)
			lastShape.xfrm = {};
	}
	function parseOffset(xmlnode) {
		if (lastShape) {
			var x = xmlnode.getAttribute('x');
			var y = xmlnode.getAttribute('y');
			lastShape.xfrm.off = {x : x, y: y}
		}
	}

	function parseExtents(xmlnode) {
		if (lastShape) {
			var cx = xmlnode.getAttribute('cx');
			var cy = xmlnode.getAttribute('cy');
			lastShape.xfrm.ext = {cx : cx, cy: cy}
		}
	}

	function parseSolidFill(xmlnode) {
		lastFill = new Fill();
		if (lastShape) {
			lastShape.fill = lastFill;
		}
	}

	function parseSRGBColor(xmlnode) {
		lastFill.color = xmlnode.getAttribute('val');
	}

	function parsePlaceHolder(xmlnode) {
		console.log(xmlnode.nodeName);
		lastShape.type = xmlnode.getAttribute('type');
		if (!(lastShape.type)) {
			lastShape.type = 'content';
		}
		lastShape.textContent = '';
	}

	function parseText(xmlnode) {
		console.log(xmlnode.textContent);
		lastShape.textContent = lastShape.textContent + xmlnode.textContent;
	}
	_init();
	return _api;
}