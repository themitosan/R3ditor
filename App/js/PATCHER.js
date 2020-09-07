/*
	R3ditor - PATCHER.js
	By mitosan/mscore/misto_quente/mscorehdr
	Sabia que eu queria fazer isso faz tempo?
*/
var PATCHER_platform, PATCHER_arquivoBruto, PATCHER_patchDecompiled, PATCHER_FINAL_FILE;
/*
	Functions
*/
function PATCHER_createPatch(executable){
	ORIGINAL_FILENAME = executable;
	PATCHER_arquivoBruto = fs.readFileSync(executable, 'hex');
	PATCHER_platform = MIX_fileTypes[getFileName(ORIGINAL_FILENAME)][0];
	LOG_addLog('log', 'PATCHER - Loading MIX settings...');
	MIX_loadExe(executable, 1);
	LOG_addLog('log', 'PATCHER - Loading IEDIT settings...');
	IEDIT_loadExec(executable, 1);
	LOG_addLog('log', 'PATCHER - Loading DROP settings...');
	DROP_loadFile(executable, 1);
	LOG_addLog('log', 'PATCHER - Loading RE3SET settings...');
	RE3SET_loadFile(executable, 1);
	LOG_separator();
	LOG_addLog('log', 'PATCHER - Generating Patch...');

	var PATCH_FILE = 'R3 PATCHER\nCreated on ' + APP_NAME + '\nPatch File: ' + ORIGINAL_FILENAME + '\nPatch date: ' + currentTime() +
					 '\nPlatform: ' + PATCHER_platform + '\n\nR3_VER = ' + APP_VERSION + '\nR3_DAT = ' + currentTime() + '\nR3_PLAT = ' + 
					 PATCHER_platform + '\nR3_MIX = ' + btoa(MIX_Database) + '\nR3_IEDIT = ' + btoa(IEDIT_Database) + '\nR3_DROP = ' + 
					 btoa(DROP_databaseItems + DROP_databaseQuant) + '\nR3_RE3SET_INVENT = ' + btoa(RE3SET_inventoryHex) + '\nR3_RE3SET_START = ' +
					 btoa(RE3SET_startPos_raw) + '\nR3_RE3SET_IDESC = ' + btoa(RE3SET_itemDesc_raw) + '\nR3_RE3SET_SNAME = ' + btoa(RE3SET_saveName_raw) + 
					 '\nR3_RE3SET_INAME = ' + btoa(RE3SET_itemName_raw); 

	var newFilePath = 'Patch_' + currentTime() + '_' + PATCHER_platform;
	R3DITOR_SAVE(newFilePath, PATCH_FILE, 'utf-8', 'r3exepatch');
	PATCHER_cleanVars();
	LOG_addLog('log', 'PATCHER - Patch created successfully!');
	LOG_addLog('log', 'PATCHER - Path: <font class="user-can-select">' + newFilePath + '.r3exepatch</font>');
	LOG_scroll();
}
function PATCHER_cleanVars(){
	RE3SET_inventoryHex = RE3SET_startPos_raw = RE3SET_itemDesc_raw = RE3SET_saveName_raw = RE3SET_itemName_raw = MIX_Database = IEDIT_Database = PATCHER_platform = ORIGINAL_FILENAME = DROP_databaseItems = DROP_databaseQuant = PATCHER_arquivoBruto = DROP_databaseCompiled = PATCHER_patchDecompiled = undefined;
}
function PATCHER_loadPatch(patchFile){
	PATCHER_patchDecompiled = [];
	PATCHER_platform = PATCHER_arquivoBruto = undefined;
	LOG_addLog('log', 'PATCHER - Patch loaded successfully!');
	LOG_addLog('log', 'PATCHER - Path: <font class="user-can-select">' + patchFile + '</font>');
	fs.readFileSync(patchFile).toString().split('\n').forEach(function(line){ 
		PATCHER_patchDecompiled.push(line);
	});
	//
	var PATCHER_date = PATCHER_patchDecompiled[7].replace('R3_DAT = ', '').slice(0, 10);
	var PATCHER_time = PATCHER_patchDecompiled[7].replace('R3_DAT = ', '').slice(11, PATCHER_patchDecompiled[7].length).replace(/\./g, ':');
	//
	document.getElementById('R3_PATCHER_lbl_patchDate').innerHTML = PATCHER_date + ' (' + PATCHER_time + ')';
	document.getElementById('R3_PATCHER_lbl_R3ditorVersion').innerHTML = PATCHER_patchDecompiled[6].replace('R3_VER = ', '');
	document.getElementById('R3_PATCHER_lbl_OriginalPlatform').innerHTML = PATCHER_patchDecompiled[8].replace('R3_PLAT = ', '');
	/*
		Set variables ready!
	*/
	MIX_Database  = atob(PATCHER_patchDecompiled[9].replace('R3_MIX = ', ''));
	IEDIT_Database = atob(PATCHER_patchDecompiled[10].replace('R3_IEDIT = ', ''));
	DROP_databaseCompiled = atob(PATCHER_patchDecompiled[11].replace('R3_DROP = ', ''));
	// RE3SET
	RE3SET_inventoryHex = atob(PATCHER_patchDecompiled[12].replace('R3_RE3SET_INVENT = ', ''));
	RE3SET_startPos_raw = atob(PATCHER_patchDecompiled[13].replace('R3_RE3SET_START = ',  ''));
	RE3SET_itemDesc_raw = atob(PATCHER_patchDecompiled[14].replace('R3_RE3SET_IDESC = ',  ''));
	RE3SET_saveName_raw = atob(PATCHER_patchDecompiled[15].replace('R3_RE3SET_SNAME = ',  ''));
	RE3SET_itemName_raw = atob(PATCHER_patchDecompiled[16].replace('R3_RE3SET_INAME = ',  ''));
	// Start Pos. decompile
	RE3SET_startPos_xPos	   = RE3SET_startPos_raw.slice(0, 4);
	RE3SET_startPos_yPos	   = RE3SET_startPos_raw.slice(4, 8);
	RE3SET_startPos_rPos	   = RE3SET_startPos_raw.slice(8, 12);
	RE3SET_startPos_roomNumber = RE3SET_startPos_raw.slice(12, 14);
	RE3SET_startPos_roomCam	   = RE3SET_startPos_raw.slice(14, 16);
	// Final
	main_menu(10);
	LOG_scroll();
}
function PATCHER_applyOnExec(targetExec){
	var FINAL_APPLY_PATCH = true;
	RE3SET_fName = getFileName(targetExec);
	//
	var USE_DROP = document.getElementById('R3_PATCHER_chkbox_applyDROP').checked;
	var USE_MIX = document.getElementById('R3_PATCHER_chkbox_applyItemCombs').checked;
	var USE_IEDIT = document.getElementById('R3_PATCHER_chkbox_applyItemSettings').checked;
	//
	var USE_R3_applyStartItems = document.getElementById('R3_PATCHER_chkbox_RE3SET_applyStartItems').checked;
	var USE_R3_applyStartLocation = document.getElementById('R3_PATCHER_chkbox_RE3SET_applyStartLocation').checked;
	var USE_R3_applyItemDesc = document.getElementById('R3_PATCHER_chkbox_RE3SET_applyItemDesc').checked;
	var USE_R3_applySaveNames = document.getElementById('R3_PATCHER_chkbox_RE3SET_applySaveNames').checked;
	var USE_R3_applyItemNames = document.getElementById('R3_PATCHER_chkbox_RE3SET_applyItemNames').checked;
	//
	if (USE_MIX === false && USE_IEDIT === false && USE_DROP === false && USE_R3_applyStartItems === false && USE_R3_applyStartLocation === false && USE_R3_applyItemDesc === false && USE_R3_applySaveNames === false && USE_R3_applyItemNames === false){
		LOG_addLog('warn', 'WARN - You need to select one of the options above to apply!');
	} else {
		if (PATCHER_patchDecompiled !== undefined && fs.existsSync(targetExec) !== false){
			LOG_separator();
			ORIGINAL_FILENAME = targetExec;
			var RE3_FILE_END, RE3_FILE_START;
			PATCHER_platform = getFileName(ORIGINAL_FILENAME);
			$('#R3_PATCHER_btn_apply').css({'display': 'none'});
			$('#R3_PATCHER_btn_cancel').css({'display': 'none'});
			PATCHER_FINAL_FILE = fs.readFileSync(targetExec, 'hex');
			var DROP_VERSION = DROP_fileTypes[getFileName(ORIGINAL_FILENAME)][1], RE3SET_fMode = DROP_VERSION;
			//
			if (USE_MIX === true){
				LOG_addLog('log', 'PATCHER - Applying MIX...');
				RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, MIX_fileTypes[PATCHER_platform][1]);
				RE3_FILE_END = PATCHER_FINAL_FILE.slice(MIX_fileTypes[PATCHER_platform][2], PATCHER_FINAL_FILE.length);
				PATCHER_FINAL_FILE = RE3_FILE_START + MIX_Database + RE3_FILE_END;
			}
			if (USE_IEDIT === true){
				LOG_addLog('log', 'PATCHER - Applying IEDIT...');
				RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, IEDIT_fileTypes[PATCHER_platform][1]);
				RE3_FILE_END = PATCHER_FINAL_FILE.slice(IEDIT_fileTypes[PATCHER_platform][2], PATCHER_FINAL_FILE.length);
				PATCHER_FINAL_FILE = RE3_FILE_START + IEDIT_Database + RE3_FILE_END;
			}
			if (USE_DROP === true){
				LOG_addLog('log', 'PATCHER - Applying DROP...');
				RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['DROP_' + DROP_VERSION + '_itemIds'][0]);
				RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['DROP_' + DROP_VERSION + '_itemQuant'][1], PATCHER_FINAL_FILE.length);
				PATCHER_FINAL_FILE = RE3_FILE_START + DROP_databaseCompiled + RE3_FILE_END;
			}
			// RE3SET
			var RE3SET_canApply_1 = RE3SET_PATCHER_COMPAT[RE3SET_fMode][0]; // USE_R3_applyStartItems
			var RE3SET_canApply_2 = RE3SET_PATCHER_COMPAT[RE3SET_fMode][1]; // USE_R3_applyStartLocation
			var RE3SET_canApply_3 = RE3SET_PATCHER_COMPAT[RE3SET_fMode][2]; // USE_R3_applyItemDesc
			var RE3SET_canApply_4 = RE3SET_PATCHER_COMPAT[RE3SET_fMode][3]; // USE_R3_applySaveNames
			var RE3SET_canApply_5 = RE3SET_PATCHER_COMPAT[RE3SET_fMode][4]; // USE_R3_applyItemNames
			// Starting Items
			if (USE_R3_applyStartItems === true && FINAL_APPLY_PATCH === true){
				if (RE3SET_canApply_1 === true){
					LOG_addLog('log', 'PATCHER - RE3SET: Applying Starting Items...');
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_invent_' + RE3SET_fMode + '_startItems'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_invent_' + RE3SET_fMode + '_startItems'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_inventoryHex + RE3_FILE_END;
				} else {
					alert('WARN - RESET (Starting Items)\n\nPatcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - RESET: Patcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - Section: Starting Items');
					FINAL_APPLY_PATCH = false;
				}
			}
			// Start Location
			if (USE_R3_applyStartLocation === true && FINAL_APPLY_PATCH === true){
				if (RE3SET_canApply_2 === true){
					LOG_addLog('log', 'PATCHER - RE3SET: Applying Start Location...');
					// X Pos.
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_local_' + RE3SET_fMode + '_roomXpos'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_local_' + RE3SET_fMode + '_roomXpos'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_startPos_xPos + RE3_FILE_END;
					// Y Pos.
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_local_' + RE3SET_fMode + '_roomYpos'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_local_' + RE3SET_fMode + '_roomYpos'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_startPos_yPos + RE3_FILE_END;
					// R Pos.
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_local_' + RE3SET_fMode + '_roomRpos'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_local_' + RE3SET_fMode + '_roomRpos'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_startPos_rPos + RE3_FILE_END;
					// Room Cam
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_local_' + RE3SET_fMode + '_roomCam'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_local_' + RE3SET_fMode + '_roomCam'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_startPos_roomCam + RE3_FILE_END;
					// Room Number
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_local_' + RE3SET_fMode + '_roomNumber'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_local_' + RE3SET_fMode + '_roomNumber'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_startPos_roomNumber + RE3_FILE_END;
				} else {
					alert('WARN - RESET (Start Location)\n\nPatcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - RESET: Patcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - Section: Start Location');
					FINAL_APPLY_PATCH = false;
				}
			}
			// Item Description
			if (USE_R3_applyItemDesc === true && FINAL_APPLY_PATCH === true){
				if (RE3SET_canApply_3 === true){
					LOG_addLog('log', 'PATCHER - RE3SET: Applying Item Description...');
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_' + RE3SET_fMode + '_itemInfos'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_' + RE3SET_fMode + '_itemInfos'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_itemDesc_raw + RE3_FILE_END;
				} else {
					alert('WARN - RESET (Item Description)\n\nPatcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - RESET: Patcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - Section: Item Description');
					FINAL_APPLY_PATCH = false;
				}
			}
			// Save Name
			if (USE_R3_applySaveNames === true && FINAL_APPLY_PATCH === true){
				if (RE3SET_canApply_4 === true){
					LOG_addLog('log', 'PATCHER - RE3SET: Applying Save Name...');
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_' + RE3SET_fMode + '_saveNames'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_' + RE3SET_fMode + '_saveNames'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_saveName_raw + RE3_FILE_END;
				} else {
					alert('WARN - RESET (Save Name)\n\nPatcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - RESET: Patcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - Section: Save Name');
					FINAL_APPLY_PATCH = false;
				}
			}
			// Item Names
			if (USE_R3_applyItemNames === true && FINAL_APPLY_PATCH === true){
				if (RE3SET_canApply_5 === true){
					LOG_addLog('log', 'PATCHER - RE3SET: Applying Item Names...');
					RE3_FILE_START = PATCHER_FINAL_FILE.slice(0, RANGES['RE3SET_' + RE3SET_fMode + '_itemName'][0]);
					RE3_FILE_END = PATCHER_FINAL_FILE.slice(RANGES['RE3SET_' + RE3SET_fMode + '_itemName'][1], PATCHER_FINAL_FILE.length);
					PATCHER_FINAL_FILE = RE3_FILE_START + RE3SET_itemName_raw + RE3_FILE_END;
				} else {
					alert('WARN - RESET (Item Names)\n\nPatcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - RESET: Patcher can\'t modify this section because it aren\'t located on this file!');
					LOG_addLog('warn', 'WARN - Section: Item Names');
					FINAL_APPLY_PATCH = false;
				}
			}
			// End
			if (FINAL_APPLY_PATCH === true){
				try {
					if (DROP_fileTypes[PATCHER_platform][1] === 0){
						R3_CHECK_WATERMARK(PATCHER_FINAL_FILE);
					} else {
						PATCHER_Backup();
						fs.writeFileSync(ORIGINAL_FILENAME, PATCHER_FINAL_FILE, 'hex');
					}
					LOG_separator();
					LOG_addLog('log', 'PATCHER - The patch was applied successfully!');
					LOG_addLog('log', 'PATCHER - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
					PATCHER_showNotice('The patch was applied successfully!', 0);
				} catch (err) {
					LOG_addLog('error', 'ERROR - Something went wrong while applying the patch!');
					LOG_addLog('error', 'ERROR - Details: ' + err);
					PATCHER_showNotice('Something went wrong! Look at the log to know more about.', 1);
				}
			} else {
				PATCHER_showNotice('Something went wrong! Look at the log to know more about.', 1);
			}
		}
	}
	LOG_scroll();
}
function PATCHER_Backup(){
	R3DITOR_CHECK_FILES_AND_DIRS();
	if (PATCHER_FINAL_FILE !== undefined){
		try {
			LOG_separator();
			var PATCHER_backupName = getFileName(ORIGINAL_FILENAME).toUpperCase() + '-PATCHER-' + currentTime() + DROP_fileTypes[RE3SET_fName][2];
			fs.writeFileSync(APP_PATH + '\\Backup\\PATCHER\\' + PATCHER_backupName, PATCHER_FINAL_FILE, 'hex');
			LOG_addLog('log', 'INFO - The backup was made successfully! - File: ' + PATCHER_backupName);
			LOG_addLog('log', 'INFO - Path: <font class="user-can-select">' + APP_PATH + '\\Backup\\PATCHER\\' + PATCHER_backupName + '</font>');
		} catch (err) {
			LOG_separator();
			LOG_addLog('error', 'ERROR - Unable to make backup!');
			LOG_addLog('error', 'ERROR - Reason: ' + err);
		}
	} else {
		LOG_addLog('error', 'ERROR - You can\'t make a backup if you haven\'t opened a file yet!');
	}
	LOG_scroll();
}