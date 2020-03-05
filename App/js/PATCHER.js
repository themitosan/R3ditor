/*
	R3ditor - PATCHER.js
	By mitosan/mscore/misto_quente/mscorehdr
	Sabia que eu queria fazer isso faz tempo?
*/
var PATCHER_platform;
var PATCHER_arquivoBruto;
var PATCHER_patchDecompiled;
/*
	Functions
*/
function PATCHER_createPatch(executable){
	PATCHER_arquivoBruto = fs.readFileSync(executable, 'hex');
	ORIGINAL_FILENAME = executable;
	PATCHER_platform = MIX_fileTypes[getFileName(ORIGINAL_FILENAME)][0];
	LOG_addLog('log', 'PATCHER - Loading MIX settings...');
	MIX_loadExe(executable, 1);
	LOG_addLog('log', 'PATCHER - Loading IEDIT settings...');
	IEDIT_loadExec(executable, 1);
	LOG_separator();
	LOG_addLog('log', 'PATCHER - Generating Patch...');
	var PATCH_FILE =  'R3 PATCHER\nCreated on ' + APP_NAME + '\nPatch File: ' + ORIGINAL_FILENAME + '\nPatch date: ' + currentTime() +
					  '\nPlatform: ' + PATCHER_platform + '\n\nR3_VER = ' + APP_VERSION + '\nR3_DAT = ' + currentTime() + '\nR3_PLAT = ' + 
					  PATCHER_platform + '\nR3_MIX = ' + btoa(MIX_Database) + '\nR3_IEDIT = ' + btoa(IEDIT_Database) + 
					  '\nR3_WIP = WIP! ( Sorry =P )';
	R3DITOR_SAVE('Patch_' + currentTime() + '_' + PATCHER_platform, PATCH_FILE, 'utf-8', 'r3exepatch');
	reload();
}
function PATCHER_loadPatch(patchFile){
	PATCHER_patchDecompiled = [];
	PATCHER_platform = undefined;
	PATCHER_arquivoBruto = undefined;
	LOG_addLog('log', 'PATCHER - Patch loaded successfully!');
	LOG_addLog('log', 'PATCHER - Path: <font class="user-can-select">' + patchFile + '</font>');
	fs.readFileSync(patchFile).toString().split('\n').forEach(function(line){ 
		PATCHER_patchDecompiled.push(line);
	});
	//
	var PATCHER_date = PATCHER_patchDecompiled[7].replace('R3_DAT = ', '').slice(0, 10);
	var PATCHER_time = PATCHER_patchDecompiled[7].replace('R3_DAT = ', '').slice(11, PATCHER_patchDecompiled[7].length).replace(/\./g, ':');
	document.getElementById('R3_PATCHER_lbl_patchDate').innerHTML = PATCHER_date + ' (' + PATCHER_time + ')';
	document.getElementById('R3_PATCHER_lbl_R3ditorVersion').innerHTML = PATCHER_patchDecompiled[6].replace('R3_VER = ', '');
	document.getElementById('R3_PATCHER_lbl_OriginalPlatform').innerHTML = PATCHER_patchDecompiled[8].replace('R3_PLAT = ', '');
	// Set variables ready!
	MIX_Database  = atob(PATCHER_patchDecompiled[9].replace('R3_MIX = ', ''));
	IEDIT_Database = atob(PATCHER_patchDecompiled[10].replace('R3_IEDIT = ', ''));
	// Final
	main_menu(10);
	LOG_scroll();
}
function PATCHER_applyOnExec(targetExec){
	var USE_MIX = document.getElementById('R3_PATCHER_chkbox_applyItemCombs').checked;
	var USE_IEDIT = document.getElementById('R3_PATCHER_chkbox_applyItemSettings').checked;
	if (USE_MIX === false && USE_IEDIT === false){
		LOG_addLog('warn', 'WARN - You need to select one of the options above to apply!');
	} else {
		if (PATCHER_patchDecompiled !== undefined && fs.existsSync(targetExec) !== false){
			var RE3_FILE_END;
			var RE3_FILE_START;
			$('#R3_PATCHER_btn_apply').css({'display': 'none'});
			$('#R3_PATCHER_btn_cancel').css({'display': 'none'});
			//
			ORIGINAL_FILENAME = targetExec;
			PATCHER_platform = getFileName(ORIGINAL_FILENAME);
			var PATCHER_FINAL_FILE = fs.readFileSync(targetExec, 'hex');
			LOG_separator();
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
			try{
				fs.writeFileSync(ORIGINAL_FILENAME, PATCHER_FINAL_FILE, 'hex');
				LOG_separator();
				LOG_addLog('log', 'PATCHER - The patch was applied successfully!');
				LOG_addLog('log', 'PATCHER - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
				PATCHER_showNotice('The patch was applied successfully!', 0);
			} catch (err){
				LOG_addLog('error', 'ERROR - Something went wrong while applying the patch!');
				LOG_addLog('error', 'ERROR - Details: ' + err);
				PATCHER_showNotice('Something went wrong! Look at the log to know more about!', 1);
			}
		}
	}
	LOG_scroll();
}