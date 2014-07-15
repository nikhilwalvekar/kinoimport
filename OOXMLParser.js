function OOXMLParser(file, onReadingComplete, onFileReadError ) {
	var _api = {}
	function _init() {
		parseFile();
	}

	function parseFile() {
		zip.createReader(new zip.BlobReader(file), onSuccess, onFileReadError);
	}

	function onSuccess(zipReader) {
	    try {
	      zipReader.getEntries(getZipEntries);
	    } catch (err) {
	      onFileReadError(err);
	    }
	}

	function getZipEntries(entries) {
		totalEntries = entries.length;
		var ooxmlfiles = {};
		var currentNoOfEntries = 0;
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i]
			getXMLNode(entry, function(filename, doc) {
				ooxmlfiles[filename] = doc;
				currentNoOfEntries++;
				if (currentNoOfEntries == totalEntries) {
					onReadingComplete(ooxmlfiles);
				}
			});
		}
 	}

 	function getXMLNode(entry, callback) {
	    var writer;
	    function getData() {
	      try {
	        entry.getData(writer, function (blob) {
	        	var blobReader = new FileReader();
			    blobReader.onload = function (event) {
			    	var doc = (new DOMParser).parseFromString(event.target.result, 'text/xml');
			    	callback(entry.filename,doc);
			    };
			    blobReader.onerror = function(event) {
			      console.log(event);
			    };
			    blobReader.readAsText(blob);
	        }, onprogress);
	      } catch (err) {
	        onFileReadError(err);
	      }
	    }

	    var contentType = getContentType(entry.filename);
	    writer = new zip.BlobWriter(contentType);
	    getData();
 	}
	function onprogress() {

	}
	function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  	}
	 function getContentType(fileName) {
	    var contentType;
	    if (endsWith(fileName.toLowerCase(), "xml")) {
	      contentType = "text/xml";
	    } else if (endsWith(fileName.toLowerCase(), "rels")) {
	      contentType = "text/xml";
	    } else if (endsWith(fileName.toLowerCase(), "jpeg")) {
	      contentType = "image/jpeg";
	    } else if (endsWith(fileName.toLowerCase(), "jpg")) {
	      contentType = "image/jpeg";
	    } else if (endsWith(fileName.toLowerCase(), "png")) {
	      contentType = "image/png";
	    } else if (endsWith(fileName.toLowerCase(), "wmf")) {
	      contentType = "image/wmf";
	    } else if (endsWith(fileName.toLowerCase(), "emf")) {
	      contentType = "image/gif";
	    } else if (endsWith(fileName.toLowerCase(), "gif")) {
	      contentType = "image/gif";
	    }
	    return contentType;
	  }
	_init();
	return _api;
}