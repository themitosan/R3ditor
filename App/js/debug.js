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
	console.info("Recarregando Script: " + src);
	addLog('error', "Recarregando Script: " + src);
    $('script[src="' + src + '"]').remove();
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
    scrollLog();
}
/// Undo solvehex
function DEBUG_splitHex(hex, mode){
	var c = 0;
	var fina = "";
	var rw = undefined
	if (mode == 0){
		rw = hex.match(/.{1,2}/g);
	} else {
		rw = hex.match(/.{1,4}/g);
	}
	while(c < rw.length){
		fina = fina + rw[c] + " ";
		c++;
	}
	return fina.slice(0, fina.length - 1);
}
function DEBUG_RDT_MSG_END_RANGE(value){
	BETA = true;
	reloadJsFile('js/database.js');
	RDT_MSG_finalLenght = parseInt(value);
	RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
}
function DEBUG_RDT_MSG_START_RANGE(value){
	BETA = true;
	reloadJsFile('js/database.js');
	RDT_MSG_startLength = parseInt(value);
	RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
}
function DEBUG_TESTUPDATE(){
	TEST_RELEASE = true;
	R3DITOR_readUpdate(APP_PATH + "\\App\\version.r3ditor");
}