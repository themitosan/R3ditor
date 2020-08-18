/*
	R3ditor - wizard.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Eu já te falei que você é demais?
*/
var GAME_PATH = '';
var WZ_lastMenu = 0;
var progressbar_0 = 0;
var progressbar_1 = 65;
var enable_mod = false;
var WZ_EXTRACTLIST = [];
var WZ_skipRofs = false;
var WZ_showWizard = true;
var WINDOW_MOVETOLEFT = false;
var R3_ARDENABLER_ENABLED = false;
var TEMP_APP_PATH, EXEC_BIO3_MERCE, EXEC_BIO3_original, EXEC_rofs;
/*
	Functions
*/
function WZ_verifyConfigFile(){
	TEMP_APP_PATH = APP_PATH;
	if (fs.existsSync(APP_PATH + '\\Configs\\configs.r3ditor') === false){
		WZ_showWizard = true;
		WZ_showWizardDialog(0);
		$('#img-logo').css({'display': 'none'});
		$('#menu-settings').css({'display': 'none'});
		if (fs.existsSync(APP_PATH + '\\Assets') === true && fs.readdirSync(APP_PATH + '\\Assets').length !== 0){
			LOG_addLog('log', 'Removing Assets for inicial setup...');
			deleteFolderRecursive(APP_PATH + '\\Assets');
		}
	} else {
		WZ_showWizard = false;
		WZ_loadFiles(APP_PATH + '\\Configs\\configs.r3ditor');
	}
}
function WZ_showWizardDialog(id){
	WZ_lastMenu = id;
	if (WZ_showWizard === true){
		$('#WZ_dialog').css({'display': 'block'});
		if (id === 0){
			document.title = 'R3ditor - Wizard Setup';
			document.getElementById('WZ_title').innerHTML = 'Welcome to R3ditor!';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_0;
			document.getElementById('WZ_BTN_1').value = 'No';
			document.getElementById('WZ_BTN_2').value = 'Yes';
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_skip();
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				WZ_showWizardDialog(1);
			};
		}
		// Set the game folder location
		if (id === 1){
			R3DITOR_movePercent(1, 25);
			$('#WZ_dialog').css({'top': '29%'});
			$('#WZ_BTN_2').css({'display': 'none'});
			$('#WZ_progressbar').fadeIn({duration: 500, queue: false});
			document.getElementById('WZ_title').innerHTML = 'First Step';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_1;
			document.getElementById('WZ_BTN_1').value = 'Cancel';
			document.getElementById('WZ_BTN_2').value = 'Next';
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_skip();
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				WZ_showWizardDialog(3);
			};
		}
		// Wrong file
		if (id === 2){
			R3DITOR_movePercent(1, 0);
			$('#WZ_dialog').css({'top': '34%'});
			$('#WZ_BTN_2').css({'display': 'none'});
			$('#WZ_progressbar').fadeOut({duration: 100, queue: false});
			document.getElementById('WZ_title').innerHTML = 'Whoops...';
			if (EXEC_BIO3_original === 'Bio3_PC'){
				document.getElementById('WZ_content').innerHTML = WZ_DIALOG_10;
			} else {
				document.getElementById('WZ_content').innerHTML = WZ_DIALOG_2;
			}
			EXEC_BIO3_original = '';
			document.getElementById('WZ_BTN_1').value = 'Go Back';
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_showWizardDialog(1);
			};
		}
		// Confirm
		if (id === 3){
			R3DITOR_movePercent(1, 40);
			$('#WZ_dialog').css({'top': '24%'});
			GAME_PATH = EXEC_BIO3_original.replace('ResidentEvil3.exe', '');
			$('#WZ_BTN_2').css({'display': 'inline'});
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_3;
			document.getElementById('WZ_title').innerHTML = 'Great!';
			document.getElementById('WZ_BTN_2').value = 'Yes!';
			document.getElementById('WZ_BTN_1').value = 'No!';
			document.getElementById('wz_lbl_path').innerHTML = GAME_PATH;
			document.getElementById('WZ_BTN_1').onclick = function(){
				EXEC_BIO3_original = '';
				GAME_PATH = '';
				WZ_showWizardDialog(1);
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				WZ_showWizardDialog(8);
			};
		}
		// Finish Line
		if (id === 4){
			R3DITOR_movePercent(1, 100);
			R3DITOR_movePercent(0, 100, 'Done!');
			$('#WZ_BTN_2').css({'display': 'none'});
			$('#WZ_BTN_1').css({'display': 'inline'});
			$('#progress_window').css({'display': 'none'});
			document.getElementById('WZ_BTN_1').value = 'Close';
			document.getElementById('WZ_title').innerHTML = 'Finish Line!';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_4;
			document.getElementById('WZ_BTN_1').onclick = function(){
				reload();
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				reload();
			};
		}
		// Find Game - File failed
		if (id === 5){
			R3DITOR_movePercent(1, 0);
			$('#WZ_BTN_2').css({'display': 'inline'});
			$('#WZ_progressbar').fadeOut({duration: 100, queue: false});
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_5;
			document.getElementById('WZ_title').innerHTML = 'Ouch!';
			document.getElementById('WZ_BTN_1').value = 'No...';
			document.getElementById('WZ_BTN_2').value = 'Try Again';
			document.getElementById('WZ_BTN_2').onclick = function(){
				EXEC_BIO3_original = '';
				EXEC_BIO3_MERCE = '';
				GAME_PATH = '';
				WZ_showWizardDialog(1);
			};
		}
		// Decompile Game
		if (id === 6){
			R3DITOR_movePercent(1, 60);
			$('#WZ_dialog').css({'top': '80px'});
			$('#WZ_BTN_1').css({'display': 'inline'});
			$('#WZ_BTN_2').css({'display': 'inline'});
			EXEC_rofs = TEMP_APP_PATH + '\\App\\tools\\rofs.exe';
			document.getElementById('WZ_title').innerHTML = 'Extract Game Assets';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_6;
			document.getElementById('WZ_BTN_1').value = 'No';
			document.getElementById('WZ_BTN_2').value = 'Yes';
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_skipRofs = true;
				WZ_makeConfigs();
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				WZ_showWizardDialog(7);
			};
		}
		// Extracting Game Assets
		if (id === 7){
			enable_mod = true;
			$('#WZ_dialog').css({'top': '28%'});
			document.getElementById('WZ_title').innerHTML = 'Extracting Game Assets...';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_7;
			WZ_STARTFINALPROCESS();
		}
		// Show Hex Editor
		if (id === 8){
			R3DITOR_movePercent(1, 50);
			$('#WZ_dialog').css({'top': '28%'});
			$('#WZ_BTN_2').css({'display': 'none'});
			$('#WZ_BTN_1').css({'display': 'inline'});
			document.getElementById('WZ_title').innerHTML = 'Open in Hex Editor';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_8;
			document.getElementById('WZ_BTN_1').value = 'Skip';
			document.getElementById('WZ_BTN_2').value = 'Yes';
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_showWizardDialog(6);
			};
		}
		// Test Hex Editor
		if (id === 9){
			R3DITOR_movePercent(1, 50);
			$('#WZ_dialog').css({'top': '24%'});
			$('#WZ_BTN_1').css({'display': 'inline'});
			$('#WZ_BTN_2').css({'display': 'inline'});
			document.getElementById('WZ_title').innerHTML = 'Test Hex Editor';
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_9;
			document.getElementById('WZ_BTN_1').value = 'Cancel';
			document.getElementById('WZ_BTN_2').value = 'Next';
			document.getElementById('wz_lbl_path_hex').innerHTML = HEX_EDITOR;
			document.getElementById('WZ_BTN_1').onclick = function(){
				SHOW_EDITONHEX = false;
				HEX_EDITOR = '';
				WZ_showWizardDialog(6);
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				SHOW_EDITONHEX = true;
				WZ_showWizardDialog(6);
			};
		}
	} else {
		$('#WZ_dialog').css({'display': 'none'});
		LOG_addLog('log', 'WIZARD - Skipping...');
	}
	LOG_scroll();
}
// Extract game assets process
function WZ_STARTFINALPROCESS(){
	$('#WZ_BTN_1').css({'display': 'none'});
	$('#WZ_BTN_2').css({'display': 'none'});
	R3DITORshowUpdateProgress();
	R3DITOR_movePercent(1, 62);
	R3DITOR_movePercent(0, 2, 'Preparing \"Assets\" Folder...');
	WZ_EXTRACT_ROFS();
}
function WZ_EXTRACT_ROFS(){
	var current_rofs = 0;
	if (fs.existsSync(APP_PATH + '\\Assets') === false){
		fs.mkdirSync(APP_PATH + '\\Assets');
	}
	var timer = setInterval(function(){
		if (current_rofs !== 16){
			if (EXTERNAL_APP_RUNNING === false && current_rofs < 16){
				if (EXTERNAL_APP_EXITCODE === 0){
					current_rofs++;
					LOG_separator();
					WZ_EXTRACT(current_rofs);
				} else {
					LOG_addLog('error', 'ERROR - Something went wrong while extracting Rofs' + id + '!');
					clearInterval(timer);
				}
			} else {
				console.log('Waiting Rofs ' + current_rofs);
			}
		} else {
			WZ_finishExtract();
			clearInterval(timer);
		}
	}, 50);
	LOG_scroll();
}
function WZ_EXTRACT(id){
	if (fs.existsSync(GAME_PATH + 'Rofs' + id + '.dat') === true){
		process.chdir(APP_PATH + '/Assets');
		progressbar_1 = parseInt(progressbar_1 + 2);
		progressbar_0 = parseInt(progressbar_0 + 6.6);
		R3DITOR_movePercent(1, progressbar_1);
		R3DITOR_movePercent(0, progressbar_0, 'Extracting Rofs' + id + ' - ' + ROFS_STATUS[id][0]);
		runExternalSoftware(EXEC_rofs, [GAME_PATH + 'Rofs' + id + '.dat']);
	}
}
function WZ_finishExtract(){
	R3DITOR_movePercent(1, 97);
	process.chdir(TEMP_APP_PATH);
	R3DITOR_movePercent(0, 75, 'Making Configuration File (Bio3.ini) for the extracted version...');
	if (fs.existsSync(GAME_PATH + 'Rofs11.dat') === true){
		R3DITOR_movePercent(1, 98);
		R3DITOR_movePercent(0, 80, 'Copying Rofs11.dat to Assets folder...');
		runExternalSoftware('cmd', ['/C', 'copy', GAME_PATH + 'Rofs11.dat', APP_PATH + '\\Assets']);
		BIO3INI_MAKE_WZINI(1);
	} else {
		R3DITOR_movePercent(1, 98);
		R3DITOR_movePercent(0, 80, 'Creating Configuration File (Bio3.ini)...');
		BIO3INI_MAKE_WZINI(0);
	}
	if (fs.existsSync(APP_PATH + '\\Assets\\Save') === false){
		fs.mkdirSync(APP_PATH + '\\Assets\\Save');
	}
	WZ_makeConfigs();
}
function WZ_skip(){
	EXEC_BIO3_original = '';
	SHOW_EDITONHEX = false;
	WZ_showWizard = false;
	EXEC_BIO3_MERCE = '';
	enable_mod = false;
	HEX_EDITOR = '';
	WZ_saveConfigs();
	WZ_loadFiles(APP_PATH + '\\configs.r3ditor');
}
function WZ_LOADRE3(refile){
	var file = getFileName(refile);
	if (file === 'residentevil3'){
		EXEC_BIO3_original = refile;
		WZ_showWizardDialog(3);
	} else {
		WZ_showWizardDialog(2);
	}
}
function WZ_LOADHEX(hexExe){
	if (hexExe !== '' || hexExe !== undefined || hexExe !== null){
		HEX_EDITOR = hexExe;
		SHOW_EDITONHEX = true;
		WZ_showWizardDialog(9);
	}
}
function WZ_makeConfigs(){
	EXEC_BIO3_MERCE = '';
	R3DITOR_movePercent(1, 99);
	R3DITOR_movePercent(0, 95, 'Creating Configs File...');
	GAME_PATH = EXEC_BIO3_original.replace('ResidentEvil3.exe', '');
	if (fs.existsSync(GAME_PATH + 'RE3_MERCE.exe') === true){
		EXEC_BIO3_MERCE = GAME_PATH + 'RE3_MERCE.exe';
	}
	if (SHOW_EDITONHEX === false || HEX_EDITOR === undefined){
		HEX_EDITOR = '';
	}
	WZ_saveConfigs();
}
function WZ_saveConfigs(justSave){
	try{
		var CONFIGS = R3DITOR_check_for_updates + '\n' + EXEC_BIO3_original + '\n' + EXEC_BIO3_MERCE + '\n' + GAME_PATH + '\n' + enable_mod + '\n' + SHOW_EDITONHEX + 
			'\n' + HEX_EDITOR + '\n' + RDT_lastFileOpened + '\n' + RDT_lastBackup + '\n' + RE3_LIVE_RENDER_TIME + '\n' + DESIGN_ENABLE_ANIMS + '\n' + REALTIME_renderToolbar + 
			'\n' + WINDOW_MOVETOLEFT + '\n' + R3ditor_showFirstBootMessage + '\n' + RDT_USE_DECOMPILER_WIP + '\n' + R3_ARDENABLER_ENABLED;
		fs.writeFileSync(APP_PATH + '\\Configs\\configs.r3ditor', CONFIGS, 'utf-8');
		if (fs.existsSync(APP_PATH + '\\Configs\\configs.r3ditor' && WZ_showWizard == true && WZ_skipRofs == false)){
			WZ_showWizardDialog(4);
		} else {
			if (justSave === true){
				LOG_addLog('log', 'CONFIGS - Configs Saved!');
				LOG_scroll();
			} else {
				clearInternalLog();
				reload();
			}
		}
	} catch(err) {
		if (WZ_showWizard === true){
			WZ_showWizardDialog(5);
		}
		LOG_addLog('log', 'CONFIGS - Something went wrong! - ' + err);
		console.error(err);
		LOG_scroll();
	}
}
function WZ_loadFiles(file){
	var cfgs = [];
	process.chdir(TEMP_APP_PATH);
	fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
		cfgs.push(line); 
	});
	// Rofs Exec
	if (fs.existsSync(APP_PATH + '\\App\\tools\\rofs.exe') === true){
		EXEC_rofs = APP_PATH + '\\App\\tools\\rofs.exe';
	} else {
		$('#UTILS_rofsExtract_btn').css({'display': 'none'});
		LOG_addLog('error', 'ERROR - Unable to find rofs.exe!');
	}
	// Update
	if (cfgs[0] !== undefined){
		R3DITOR_check_for_updates = JSON.parse(cfgs[0]);
	} else {
		R3DITOR_check_for_updates = false;
	}
	special_day_ff = '?';
	document.getElementById('SETTINGS_edit_enableUpdates').checked = R3DITOR_check_for_updates;
	// RE3 Path
	if (cfgs[1] !== undefined){
		EXEC_BIO3_original = cfgs[1];
		if (fs.existsSync(EXEC_BIO3_original) === true){
			document.getElementById('SETTINGS_lvl_path_RE3').title = EXEC_BIO3_original;
			document.getElementById('SETTINGS_lvl_path_RE3').innerHTML = R3DITOR_reduceStrings(EXEC_BIO3_original, 50);
		} else {
			EXEC_BIO3_original = '';
			LOG_addLog('error', 'ERROR - ResidentEvil3.exe was not found!');
			document.getElementById('SETTINGS_lvl_path_RE3').title = '';
			document.getElementById('SETTINGS_lvl_path_RE3').innerHTML = 'ResidentEvil3.exe was not found!';
		}
	} else {
		EXEC_BIO3_original = '';
		document.getElementById('SETTINGS_lvl_path_RE3').title = '';
		document.getElementById('SETTINGS_lvl_path_RE3').innerHTML = 'ResidentEvil3.exe was not defined!';
	}
	// RE3 Merce Path
	if (cfgs[2] !== undefined){
		EXEC_BIO3_MERCE = cfgs[2];
		if (fs.existsSync(EXEC_BIO3_MERCE) === false){
			EXEC_BIO3_MERCE = '';
			LOG_addLog('error', 'ERROR - RE3_MERCE.exe was not found!');
			document.getElementById('SETTINGS_lvl_path_merce').innerHTML = 'RE3_MERCE.exe was not found!';
		} else {
			document.getElementById('SETTINGS_lvl_path_merce').title = EXEC_BIO3_MERCE;
			document.getElementById('SETTINGS_lvl_path_merce').innerHTML = R3DITOR_reduceStrings(EXEC_BIO3_MERCE, 50);
		}
	} else {
		EXEC_BIO3_MERCE = '';
	}
	// Game Folder Path
	if (cfgs[3] !== undefined){
		GAME_PATH = cfgs[3];
	} else {
		GAME_PATH = '';
	}
	// Enable Mod
	if (cfgs[4] !== undefined){
		enable_mod = JSON.parse(cfgs[4]);
	} else {
		enable_mod = false;
	}
	// Show edit on hex
	if (cfgs[5] !== undefined){
		SHOW_EDITONHEX = JSON.parse(cfgs[5]);
	} else {
		SHOW_EDITONHEX = false;
	}
	// Hex editor path
	if (cfgs[6] !== undefined){
		HEX_EDITOR = cfgs[6];
		document.getElementById('SETTINGS_lvl_path_HEX').innerHTML = R3DITOR_reduceStrings(HEX_EDITOR, 30);
		if (fs.existsSync(HEX_EDITOR) === true){
			document.getElementById('SETTINGS_lvl_path_HEX').title = HEX_EDITOR;
		} else {
			document.getElementById('SETTINGS_lvl_path_HEX').innerHTML = 'Hex editor was not found!';
			LOG_addLog('error', 'ERROR - Hex editor was not found!');
		}
	} else {
		HEX_EDITOR = '';
		document.getElementById('SETTINGS_lvl_path_HEX').title = '';
		document.getElementById('SETTINGS_lvl_path_HEX').innerHTML = 'Hex editor was not defined!';
	}
	// Last file open path
	if (cfgs[7] !== undefined){
		RDT_lastFileOpened = cfgs[7];
	} else {
		RDT_lastFileOpened = '';
	}
	// Last Backup
	if (cfgs[8] !== undefined){
		RDT_lastBackup = cfgs[8];
	} else {
		RDT_lastBackup = '';
	}
	// RE3 Live Update time
	if (cfgs[9] !== undefined){
		RE3_LIVE_RENDER_TIME = parseInt(cfgs[9]);
	} else {
		RE3_LIVE_RENDER_TIME = 80;
	}
	document.getElementById('SETTINGS_edit_RE3LIVEUPDATE').value = RE3_LIVE_RENDER_TIME;
	document.getElementById('SETTINGS_lbl_RE3_liveSpeed').innerHTML = RE3_LIVE_RENDER_TIME;
	// Animations
	if (cfgs[10] !== undefined){
		DESIGN_ENABLE_ANIMS = JSON.parse(cfgs[10]);
	} else {
		DESIGN_ENABLE_ANIMS = false;
	}
	document.getElementById('SETTINGS_edit_enableAnimations').checked = DESIGN_ENABLE_ANIMS;
	// Enable Toolbar
	if (cfgs[11] !== undefined){
		REALTIME_renderToolbar = JSON.parse(cfgs[11]);
	} else {
		REALTIME_renderToolbar = false;
	}
	document.getElementById('SETTINGS_edit_enableRE3_live_toolBar').checked = REALTIME_renderToolbar;
	// Window moveto
	if (cfgs[12] !== undefined){
		WINDOW_MOVETOLEFT = JSON.parse(cfgs[12]);
	} else {
		WINDOW_MOVETOLEFT = false;
	}
	document.getElementById('SETTINGS_edit_enableMoveTo').checked = WINDOW_MOVETOLEFT;
	// RE3SLDE
	if (fs.existsSync(APP_PATH + '\\App\\tools\\RE3SLDE.exe') === true){
		RE3SLDE_CANRUN = true;
	} else {
		RE3SLDE_CANRUN = false;
	}
	// R3ditor Intro Animation (Line 14)
	if (cfgs[13] !== undefined){
		R3ditor_showFirstBootMessage = JSON.parse(cfgs[13]);
	}
	// RDT EXPERIMENT
	if (cfgs[14] !== undefined){
		RDT_USE_DECOMPILER_WIP = JSON.parse(cfgs[14]);
	} else {
		RDT_USE_DECOMPILER_WIP = false;
	}
	document.getElementById('SETTINGS_edit_RDT_ExpMode').checked = RDT_USE_DECOMPILER_WIP;
	// ARD Enabler
	if (cfgs[15] !== undefined){
		R3_ARDENABLER_ENABLED = JSON.parse(cfgs[15]);
	} else {
		R3_ARDENABLER_ENABLED = false;
	}
	/*
		Visuals
	*/
	if (fs.existsSync(APP_PATH + '\\App\\tools\\xdelta.exe') !== true){
		$('#UTILS_applyXdeltaPatch').css({'display': 'none'});
	}
	if (enable_mod === true && R3_ARDENABLER_ENABLED === false){
		$('#UTILS_enableR3ARD').css({'display': 'inline'});
	} else {
		$('#UTILS_enableR3ARD').css({'display': 'none'});
	}
	if (EXEC_BIO3_original !== ''){
		$('#btn_run_bio3').css({'display': 'inline'});
		if (HEX_EDITOR !== ''){
			$('#main_openBio3OnHex').css({'display': 'inline'});
		}
	}
	if (EXEC_BIO3_MERCE !== ''){
		$('#btn_run_merce').css({'display': 'inline'});
		if (HEX_EDITOR !== ''){
			$('#main_openBio3MerceOnHex').css({'display': 'inline'});
		}
	}
	if (enable_mod === true){
		$('#btn_run_bio3-mod').css({'display': 'inline'});
		$('#btn_run_merce-mod').css({'display': 'inline'});
	}
	if (WINDOW_MOVETOLEFT === true){
		window.moveTo(0, 0);
	}
	R3_START_KEYPRESS();
	if (fs.existsSync(APP_PATH + '\\forceupdate.txt') == true){
		fs.unlinkSync(APP_PATH + '\\forceupdate.txt');
		$('#menu-topo').css({'display': 'none'});
		R3DITOR_applyUpdate();
	} else {
		WZ_APPEND();
		if (R3ditor_showFirstBootMessage === false){
			WZ_SHOW_INTERFACE();
		} else {
			WZ_FIRST_BOOT_MESSAGE();
		}
		$('#RDT-SLD-hold').css({'height': '472px'});
		$('#RDT_SLD_LAYER_holder').css({'height': '430px'});
		document.getElementById('app_nwjs_version').innerHTML = process.versions['node-webkit'] + ' (' + process.arch + ')';
		// Init Memory JS
		if (MEM_JS_requreSucess === true){
			MEMORY_JS_initMemoryJs();
		}
	}
	if (EXEC_BIO3_MERCE !== '' || EXEC_BIO3_original !== ''){
		if (DESIGN_ENABLE_ANIMS === true){
			$('#menu-topo-MOD').fadeIn({duration: 150, queue: false});
		} else {
			$('#menu-topo-MOD').css({'display': 'inline'});
		}
	} else {
		$('#menu-utility-aba').css({'top': '510px'});
		$('#menu-utility').css({'top': '586px'});
	}
	if (R3DITOR_check_for_updates === true){
		checkForUpdates();
	}
}
function WZ_SHOW_INTERFACE(){
	document.title = APP_NAME;
	if (DESIGN_ENABLE_ANIMS === true){
		$('#img-logo').fadeIn({duration: 2000, queue: false});
		$('#menu-topo').fadeIn({duration: 200, queue: false});
		$('#menu-utility').fadeIn({duration: 200, queue: false});
		$('#menu-settings').fadeIn({duration: 200, queue: false});
		$('#menu-utility-aba').fadeIn({duration: 200, queue: false});
		$('#menu-utility-aba-2').fadeIn({duration: 200, queue: false});
		$('#menu-utility-aba-3').fadeIn({duration: 200, queue: false});
		$('#menu-utility-aba-4').fadeIn({duration: 200, queue: false});
		$('#menu-utility-aba-5').fadeIn({duration: 200, queue: false});
		$('#mainMenu-patcher-div').fadeIn({duration: 200, queue: false});
		$('#mainMenu-exeEdit-div').fadeIn({duration: 200, queue: false});
		$('#menu-topo').animate({'top': '32px'}, {duration: 100, queue: false});
		$('#menu-utility').animate({'top': '546px'}, {duration: 100, queue: false});
		$('#menu-settings').animate({'top': '32px'}, {duration: 100, queue: false});
		$('#menu-utility-aba').animate({'top': '472px'}, {duration: 140, queue: false});
		$('#menu-utility-aba-5').animate({'top': '26px'}, {duration: 140, queue: false});
		$('#menu-utility-aba-4').animate({'top': '26px'}, {duration: 140, queue: false});
		$('#menu-utility-aba-3').animate({'top': '-44px'}, {duration: 140, queue: false});
		$('#menu-utility-aba-2').animate({'top': '-44px'}, {duration: 140, queue: false});
		$('#mainMenu-patcher-div').animate({'top': '102px'}, {duration: 100, queue: false});
		$('#mainMenu-exeEdit-div').animate({'top': '102px'}, {duration: 100, queue: false});
	} else {
		$('#img-logo').css({'display': 'inline'});
		$('#menu-topo').css({'top': '32px', 'display': 'inline'});
		$('#menu-settings').css({'display': 'inline','top': '32px'});
		$('#menu-utility').css({'top': '546px', 'display': 'inline'});
		$('#menu-utility-aba').css({'top': '472px', 'display': 'inline'});
		$('#menu-utility-aba-5').css({'top': '26px', 'display': 'inline'});
		$('#menu-utility-aba-4').css({'top': '26px', 'display': 'inline'});
		$('#menu-utility-aba-3').css({'top': '-44px', 'display': 'inline'});
		$('#menu-utility-aba-2').css({'top': '-44px', 'display': 'inline'});
		$('#mainMenu-patcher-div').css({'top': '102px', 'display': 'inline'});
		$('#mainMenu-exeEdit-div').css({'top': '102px', 'display': 'inline'});
	}
}
function WZ_FIRST_BOOT_MESSAGE(){
	DESIGN_ENABLE_ANIMS = true;
	R3ditor_showFirstBootMessage = false;
	$('#RE2_introEffect').css({'display': 'inline'});
	document.title = 'Welcome to R3ditor!';
	setTimeout(function(){
		$('#RE2_introEffect').animate({'background-color': '#fff'}, {duration: 1000, queue: false});
	}, 200);
	setTimeout(function(){
		WZ_saveConfigs(true);
		$('#FB_R3ditor_logo').fadeIn({duration: 2000, queue: false});
	}, 1100);
	setTimeout(function(){
		$('#R3DITOR_firstMessage').fadeIn({duration: 5000, queue: false});
		$('#FB_R3ditor_logo').animate({'top': '250px'}, {duration: 5000, queue: false});
		$('#R3DITOR_firstMessage').animate({'top': '450px'}, {duration: 5000, queue: false});
	}, 1810);
	setTimeout(function(){
		$('#FBOOT_LEGAL_MESSAGE').fadeIn({duration: 5200, queue: false});
		$('#FBOOT_LEGAL_MESSAGE').animate({'top': '670px'}, {duration: 5220, queue: false});
	}, 2000);
	setTimeout(function(){
		$('#FBOOT_LEGAL_MESSAGE').fadeOut({duration: 1700, queue: false});
		$('#R3DITOR_firstMessage').fadeOut({duration: 1800, queue: false});
	}, 9000);
	setTimeout(function(){
		document.title = 'Have Fun!';
		$('#FB_R3ditor_logo').fadeOut({duration: 1400, queue: false});
		$('#FB_R3ditor_logo').animate({'top': '240px'}, {duration: 1400, queue: false});
		$('#FBOOT_LEGAL_MESSAGE').animate({'top': '660px'}, {duration: 1400, queue: false});
		$('#R3DITOR_firstMessage').animate({'top': '460px'}, {duration: 1400, queue: false});
		$('#RE2_introEffect').animate({'background-color': '#000'}, {duration: 1800, queue: false});
	}, 9700);
	setTimeout(function(){
		$('#RE2_introEffect').css({'background-color': '#fff', 'display': 'inline'});
		$('#RE2_introEffect').fadeOut({duration: 80, queue: false});
		WZ_SHOW_INTERFACE();
	}, 11680);
}
function WZ_APPEND(){
	var c = 0;
	$('#RDT_door-edit-LK').append(RDT_EDIT_ITEM);
	$('#RDT_door-edit-LK').append(RDT_EDIT_DOOR_KEYFF);
	$('#RDT_convertItemTo').append(RDT_EDIT_ITEMCONVERT);
	$('#RE3SET_EDIT_ITEMSTART_IT').append(RDT_EDIT_ITEM);
	$('#RDT_editCamera_camType').append(RDT_EDIT_CAMTYPE);
	$('#RDT_door-edit-DispTxt').append(RDT_EDIT_DOOR_TEXT);
	$('#RE3SET_EDIT_ITEMSTART_AT').append(RDT_EDIT_ITEMATTR);
	$('#RE3_LIVESTATUS_CHANGE_ITEM_HEX').append(RDT_EDIT_ITEM);
	$('#RE3_LIVESTATUS_CHANGE_ITEM_ATTR').append(RDT_EDIT_ITEMATTR);
	document.getElementById('FB_R3ditor_logo').src = APP_PATH + '\\App\\Img\\logo.png';
	// IEDIT
	document.getElementById('IEDIT_edit_itemType').innerHTML = IEDIT_HTML_ITEMTYPE;
	document.getElementById('IEDIT_edit_itemDisplayMode').innerHTML = IEDIT_HTML_DISPLAYMODE;
	// MIX
	document.getElementById('MIX_edit_holder_00').innerHTML = MIX_EDIT_00_RELOADSUM;
	document.getElementById('MIX_edit_holder_01').innerHTML = MIX_EDIT_01_COMBINE;
	document.getElementById('MIX_edit_holder_02').innerHTML = MIX_EDIT_02_RELOADING;
	document.getElementById('MIX_edit_holder_03').innerHTML = MIX_EDIT_03_CHANGE_HANDMAG;
	document.getElementById('MIX_edit_holder_04').innerHTML = MIX_EDIT_04_CHANGE_GL;
	document.getElementById('MIX_edit_holder_05').innerHTML = MIX_EDIT_05_GPOWDER_GL;
	document.getElementById('MIX_edit_holder_06').innerHTML = MIX_EDIT_06_INFINITE;
	while (c < 7){
		$('#MIX_edit_function_0' + c).append(MIX_FUNCTIONS);
		c++;
	}
	// 00
	$('#MIX_00_edit_Ammo').append(RDT_EDIT_ITEM);
	$('#MIX_00_edit_Weapon').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_00_preview_plus').src = APP_PATH + '\\App\\Img\\MIX_plus.png';
	// 01
	$('#MIX_01_edit_item_A').append(RDT_EDIT_ITEM);
	$('#MIX_01_edit_item_B').append(RDT_EDIT_ITEM);
	$('#MIX_01_edit_item_Result').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_01_preview_plus').src = APP_PATH + '\\App\\Img\\MIX_plus.png';
	document.getElementById('MIX_01_preview_equals').src = APP_PATH + '\\App\\Img\\MIX_equals.png';
	// 02
	$('#MIX_02_edit_item').append(RDT_EDIT_ITEM);
	$('#MIX_02_edit_item_Result').append(RDT_EDIT_ITEM);
	$('#MIX_02_edit_reloadingItem').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_02_preview_plus').src = APP_PATH + '\\App\\Img\\MIX_plus.png';
	document.getElementById('MIX_02_preview_equals').src = APP_PATH + '\\App\\Img\\MIX_equals.png';
	// 03
	$('#MIX_03_edit_item_Result').append(RDT_EDIT_ITEM);
	$('#MIX_03_edit_handMag_ammo').append(RDT_EDIT_ITEM);
	$('#MIX_03_edit_handMag_weapon').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_03_preview_plus').src = APP_PATH + '\\App\\Img\\MIX_plus.png';
	document.getElementById('MIX_03_preview_equals').src = APP_PATH + '\\App\\Img\\MIX_equals.png';
	// 04
	$('#MIX_04_edit_GL_ammo').append(RDT_EDIT_ITEM);
	$('#MIX_04_edit_GL_weapon').append(RDT_EDIT_ITEM);
	$('#MIX_04_edit_GL_newAmmo').append(RDT_EDIT_ITEM);
	$('#MIX_04_edit_GL_newWeapon').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_04_prev_exch_A').src = APP_PATH + '\\App\\Img\\exchange-arrow.png';
	document.getElementById('MIX_04_prev_exch_B').src = APP_PATH + '\\App\\Img\\exchange-arrow-2.png';
	// 05
	$('#MIX_05_edit_powderGl_ammo').append(RDT_EDIT_ITEM);
	$('#MIX_05_edit_powderGl_powder').append(RDT_EDIT_ITEM);
	$('#MIX_05_edit_powderGl_newAmmo').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_05_preview_plus').src = APP_PATH + '\\App\\Img\\MIX_plus.png';
	document.getElementById('MIX_05_preview_equals').src = APP_PATH + '\\App\\Img\\MIX_equals.png';
	// 06
	$('#MIX_06_edit_infinite_inf').append(RDT_EDIT_ITEM);
	$('#MIX_06_edit_infinite_item').append(RDT_EDIT_ITEM);
	document.getElementById('MIX_06_preview_plus').src = APP_PATH + '\\App\\Img\\MIX_plus.png';
	// DROP
	$('#DROP_EDIT_ITEM').append(RDT_EDIT_ITEM);
	// MSG Titles
	document.getElementById('MSG_ADDFUNC_BTN_1').title  = '\nUse this command to start a message or change the text speed.';
	document.getElementById('MSG_ADDFUNC_BTN_2').title  = '\nUse this command to finish the message.\n(In doubt, leave args empty!)';
	document.getElementById('MSG_ADDFUNC_BTN_3').title  = 'Use this command to show text, break lines and more';
	document.getElementById('MSG_ADDFUNC_BTN_4').title  = 'Show a special char in the text.\n(Like \"&\" and another symbols)';
	document.getElementById('MSG_ADDFUNC_BTN_5').title  = 'Use this command to exchange the text color.\n(Green, Wine Red, Dark Blue...)';
	document.getElementById('MSG_ADDFUNC_BTN_6').title  = 'Use this command to write a item name in the text.';
	document.getElementById('MSG_ADDFUNC_BTN_7').title  = '[EXPERIMENTAL]\nCommand used to show more options.\n(Used on R113.RDT - Emblem Key)';
	document.getElementById('MSG_ADDFUNC_BTN_8').title  = 'Use this command to execute a Sound Effect (SE).';
	document.getElementById('MSG_ADDFUNC_BTN_9').title  = 'Use this function to show a diferent angle of current map.';
	document.getElementById('MSG_ADDFUNC_BTN_10').title = 'Use this command to insert hex manually.\nUse one function at once!';
	document.getElementById('MSG_ADDFUNC_BTN_11').title = 'Click here to open Hex Translator';
	document.getElementById('MSG_ADDFUNC_BTN_12').title = '[EXPERIMENTAL]\nCommand found in R101.RDT';
}
/*
	SETTINGS MENU
*/
function SETTINGS_removeFiles(mode){
	var confirmAction;
	var totFiles;
	// RDT Backups
	if (mode === 0){
		confirmAction = confirm('WARNING:\n\nThis operation will remove all your RDT Backups!\nYou will not able to restore any older backup before your confirmation.\n\nDo you want to proceed?');
		if (confirmAction === true){
			totFiles = fs.readdirSync(APP_PATH + '\\Backup\\RDT');
			if (totFiles.length > 0){
				LOG_addLog('log', 'INFO - Removing all RDT Backups...');
				deleteFolderRecursive(APP_PATH + '\\Backup\\RDT');
				var timer = setInterval(function(){
					if (EXTERNAL_APP_RUNNING === false){
						clearInterval(timer);
						reload();
					}
				}, 50);
			} else {
				LOG_addLog('log', 'INFO - There is no backup to remove!');
			}
		}
	}
	// SAV Backups
	if (mode === 1){
		confirmAction = confirm('WARNING:\n\nThis operation will remove all your SAV Backups!\nYou will not able to restore any older backup before your confirmation.\n\nDo you want to proceed?');
		if (confirmAction === true){
			totFiles = fs.readdirSync(APP_PATH + '\\Backup\\SAV');
			if (totFiles.length > 0){
				LOG_addLog('log', 'INFO - Removing all SAV Backups...');
				deleteFolderRecursive(APP_PATH + '\\Backup\\SAV');
				var timer = setInterval(function(){
					if (EXTERNAL_APP_RUNNING === false){
						clearInterval(timer);
						reload();
					}
				}, 50);
			} else {
				LOG_addLog('log', 'INFO - There is no backup to remove!');
			}
		}
	}
	// RDT Maps
	if (mode === 2){
		confirmAction = confirm('WARNING:\n\nThis operation will remove all your RDT Maps!\nDoing this you will have to generate all RDT Maps again.\n\nDo you want to proceed?');
		if (confirmAction === true){
			totFiles = fs.readdirSync(APP_PATH + '\\Configs\\RDT');
			if (totFiles.length > 0){
				LOG_addLog('log', 'INFO - Removing all RDT Map Files...');
				deleteFolderRecursive(APP_PATH + '\\Configs\\RDT');
				var timer = setInterval(function(){
					if (EXTERNAL_APP_RUNNING === false){
						clearInterval(timer);
						reload();
					}
				}, 50);
			} else {
				LOG_addLog('log', 'INFO - There is no MapFile to remove!');
			}
		}
	}
	// Reset R3ditor
	if (mode === 3){
		confirmAction = confirm('WARNING:\n\nThis operation will remove all your RDT Maps, Backups and your assets!\nAlso, you will need to run the inicial process (Wizard) again.\n\nDo you want to proceed?');
		if (confirmAction === true){
			SETTINGS_RESET();
		}
	}
	// Remove Recent Lists
	if (mode === 4){
		confirmAction = confirm('WARNING:\n\nThis operation will clean your recent opened lists.\n\nDo you want to proceed?');
		if (confirmAction === true){
			R3DITOR_REMOVE_RECENT_FILES();
		}
	}
	LOG_scroll();
}
function SETTINGS_RESET(){
	fs.unlinkSync(APP_PATH + '\\Configs\\configs.r3ditor');
	if (fs.existsSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor') === true){
		fs.unlinkSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor');
	}
	//
	deleteFolderRecursive(APP_PATH + '\\Backup\\RDT');
	deleteFolderRecursive(APP_PATH + '\\Backup\\SAV');
	deleteFolderRecursive(APP_PATH + '\\Backup\\MIX');
	deleteFolderRecursive(APP_PATH + '\\Configs\\RDT');
	deleteFolderRecursive(APP_PATH + '\\Backup\\DROP');
	deleteFolderRecursive(APP_PATH + '\\Backup\\IEDIT');
	deleteFolderRecursive(APP_PATH + '\\Backup\\RDTMAP2');
	var delInterval = setInterval(function(){
		var check_1 = fs.existsSync(APP_PATH + '\\Configs\\RDT');
		var check_2 = fs.existsSync(APP_PATH + '\\Backup\\RDT');
		var check_3 = fs.existsSync(APP_PATH + '\\Backup\\SAV');
		var check_4 = fs.existsSync(APP_PATH + '\\Backup\\MIX');
		var check_5 = fs.existsSync(APP_PATH + '\\Backup\\IEDIT');
		var check_6 = fs.existsSync(APP_PATH + '\\Backup\\RDTMAP2');
		var check_7 = fs.existsSync(APP_PATH + '\\Backup\\DROP');
		if (check_1 === false && check_2 === false && check_3 === false && check_4 === false && check_5 === false && check_6 === false && check_7 === false){
			clearInterval(delInterval);
			reload();
		}
	}, 100);
}
function SETTINGS_openConfigFile(){
	if (fs.existsSync(APP_PATH + '\\Configs\\configs.r3ditor') === true){
		runExternalSoftware('notepad.exe', [APP_PATH + '\\Configs\\configs.r3ditor']);
	}
}
function SETTINGS_SET_PATH(mode, path){
	if (path !== '' && path !== undefined && path !== null){
		// RE3
		if (mode === 0){
			if (path !== EXEC_BIO3_MERCE){
				if (getFileName(path) === 'residentevil3'){
					EXEC_BIO3_original = path;
					document.getElementById('SETTINGS_lvl_path_RE3').title = EXEC_BIO3_original;
					document.getElementById('SETTINGS_lvl_path_RE3').innerHTML = R3DITOR_reduceStrings(EXEC_BIO3_original, 50);
				} else {
					LOG_addLog('warn', 'WARN - Unable to set RE3 Path - this is the wrong executable!');
				}
			} else {
				LOG_addLog('warn', 'WARN - Unable to set RE3 Path - You must select ResidentEvil3.exe instead of RE3_MERCE.exe!');
			}
		}
		// HEX
		if (mode === 1){
			if (path !== HEX_EDITOR){
				HEX_EDITOR = path;
				document.getElementById('SETTINGS_lvl_path_HEX').innerHTML = R3DITOR_reduceStrings(HEX_EDITOR, 50);
				document.getElementById('SETTINGS_lvl_path_HEX').title = HEX_EDITOR;
			} else {
				LOG_addLog('warn', 'WARN - Unable to set Hex editor Path - this is the same path!');
			}
		}
		// Merce
		if (mode === 2){
			if (path !== EXEC_BIO3_original){
				if (getFileName(path) === 're3_merce'){
					EXEC_BIO3_MERCE = path;
					document.getElementById('SETTINGS_lvl_path_merce').innerHTML = R3DITOR_reduceStrings(EXEC_BIO3_MERCE, 50);
					document.getElementById('SETTINGS_lvl_path_merce').title = EXEC_BIO3_original;
				} else {
					LOG_addLog('warn', 'WARN - Unable to set RE3_MERCE Path - this is the wrong executable!');
				}
			} else {
				LOG_addLog('warn', 'WARN - Unable to set RE3 Path - You must select RE3_MERCE.exe instead of ResidentEvil3.exe!');
			}
		}
	}
	LOG_scroll();
}
function WZ_FORCE_UPDATE(){
	var ask = confirm('WARNING:\nBecause this is not a common update method, the code currently present in github may be ' + 
					  'buggy or incomplete.\n\nDo you want to continue anyway?');
	if (ask === true){
		var c = 0;
		while (c < parseInt(SETTINGS_totalMenus + 1)){
			$('#SETTINGS-aba-menu-' + c).css({'display': 'none'});
			c++;
		}
		$('#menu-topo-settings').css({'display': 'none'});
		$('#menu-SETTINGS').css({'display': 'none'});
		$('#menu-topo').css({'display': 'none'});
		R3DITOR_applyUpdate();
	}
}
function WZ_APPLY_R3DITOR_SETTINGS(){
	REALTIME_renderToolbar = document.getElementById('SETTINGS_edit_enableRE3_live_toolBar').checked;
	R3DITOR_check_for_updates = document.getElementById('SETTINGS_edit_enableUpdates').checked;
	DESIGN_ENABLE_ANIMS = document.getElementById('SETTINGS_edit_enableAnimations').checked;
	RDT_USE_DECOMPILER_WIP = document.getElementById('SETTINGS_edit_RDT_ExpMode').checked;
	RE3_LIVE_RENDER_TIME = document.getElementById('SETTINGS_edit_RE3LIVEUPDATE').value;
	WINDOW_MOVETOLEFT = document.getElementById('SETTINGS_edit_enableMoveTo').checked;
	//
	WZ_saveConfigs(true);
	reload();
}