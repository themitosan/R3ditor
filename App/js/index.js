/*
	R3ditor - index.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - Por favorzu! '\(UwU )/'
*/
var fs;
var MEM_JS;
var e_e = 0;
var APP_PATH;
var HEX_EDITOR;
var PROCESS_OBJ;
var RE3_PID = 0;
var BETA = false;
var ORIGINAL_FILENAME;
var RE3_RUNNING = false;
var STATUS = 'Undefined';
var EXTERNAL_APP_PID = 0;
var SHOW_EDITONHEX = false;
var RE3SLDE_CANRUN = false;
var DOWNLOAD_COMPLETE = true;
var EXTERNAL_APP_EXITCODE = 0;
var EXTERNAL_APP_RUNNING = false;
var APP_VERSION = '0.3.1 [BETA]';
var APP_NAME = 'R3ditor V. ' + APP_VERSION;
/*
	Onload
*/
window.onload = function(){
	load();
}
window.onclose = function(){
	localStorage.clear();
	sessionStorage.clear();
	if (RE3_RUNNING === true){
		killExternalSoftware(RE3_PID);
	}
}
window.onresize = function(){
	window.moveTo(0, 0);
	window.resizeBy(1340, 733);
}
/*
	Functions
*/
function reload(){
	process.chdir(TEMP_APP_PATH);
	if (RE3_RUNNING === true){
		killExternalSoftware(RE3_PID);
	}
	sessionStorage.clear();
	localStorage.clear();
	location.reload();
}
function load(){
	localStorage.clear();
	sessionStorage.clear();
	console.info(APP_NAME);
	addLog('log', APP_NAME);
	document.title = APP_NAME;
	$('#app_version').html(APP_VERSION);
	log_separador();
	//
	request_render_save = false;
	currentTime();
	MEMORY_JS_verifyNodeJsVer();
	try{
		fs = require('fs');
		APP_PATH = process.cwd();
		R3DITOR_CHECK_FILES_AND_DIRS();
		WZ_verifyConfigFile();
	} catch(err){
		console.error(err);
		if (DESIGN_ENABLE_ANIMS === true){
			$('#img-logo').fadeOut({duration: 5600, queue: false});
		} else {
			$('#img-logo').css({'display': 'none'});
		}
		document.title = 'Whoops...';
		addLog('warn', 'WARN - Unable to use \"require\" or \"process\"... Wait... This is Chrome or Firefox?');
		addLog('error', 'ERROR - This is not Node-Webkit / NW.js! “w”');
		addLog('error', 'ERROR - To run this software properly, download <a href="http://nwjs.io/" class="code" target="_blank">Node-Webkit</a> and place all the files on extracted folder!');
		log_separador();
		addLog('error', err);
	}
	if (BETA === true){
		console.warn('WARN - BETA is true! - IDIOT!');
		console.error('ERROR - BETA is true! - Seu Jumento!');
		addLog('error', 'BETA is true!');
		addLog('warn', 'BETA is true!');
		addLog('log', 'BETA is true!');
		addLog('error', 'BETA is true!');
		alert('ERROR - BETA IS TRUE!');
	}
	scrollLog();
}
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
	};
	if (fs.existsSync(APP_PATH + '\\Roadmap.md') === true){
		fs.unlinkSync(APP_PATH + '\\Roadmap.md');
	};
	if (fs.existsSync(APP_PATH + '\\Backup\\SAV') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\SAV');
	}
	if (fs.existsSync(APP_PATH + '\\Backup\\RDT') === false){
		fs.mkdirSync(APP_PATH + '\\Backup\\RDT');
	}
	if (fs.existsSync(APP_PATH + '\\Configs\\RDT') === false){
		fs.mkdirSync(APP_PATH + '\\Configs\\RDT');
	}
	if (fs.existsSync(APP_PATH + '\\Update\\Extract') === true){
		deleteFolderRecursive(APP_PATH + '\\Update\\Extract');
	}
	if (fs.existsSync(APP_PATH + '\\CONTRIBUTING.md') === true){
		fs.unlinkSync(APP_PATH + '\\CONTRIBUTING.md');
	};
	if (fs.existsSync(APP_PATH + '\\Update\\master.zip') === true){
		fs.unlinkSync(APP_PATH + '\\Update\\master.zip');
	}
	if (fs.existsSync(APP_PATH + '\\App\\Update\\check.r3ditor') === true){
		fs.unlinkSync(APP_PATH + '\\App\\Update\\check.r3ditor');
	}
	if (fs.existsSync(APP_PATH + '\\version.r3ditor') === true && BETA === false){
		fs.unlinkSync(APP_PATH + '\\version.r3ditor');
	};
}
/*
	Internal Log
*/
function addLog(type, texto){
	var classe = undefined;
	if (type.toLowerCase !== 'log' && type.toLowerCase !== 'warn' && type.toLowerCase !== 'error'){
		classe = 'log-text';
	} else {
		if (type.toLowerCase() === 'log' || type === undefined || type === null){
			classe = 'log-text';
		}
		if (type.toLowerCase() === 'warn'){
			classe = 'log-warn';
		}
		if (type.toLowerCase() === 'error'){
			classe = 'log-error';
		}
	}
	var logTemplate = '<div class="' + classe + '">' + texto + '</div>';
	$('#log-programa').append(logTemplate);
}
function clearInternalLog(){
	document.getElementById('log-programa').innerHTML = '';
	addLog('log', APP_NAME);
	scrollLog();
}
/// Open in Hex Editor
function openFileOnHex(file){
	main_closeFileList();
	if (HEX_EDITOR !== undefined || HEX_EDITOR !== ''){
		if (file !== undefined || file !== '' || fs.existsSync(file) !== false || file !== APP_PATH + '\\undefined'){
			runExternalSoftware(HEX_EDITOR, [file]);
			EXTERNAL_APP_RUNNING = false;
		} else {
			addLog('error', 'ERROR - You can\'t open a file on hex editor if you don\'t specify it!');
		}
	} else {
		addLog('error', 'ERROR - You can\'t open a hex editor if you don\'t specify where it is!');
		scrollLog();
	}
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
	}
	catch(err){
		if (DEBUG === true){
			console.error('(Notification) ERROR: ' + err);
			addLog('error', '(Notification) ERROR: ' + err);
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
					addLog('error', 'ERROR - There was an error while saving the recent files list!');
					addLog('error', err);
				}
			} else {
				log_separador();
				addLog('warn', 'RECENT FILES - Unable to generate list!');
				addLog('warn', 'Reason: RDT not present - Try opening a RDT file and try again!');
				log_separador();
			}
		}
	}
	scrollLog();
}
function R3DITOR_REMOVE_RECENT_FILES(){
	if (fs.existsSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor') === true){
		fs.unlinkSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor');
		addLog('log', 'INFO - Removing recent files...');
	} else {
		addLog('warn', 'WARN - Unable to find recent files list!');
	}
	main_renderFileList(3, 2);
	main_closeFileList();
	scrollLog();
}
/*
	RUN RE3 / Mercenaries
*/
function R3DITOR_RUN_RE3(mode){
	main_closeFileList();
	if (EXEC_BIO3_original === undefined || EXEC_BIO3_original === '' || GAME_PATH === '' || GAME_PATH === undefined){
		addLog('error', 'ERROR - The game path is not defined!');
		console.error('ERROR - The game path is not defined!');
	} else {
		try{
			if (fs.existsSync(EXEC_BIO3_original) === true){
				R3DITOR_RUNGAME(0);
				if (WZ_showWizard === true){
					$('#WZ_BTN_2').css({'display': 'none'});
					var msg = 'Testing Resident Evil 3...';
					document.title = APP_NAME + msg;
					addLog('log', 'INFO - ' + msg);
					log_separador();
				} else {
					RE3_RUNNING = true;
					var msg = 'Running Resident Evil 3...';
					addLog('log', 'INFO - ' + msg);
					log_separador();
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
				addLog('error', 'Unable to run ResidentEvil3 - The file was not found!');
			}
		} catch (err) {
			if (WZ_showWizard === true){
				$('#WZ_BTN_2').css({'display': 'inline'});
			}
			console.error('ERROR - Something went wrong! - ' + err);
			addLog('error', 'ERROR - Something went wrong! - ' + err);
		}
	}
	scrollLog();
}
function R3DITOR_RUN_MERCE(mode){
	main_closeFileList();
	if (EXEC_BIO3_MERCE === undefined || EXEC_BIO3_MERCE === '' || GAME_PATH === '' || GAME_PATH === undefined){
		addLog('error', 'ERROR - The game path is not defined!');
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
				addLog('log', 'INFO - Running Mercenaries...');
				runGame(EXEC_BIO3_MERCE);
			} else {
				addLog('error', 'Unable to run RE3_MERCE - The file was not found!');
			}
		} catch (err){
			if (WZ_showWizard === true){
				$('#WZ_BTN_2').css({'display': 'inline'});
			}
			console.error('ERROR - Something went wrong! - ' + err);
			addLog('error', 'ERROR - Something went wrong! - ' + err);
		}
	}
	scrollLog();
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
	if (RDT_CANCRASH === true){
		var ask = confirm('BEWARE: The current map is stating that it is defective, so it may close the game unexpectedly.\n\nDo you want to continue anyway?');
		if (ask === true){
			if (gameId === '' || gameId === 1 || gameId === undefined){
				R3DITOR_RUN_RE3(runArgs);
			} else {
				R3DITOR_RUN_MERCE(runArgs);
			}
		}
	} else {
		if (gameId === '' || gameId === 1 || gameId === undefined){
			R3DITOR_RUN_RE3(runArgs);
		} else {
			R3DITOR_RUN_MERCE(runArgs);
		}
	}
}
// Remover pastas recursivamente
function deleteFolderRecursive(path){
	runExternalSoftware('cmd', ['/C', 'rd', '/s', '/q', path]);
};
/// Function WIP
function WIP(){
	log_separador();
	addLog('warn', 'Sorry buddy... This function / option still #WIP');
	scrollLog();
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
	if (args === undefined || args === null){
		args = [''];
	}
	const ls = spawn(exe, args);
	RE3_PID = ls.pid;
	if (RE3_RUNNING === true && RDT_arquivoBruto === undefined && SAVE_arquivoBruto === undefined && MSG_arquivoBruto === undefined && BIO3INI_arquivoBruto === undefined){
		$('#menu-utility-aba').css({'top': '512px'});
		$('#menu-utility').css({'top': '586px'});
	}
	ls.stdout.on('data', (data) => {
		addLog('log', 'Resident Evil 3 / Mercenaries: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollLog();
	});
	ls.stderr.on('data', (data) => {
		addLog('warn', 'Resident Evil 3 / Mercenaries: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollDownLog();
	});
	ls.on('close', (code) => {
		RE3_PID = 0;
		MEM_JS_canRender = false;
		RE3_LIVE_enableDisableToolBar(1);
		if (WZ_showWizard === true && WZ_lastMenu === 3){
			$('#WZ_BTN_2').css({'display': 'inline'});
		}
		RE3_RUNNING = false;
		RE3_LIVE_closeForm();
		R3ditor_disableLiveStatusButton();
		if (PROCESS_OBJ !== undefined){
			clearInterval(MEM_JS_updatePosTimer);
			MEM_JS.closeProcess(PROCESS_OBJ.handle);
			log_separador();
			addLog('log', 'INFO - MemoryJS - Process closed!');
			log_separador();
		}
		if (RDT_arquivoBruto === undefined && SAVE_arquivoBruto === undefined && MSG_arquivoBruto === undefined && BIO3INI_arquivoBruto === undefined && main_currentMenu !== 6){
			$('#menu-utility-aba').css({'top': '472px'});
			$('#menu-utility').css({'top': '546px'});
		}
		R3DITOR_RUNGAME(1);
		process.chdir(TEMP_APP_PATH);
		if (code > 1){
			color = 'red';
		} else {
			color = 'green';
		}
		addLog('log', 'Resident Evil 3 / Mercenaries - The application was finished with exit code <font class="' + color + ' user-can-select">' + code + '</font>.');
		scrollLog();
		return code;
	});
}
function runExternalSoftware(exe, args){
	var color;
	EXTERNAL_APP_EXITCODE = 0;
	EXTERNAL_APP_RUNNING = true;
	const { spawn } = require('child_process');
	if (args === undefined || args === null){
		args = [''];
	}
	const ls = spawn(exe, args);
	EXTERNAL_APP_PID = ls.pid;
	ls.stdout.on('data', (data) => {
		addLog('log', 'External App: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollLog();
	});
	ls.stderr.on('data', (data) => {
		addLog('warn', 'External App: ' + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollDownLog();
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
			addLog('log', 'External App - The application was finished with exit code <font class="' + color + ' user-can-select">' + code + '</font>.');
			return code;
			scrollLog();
		}
	});
	scrollLog();
}
// Save Files
function R3DITOR_SAVE(filename, content, mode, extension){
	// Mode: utf-8, hex...
	document.getElementById('r3ditorSaveFile').nwsaveas = filename;
	document.getElementById('r3ditorSaveFile').accept = '.' + extension;
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
			addLog('log', 'File - Save sucessfull!');
			addLog('log', 'Path: ' + location);
		} catch(err){
			addLog('error', 'ERROR - Unable to Save File!');
			addLog('error', err);
		}
	}
	log_separador();
	document.getElementById('r3ditorSaveFile').accept = '';
	document.getElementById('r3ditorSaveFile').value = '';
	scrollLog();
}
/// Download Files
function R3DITOR_downloadFile(url, nomedoarquivo){
	if (fs.existsSync(nomedoarquivo) === true){
		fs.unlinkSync(nomedoarquivo);
	}
	DOWNLOAD_COMPLETE = false;
	const http = require('https');
	const file = fs.createWriteStream(nomedoarquivo);
	const request = http.get(url, function(response){
		response.pipe(file);
		file.on('finish', function(){
			DOWNLOAD_COMPLETE = true;
			if (nomedoarquivo !== APP_PATH + '\\App\\check.r3ditor'){
		  		addLog('log', 'INFO - Download Complete! - ' + nomedoarquivo);
		  		scrollLog();
			}
    	});
	});
}
/* 
	Utils
*/
/// Get file names
function getFileName(file){
	var fileName = file.toLowerCase();
	var removePath = fileName.split(/(\\|\/)/g).pop();
	var filter = removePath.replace('.rdt', '').replace('.txt', '').replace('.msg', '').replace('.sav', '').replace('.exe', '').replace('.ini', '').replace('.r3ditor', '').replace('.rdtmap', '').replace('.tim', '').replace('.r3timmap', '').replace('.sld', '').replace('.rbj', '')
	return filter;
}
/// Formata valores hex para leitura interna
function solveHEX(hex){
	var res = hex.replace(new RegExp(' ', 'g'), '');
	var fin = res.toLowerCase();
	return fin;
}
/// Obter Dia, Data e Hora
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
		addLog('log', '<font class="none" id="special_msg" title="' + atob(special_day_00) + '" style="text-shadow: 0 0 16px #fff;"><i>' + atob(special_day_00) + '</i></font>');
		if (DESIGN_ENABLE_ANIMS === true){
			$('#special_msg').fadeIn({duration: 2200, queue: false});
		} else {
			$('#special_msg').css({'display': 'inline'});
		}
		scrollLog();
	}
	if (m === 10 && d === 1 && e_e === 0){
		e_e++;
		addLog('log', '<font class="none" id="special_msg" title="' + atob(special_day_01) + '" style="text-shadow: 0 0 16px #fff;"><i>' + atob(special_day_01) + '</i></font>');
		if (DESIGN_ENABLE_ANIMS === true){
			$('#special_msg').fadeIn({duration: 2200, queue: false});
		} else {
			$('#special_msg').css({'display': 'inline'});
		}
		scrollLog();
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
/// IndexOf com multiplas ocorrÍcias
function getAllIndexes(arr, val){
	if (arr !== null && val !== null || arr !== undefined && val !== undefined){
    	var indexes = [], i = -1;
    	while ((i = arr.indexOf(val, i+1)) != -1){
    	    indexes.push(i);
    	}
    	return indexes;
	} else {
		console.error('ERROR - Invalid arguments on getAllIndexes!');
		addLog('error', 'ERROR - Invalid arguments on getAllIndexes!');
	}
	scrollLog();
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
			que o R3ditor n„o pense que o player esteja vivo.
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
	if (mode == 0){
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
	return Math.floor((current / maximum) * 100);
}
function parsePercentageReverse(percent, maximum){
	return parseFloat((percent * maximum) / 100);
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
	// RDT
	if (loadForm === 6){
		$('#loadRDTForm').trigger('click');
	}
	// TIM - Seek Pattern
	if (loadForm === 7){
		$('#loadTIMForm').trigger('click');
	}
	// TIM - TIM Map
	if (loadForm === 8){
		$('#loadTimMapForm').trigger('click');
	}
	// TIM - TIM To Patch
	if (loadForm === 9){
		$('#loadTimForPatchForm').trigger('click');
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
	// TIM - Seek for Patch
	if (input === 7){
		cFile = document.getElementById('loadTIMForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'TIM - Seek For Patch';
		} else {
			TIM_arquivoBruto = undefined;
			TIM_loadTimToSeekPattern(cFile.path);
			document.getElementById('loadTIMForm').value = '';
		}
	}
	// TIM - Map File
	if (input === 8){
		cFile = document.getElementById('loadTimMapForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'TIM - Map File';
		} else {
			TIM_mapFile = [];
			TIM_openPatchFile(cFile.path);
			document.getElementById('loadTimMapForm').value = '';
		}
	}
	// TIM - File to be patched
	if (input === 9){
		cFile = document.getElementById('loadTimForPatchForm').files[0];
		if (cFile.path === null || cFile.path === undefined || cFile.path === ''){
			loadCancel = true;
			loadType = 'TIM - File To Patch';
		} else {
			TIM_arquivoBruto = undefined;
			TIM_verifyToPatchFile(cFile.path);
			document.getElementById('loadTimForPatchForm').value = '';
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
	if (BETA === true){
		BETA = false;
	}
	if (loadCancel === true){
		addLog('warn', 'WARN - Load ' + loadType + ' - Load Cancelled');
	}
	scrollLog();
}