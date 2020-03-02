/*
	debug.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Me ajuda ae véi - nunca te pedi nada... :P
*/
var DEBUG_TOTAL_LINES = 0;
var DEBUG_LOCKRENDER = false;
/// Reload js file
function reloadJsFile(src){
	console.info('Reloading Script: ' + src);
	addLog('warn', 'Reloading Script: ' + src);
    $('script[src="' + src + '"]').remove();
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
    LOG_scroll();
}
function DEBUG_RDT_MSG_END_RANGE(value){
	BETA = true;
	reloadJsFile('js\\database.js');
	RDT_MSG_finalLenght = parseInt(value);
	RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
}
function DEBUG_RDT_MSG_START_RANGE(value){
	BETA = true;
	reloadJsFile('js\\database.js');
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
function DEBUG_processHexPositions(hexVar){
	if (hexVar !== undefined){
		if (hexVar !== ''){
			return processBIO3PosNumbers(processBIO3Vars(hexVar));
		}
	}
}
/*
	Draw Lines
	
	Thanks Amarnath Balasubramanian 
	Original code: https://stackoverflow.com/questions/20969434/drawing-line-in-a-div-with-javascript
*/
function DEBUG_createLine_Lv2(where, lineId, cssClass, ax, ay, bx, by){
     if (ax > bx){
         bx = ax + bx;
         ax = bx - ax;
         bx = bx - ax;
         by = ay + by;
         ay = by - ay;
         by = by - ay;
     }
     var angle = Math.atan((ay - by) / (bx - ax));
     angle = (angle * 180 / Math.PI);
     angle = -angle;
     var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
     var style = 'top: ' + parseInt(ay + 8) + 'px; left: ' + parseInt(ax + 10) + 'px; ' +
				 'width: ' + length + 'px; -webkit-transform-origin: 0% 0%; ' +
				 '-webkit-transform: rotate(' + angle + 'deg);';
     var LINE_HTML_TEMPLATE = '<div id="' + lineId + '" class="' + cssClass + '" style="' + style + '"></div>';
     $('#' + where).append(LINE_HTML_TEMPLATE);
     console.log(document.getElementById(lineId));
     // RE3_LIVECANVAS_BOUNDARY_TEST_LV_2_0
 }