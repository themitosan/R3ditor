/*
	R3ditor - index.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - Por favorzu! '\_(UwU )_/'
*/
var e_e = 0;
var RE3_PID = 0;
var rpcReady = false;
var RE3_RUNNING = false;
var APP_NAME = 'R3ditor';
var STATUS = 'Undefined';
var EXTERNAL_APP_PID = 0;
var R3_ENABLE_DISC = false;
var SHOW_EDITONHEX = false;
var RE3SLDE_CANRUN = false;
var MAIN_32BitMode = false;
var DOWNLOAD_COMPLETE = true;
var EXTERNAL_APP_EXITCODE = 0;
var EXTERNAL_APP_RUNNING = false;
var APP_VERSION = 'V. ' + INT_VER + ' [ALPHA]';
var fs, RPC, DiscordRPC, discUserName, MEM_JS, APP_PATH, HEX_EDITOR, PROCESS_OBJ, ORIGINAL_FILENAME;
/*
	Onload / Onclose
*/
window.onload = function(){
	R3_startLoad();
}
window.onclose = function(){
	localStorage.clear();
	sessionStorage.clear();
	if (RE3_RUNNING === true){
		killExternalSoftware(RE3_PID);
	}
}
/*
	Main Functions
*/
function reload(){
	process.chdir(TEMP_APP_PATH);
	if (R3_ENABLE_DISC === true){
		RPC.destroy();
	}
	if (RE3_RUNNING === true){
		killExternalSoftware(RE3_PID);
	}
	sessionStorage.clear();
	localStorage.clear();
	location.reload();
}
function R3_startLoad(){
	localStorage.clear();
	sessionStorage.clear();
	request_render_save = false;
	currentTime();
	var oldAppVer = APP_VERSION;
	try {
		if (nw.process.arch !== 'ia32'){
			MEMORY_JS_verifyNodeJsVer();
			APP_VERSION = APP_VERSION + ' (x64)';
		} else {
			APP_VERSION = APP_VERSION + ' (x86)';
			MAIN_32BitMode = true;
			LOG_addLog('warn', 'WARN - You are using a 32-bit version of NW.js! <font title="A tool to view and edit some variables while the game is running">RE3 Live Status</font> will be not avaliable!');
		}
		APP_NAME = APP_NAME + ' ' + APP_VERSION;
		$('#app_version').html(oldAppVer);
		LOG_addLog('log', APP_NAME);
		LOG_separator();
		// Requires
		fs = require('fs-extra');
		APP_PATH = process.cwd();
		console.info(APP_NAME);
		R3DITOR_CHECK_FILES_AND_DIRS();
		WZ_verifyConfigFile();
	} catch (err) {
		console.error(err);
		$('#log-programa').css({'top': '2px', 'height': '100px'});
		if (DESIGN_ENABLE_ANIMS === true){
			$('#img-logo').fadeOut({duration: 5600, queue: false});
		} else {
			$('#img-logo').css({'display': 'none'});
		}
		document.title = 'R3ditor - Whoops...';
		window.alert('ERROR - Unable to startup!\nReason: ' + err);
		LOG_addLog('error', err);
		LOG_separator();
		LOG_addLog('warn', 'WARN - Question: You are using this on Chrome or Firefox?');
		LOG_addLog('error', 'WARN - If this is true, download <a href="https://dl.nwjs.io/v0.37.4/nwjs-sdk-v0.37.4-win-x64.zip" class="code" target="_blank">NW.js</a> (<a href="https://dl.nwjs.io/v0.37.4/nwjs-sdk-v0.37.4-win-ia32.zip" target="_blank">32-Bit version</a>) and place all the files on extracted folder!');
		
	}
	LOG_scroll();
}
/*
	Discord Functions
*/
function R3_DISCORD_INIT(){
    DiscordRPC = require('discord-rpc');
    RPC = new DiscordRPC.Client({ transport: 'ipc' });
    if (navigator.onLine !== false){
        var loginRPC = RPC.login({clientId: atob(special_day_02[0]), clientSecret: (atob(special_day_02[2]) + atob(special_day_02[3])).slice(0, (atob(special_day_02[2]) + atob(special_day_02[3])).length - 1) + '-'});
    	RPC.on('ready', () => {
    		rpcReady = true;
    		discUserName = RPC.user.username;
    		//console.info('INFO - Discord Int are ready!');
    		R3_DISC_setActivity('Main menu', 'idle');
    	});
    }
}
function R3_DISC_setActivity(det, stat){
	if (R3_ENABLE_DISC !== false && rpcReady !== false){
		if (RE3_RUNNING === true){
			RPC.setActivity({'details': 'Running RE3', 'state': 'On ' + RDT_locations[REALTIME_CurrentRDT][0], 'largeImageKey': atob(special_day_02[1]), 'maxpartysize': 0});
		} else {
			RPC.setActivity({'details': det, 'state': stat, 'largeImageKey': atob(special_day_02[1]), 'maxpartysize': 0});
		}
	}
}
function R3_DISC_clearActivity(){
	if (R3_ENABLE_DISC !== false && rpcReady !== false){
		RPC.clearActivity();
	}
}
//
function R3DITOR_CHECK_FILES_AND_DIRS(){
	if (fs.existsSync(APP_PATH + '\\Update') === false){
		fs.mkdirSync(APP_PATH + '\\Update');
	}
	if (fs.existsSync(APP_PATH + '\\Backup') === false){
		fs.mkdirSync(APP_PATH + '\\Backup');
	}
	if (fs.existsSync(APP_PATH + '\\Assets') === false){
		fs.mkdirSync(APP_PATH + '\\Assets');
	}
	if (fs.existsSync(APP_PATH + '\\Configs') === false){
		fs.mkdirSync(APP_PATH + '\\Configs');
	}
	if (fs.existsSync(APP_PATH + '\\README.md') === true){
		fs.unlinkSync(APP_PATH + '\\README.md');
	}
	if (fs.existsSync(APP_PATH + '\\Roadmap.md') === true){
		fs.unlinkSync(APP_PATH + '\\Roadmap.md');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\SAV') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\SAV');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\RDT') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\RDT');
	}
	if (fs.existsSync(APP_PATH + '\\appveyor.yml') === true){
		fs.unlinkSync(APP_PATH + '\\appveyor.yml');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\MIX') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\MIX');
	}
	if (fs.existsSync(APP_PATH + '\\Configs\\RDT') === false){
		fs.mkdirSync(APP_PATH + '\\Configs\\RDT');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\DROP') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\DROP');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\IEDIT') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\IEDIT');
	}
	if (fs.existsSync(APP_PATH + '\\CONTRIBUTING.md') === true){
		fs.unlinkSync(APP_PATH + '\\CONTRIBUTING.md');
	}
	if (fs.existsSync(APP_PATH + '\\Update\\Extract') === true){
		deleteFolderRecursive(APP_PATH + '\\Update\\Extract');
	}
	if (fs.existsSync(APP_PATH + '\\version.r3ditor') === true){
		fs.unlinkSync(APP_PATH + '\\version.r3ditor');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\RE3SET') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\RE3SET');
	}
	if (fs.existsSync(APP_PATH + '\\Configs\\ARDRDT') === false){
		fs.mkdirSync(APP_PATH + '\\Configs\\ARDRDT');
	}
	if (fs.existsSync(APP_PATH + '\\Configs\\ARDMAP') === false){
		fs.mkdirSync(APP_PATH + '\\Configs\\ARDMAP');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\RDTMAP2') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\RDTMAP2');
	}
	if (fs.existsSync(APP_PATH + '\\Update\\master.zip') === true){
		fs.unlinkSync(APP_PATH + '\\Update\\master.zip');
	}
	if (fs.existsSync(APP_PATH + '\\App\\Update\\check.r3ditor') === true){
		fs.unlinkSync(APP_PATH + '\\App\\Update\\check.r3ditor');
	}
	if (fs.existsSync(APP_PATH + '\\App\\tools\\XDELTA_PATCH_FILE.bin') === true){
		fs.unlinkSync(APP_PATH + '\\App\\tools\\XDELTA_PATCH_FILE.bin');
	}
}
/*
	Internal Log
*/
function LOG_addLog(logType, text){
	var cssClass;
	var type = logType.toLowerCase();
	if (type !== 'log' && type !== 'warn' && type !== 'error'){
		cssClass = 'log-text';
	} else {
		if (type.toLowerCase() === 'log' || type === undefined || type === null){
			cssClass = 'log-text';
		}
		if (type.toLowerCase() === 'warn'){
			cssClass = 'log-warn';
		}
		if (type.toLowerCase() === 'error'){
			cssClass = 'log-error';
		}
	}
	var logTemplate = '<div class="' + cssClass + '">' + text + '</div>';
	$('#log-programa').append(logTemplate);
}
function clearInternalLog(){
	document.getElementById('log-programa').innerHTML = '';
	LOG_addLog('log', APP_NAME);
	LOG_scroll();
}
/// Open in Hex Editor
function openFileOnHex(file){
	main_closeFileList();
	if (HEX_EDITOR !== undefined || HEX_EDITOR !== ''){
		if (file !== undefined || file !== '' || fs.existsSync(file) !== false || file !== APP_PATH + '\\undefined'){
			runExternalSoftware(HEX_EDITOR, [file]);
			EXTERNAL_APP_RUNNING = false;
		} else {
			LOG_addLog('error', 'ERROR - You can\'t open a file on hex editor if you don\'t specify it!');
		}
	} else {
		LOG_addLog('error', 'ERROR - You can\'t open a hex editor if you don\'t specify where it is!');
	}
	LOG_scroll();
}
// Notifications Desktop
function showNotify(titulo, texto, tempo){
	if (titulo === ''){
		titulo = 'R3ditor - Notification';
	}
	if (texto === ''){
		texto = 'Message';
	}
	if (tempo === null || tempo === undefined || tempo === ''){
		tempo = 4000;
	}
	try{	
		var iconPath = APP_PATH + '\\App\\img\\logo.png';
		var NOTIFY = new Notification(titulo, {
			icon: iconPath,
			body: texto,
		});
		setTimeout(NOTIFY.close.bind(NOTIFY), tempo);
	} catch (err) {
		if (DEBUG === true){
			console.error('(Notification) ERROR: ' + err);
			LOG_addLog('error', 'ERROR - ' + err);
		}
	}
}
/*
	Last Files
*/
function R3DITOR_RECENT_FILES(mode){
	var c = 0;
	var fList = [];
	// RDT
	if (mode === 0){
		if (fs.existsSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor') === false){
			fs.writeFileSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor', RDT_lastFileOpened, 'utf-8');
		} else {
			if (ORIGINAL_FILENAME !== undefined){
				var final_list = '';
				fs.readFileSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor').toString().split('\n').forEach(function(line){ 
					if (line !== ''){
						fList.push(line);
					}
				});
				if (fList[0] !== ORIGINAL_FILENAME){
					fList.unshift(ORIGINAL_FILENAME);
				}
				if (fList.length > 4){
					fList.pop();
				}
				while (c < fList.length){
					final_list = final_list + fList[c] + '\n';
					c++;
				}
				try{
					fs.writeFileSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor', final_list, 'utf-8');
				} catch (err){
					LOG_addLog('error', 'ERROR - There was an error while saving the recent files list!');
					LOG_addLog('error', err);
				}
			} else {
				LOG_separator();
				LOG_addLog('warn', 'RECENT FILES - Unable to generate list!');
				LOG_addLog('warn', 'Reason: RDT not present - Try opening a RDT file and try again!');
				LOG_separator();
			}
		}
	}
	LOG_scroll();
}
function R3DITOR_REMOVE_RECENT_FILES(){
	if (fs.existsSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor') === true){
		fs.unlinkSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor');
		LOG_addLog('log', 'INFO - Removing recent files...');
	} else {
		LOG_addLog('warn', 'WARN - Unable to find recent files list!');
	}
	main_renderFileList(3, 2);
	main_closeFileList();
	LOG_scroll();
}
/*
	RUN RE3 / Mercenaries
*/
function R3DITOR_RUN_RE3(mode){
	main_closeFileList();
	if (EXEC_BIO3_original === undefined || EXEC_BIO3_original === '' || GAME_PATH === '' || GAME_PATH === undefined){
		LOG_addLog('error', 'ERROR - The game path is not defined!');
		console.error('ERROR - The game path is not defined!');
	} else {
		try{
			if (fs.existsSync(EXEC_BIO3_original) === true){
				R3DITOR_RUNGAME(0);
				if (WZ_showWizard === true){
					$('#WZ_BTN_2').css({'display': 'none'});
					var msg = 'Testing Resident Evil 3...';
					document.title = APP_NAME + msg;
					LOG_addLog('log', 'INFO - ' + msg);
					LOG_separator();
				} else {
					RE3_RUNNING = true;
					var msg = 'Running Resident Evil 3...';
					LOG_addLog('log', 'INFO - ' + msg);
					LOG_separator();
				}
				if (mode === 0){
					process.chdir(GAME_PATH);
				} else {
					process.chdir(APP_PATH + '\\Assets');
				}
				runGame(EXEC_BIO3_original);
				setTimeout(function(){
					MEMORY_JS_initMemoryJs();
				}, 20);
			} else {
				LOG_addLog('error', 'Unable to run ResidentEvil3 - The file was not found!');
			}
		} catch (err) {
			if (WZ_showWizard === true){
				$('#WZ_BTN_2').css({'display': 'inline'});
			}
			console.error('ERROR - Something went wrong! - ' + err);
			LOG_addLog('error', 'ERROR - Something went wrong! - ' + err);
		}
	}
	LOG_scroll();
}
function R3DITOR_RUN_MERCE(mode){
	main_closeFileList();
	if (EXEC_BIO3_MERCE === undefined || EXEC_BIO3_MERCE === '' || GAME_PATH === '' || GAME_PATH === undefined){
		LOG_addLog('error', 'ERROR - The game path is not defined!');
		console.error('ERROR - The game path is not defined!');
	} else {
		try{
			if (fs.existsSync(EXEC_BIO3_MERCE) === true){
				R3DITOR_RUNGAME(0);
				RE3_RUNNING = true;
				if (mode === 0){
					process.chdir(GAME_PATH);
				} else {
					process.chdir(APP_PATH + '\\Assets');
				}
				LOG_addLog('log', 'INFO - Running Mercenaries...');
				runGame(EXEC_BIO3_MERCE);
			} else {
				LOG_addLog('error', 'Unable to run RE3_MERCE - The file was not found!');
			}
		} catch (err){
			if (WZ_showWizard === true){
				$('#WZ_BTN_2').css({'display': 'inline'});
			}
			console.error('ERROR - Something went wrong! - ' + err);
			LOG_addLog('error', 'ERROR - Something went wrong! - ' + err);
		}
	}
	LOG_scroll();
}
// Copy and paste
function R3DITOR_COPY(cpText){
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = cpText;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}
// Look for ERRORS before running the game
function checkCanPlay(runArgs, gameId){
	var RE3_CAN_RUN = true;
	if (RDT_CANCRASH === true){
		var ask = confirm('BEWARE: The current map is stating that it is defective, so it may close the game unexpectedly.\n\nDo you want to continue anyway?');
		if (ask === false){
			RE3_CAN_RUN = false;
		} else {
			LOG_addLog('warn', 'WARN - RE3: The game will run with broken RDT files (be careful!)');
		}
	}
	if (R3_PROCESS_ARDENABLER === true){
		RE3_CAN_RUN = false;
		LOG_addLog('warn', 'WARN - Unable to run RE3: ARD Enabler is running!');
	}
	if (RE3_CAN_RUN === true){
		if (gameId === '' || gameId === 1 || gameId === undefined){
			R3DITOR_RUN_RE3(runArgs);
		} else {
			R3DITOR_RUN_MERCE(runArgs);
		}
	}
	LOG_scroll();
}
// Remover pastas recursivamente
function deleteFolderRecursive(path){
	runExternalSoftware('cmd', ['/C', 'rd', '/s', '/q', path]);
};
// Function WIP
function R3_WIP(){
	LOG_addLog('warn', 'R3DITOR - Sorry buddy... This Function / Option still #WIP!');
	LOG_scroll();
}
function killExternalSoftware(processID){
	var PID;
	if (processID !== '' && processID !== undefined && processID !== null){
		PID = parseInt(processID);
		process.kill(PID);
	} else {
		if (EXTERNAL_APP_PID !== 0 && EXTERNAL_APP_PID !== undefined){
			process.kill(EXTERNAL_APP_PID);
		}
	}
}
/*
	Run external apps (.exe)
*/
function runGame(exe, args){
	var color;
	RE3_PID = 0;
	const { spawn } = require('child_process');
	if (args === undefined || args === null || args === ''){
		args = [''];
	}
	const ls = spawn(exe, args);
	RE3_PID = ls.pid;
	if (RE3_RUNNING === true && RDT_arquivoBruto === undefined && SAVE_arquivoBruto === undefined && MSG_arquivoBruto === undefined && BIO3INI_arquivoBruto === undefined){
		$('#menu-utility').css({'top': '586px'});
		$('#menu-utility-aba').css({'top': '504px'});
	}
	ls.stdout.on('data', (data) => {
		LOG_addLog('log', 'Resident Evil 3 / Mercenaries: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
		LOG_scroll();
	});
	ls.stderr.on('data', (data) => {
		LOG_addLog('warn', 'Resident Evil 3 / Mercenaries: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollDownLog();
	});
	MEM_JS_discInterval = setInterval(function(){
		R3_DISC_setActivity('Running RE3', 'Loading map info...');
	}, 800);
	ls.on('close', (code) => {
		clearInterval(MEM_JS_discInterval);
		RE3_PID = 0;
		MEM_JS_canRender = false;
		RE3_LIVE_enableDisableToolBar(1);
		if (WZ_showWizard === true && WZ_lastMenu === 3){
			$('#WZ_BTN_2').css({'display': 'inline'});
		}
		RE3_RUNNING = false;
		RE3_LIVE_closeForm();
		R3_DISC_clearActivity();
		R3ditor_disableLiveStatusButton();
		if (PROCESS_OBJ !== undefined){
			clearInterval(MEM_JS_updatePosTimer);
			MEM_JS.closeProcess(PROCESS_OBJ.handle);
			LOG_separator();
			LOG_addLog('log', 'INFO - MemoryJS - Process closed!');
			LOG_separator();
		}
		if (RDT_arquivoBruto === undefined && SAVE_arquivoBruto === undefined && MSG_arquivoBruto === undefined && BIO3INI_arquivoBruto === undefined && main_currentMenu !== 6){
			$('#menu-utility-aba').css({'top': '464px'});
			$('#menu-utility').css({'top': '546px'});
		}
		R3DITOR_RUNGAME(1);
		process.chdir(TEMP_APP_PATH);
		if (code > 1){
			color = 'red';
		} else {
			color = 'green';
		}
		LOG_addLog('log', 'Resident Evil 3 / Mercenaries - The application was finished with exit code <font class="' + color + ' user-can-select">' + code + '</font>.');
		LOG_scroll();
		return code;
	});
}
function runExternalSoftware(exe, args){
	try{
		var color;
		EXTERNAL_APP_EXITCODE = 0;
		EXTERNAL_APP_RUNNING = true;
		const { spawn } = require('child_process');
		if (args === undefined || args === null || args === ''){
			args = [''];
		}
		const ls = spawn(exe, args);
		EXTERNAL_APP_PID = ls.pid;
		ls.stdout.on('data', (data) => {
			console.info('External App: ' + data);
			LOG_addLog('log', 'External App: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
			LOG_scroll();
		});
		ls.stderr.on('data', (data) => {
			console.info('External App: ' + data);
			LOG_addLog('warn', 'External App: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
			LOG_scroll();
		});
		ls.on('close', (code) => {
			EXTERNAL_APP_PID = 0;
			EXTERNAL_APP_RUNNING = false;
			EXTERNAL_APP_EXITCODE = code;
			if (WZ_showWizard === true && WZ_lastMenu === 3){
				$('#WZ_BTN_2').css({'display': 'inline'});
			}
			process.chdir(TEMP_APP_PATH);
			if (code > 1){
				color = 'red';
			} else {
				color = 'green';
			}
			if (exe !== 'cmd'){
				LOG_addLog('log', 'External App - The application was finished with exit code <font class="' + color + ' user-can-select">' + code + '</font>.');
				return code;
				LOG_scroll();
			}
		});
	} catch (err) {
		LOG_separator();
		if (WZ_showWizard === true && err.toString().indexOf('Error: spawn UNKNOWN') !== -1){
			LOG_addLog('error', 'ERROR - Unable to extract ROFS.exe! You need to instal Visual Studio 2005 runtime files to run this software.');
			LOG_addLog('error', 'Details: ' + err);
		} else {
			LOG_addLog('error', 'Something went wrong while running ' + getFileName(exe) + '!');
			LOG_addLog('error', 'Details: ' + err);
		}
	}
	LOG_scroll();
}
// Save Files
function R3DITOR_SAVE(filename, content, mode, extension){
	// Mode: utf-8, hex...
	document.getElementById('r3ditorSaveFile').nwsaveas = filename;
	document.getElementById('r3ditorSaveFile').accept = '.' + extension.replace('.', '');
	document.getElementById('r3ditorSaveFile').onchange = function(){
		R3DITOR_PROCESS_SAVE(filename, content, mode);
	}
	$('#r3ditorSaveFile').trigger('click');
}
function R3DITOR_PROCESS_SAVE(filename, content, mode){
	var location = document.getElementById('r3ditorSaveFile').value;
	if (location.replace(filename, '') !== ''){
		try{
			fs.writeFileSync(location, content, mode);
			LOG_addLog('log', 'File - Save sucessfull!');
			LOG_addLog('log', 'Path: <font class="user-can-select">' + location + '</font>');
		} catch(err){
			LOG_addLog('error', 'ERROR - Unable to Save File!');
			LOG_addLog('error', err);
		}
	}
	LOG_separator();
	document.getElementById('r3ditorSaveFile').accept = '';
	document.getElementById('r3ditorSaveFile').value = '';
	LOG_scroll();
}
/// Download Files
function R3DITOR_downloadFile(url, downloadFileName){
	if (fs.existsSync(downloadFileName) === true){
		fs.unlinkSync(downloadFileName);
	}
	DOWNLOAD_COMPLETE = false;
	const http = require('https');
	const file = fs.createWriteStream(downloadFileName);
	const request = http.get(url, function(response){
		response.pipe(file);
		file.on('finish', function(){
			DOWNLOAD_COMPLETE = true;
			if (downloadFileName !== APP_PATH + '\\App\\check.r3ditor'){
		  		LOG_addLog('log', 'R3ditor - Download Complete! - ' + downloadFileName);
			}
    	});
	});	
	LOG_scroll();
}
/* 
	Utils
*/
/// Get file names
function getFileName(file){
	if (file !== '' && file !== undefined){
		var c = 0;
		var removePath = file.toLowerCase().split(/(\\|\/)/g).pop();
		while (c < MAIN_exludeFileFormats.length){
			removePath = removePath.replace(MAIN_exludeFileFormats[c], '');
			c++;
		}
		return removePath;
	}
}
/// Get file extension
function getFileExtension(file){
	if (file !== '' && file !== undefined){
		return file.slice(file.indexOf(getFileName(file).toUpperCase()), file.length).replace(getFileName(file).toUpperCase() + '.', '');
	}
}
/// Format hex value to internal reading
function solveHEX(hex){
	if (hex !== '' && hex !== undefined){
		var res = hex.replace(new RegExp(' ', 'g'), '');
		var fin = res.toLowerCase();
		return fin;
	}
}
/// Get current date
function currentTime(){
	var t = new Date;
	var d = t.getDate();
	var h = t.getHours();
	var s = t.getSeconds();
	var y = t.getFullYear();
	var mi = t.getMinutes();
	var m = t.getMonth() + 1;
	if (m === 9 && d === 28 && e_e === 0){
		e_e++;
		LOG_addLog('log', '<font class="none" id="special_msg" title="' + atob(special_day_00) + '" style="text-shadow: 0 0 16px #fff;"><i>' + atob(special_day_00) + '</i></font>');
		if (DESIGN_ENABLE_ANIMS === true){
			$('#special_msg').fadeIn({duration: 2200, queue: false});
		} else {
			$('#special_msg').css({'display': 'inline'});
		}
		LOG_scroll();
	}
	if (m === 10 && d === 1 && e_e === 0){
		e_e++;
		LOG_addLog('log', '<font class="none" id="special_msg" title="' + atob(special_day_01) + '" style="text-shadow: 0 0 16px #fff;"><i>' + atob(special_day_01) + '</i></font>');
		if (DESIGN_ENABLE_ANIMS === true){
			$('#special_msg').fadeIn({duration: 2200, queue: false});
		} else {
			$('#special_msg').css({'display': 'inline'});
		}
		LOG_scroll();
	}
	if (d.toString().length < 2){
		d = '0' + t.getDate();
	}
	if (m.toString().length < 2){
		m = '0' + parseInt(t.getMonth() + 1);
	}
	if (h.toString().length < 2){
		h = '0' + t.getHours(); 
	}
	if (mi.toString().length < 2){
		mi = '0' + t.getMinutes(); 
	}
	if (s.toString().length < 2){
		s = '0' + t.getSeconds();
	}
	return d + '-' + m + '-' + y + '_' + h + '.' + mi + '.' + s;
}
/// IndexOf com multiplas ocorrêcias
function getAllIndexes(arr, val){
	if (arr !== null && val !== null || arr !== undefined && val !== undefined){
    	var indexes = [], i = -1;
    	while ((i = arr.indexOf(val, i+1)) != -1){
    	    indexes.push(i);
    	}
    	return indexes;
	} else {
		console.error('ERROR - Invalid arguments on getAllIndexes!');
		LOG_addLog('error', 'ERROR - Invalid arguments on getAllIndexes!');
	}
	LOG_scroll();
}
function getFileSize(filePath, mode){
	if (filePath !== undefined && filePath !== ''){
		var read = fs.statSync(filePath);
		var fsize = read.size;
		// Bytes
		if (mode === 0 || mode === undefined){
			return read.size;
		}
		// In KB
		if (mode === 1){
			return parseInt(read.size / 1024);
		}
		// In MB
		if (mode === 2){
			return read.size / 1000000.0;
		}
	}
}
function parsePositive(value){
	return value - value - value;
}
function parseHex(value){
	return parseInt(value / 2).toString(16);
}
function calcBIO3Numbers(n){
	var a = parseInt(n) + 32767;
	return a;
}
function parseDecimalToBIO3Var(value, mode){
	var number = parseInt(value);
	// Mode 0: XXXX
	if (mode === 0){
		var segundaCasa = 0;
		var primeiraCasa = 0;
		while (number > 255){
			number = parseInt(number - 255);
			segundaCasa++;
			number--;
		}
		primeiraCasa = number.toString(16);
		segundaCasa = segundaCasa.toString(16);
		if (primeiraCasa.length < 2){
			primeiraCasa = '0' + primeiraCasa;
		}
		if (segundaCasa.length < 2){
			segundaCasa = '0' + segundaCasa;
		}
		return primeiraCasa + segundaCasa;
	}
}
function processBIO3Vars(hex){
	if (hex !== undefined && hex !== ''){
		if (hex.length === 4){
			var numerofinal = 0;
			var first = parseInt(hex.slice(0, 2), 16);
			var second = parseInt(hex.slice(2, 4), 16);
			while(second !== 0){
				numerofinal = numerofinal + 255;
				numerofinal++;
				second--;
			}
			while(first !== 0){
				numerofinal++;
				first--;
			}
			return numerofinal;
		}
	} else {
		return 0;
	}
}
function processBIO3HP(hex){
	if (hex !== '' && hex.length === 4){
		var stat;
		var color;
		var vital = processBIO3Vars(hex);
		/*
			O correto seria 32767 mas estou deixando uma margem de erro para
			que o R3ditor não pense que o player esteja vivo.
		*/
		if (vital > 30100){
			stat = 'Dead';
			color = 'txt-danger';
		}
		if (vital === 0){
			stat = 'Almost dead!';
			color = 'txt-danger';
		}
		if (vital > 0 && vital < 15){
			stat = 'Danger';
			color = 'txt-danger';
		}
		if (vital > 14 && vital < 31){
			stat = 'Caution';
			color = 'txt-caution-red';
		}
		if (vital > 30 && vital < 101){
			stat = 'Caution';
			color = 'txt-caution';
		}
		if (vital > 101 && vital < 201){
			stat = 'Fine';
			color = 'txt-fine';
		}
		if (vital > 200 && vital < 202){
			stat = 'Fine...?';
			color = 'txt-fine';
		}
		if (vital > 201 && vital < 999){
			stat = 'Life Hack!';
			color = 'txt-fine';
		}
		if (vital > 999 && vital < 19999){
			stat = 'Extreme Unfair!';
			color = 'txt-fine';
		}
		if (vital > 19999 && vital < 30099){
			stat = 'CHEATER!';
			color = 'txt-fine';
		}
		return [vital, stat, hex, color];
	}
}
/// Undo solvehex
function splitHex(hex, mode){
	var rw;
	var c = 0;
	var fina = '';
	if (mode === 0){
		rw = hex.match(/.{1,2}/g);
	} else {
		rw = hex.match(/.{1,4}/g);
	}
	while(c < rw.length){
		fina = fina + rw[c] + ' ';
		c++;
	}
	return fina.slice(0, fina.length - 1);
}
function processBIO3PosNumbers(number, mode){
	if (number !== undefined && number !== '' && number !== NaN && number !== null){
		var numTemp = parseInt(number);
		if (numTemp > 32767){
			numTemp = numTemp - 65536;
		}
		/*
			Mode 0: Simple conversion
			Mode 1: Bring back to full rane number (Min = 0 [0000], Max = 65535 [FFFF])
		*/
		if (mode === 0 || mode === undefined){
			return numTemp;
		} else {
			if (numTemp < 0){
				return parseInt(numTemp + 32767);
			} else {
				return numTemp;
			}
		}
	} else {
		return 0;
	}
}
function parsePercentage(current, maximum){
	if (current !== undefined && maximum !== undefined && current !== '' && maximum !== ''){
		return Math.floor((current / maximum) * 100);
	} else {
		return 0;
	}
}
function parsePercentageReverse(percent, maximum){
	if (current !== undefined && maximum !== undefined && current !== '' && maximum !== ''){
		return parseFloat((percent * maximum) / 100);
	} else {
		return 0;
	}
}
function R3DITOR_reduceStrings(str, size){
	if (str !== '' && parseInt(size) !== NaN){
		if (str.length === size || str.length > size){
			return '...' + str.slice(parseInt(str.length / 2), str.length);
		} else {
			return str;
		}
	}
}
function parseEndian(str){
	var final = '';
	if (str !== undefined && str !== ''){
		var c = 0;
		var prse = str.toString().match(/.{2,2}/g).reverse();
		while (c < prse.length){
			final = final + prse[c];
			c++;
		}	
	}
	return final;
}
/*
	Triggers & Load Files
*/
function triggerLoad(loadForm){
	// RDT Audio
	if (loadForm === 1){
		$('#loadWAVForm').trigger('click');
	}
	// Wizard - ResidentEvil3.exe
	if (loadForm === 2){
		$('#loadWZForm').trigger('click');
	}
	// Wizard - Hex Editor
	if (loadForm === 3){
		$('#loadWZHexForm').trigger('click');
	}
	// Save
	if (loadForm === 4){
		$('#loadSaveForm').trigger('click');
	}
	// MSG
	if (loadForm === 5){
		$('#loadMSGForm').trigger('click');
	}
	// RDT Menu
	if (loadForm === 6){
		$('#loadRDTForm').trigger('click');
	}
	// DROP
	if (loadForm === 7){
		$('#loadDROPFile').trigger('click');
	}
	// RE3SET
	if (loadForm === 8){
		$('#loadRE3SET').trigger('click');
	}
	// Xdelta Patch
	if (loadForm === 9){
		$('#loadXdeltaPatch').trigger('click');
	}
	// INI Load
	if (loadForm === 10){
		$('#loadINIForm').trigger('click');
	}
	// SETTINGS RE3
	if (loadForm === 11){
		$('#loadSETTINGS_RE3').trigger('click');
	}
	// SETTINGS HEX
	if (loadForm === 12){
		$('#loadSETTINGS_HEX').trigger('click');
	}
	// SETTINGS Merce
	if (loadForm === 13){
		$('#loadSETTINGS_REM').trigger('click');
	}
	// Load BMP Tileset
	if (loadForm === 14){
		$('#loadTilesetBMP').trigger('click');
	}
	// Load OBJ Patcher
	if (loadForm === 15){
		$('#loadOBJPatcherFile').trigger('click');
	}
	// Load ROFS Extractor
	if (loadForm === 16){
		$('#loadRofsFile').trigger('click');
	}
	// Load MIX Editor
	if (loadForm === 17){
		$('#loadMixFile').trigger('click');
	}
	// Load IEDIT
	if (loadForm === 18){
		$('#loadIEDITFile').trigger('click');
	}
	// Create R3 Patcher
	if (loadForm === 19){
		$('#loadR3PatcherFile').trigger('click');
	}
	// Load R3 Patcher
	if (loadForm === 20){
		$('#loadR3PatcherPatch').trigger('click');
	}
	// FINAL R3 Patcher
	if (loadForm === 21){
		$('#loadR3PatcherFINAL').trigger('click');
	}
	// Xdelta Origin File
	if (loadForm === 22){
		$('#loadXdeltaBinFile').trigger('click');
	}
}
function setLoadFile(input){
	var cFile;
	var loadType = '';
	var loadCancel = false;
	// Audio
	if (input === 1){
		cFile = document.getElementById('loadWAVForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'WAV';
		} else {
			RDT_replaceWavFile(cFile.path);
			document.getElementById('loadWAVForm').value = '';
		}
	}
	// Wizard - ResidentEvil3.exe
	if (input === 2){
		cFile = document.getElementById('loadWZForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Wizard - ResidentEvil3.exe';
		} else {
			BIO3_original = undefined;
			WZ_LOADRE3(cFile.path);
			document.getElementById('loadWZForm').value = '';
		}
	}
	// Wizard - Hex editor
	if (input === 3){
		cFile = document.getElementById('loadWZHexForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Wizard - Hex editor';
		} else {
			HEX_EDITOR = undefined;
			WZ_LOADHEX(cFile.path);
			document.getElementById('loadWZHexForm').value = '';
		}
	}
	// SAV
	if (input === 4){
		cFile = document.getElementById('loadSaveForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Save';
		} else {
			SAVE_arquivoBruto = undefined;
			CARREGAR_SAVE(cFile.path);
			document.getElementById('loadSaveForm').value = '';
		}
	}
	// MSG
	if (input === 5){
		cFile = document.getElementById('loadMSGForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'MSG';
		} else {
			MSG_arquivoBruto = undefined;
			MSG_CARREGAR_ARQUIVO(cFile.path);
			document.getElementById('loadMSGForm').value = '';
		}
	}
	// RDT
	if (input === 6){
		cFile = document.getElementById('loadRDTForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'RDT';
		} else {
			RDT_arquivoBruto = undefined;
			RDT_openFile(cFile.path);
			document.getElementById('loadRDTForm').value = '';
		}
	}
	// DROP Editor
	if (input === 7){
		cFile = document.getElementById('loadDROPFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load DROP';
		} else {
			DROP_loadFile(cFile.path, 0);
			document.getElementById('loadDROPFile').value = '';
		}
	}
	// RE3SET Editor
	if (input === 8){
		cFile = document.getElementById('loadRE3SET').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load RE3SETTINGS';
		} else {
			RE3SET_loadFile(cFile.path, 0);
			document.getElementById('loadRE3SET').value = '';
		}
	}
	// Xdelta Patch File
	if (input === 9){
		cFile = document.getElementById('loadXdeltaPatch').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load Xdelta Patch';
		} else {
			UTILS_XDELTA_setXdeltafile(cFile.path, 0);
			document.getElementById('loadXdeltaPatch').value = '';
		}
	}
	// INI - INI Editor
	if (input === 10){
		cFile = document.getElementById('loadINIForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'INI - INI Editor';
		} else {
			BIO3INI_arquivoBruto = undefined;
			INI_CARREGAR_ARQUIVO(cFile.path);
			document.getElementById('loadINIForm').value = '';
		}
	}
	// SETTINGS - RE3 Path
	if (input === 11){
		cFile = document.getElementById('loadSETTINGS_RE3').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'SETTINGS - RE3 Path';
		} else {
			SETTINGS_SET_PATH(0, cFile.path);
			document.getElementById('loadSETTINGS_RE3').value = '';
		}
	}
	// SETTINGS - Hex Path
	if (input === 12){
		cFile = document.getElementById('loadSETTINGS_HEX').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'SETTINGS - Hex Path';
		} else {
			SETTINGS_SET_PATH(1, cFile.path);
			document.getElementById('loadSETTINGS_HEX').value = '';
		}
	}
	// SETTINGS - Merce Path
	if (input === 13){
		cFile = document.getElementById('loadSETTINGS_REM').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'SETTINGS - RE3_MERCE Path';
		} else {
			SETTINGS_SET_PATH(2, cFile.path);
			document.getElementById('loadSETTINGS_REM').value = '';
		}
	}
	// BMP Tileset
	if (input === 14){
		cFile = document.getElementById('loadTilesetBMP').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load BMP Tileset';
		} else {
			RDT_SLD_layer_setBMP(cFile.path);
			document.getElementById('loadTilesetBMP').value = '';
		}
	}
	// OBJ Patcher
	if (input === 15){
		cFile = document.getElementById('loadOBJPatcherFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load OBJ Patcher';
		} else {
			UTILS_OBJ_Patcher_RUN(cFile.path);
			document.getElementById('loadOBJPatcherFile').value = '';
		}
	}
	// Rofs
	if (input === 16){
		cFile = document.getElementById('loadRofsFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load Rofs Extractor';
		} else {
			UTILS_extract_rofs(cFile.path);
			document.getElementById('loadRofsFile').value = '';
		}
	}
	// MIX Editor
	if (input === 17){
		cFile = document.getElementById('loadMixFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load MIX Editor';
		} else {
			MIX_loadExe(cFile.path, 0);
			document.getElementById('loadMixFile').value = '';
		}
	}
	// IEDIT Editor
	if (input === 18){
		cFile = document.getElementById('loadIEDITFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load IEDIT (Item Editor)';
		} else {
			IEDIT_loadExec(cFile.path, 0);
			document.getElementById('loadIEDITFile').value = '';
		}
	}
	// R3 Patcher - Create Patch
	if (input === 19){
		cFile = document.getElementById('loadR3PatcherFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load R3 Patcher - Create Patch';
		} else {
			PATCHER_createPatch(cFile.path);
			document.getElementById('loadR3PatcherFile').value = '';
		}
	}
	// R3 Patcher - Load Patch
	if (input === 20){
		cFile = document.getElementById('loadR3PatcherPatch').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load R3 Patcher - Load Patch';
		} else {
			PATCHER_loadPatch(cFile.path);
			document.getElementById('loadR3PatcherPatch').value = '';
		}
	}
	// R3 Patcher - FINAL
	if (input === 21){
		cFile = document.getElementById('loadR3PatcherFINAL').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load R3 Patcher - Load Patch';
		} else {
			PATCHER_applyOnExec(cFile.path);
			document.getElementById('loadR3PatcherFINAL').value = '';
		}
	}
	// Xdelta Original File
	if (input === 22){
		cFile = document.getElementById('loadXdeltaBinFile').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'Load Xdelta Original File';
		} else {
			UTILS_XDELTA_setXdeltafile(cFile.path, 1);
			document.getElementById('loadXdeltaBinFile').value = '';
		}
	}
	if (loadCancel === true){
		LOG_addLog('warn', 'WARN - Load ' + loadType + ' - Load cancelled');
	}
	LOG_scroll();
}