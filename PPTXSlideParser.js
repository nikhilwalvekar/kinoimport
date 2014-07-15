function PPTXSlideParser(name, xmldoc, onSuccess, onFileReadError) {
	var _api = {}
	var slideinfo = {};
	var xmlElementMap = {
		'p:ph': parsePlaceHolder,
		'a:t' : parseText
	}
	var lastShape = undefined;
	function _init() {
		slideinfo['name'] = name;
		parseFile();
		onSuccess(slideinfo);
	}

	function parseFile() {
		parse(xmldoc.documentElement);
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

	function parsePlaceHolder(xmlnode) {
		console.log(xmlnode.nodeName);
		lastShape = xmlnode.getAttribute('type');
		if (!lastShape) {
			lastShape = 'content';
		}
		slideinfo[lastShape] = '';
	}

	function parseText(xmlnode) {
		console.log(xmlnode.textContent);
		slideinfo[lastShape] = slideinfo[lastShape] + xmlnode.textContent;
	}
	_init();
	return _api;
}