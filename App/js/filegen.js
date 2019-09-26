/*
	FileGen.js
	Por mitosan/mscore/misto_quente/mscorehdr
	me ajuda
*/
var FILEGEN_TOGGLE = false;
function FILEGEN_TOGGLE_RES(){
	if (FILEGEN_TOGGLE === false){
		$("#FILEGEN_CANVAS").css({"zoom": "1", "left": "926px"});
		document.getElementById('BTN_saveImage').value = "Toggle Zoom (Size: Original Zoom)";
		FILEGEN_TOGGLE = true;
	} else {
		$("#FILEGEN_CANVAS").css({"zoom": "2", "left": "400px"});
		document.getElementById('BTN_saveImage').value = "Toggle Zoom (Size: Double)";
		FILEGEN_TOGGLE = false;
	}
}
/*
function FILEGEN_saveImage(){
	$("#FILEGEN_CANVAS").css({"zoom": "1", "left": "900px"});
	html2canvas(document.getElementById('FILEGEN_CANVAS'), { useCORS: true, foreignObjectRendering: false }).then(function(canvas){
		Canvas2Image.saveAsPNG(canvas);
	});
	$("#FILEGEN_CANVAS").css({"zoom": "2", "left": "400px"});
}*/
function FG_RENDER(){
	var c = 0;
	var x_offset = 0;
	var y_offset = 0;
	document.getElementById('FILEGEN_CANVAS').innerHTML = "";
	if (document.getElementById('FILEGEN_text').value !== ""){
		var text = document.getElementById('FILEGEN_text').value.replace(new RegExp("\n", 'gi'), "@").match(/.{1,1}/g);
		while(c < text.length){
			if (FG_DICIONARIO[text[c]] !== undefined){
				if (text[c] === "@" || text[c] === "\n"){
					y_offset = y_offset + 14;
					x_offset = 0;
					c++;
				} else {
					var distancia = parseInt(FG_DICIONARIO[text[c]][1]) + x_offset;
					var HTML_TEMPLATE = '<img src="' + APP_PATH + '/App/Img/chars.png" style="clip-path: inset(' + FG_DICIONARIO[text[c]][0] + ');position: absolute; left: ' + distancia + 'px;top: ' + y_offset + 'px;">';
					$("#FILEGEN_CANVAS").append(HTML_TEMPLATE);
					x_offset = x_offset + FG_DICIONARIO[text[c]][2];
					c++;
				}
			} else {
				c++;
			}
		}
	}
}