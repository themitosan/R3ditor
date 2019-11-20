/*
	debug.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Me ajuda ae véi!
*/
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
//
function DEBUG_createLineElement(where, x, y, length, angle){
    $('#LIVE_LINE_TEST').remove();
    var line = document.createElement('div');
    var css = 'width: ' + length + 'px;'
            + 'transform: rotate(' + angle + 'rad);'
            + 'top: ' + y + 'px;'
            + 'left: ' + x + 'px;';
    line.setAttribute('style', css);
    line.setAttribute('class', 'RE3_LIVECANVAS_BOUNDARY_TEST');
    line.setAttribute('id', 'LIVE_LINE_TEST');
    $('#' + where).append(line);
}
function DEBUG_createLine(where, x1, x2, y1, y2){
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);
    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;
    var x = sx - c / 2,
        y = sy;
    var alpha = Math.PI - Math.atan2(-b, a);
    return DEBUG_createLineElement(where, x, y, c, alpha);
}