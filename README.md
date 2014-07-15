KinoImport
==========
### [Web Components Creating Power Point like Layouts]


KinoImport is Web Component for importing Power Point Presentations into KinoScribe.

Authors
=========
 * Rohit Ghatol - @rohitghatol
 * Nikhil Walvekar - @walvekarnikhil

Model
=========

* Slide
```
{
name : document_part_name e.g. ppt/slides/slide1.xml
shapes: [
		{
			type: 'ctrTitle' /* Type of shape [ctrTitle, subtitle, content, presetShape] */,
			presetType: 'arrow' /* only populated if type is presetShape */,
			textContent: 'text for the shape',
			xfrm : { /* Optional, will be populated only if it is present for the shape. */
				off: {x : 123, y: 980} /* offset for the shape. */,
				ext: {cx: 43534, cy: 43535} /* Extents for the shape. */
			},
			fill : { /* Currently only solid fill is supported. */
				type: 'solidFill' /* Type of fill. */
				colors : ['#aaaaa', '#2980f4'] /* Colors for the fill. Array provided as gradient provision. */
			}
		},
		{ ... }
	]
}
```