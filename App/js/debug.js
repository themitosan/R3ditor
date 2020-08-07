/*
	debug.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Me ajuda ae véi - nunca te pedi nada... :P
*/
var DEBUG_TOTAL_LINES = 0;
var DEBUG_LOCKRENDER = false;
/// Reload js file
function reloadJsFile(src){
	console.warn('DEBUG: Reloading Script: ' + src);
	LOG_addLog('warn', 'Reloading Script: ' + src);
    $('script[src="' + src + '"]').remove();
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
    LOG_scroll();
}
function DEBUG_REFRESH_DATABASE(){
	reloadJsFile(APP_PATH + '\\App\\js\\database.js');
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
    Item Identify
*/
function DEBUG_translateItemHex(hexValue){
    var c = 0;
    var hex = '';
    var listItems = solveHEX(hexValue).match(/.{8,8}/g);
    while (c < listItems.length){
        hex = listItems[c];
        if (hex !== '' && hex !== undefined && hex.length === 8){
            var hxItem = ITEM[hex.slice(0, 2)][0];
            var hxQuan = parseInt(hex.slice(2, 4), 16);
            var hxAttr = ATTR[hex.slice(4, 6)][0];
            var hexPor = hex.slice(6, 8);
            // Results
            var results = '(' + (c + 1) + ') Item: ' + hxItem + '\nQuantity: ' + hxQuan + '\nAttr: ' + hxAttr + '\nPercentage Value: ' + hexPor;
            LOG_addLog('log', '(' + (c + 1) + ') Query Result: ' + hxItem);
            LOG_addLog('log', 'Quantity: ' + hxQuan + ' - Attr: ' + hxAttr + ' - Percentage value: ' + hexPor);
            console.info(results);
            LOG_separator();
            LOG_scroll();
        } else {
            return 'ERROR - Unable to identify item ' + c + '!';
        }
        c++;
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
     var style = 'top: ' + parseInt(ay + 8) + 'px; left: ' + parseInt(ax + 10) + 'px; width: ' + length + 'px; -webkit-transform-origin: 0% 0%; ' +
				 '-webkit-transform: rotate(' + angle + 'deg);';
     var LINE_HTML_TEMPLATE = '<div id="' + lineId + '" class="' + cssClass + '" style="' + style + '"></div>';
     $('#' + where).append(LINE_HTML_TEMPLATE);
     console.log(document.getElementById(lineId));
     // RE3_LIVECANVAS_BOUNDARY_TEST_LV_2_0
 }