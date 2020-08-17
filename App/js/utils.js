/*
	utils.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me? Pliiiiz!

	FILEGEN
	File Generator Code

	html2canvas was made by Niklas von Hertzen.
	https://html2canvas.hertzen.com/

	Canvas2Image was made by hongru
	https://github.com/hongru/canvas2image

	Xdelta created by Joshua MacDonald
	https://github.com/jmacd/xdelta
	http://xdelta.org/
*/
var FG_file_color = '';
var ARD_LIST_ENABLE = [];
var FILEGEN_TOGGLE = false;
var ARD_ENABLE_RUNNING = false;
var R3_PROCESS_ARDENABLER = false;
var OBJ_arquivoBruto, ARD_arquivoBruto, UTILS_ARD_INTERVAL, ARD_DECOMP_INTERVAL, XDELTAPatch_arquivoBruto, XDELTAOrigin_arquivoBruto, XDELTA_interval;
/*
	Functions
*/
function FILEGEN_TOGGLE_RES(){
	if (FILEGEN_TOGGLE === false){
		$('#FILEGEN_CANVAS').css({'zoom': '1', 'left': '926px'});
		document.getElementById('BTN_saveImage').value = 'Toggle Zoom (Size: Original)';
		FILEGEN_TOGGLE = true;
	} else {
		$('#FILEGEN_CANVAS').css({'zoom': '2', 'left': '400px'});
		document.getElementById('BTN_saveImage').value = 'Toggle Zoom (Size: Double)';
		FILEGEN_TOGGLE = false;
	}
}
function FILEGEN_saveImage(){
	$('#FILEGEN_CANVAS').css({'zoom': '1', 'left': '926px'});
	html2canvas(document.getElementById('FILEGEN_CANVAS'), { useCORS: true, foreignObjectRendering: false }).then(function(canvas){
		Canvas2Image.saveAsBMP(canvas);
	});
	$('#FILEGEN_CANVAS').css({'zoom': '2', 'left': '400px'});
}
function FG_RENDER(){
	var c = 0;
	var x_offset = 0;
	var y_offset = 0;
	document.getElementById('FILEGEN_CANVAS').innerHTML = '';
	if (document.getElementById('FILEGEN_text').value !== ''){
		var text = document.getElementById('FILEGEN_text').value.toString().replace(new RegExp('\n', 'gi'), '§').match(/.{1,1}/g);
		while(c < text.length){
			if (FG_DICIONARIO[text[c]] !== undefined){
				if (text[c] === '\n' || text[c] === '§'){
					y_offset = y_offset + 15;
					x_offset = 0;
					c++;
				} else {
					var distance = parseInt(FG_DICIONARIO[text[c]][1]) + x_offset;
					var FG_HTML_TEMPLATE = '<img src="' + APP_PATH + '/App/Img/chars' + FG_file_color + '.png" style="clip-path: inset(' + FG_DICIONARIO[text[c]][0] + '); position: absolute; left: ' + distance + 'px;top: ' + y_offset + 'px;">';
					$('#FILEGEN_CANVAS').append(FG_HTML_TEMPLATE);
					x_offset = x_offset + FG_DICIONARIO[text[c]][2];
					c++;
				}
			} else {
				c++;
			}
		}
	}
}
function FG_selectTextColor(colorId){
	FG_clearAllRadioButtons();
	if (colorId === 0){
		FG_file_color = '';
	}
	if (colorId === 1){
		FG_file_color = '_red';
	}
	if (colorId === 2){
		FG_file_color = '_green';
	}
	if (colorId === 3){
		FG_file_color = '_iceBlue';
	}
	document.getElementById('FG_select_color_' + colorId).checked = true;
	FG_RENDER();
}
function FG_clearAllRadioButtons(){
	var t = 3;
	var c = 0;
	while(c < parseInt(t + 1)){
		document.getElementById('FG_select_color_' + c).checked = false;
		c++;
	}
}
/*
	OBJ Patcher
	Fix created by Biohazard España - You are amazing!!!
*/
function UTILS_OBJ_Patcher_load(){
	if (R3ditor_tool_selected === false){
		OBJ_arquivoBruto = '';
		triggerLoad(15);
	}
}
function UTILS_OBJ_Patcher_RUN(file){
	if (file !== undefined && file !== null){
		var c = 0;
		var tPaches = 0;
		var OBJ_array = [];
		fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
			OBJ_array.push(line); 
		});
		while(c < OBJ_array.length){
			if (OBJ_array[c].slice(0, 1) === '#'){
				c++;
			} else {
				var linePatch = OBJ_array[c];
				if (linePatch.indexOf('.') !== -1){
					linePatch = linePatch.replace(/\./g, ',');
					tPaches++;
				}
				if (c === 0){
					OBJ_arquivoBruto = linePatch;
				} else {
					OBJ_arquivoBruto = OBJ_arquivoBruto + '\n' + linePatch;
				}
				c++;
			}
		}
		if (tPaches !== 0){
			OBJ_arquivoBruto = '# OBJ Converted in R3ditor V.' + APP_VERSION + '\n' + OBJ_arquivoBruto.slice(1, OBJ_arquivoBruto.length);
			R3DITOR_SAVE(getFileName(file).toLowerCase().replace('.obj', '') + '_converted', OBJ_arquivoBruto, 'utf-8', 'obj');
		} else {
			LOG_addLog('warn', 'OBJ Patcher - This file doesn\'t need patching!');
		}
	}
	LOG_scroll();
}
/*
	Extract ROFS
*/
function UTILS_extract_rofs(rofsFile){
	try{
		LOG_addLog('log', 'ROFS - Extracting file: <font class="user-can-select">' + rofsFile + '</font>');
		if (R3ditor_tool_selected === false && rofsFile !== undefined && rofsFile !== '' && EXEC_rofs !== undefined){
			UTILS_rofs_hideButtons();
			process.chdir(rofsFile.slice(0, parseInt(rofsFile.length - getFileName(rofsFile).length)));
			runExternalSoftware(EXEC_rofs, [rofsFile]);
			var timer = setInterval(function(){
				if (EXTERNAL_APP_EXITCODE === 0){
					LOG_addLog('log', 'ROFS - Process Complete!');
					setTimeout(function(){
						reload();
					}, 1200);
					clearInterval(timer);
				}
			}, 50);
		}
	} catch (err) {
		if (err.toString().indexOf('Error: spawn UNKNOWN') !== -1){
			LOG_addLog('error', 'ERROR - Unable to extract ROFS.exe! You need to instal Visual Studio 2005 runtime files to run this software');
			LOG_addLog('error', 'ERROR - Details: ' + err);
		} else {
			LOG_addLog('error', 'ERROR - Something went wrong while extracting rofs!');
			LOG_addLog('error', 'ERROR - Details: ' + err);
		}
	}
	LOG_scroll();
}
/* 
	ARD Enabler
*/
function UTILS_ARDEnabler(){
	if (enable_mod === true){
		R3_PROCESS_ARDENABLER = true;
		var psStagePaths = prompt('ARD Enabler\nPlease insert the path where STAGE folders are located below:\n\n(Example: C:\\RE3_EXTRACT\\CD_DATA)');
		if (psStagePaths !== null && fs.existsSync(psStagePaths) !== false){
			var cStage = 0;
			ARD_LIST_ENABLE = [];
			DESIGN_prepareForARDEnabler();
			$('body').css({'cursor': 'wait'});
			UTILS_ARD_INTERVAL = setInterval(function(){
				if (cStage < 6){
					if (ARD_ENABLE_RUNNING !== true){
						cStage++;
						UTILS_ARDEnabler_generateFiles(psStagePaths, cStage);
					} else {
						console.info('Adding STAGE ' + cStage);
					}
				} else {
					UTILS_ARDEnabler_startEnableProcess();
				}
			}, 500);
		}
	} else {
		LOG_addLog('warn', 'WARN - Unable to run ARD Enabler!');
		LOG_addLog('warn', 'WARN - You need to have all data decompiled from Resident Evil 3 (PC Version)');
	}
	LOG_scroll();
}
function UTILS_ARDEnabler_generateFiles(stagePath, stageNumber){
	var c = 0;
	ARD_ENABLE_RUNNING = true;
	var ARD_FS_FILELIST = fs.readdirSync(stagePath + '\\STAGE' + stageNumber);
	var ardList = ARD_FS_FILELIST.filter(ardFile => /\.ARD$/.test(ardFile));
	while (c < ardList.length){
		ARD_LIST_ENABLE.push(stagePath + '\\STAGE' + stageNumber + '\\' + ardList[c]);
		c++;
	}
	ARD_ENABLE_RUNNING = false;
}
function UTILS_ARDEnabler_startEnableProcess(){
	clearInterval(UTILS_ARD_INTERVAL);
	if (ARD_LIST_ENABLE.length !== 0){
		var c = 0;
		UTILS_ARD_INTERVAL = setInterval(function(){
			if (c < ARD_LIST_ENABLE.length){
				if (ARD_ENABLE_RUNNING !== true){
					UTILS_ARDEnabler_seekValues(c, ARD_LIST_ENABLE[c]);
					c++;
					if (DESIGN_ENABLE_ANIMS === true){
						$('#img-logo').css({'filter': 'blur(' + c + 'px)'});
					}
				} else {
					console.log('(' + c + ' / ' + ARD_LIST_ENABLE.length + ') Enabling file: ' + ARD_LIST_ENABLE[c]);
				}
			} else {
				UTILS_ARDEnabler_finish();
			}
		}, 500);
	}
}
function UTILS_ARDEnabler_seekValues(currentArd, filePath){
	var ARD_CAN_MAKE = true;
	ARD_ENABLE_RUNNING = true;
	if (fs.existsSync(filePath) !== false){
		var ardName = getFileName(filePath).toUpperCase();
		var rdtName = APP_PATH + '\\Assets\\DATA_E\\RDT\\' + ardName + '.RDT';
		LOG_addLog('log', 'INFO - Enabling file: ' + ardName + ' <div class="log-ARDENABLER-counter">(' + currentArd + ' / ' + ARD_LIST_ENABLE.length + ')</div>');
		if (fs.existsSync(rdtName) !== false){
			RDT_arquivoBruto = fs.readFileSync(rdtName, 'hex');
			ARD_arquivoBruto = fs.readFileSync(filePath, 'hex');
			var rdtHeader = RDT_arquivoBruto.slice(0, 192); // RDT Header
			var ardExists = ARD_arquivoBruto.indexOf(rdtHeader);
			// Checks
			if (ardExists === -1){
				// Header is different from RDT
				LOG_separator();
				LOG_addLog('warn', 'WARN - ' + ardName + ' Header is different from PC version!');
				LOG_addLog('warn', 'WARN - R3ditor will try capture RDT using the first camera angle...');
				LOG_separator();
				rdtHeader = RDT_arquivoBruto.slice(192, 256); // First Camera
				ardExists = ARD_arquivoBruto.indexOf(rdtHeader);
				// Finds the cam
				if (ardExists !== -1){
					ardExists = (ardExists - 192);
					//console.info(ardName + ' - ' + ardExists);
				} else {
					ARD_CAN_MAKE = false;
					LOG_addLog('warn', 'WARN - Unable to generate ' + ardName + '!');
					LOG_addLog('warn', 'WARN - Reason: RDT Header was not found inside ARD file!)');
				}
			}
			// END
			if (ARD_CAN_MAKE === true){
				UTILS_ARDEnabler_genFiles(ardName, ardExists);
			} else {
				ARD_ENABLE_RUNNING = false;
			}
		} else {
			LOG_addLog('warn', 'WARN - Unable to generate ' + ardName + '!');
			LOG_addLog('warn', 'WARN - Reason: RDT file was not found! (<font class="user-can-select">' + rdtName + '</font>)');
		}
	}
	LOG_scroll();
}
function UTILS_ARDEnabler_genFiles(ardName, ardExists){
	var ARD_START = ARD_arquivoBruto.slice(0, ardExists);
	var RDT_EXTRACT = ARD_arquivoBruto.slice(ardExists, (ardExists + RDT_arquivoBruto.length));
	var ARD_END = ARD_arquivoBruto.slice((ardExists + RDT_arquivoBruto.length), ARD_arquivoBruto.length);
	// console.info('RDT slice: ' + ardExists + ' - ' + (ardExists + RDT_arquivoBruto.length) + ' (ARD length: ' + ARD_arquivoBruto.length + ')');
	//
	var ARDMAP_FILE = 'ARDMAP\nGenerated with ' + APP_NAME + '\nFile: ' + ardName + '\n\nARDSIZE = ' + ARD_arquivoBruto.length + 
					  '\nARDSTART = ' + btoa(ARD_START) + '\nARDEND = ' + btoa(ARD_END);
	try {
		fs.writeFileSync(APP_PATH + '\\Configs\\ARDRDT\\' + ardName + '.RDT', RDT_EXTRACT, 'hex');
		fs.writeFileSync(APP_PATH + '\\Configs\\ARDMAP\\' + ardName + '.ARDMAP', ARDMAP_FILE, 'utf-8');
		ARD_ENABLE_RUNNING = false;
	} catch (err) {
		LOG_addLog('error', 'ERROR - Unable to generate ' + ardName + '.ARDMAP!');
		LOG_addLog('error', 'ERROR - Reason: ' + err);
		ARD_ENABLE_RUNNING = false;
	}
}
function UTILS_ARDEnabler_finish(){
	clearInterval(UTILS_ARD_INTERVAL);
	LOG_separator();
	LOG_addLog('log', 'INFO - ARD Enabler: Process complete!');
	R3_PROCESS_ARDENABLER = false;
	R3_ARDENABLER_ENABLED = true;
	WZ_saveConfigs(true);
	reload();
}
function UTILS_ARDEnabler_compileARD(mapName){
	if (mapName !== undefined && mapName !== ''){
		var ARDMap_path = APP_PATH + '\\Configs\\ARDMAP\\' + mapName.toUpperCase() + '.ARDMAP';
		if (fs.existsSync(ARDMap_path) !== false){
			var ARDMAP_RECOMP_FILE = [];
			fs.readFileSync(ARDMap_path).toString().split('\n').forEach(function(line){ 
				ARDMAP_RECOMP_FILE.push(line); 
			});
			//
			var NEWARD_END = atob(ARDMAP_RECOMP_FILE[6].replace('ARDEND = ', ''));
			var NEWARD_START = atob(ARDMAP_RECOMP_FILE[5].replace('ARDSTART = ', ''));
			var NEWARD_SIZECHECK = parseInt(ARDMAP_RECOMP_FILE[4].replace('ARDSIZE = ', ''));
			var NEWARD_RDT = fs.readFileSync(APP_PATH + '\\Configs\\ARDRDT\\' + mapName.toUpperCase() + '.RDT', 'hex');
			//
			var FINAL_ARD = NEWARD_START + NEWARD_RDT + NEWARD_END;
			if (FINAL_ARD.length === NEWARD_SIZECHECK){
				R3DITOR_SAVE(mapName.toUpperCase() + '.ARD', FINAL_ARD, 'hex', 'ARD');
			} else {
				LOG_addLog('warn', 'WARN - Unable to generate ARD File!');
				LOG_addLog('warn', 'WARN - Reason: The final file does not match with original ARD file!');
			}
		} else {
			LOG_addLog('warn', 'WARN - Unable to generate ARD File!');
			LOG_addLog('warn', 'WARN - Reason: Unable to find ARDMAP for ' + mapName);
		}
	}
	LOG_scroll();
}
/*
	XDelta
*/
function UTILS_XDELTA_setXdeltafile(path, mode){
	if (path !== ''){
		var reduceLabel = '';
		if (path.length > 60){
			reduceLabel = '...' + path.slice((path.length - 84), path.length);
		} else {
			reduceLabel = path;
		}
		if (mode === 0){
			// XDelta file
			XDELTAPatch_arquivoBruto = path;
			document.getElementById('R3_Patcher_Xdelta_lbl_Xfile').innerHTML = reduceLabel;
			LOG_addLog('log', 'XDELTA - Patch file loaded!');
			LOG_addLog('log', 'XDELTA - Path: <font class="user-can-select">' + path + '</font>');
		} else {
			XDELTAOrigin_arquivoBruto = path;
			document.getElementById('R3_Patcher_Xdelta_lbl_origFile').innerHTML = reduceLabel;
			LOG_addLog('log', 'XDELTA - Original file loaded!');
			LOG_addLog('log', 'XDELTA - Path: <font class="user-can-select">' + path + '</font>');
		}
	}
	LOG_scroll();
}
function UTILS_XDELTA_VERIFY(){
	var reason = '';
	var UTILS_XDELTA_CANAPPLY = true;
	if (XDELTAOrigin_arquivoBruto === undefined){
		UTILS_XDELTA_CANAPPLY = false;
		reason = 'The origin file was not set!';
	}
	if (XDELTAPatch_arquivoBruto === undefined){
		UTILS_XDELTA_CANAPPLY = false;
		reason = 'The patch file was not set!';
	}
	if (UTILS_XDELTA_CANAPPLY === true){
		UTILS_XDELTA_APPLY();
	} else {
		LOG_addLog('warn', 'WARN - Unable to start patch process!');
		LOG_addLog('warn', 'WARN - Reason: ' + reason);
		LOG_scroll();
	}
}
function UTILS_XDELTA_APPLY(){
	LOG_separator();
	LOG_addLog('log', 'XDELTA - Starting process...');
	DESIGN_XDELTA_showInfo('Creating File - Please wait...', false);
	document.getElementById('R3_XDELTA_finalFileName').disabled = 'disabled';
	var finalFileName = document.getElementById('R3_XDELTA_finalFileName').value;
	document.getElementById('R3_XDELTA_PATCHER_btn_apply').disabled = 'disabled';
	document.getElementById('R3_XDELTA_PATCHER_btn_cancel').disabled = 'disabled';
	document.getElementById('R3_XDELTA_PATCHER_btn_openPatchFile').disabled = 'disabled';
	document.getElementById('R3_XDELTA_PATCHER_btn_openOriginFile').disabled = 'disabled';
	if (finalFileName === ''){
		finalFileName = 'NEW_BIN_FILE.BIN';
	}
	process.chdir(APP_PATH + '\\App\\tools');
	runExternalSoftware(APP_PATH + '\\App\\tools\\xdelta.exe', ['-d', '-s', XDELTAOrigin_arquivoBruto, XDELTAPatch_arquivoBruto , 'XDELTA_PATCH_FILE.bin']);
	XDELTA_interval = setInterval(function(){
		if (EXTERNAL_APP_RUNNING === false){
			UTILS_XDELTA_FINISH(finalFileName);
		} else {
			console.info('Waiting Xdelta...');
		}
	}, 1000);
	LOG_scroll();
}
function UTILS_XDELTA_FINISH(saveFileName){
	clearInterval(XDELTA_interval);
	process.chdir(TEMP_APP_PATH);
	DESIGN_XDELTA_showInfo();
	if (EXTERNAL_APP_EXITCODE === 0){
		LOG_addLog('log', 'XDELTA - Patch created sucessfully!');
		if (fs.existsSync(APP_PATH + '\\App\\tools\\XDELTA_PATCH_FILE.bin') === true){
			var TEMP_arquivoBruto = fs.readFileSync(APP_PATH + '\\App\\tools\\XDELTA_PATCH_FILE.bin', 'hex');
			DESIGN_XDELTA_showInfo('Patch created sucessfully!', true);
			R3DITOR_SAVE(saveFileName, TEMP_arquivoBruto, 'hex', 'bin');
		}
	} else {
		LOG_separator();
		DESIGN_XDELTA_showInfo('Something went wrong while creating patch!', true);
		LOG_addLog('warn', 'XDELTA - Something went wrong while creating patch!');
	}
	LOG_scroll();
}