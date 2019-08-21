/*

	debug.js
	themitosan/mscorehdr
	me ajuda

*/

function renderRanges(modo, first) {
	if (modo == 0){ // invent
		var tot = 11;
		var c = 1;
		var a = undefined;
		var anterior = first;
		while (c !== tot){
			console.log(anterior + ", " + parseInt(anterior + 8));
			anterior = anterior + 8;
			c++;
		}
		console.log("Pronto - OK!");
	} else { 		// Baú
		var tot = 65;
		var c = 1;
		var a = undefined;
		var anterior = first;
		while (c !== tot){
			console.log(anterior + ", " + parseInt(anterior + 8));
			anterior = anterior + 8;
			c++;
		}
		console.log("Pronto - OK!");
	}
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

/// Reload js file
function reloadJsFile(src) {
	console.log("Recarregando Script: " + src);
    $('script[src="' + src + '"]').remove();
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
}

/// Undo solvehex
function DEBUG_splitHex(hex){
	var c = 0;
	var fina = "";
	var rw = hex.match(/.{1,2}/g);
	while(c < rw.length){
		fina = fina + rw[c] + " ";
		c++;
	}
	return fina.slice(0, fina.length - 1);
}

function DEBUG_RDTMSGRANGE(value){
	RDT_MSG_finalLenght = parseInt(value);
	RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
}

function DEBUG_TESTUPDATE(html){
	document.getElementById('updates_info').innerHTML = "<ul>" + html + "</ul>";
	$("#R3ditor_update").css({"display": "block"});
}