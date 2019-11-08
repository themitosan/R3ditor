/*
	debug.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Me ajuda ae véi!
*/
var DEBUG_LOCKRENDER = false;

/// Reload js file
function reloadJsFile(src){
	console.info('Recarregando Script: ' + src);
	addLog('warn', 'Recarregando Script: ' + src);
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
	R3DITOR_readUpdate(APP_PATH + '\\version.r3ditor');
}
function DEBUG_TESTER(){
	TESTEVAR = document.getElementById('RDT_slider_TESTE').value;
	console.log(TESTEVAR);
	RDT_updateCanvasInfos(0);
}
function cls(){
	console.clear();
}