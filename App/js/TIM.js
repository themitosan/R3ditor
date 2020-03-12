/*
	R3ditor - TIM.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help the manolo brow!
*/
var TIM_SIZE;
var TIM_required;
var TIM_mapFile = [];
var TIM_arquivoBruto;
var TIM_seekPattern_MIN;
var TIM_ORIGINAL_FILENAME;

function TIM_LOAD(timFile){
	var ret = false;
	RE3_LIVE_closeForm();
	try{
		TIM_arquivoBruto = fs.readFileSync(timFile, 'hex');
		var tim_status = TIM_verify_integrity();
		if (tim_status === true){
			TIM_ORIGINAL_FILENAME = timFile.replace(new RegExp(' ', 'gi'), '_');
			var BPP = TIM_arquivoBruto.slice(RANGES['TIM_BPP'][0], RANGES['TIM_BPP'][1]);
			LOG_addLog('log', 'INFO - TIM Health: Status OK! - File: ' + timFile);
			LOG_addLog('log', 'INFO - BPP: ' + TIM_BPP[BPP][1]);
			LOG_separator();
			ret = true;
		} else {
			LOG_addLog('WARN', 'INFO - TIM Health: Status FAIL! - File: <font class="user-can-select">' + timFile + '</font>');
			LOG_addLog('warn', 'WARN - There is something wrong with this file!');
			LOG_addLog('warn', 'Maybe the file was not found or the file is broken!');
		}
	} catch (err){
		LOG_addLog('error', 'ERROR - Something went wrong while loading TIM: ' + err);
	}
	LOG_scroll();
	return ret;
}
//
function TIM_verify_integrity(){
	var verify = true;
	if (TIM_arquivoBruto !== undefined){
		var header = TIM_arquivoBruto.slice(RANGES['TIM_header'][0], RANGES['TIM_header'][1]);
		var BPP    = TIM_arquivoBruto.slice(RANGES['TIM_BPP'][0], 	 RANGES['TIM_BPP'][1]);
		if (header !== '10000000'){
			verify = false;
		}
		if (TIM_BPP[BPP] === undefined){
			verify = false;
		}
	} else {
		verify = false;
	}
	return verify;
}