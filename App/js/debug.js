/*
	debug.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Me ajuda ae véi!
*/
var DEBUG_LOCKRENDER = false;
function copyToClipboard(text){
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
/// Reload js file
function reloadJsFile(src){
	console.info("Recarregando Script: " + src);
	addLog('error', "Recarregando Script: " + src);
    $('script[src="' + src + '"]').remove();
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
    scrollLog();
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
	R3DITOR_readUpdate(APP_PATH + "\\version.r3ditor");
}
function DEBUG_RESETSLIDER(){
	document.getElementById('RDT_slider_X').value = 0;
	document.getElementById('RDT_slider_Y').value = 0;
	document.getElementById('RDT_slider_Z').value = 0;
	document.getElementById('RDT_slider_R').value = 0;
	document.getElementById('RDT_slider_D').value = 0;
	RDT_updateCanvasInfos(0);
}
function DEBUG_TESTER(){
	TESTEVAR = document.getElementById('RDT_slider_TESTE').value;
	console.log(TESTEVAR);
	RDT_updateCanvasInfos(0);
}
function cls(){
	console.clear();
}