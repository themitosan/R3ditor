/*
	R3ditor - index.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/
var e_e = 0;
var BETA = false;
var fs = undefined;
var RE3_RUNNING = false;
var STATUS = "Undefined";
var APP_PATH = undefined;
var EXTERNAL_APP_PID = 0;
var HEX_EDITOR = undefined;
var SHOW_EDITONHEX = false;
var DOWNLOAD_COMPLETE = true;
var APP_VERSION = "0.2.9 [BETA]";
var EXTERNAL_APP_RUNNING = false;
var ORIGINAL_FILENAME = undefined;
var APP_NAME = "R3ditor V." + APP_VERSION;
window.onload = function(){
	load();
}
function load(){
	localStorage.clear();
	sessionStorage.clear();
	addLog("log", APP_NAME);
	log_separador();
	console.info(APP_NAME);
	document.title = APP_NAME;
	$("#app_version").html(APP_VERSION);
	request_render_save = false;
	currentTime();
	try{
		fs = require('fs');
		APP_PATH = process.cwd();
		checkFolders();
		WZ_verifyConfigFile();
	} catch(err){
		console.error(err);
		$("#img-logo").fadeOut({duration: 2200, queue: false});
		document.title = "Hey - What you are trying to do?";
		addLog('warn', 'WARN - Unable to use "require" or "process"... Wait... This is Chrome or Firefox?');
		addLog('error', 'ERROR - This is not Node-Webkit / NW.js! “w”');
		addLog('error', 'ERROR - To run this software properly, download <a href="http://nwjs.io/" target="_blank">Node-Webkit</a> and place all the files on extracted folder!');
		log_separador();
		addLog('error', err);
	}
	if (BETA === true){
		console.error("ERROR - BETA is true!");
		addLog('error', 'BETA is true!');
	}
	scrollLog();
}
function checkFolders(){
	if (fs.existsSync(APP_PATH + "\\MSG") == false){
		fs.mkdirSync(APP_PATH + "\\MSG");
	}
	if (fs.existsSync(APP_PATH + "\\Update") == false){
		fs.mkdirSync(APP_PATH + "\\Update");
	}
	if (fs.existsSync(APP_PATH + "\\Backup") == false){
		fs.mkdirSync(APP_PATH + "\\Backup");
	}
	if (fs.existsSync(APP_PATH + "\\Assets") == false){
		fs.mkdirSync(APP_PATH + "\\Assets");
	}
	if (fs.existsSync(APP_PATH + "\\Configs") == false){
		fs.mkdirSync(APP_PATH + "\\Configs");
	}
	if (fs.existsSync(APP_PATH + "\\README.md") == true){
		fs.unlinkSync(APP_PATH + "\\README.md");
	};
	if (fs.existsSync(APP_PATH + "\\Roadmap.md") == true){
		fs.unlinkSync(APP_PATH + "\\Roadmap.md");
	};
	if (fs.existsSync(APP_PATH + "\\Backup\\SAV") == false){
		fs.mkdirSync(APP_PATH + "\\Backup\\SAV");
	}
	if (fs.existsSync(APP_PATH + "\\Backup\\RDT") == false){
		fs.mkdirSync(APP_PATH + "\\Backup\\RDT");
	}
	if (fs.existsSync(APP_PATH + "\\Configs\\RDT") == false){
		fs.mkdirSync(APP_PATH + "\\Configs\\RDT");
	}
	if (fs.existsSync(APP_PATH + "\\Update\\Extract") == true){
		deleteFolderRecursive(APP_PATH + "\\Update\\Extract");
	}
	if (fs.existsSync(APP_PATH + "\\Update\\master.zip") === true){
		fs.unlinkSync(APP_PATH + "\\Update\\master.zip");
	}
	if (fs.existsSync(APP_PATH + "\\App\\Update\\check.r3ditor") === true){
		fs.unlinkSync(APP_PATH + "\\App\\Update\\check.r3ditor");
	}
	if (fs.existsSync(APP_PATH + "\\version.r3ditor") == true && BETA === false){
		fs.unlinkSync(APP_PATH + "\\version.r3ditor");
	};
}
/// Log
function addLog(type, texto){
	var classe = undefined;
	if (type.toLowerCase() == "log" || type == undefined || type == null){
		classe = "log-text";
	}
	if (type.toLowerCase() == "warn"){
		classe = "log-warn";
	}
	if (type.toLowerCase() == "error"){
		classe = "log-error";
	}
	var logTemplate = '<div class="' + classe + '">' + texto + '</div>';
	$("#log-programa").append(logTemplate);
}
function clearInternalLog(){
	document.getElementById("log-programa").innerHTML = "";
	addLog("log", APP_NAME);
	scrollLog();
}
/// Open in Hex Editor
function openFileOnHex(file){
	main_closeFileList();
	if (HEX_EDITOR !== undefined || HEX_EDITOR !== ""){
		if (file !== undefined || file !== "" || fs.existsSync(file) !== false || file !== APP_PATH + "\\undefined"){
			runExternalSoftware(HEX_EDITOR, [file]);
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
	if (titulo == ""){
		titulo = "R3ditor - Notification";
	}
	if (texto == "") {
		texto = "Message";
	}
	if (tempo === null || tempo === undefined || tempo === ""){
		tempo = 4000;
	}
	try{	
		var iconPath = APP_PATH + "\\App\\img\\logo.png";
		var NOTIFY = new Notification(titulo, {
			icon: iconPath,
			body: texto,
		});
		setTimeout(NOTIFY.close.bind(NOTIFY), tempo);
	}
	catch(err){
		if (DEBUG == true){
			console.error('(Notification) ERROR: ' + err);
			addLog('error', '(Notification) ERROR: ' + err);
		}
	}
}
/// RUN RE3
function R3DITOR_RUN_RE3(mode){
	main_closeFileList();
	if (EXEC_BIO3_original === undefined || EXEC_BIO3_original === "" || GAME_PATH === "" || GAME_PATH === undefined){
		addLog('error', 'ERROR - The game path is not defined!');
		console.error("ERROR - The game path is not defined!");
	} else {
		try{
			R3DITOR_RUNGAME(0);
			if (WZ_showWizard === true){
				$("#WZ_BTN_2").css({"display": "none"});
				var msg = " - TESTING Resident Evil 3 / Biohazard 3...";
				document.title = APP_NAME + msg;
				addLog('log', "INFO" + msg);
			} else {
				RE3_RUNNING = true;
				var msg = " - RUNNING Resident Evil 3 / Biohazard 3...";
				document.title = APP_NAME + msg;
				addLog('log', "INFO" + msg);
			}
			if (mode === 0){
				process.chdir(GAME_PATH);
			} else {
				process.chdir(APP_PATH + "\\Assets");
			}
			runExternalSoftware(EXEC_BIO3_original);
		} catch (err) {
			if (WZ_showWizard === true){
				$("#WZ_BTN_2").css({"display": "inline"});
			}
			console.error("ERROR - Something went wrong! - " + err);
			addLog('error', 'ERROR - Something went wrong! - ' + err);
		}
	}
	scrollLog();
}
function R3DITOR_RUN_MERCE(mode){
	main_closeFileList();
	if (EXEC_BIO3_MERCE === undefined || EXEC_BIO3_MERCE === "" || GAME_PATH === "" || GAME_PATH === undefined){
		addLog('error', 'ERROR - The game path is not defined!');
		console.error("ERROR - The game path is not defined!");
	} else {
		try{
			R3DITOR_RUNGAME(0);
			RE3_RUNNING = true;
			if (mode === 0){
				process.chdir(GAME_PATH);
			} else {
				process.chdir(APP_PATH + "\\Assets");
			}
			document.title = APP_NAME + " - RUNNING Mercenaries...";
			runExternalSoftware(EXEC_BIO3_MERCE);
		}catch(err){
			if (WZ_showWizard === true){
				$("#WZ_BTN_2").css({"display": "inline"});
			}
			console.error("ERROR - Something went wrong! - " + err);
			addLog('error', 'ERROR - Something went wrong! - ' + err);
		}
	}
	scrollLog();
}
// Remover pastas recursivamente
function deleteFolderRecursive(path){
	runExternalSoftware("cmd", ["/C", "rd", "/s", "/q", path]);
};
/// Obter nome do arquivo
function getFileName(file){
	var fileName = file.toLowerCase();
	var removePath = fileName.split(/(\\|\/)/g).pop();
	var filterA = removePath.replace(".rdt", "");
	var filterB = filterA.replace(".txt", "");
	var filterC = filterB.replace(".msg", "");
	var filterD = filterC.replace(".sav", "");
	var filterE = filterD.replace(".exe", "");
	var filterF = filterE.replace(".ini", "");
	var filterG = filterF.replace(".r3ditor", "");
	return filterG;
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
		addLog('log', '<font class="none" id="special_msg"><i>' + atob(special_day) + '</i></font>');
		$("#special_msg").fadeIn({duration: 2200, queue: false});
		scrollLog();
	}
	if (d.toString().length < 2){
		d = "0" + t.getDate();
	}
	if (m.toString().length < 2){
		m = "0" + parseInt(t.getMonth() + 1);
	}
	if (h.toString().length < 2){
		h = "0" + t.getHours(); 
	}
	if (mi.toString().length < 2){
		mi = "0" + t.getMinutes(); 
	}
	if (s.toString().length < 2){
		s = "0" + t.getSeconds();
	}
	return d + "-" + m + "-" + y + "_" + h + "." + mi + "." + s;
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
		console.error("ERROR - Invalid arguments on getAllIndexes!");
	}
}
/// Formata valores hex para leitura interna
function solveHEX(hex){
	var res = hex.replace(new RegExp(" ", 'g'), "");
	var fin = res.toLowerCase();
	return fin;
}
/// Function  WIP
function WIP(){
	addLog('warn', "Sorry buddy... #WIP");
	scrollLog();
}
function killExternalSoftware(){
	if (EXTERNAL_APP_PID !== 0){
		process.kill(EXTERNAL_APP_PID);
	}
}
function runExternalSoftware(exe, args){
	EXTERNAL_APP_RUNNING = true;
	const { spawn } = require('child_process');
	if (args === undefined || args === null){
		args = [''];
	}
	const ls = spawn(exe, args);
	EXTERNAL_APP_PID = ls.pid;
	ls.stdout.on('data', (data) => {
		addLog('log', "External App: " + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollLog();
	});
	ls.stderr.on('data', (data) => {
		addLog('log', "External App: " + data.replace(new RegExp('\n', 'g'), '<br>'));
		scrollDownLog();
	});
	ls.on('close', (code) => {
		EXTERNAL_APP_RUNNING = false;
		EXTERNAL_APP_PID = 0;
		if (WZ_showWizard === true && WZ_lastMenu === 3){
			$("#WZ_BTN_2").css({"display": "inline"});
		}
		if (RE3_RUNNING === true){
			RE3_RUNNING = false;
			R3DITOR_RUNGAME(1);
		}
		document.title = APP_NAME;
		process.chdir(TEMP_APP_PATH);
		if (exe !== "cmd"){
			if (exe === EXEC_BIO3_original || exe === EXEC_BIO3_MERCE){
				addLog('log', 'Resident Evil 3 / Mercenaries - The application was finished with exit code ' + code + '.');
			} else {
				addLog('log', 'External App - The application was finished with exit code ' + code + '.');
			}
			scrollLog();
			return code;
		}
	});
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
			if (nomedoarquivo !== APP_PATH + "\\App\\check.r3ditor"){
		  		addLog('log', 'INFO - Download Complete! - ' + nomedoarquivo);
		  		scrollLog();
			}
    	});
	});
}
function parsePositive(value){
	return value - value - value;
}
function parseHex(value){
	return parseInt(value / 2).toString(16);
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
			primeiraCasa = "0" + primeiraCasa;
		}
		if (segundaCasa.length < 2){
			segundaCasa = "0" + segundaCasa;
		}
		return primeiraCasa + segundaCasa;
	}
}
function processBIO3Vars(hex){
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
}
/*
	Triggers
*/
/// Wizard
function triggerLoadWZ(){
	$("#loadWZForm").trigger('click');
}
function triggerLoadWZHex(){
	$("#loadWZHexForm").trigger('click');
}
function setLoadWIZARDFile(){
	var cFile = document.getElementById('loadWZForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		addLog("log", "Wizard - Load Canceled!");
		scrollLog();
	} else {
		BIO3_original = undefined;
		console.log(cFile.path);
		WZ_LOADRE3(cFile.path);
		document.getElementById('loadWZForm').value = "";
	}
}
function setLoadHexEditorFile(){
	var cFile = document.getElementById('loadWZHexForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		addLog("log", "Wizard (HEX) - Load Canceled!");
		scrollLog();
	} else {
		HEX_EDITOR = undefined;
		console.log(cFile.path);
		WZ_LOADHEX(cFile.path);
		document.getElementById('loadWZHexForm').value = "";
	}
}
/// Save
function triggerLoadSAVE(){
	$("#loadSaveForm").trigger('click');
}
function setLoadSaveFile(){
	var cFile = document.getElementById('loadSaveForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		addLog("log", "Save - Load Canceled!");
		scrollLog();
	} else {
		SAVE_arquivoBruto = undefined;
		CARREGAR_SAVE(cFile.path);
		document.getElementById('loadSaveForm').value = "";
	}
}
/// MSG
function triggerLoadMSG(){
	$("#loadMSGForm").trigger('click');
}
function setLoadMSGFile(){
	var cFile = document.getElementById('loadMSGForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		addLog("log", "MSG - Load Canceled!");
		scrollLog();
	} else {
		MSG_arquivoBruto = undefined;
		MSG_CARREGAR_ARQUIVO(cFile.path);
		document.getElementById('loadMSGForm').value = "";
	}
}
/// RDT
function triggerLoadRDT(){
	$("#loadRDTForm").trigger('click');
}
function setLoadRDTFile(){
	var cFile = document.getElementById('loadRDTForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		addLog("log", "RDT - Load Canceled!");
		scrollLog();
	} else {
		if (BETA === true){
			BETA = false;
		}
		RDT_arquivoBruto = undefined;
		RDT_CARREGAR_ARQUIVO(cFile.path);
		document.getElementById('loadRDTForm').value = "";
	}
}