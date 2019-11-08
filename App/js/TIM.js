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
			var BPP = TIM_arquivoBruto.slice(RANGES["TIM_BPP"][0], RANGES["TIM_BPP"][1]);
			addLog('log', 'INFO - TIM Health: Status OK! - File: ' + timFile);
			addLog('log', 'INFO - BPP: ' + TIM_BPP[BPP][1]);
			log_separador();
			ret = true;
		} else {
			addLog('WARN', 'INFO - TIM Health: Status FAIL! - File: ' + timFile);
			addLog('warn', 'WARN - There is something wrong with this file!');
			addLog('warn', 'Maybe the file was not found or the file is broken!');
		}
	} catch (err){
		console.error('ERROR - Something went wrong while loading TIM!\n' + err);
		addLog('error', 'ERROR - Something went wrong while loading TIM: ' + err);
	}
	scrollLog();
	return ret;
}
// TIM PATCHER TOOL
function TIM_loadTimToSeekPattern(timF){
	var STATUS = TIM_LOAD(timF);
	if (STATUS === true){
		TIM_seekPattern();
	}
	scrollLog();
}
function TIM_seekPattern(){
	if (TIM_arquivoBruto !== undefined){
		cls();
		var cases = 0;
		localStorage.clear();
		sessionStorage.clear();

		var end_position;
		var TOT_PATCHS = 0;
		var start_position;
		var current_record = '';
		var start_record = false;
		//
		var current_sample = '';
		var previous_sample = '';
		//
		TIM_seekPattern_MIN = parseInt(document.getElementById('TIMPATCHER_minLength').value);
		if (TIM_seekPattern_MIN === NaN || TIM_seekPattern < 2 || TIM_seekPattern === undefined){
			TIM_seekPattern = 2;
		}
		if (TIM_seekPattern > 20){
			TIM_seekPattern = 20;
		}
		//
		var current_BPP = TIM_arquivoBruto.slice(RANGES['TIM_BPP'][0], RANGES['TIM_BPP'][1]);
		var currentPos_A = TIM_BPP[current_BPP][2];
		var currentPos_B = parseInt(TIM_BPP[current_BPP][2] + 4);

		while(currentPos_B < TIM_arquivoBruto.length){
			current_sample = TIM_arquivoBruto.slice(currentPos_A, currentPos_B);
			if (current_sample === previous_sample && TIM_EXCLUDEPATTERN[current_sample] === undefined){
				if (cases > parseInt(TIM_seekPattern_MIN - 1)){
					start_record = true;
					if (start_position === undefined && end_position === undefined){
						currentPos_A = parseInt(currentPos_A - parseInt(TIM_seekPattern_MIN * 4));
						currentPos_B = parseInt(currentPos_B - parseInt(TIM_seekPattern_MIN * 4));
						start_position = parseInt(currentPos_A - 4);
					}
				} else {
					console.log(current_sample);
					cases++;
				}
			} else {
				cases = 0;
				if (start_record === true){
					end_position = parseInt(currentPos_B - 4);
					var REAL_OFFSET = TIM_arquivoBruto.slice(start_position, end_position);
					console.log(REAL_OFFSET + '\n\nStart: ' + start_position + '\nEnd: ' + end_position + '\nLength: ' + REAL_OFFSET.length);
					localStorage.setItem('TIMPATCHER_Patch-' + TOT_PATCHS, start_position + '-END_POS-' + end_position + '-PATCH-' + REAL_OFFSET);
					TOT_PATCHS++;
					//
					start_position = undefined;
					end_position = undefined;
					start_record = false;
				}
			}
			previous_sample = current_sample;
			currentPos_A = parseInt(currentPos_A + 4);
			currentPos_B = parseInt(currentPos_B + 4);
		}
	}
	addLog('log', 'INFO - Process Complete!');
	if (TOT_PATCHS !== 0){
		addLog('log', 'INFO - The process found ' + TOT_PATCHS + ' patches to apply on this TIM!');
		TIM_generateMapForPatterns(TOT_PATCHS, current_BPP);
	} else {
		addLog('log', 'INFO - The process was unable to find patches for this file!');
	}
	log_separador();
	scrollLog();
}
function TIM_generateMapForPatterns(totalPatches, bpp){
	if (TIM_arquivoBruto !== undefined && parseInt(totalPatches) !== NaN && parseInt(totalPatches) > 0){
		var c = 0;
		var patches = '';
		var fileHeader = 'Patch for ' + getFileName(TIM_ORIGINAL_FILENAME).toUpperCase() + '.TIM\nGenerated With ' + APP_NAME + '\n\n[TOTAL]\n' + totalPatches + 
			'\n\n[TIM]\nName=' + getFileName(TIM_ORIGINAL_FILENAME).toUpperCase() + '\n\n' + '[BPP]\n' + bpp.toUpperCase() + '\n\n[SIZE]\n' + 
			getFileSize(TIM_ORIGINAL_FILENAME, 0) + '\n\n[PATTERN MIN]\n' + TIM_seekPattern_MIN + '\n\n';

		while (c < totalPatches){
			var extract = localStorage.getItem('TIMPATCHER_Patch-' + c);
			var OFFSET_START = extract.slice(0, extract.indexOf('-END_POS-'));
			var OFFSET_END = extract.slice(parseInt(extract.indexOf('-END_POS-') + 9), extract.indexOf('-PATCH-'));
			var CURRENT_PATCH = extract.slice(parseInt(extract.indexOf('-PATCH-') + 7), extract.length)
			patches = patches + '[PATCH ' + c + ']\nStart=' + OFFSET_START + '\nEnd=' + OFFSET_END + '\nData=' + CURRENT_PATCH + '\n\n';
			c++;
		}
		var FINAL = fileHeader + patches;
		R3DITOR_SAVE(getFileName(TIM_ORIGINAL_FILENAME).toUpperCase() + '.r3timmap', FINAL, 'utf-8', '.r3timmap');
	}
}
function TIM_openPatchFile(fileMap){
	try{
		fs.readFileSync(fileMap).toString().split('\n').forEach(function(line){ 
			TIM_mapFile.push(line); 
		});
		TIM_SIZE = parseInt(TIM_mapFile[13]);
		TIM_required = TIM_mapFile[7].replace('Name=', '').replace(' ', '_');
		document.getElementById('TIMPATCHER_patchName').title = 'Path: ' + fileMap;
		document.getElementById('TIMPATCHER_totalPatches').innerHTML = TIM_mapFile[4];
		document.getElementById('TIMPATCHER_timName').innerHTML = TIM_required + '.TIM';
		document.getElementById('TIMPATCHER_lbl_patternMin').innerHTML = TIM_mapFile[16];
		document.getElementById('TIMPATCHER_BPP').innerHTML = TIM_BPP[TIM_mapFile[10]][1];
		document.getElementById('TIMPATCHER_patchName').innerHTML = getFileName(fileMap).toUpperCase() + '.r3timmap';
		document.getElementById('TIMPATCHER_Size').innerHTML = parseInt(TIM_mapFile[13] / 1024) + ' KB (' + parseInt(TIM_mapFile[13]) + ' Bytes)';
		$('#tim_patcher_inicialMenu').css({'display': 'none'});
		$('#TIMPATCHER_applyBtns').css({'display': 'inline'});
		$('#tim_patcher_status').css({'display': 'inline'});
		$('#TIMPATCHER').css({'top': '194px'});
	} catch (err){
		addLog('error', 'ERROR - Something went wrong while loading the map file!');
	}
	scrollLog();
}
function TIM_verifyToPatchFile(tFile){
	var reason;
	var cFileName;
	var canApply = true;
	var STATUS = TIM_LOAD(tFile);
	if (STATUS === true && TIM_mapFile !== []){
		cFileName = getFileName(tFile).replace(' ', '_').toUpperCase() + '.TIM';
	} else {
		canApply = false;
		reason = 'The patcher can\'t recognize the map file or the TIM file are broken.';
	}
	if (cFileName !== TIM_required + '.TIM'){
		canApply = false;
		reason = 'Expected File: ' + TIM_required + '.TIM\nCurrent File: ' + cFileName;
	}
	if (TIM_SIZE !== getFileSize(TIM_ORIGINAL_FILENAME, 0)){
		canApply = false;
		reason = 'Expected Size (Bytes): ' + TIM_SIZE + '\nCurrent Size (Bytes): ' + getFileSize(TIM_ORIGINAL_FILENAME, 0);
	}
	//
	if (canApply === true){
		addLog('log', 'INFO - TIM Patcher - File: ' + cFileName + ' - Starting Process...');
		document.title = APP_NAME + ' - TIM Patcher - Please wait...';
		$('#TIMPATCHER').css({'display': 'none'});
		TIM_APPLY_PATCH();
	} else {
		document.title = APP_NAME + ' - TIM Patcher - ERROR!';
		alert('ERROR - Something went wrong!\n\n' + reason);
		addLog('error', 'ERROR - Something went wrong!');
		addLog('error', reason);
		TIM_cancelPatch();
	}
	scrollLog();
}
function TIM_APPLY_PATCH(){
	var c = 0;
	var reason;
	var SUCESS = true;
	var startLine = 19; // Linha Inicial dos patches
	var TEMP_FILE = TIM_arquivoBruto.toLowerCase();
	var MAP_TOTAL_PATCHES = parseInt(TIM_mapFile[4]);

	var C_PATCH;
	var SLICE_MIN;
	var SLICE_END;
	var SLICE_POS_END;
	var SLICE_POS_START;

	while (c < MAP_TOTAL_PATCHES){
		addLog('log', 'INFO - TIM Patcher - Applyng Patch - ' + parseInt(c + 1) + ' / ' + MAP_TOTAL_PATCHES + '...');
		
		SLICE_POS_START = parseInt(TIM_mapFile[startLine].replace('Start=', ''));
		C_PATCH = TIM_mapFile[parseInt(startLine + 2)].replace('Data=', '').toLowerCase();	
		SLICE_POS_END = parseInt(TIM_mapFile[parseInt(startLine + 1)].replace('End=', ''));
		
		console.log(SLICE_POS_START + ' - ' + SLICE_POS_END);
		SLICE_MIN = TEMP_FILE.slice(0, SLICE_POS_START);
		SLICE_END = TEMP_FILE.slice(SLICE_POS_END, TEMP_FILE.length);
		TEMP_FILE = SLICE_MIN + C_PATCH + SLICE_END;
		startLine = startLine + 5;
		c++;
	}

	if (TEMP_FILE.length !== TIM_arquivoBruto.length){
		SUCESS = false;
		reason = 'The length of patched version not match with original size! (Original: ' + TIM_arquivoBruto.length + ', Patched: ' + TEMP_FILE.length + ')';
	}

	//
	log_separador();
	if (SUCESS === true){
		fs.writeFileSync(TIM_ORIGINAL_FILENAME.replace('.TIM', '') + '_PATCHED.TIM', TEMP_FILE, 'hex');
		addLog('log', 'INFO - Tim Patcher - Patched File: ' + TIM_ORIGINAL_FILENAME.replace('.TIM', '') + '_PATCHED.TIM');
	} else {
		document.title = APP_NAME + ' - TIM Patcher - ERROR!';
		alert('ERROR - Something went wrong on TIM Patcher Process!\n\n' + reason);
		addLog('error', 'ERROR - Something went wrong on TIM Patcher Process!');
		addLog('error', reason);
	}
	log_separador();
	TIM_cancelPatch();
	addLog('log', 'INFO - Process complete!');
	$('#TIMPATCHER').css({'display': 'block'});
	scrollLog();
}
function TIM_cancelPatch(){
	TIM_mapFile = [];
	TIM_SIZE = undefined;
	TIM_required = undefined;
	TIM_arquivoBruto = undefined;
	TIM_seekPattern_MIN = undefined;
	TIM_ORIGINAL_FILENAME = undefined;
	document.title = APP_NAME + ' - TIM Patcher';
	$('#tim_patcher_inicialMenu').css({'display': 'block'});
	$('#TIMPATCHER_applyBtns').css({'display': 'none'});
	$('#tim_patcher_status').css({'display': 'none'});
	$('#TIMPATCHER').css({'top': '254px'});
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