/*
	R3ditor - index.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/
var BETA = false;
var fs = undefined;
var internal_version = 3;
var APP_PATH = undefined;
var STATUS = "Undefined";
var arquivoBruto = undefined;
var DOWNLOAD_COMPLETE = true;
var APP_VERSION = "0.2.3 [BETA]";
var EXTERNAL_APP_RUNNING = false;
var ORIGINAL_FILENAME = undefined;
var APP_NAME = "R3ditor V." + APP_VERSION;

window.onload = function(){
	load();
}

function load(){
	localStorage.clear();
	console.info(APP_NAME);
	addLog("log", APP_NAME);
	document.title = APP_NAME;
	$("#app_version").html(APP_VERSION);
	request_render_save = false;
	log_separador();
	try{
		fs = require('fs');
		APP_PATH = process.cwd();
		checkFolders();
	} catch(err){
		console.error(err);
		addLog('error', 'ERROR: Unable to use "require" or "process"... Wait... This is Chrome or Firefox?');
		addLog('error', 'ERROR: This is not Node-Webkit! ÕwÕ');
		addLog('error', err);
	}
}

function checkFolders(){
	if (fs.existsSync(APP_PATH + "\\Backup") == false){
		fs.mkdirSync(APP_PATH + "\\Backup");
	}
	if (fs.existsSync(APP_PATH + "\\Backup\\SAV") == false){
		fs.mkdirSync(APP_PATH + "\\Backup\\SAV");
	}
	if (fs.existsSync(APP_PATH + "\\Backup\\RDT") == false){
		fs.mkdirSync(APP_PATH + "\\Backup\\RDT");
	}
	if (fs.existsSync(APP_PATH + "\\MSG") == false){
		fs.mkdirSync(APP_PATH + "\\MSG");
	}
	if (fs.existsSync(APP_PATH + "\\Update") == false){
		fs.mkdirSync(APP_PATH + "\\Update");
	}
	if (fs.existsSync(APP_PATH + "\\Update\\Extract") == true){
		deleteFolderRecursive(APP_PATH + "\\Update\\Extract");
	}
	if (fs.existsSync(APP_PATH + "\\Update\\master.zip") === true){
		fs.unlinkSync(APP_PATH + "\\Update\\master.zip");
	}
	if (fs.existsSync(APP_PATH + "\\App\\check.r3ditor") === true){
		fs.unlinkSync(APP_PATH + "\\App\\check.r3ditor");
	}
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

// Notifica?es Desktop
function showNotify(titulo, texto, tempo){
	if (titulo == ""){
		titulo = "R3ditor - Notification";
	}
	if (texto == "") {
		texto = "Message";
	}
	try{
		var iconPath = process.execPath.replace("nw.exe", "App\\img\\logo.png");
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
	return filterF;
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

/// IndexOf com multiplas ocorr?cias
function getAllIndexes(arr, val){
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

/// Formata valores hex para leitura interna
function solveHEX(hex){
	var res = hex.replace(new RegExp(" ", 'g'), "");
	var fin = res.toLowerCase();
	return fin;
}

/// Fun?o WIP
function WIP(){
	addLog('warn', "Sorry buddy... #WIP");
	scrollLog();
}

function runExternalSoftware(exe, args){
	EXTERNAL_APP_RUNNING = true;
	const { spawn } = require('child_process');
	if (args === undefined || args === null){
		args = [''];
	}
	const ls = spawn(exe, args);
	ls.stdout.on('data', (data) => {
		addLog('log', "External App: " + data);
		scrollLog();
	});
	ls.stderr.on('data', (data) => {
		addLog('log', "External App: " + data);
		scrollDownLog();
	});
	ls.on('close', (code) => {
		EXTERNAL_APP_RUNNING = false;
		if (exe !== "cmd"){
			addLog('log', 'External App: The application was finished with exit code ' + code) + '.';
			scrollLog();
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

/*

	Update

*/
function checkForUpdates(){
	R3DITOR_downloadFile("https://raw.githubusercontent.com/themitosan/R3ditor/master/version.r3ditor", APP_PATH + "\\App\\check.r3ditor");
	var wait = setInterval(function(){
		if (DOWNLOAD_COMPLETE === true){
			R3DITOR_readUpdate(APP_PATH + "\\App\\check.r3ditor");
			clearInterval(wait);
		}
	}, 50);
}

function R3DITOR_readUpdate(file){
	var update_info = [];
	if (file === undefined || file === null){
		addLog('warn', "Unable to read update info!");
	} else {
		fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
			update_info.push(line); 
		});
		if (parseInt(update_info[0]) !== internal_version){
			document.getElementById('new_version').innerHTML = update_info[1];
			document.getElementById('new_version_title').innerHTML = update_info[2];
			document.getElementById('updates_info').innerHTML = "<ul>" + update_info[3] + "</ul>";
			addLog('log', 'INFO - There is a new version of R3ditor avaliable! - Version: ' + update_info[1]);
			R3DITORshowUpdate();
		} else {
			addLog('log', 'INFO - You are using the latest version of R3ditor. (Version: ' + APP_VERSION + ")");
			R3DITORcloseUpdate();
		}
	}
	scrollLog();
}

function R3DITOR_applyUpdate(){
	R3DITORshowUpdateProgress();
	if (fs.existsSync(APP_PATH + "\\App\\check.r3ditor") === true){
		fs.unlinkSync(APP_PATH + "\\App\\check.r3ditor");
	}
	R3DITOR_movePercent(1, "Downloading \"Master\" branch from GitHub...");
	R3DITOR_downloadFile("https://codeload.github.com/themitosan/R3ditor/zip/master", APP_PATH + "\\Update\\master.zip");
	var timer = setInterval(function(){
		if (DOWNLOAD_COMPLETE === true){
			clearInterval(timer);
			R3DITOR_movePercent(15, "Download Complete!");
			R3DITOR_update_0();
		}
	}, 50);
}

function R3DITOR_update_0(){
	clearInterval(timer);
	if (fs.existsSync(APP_PATH + "\\Update\\master.zip") === true){
		R3DITOR_movePercent(20, "Extracting Package...");
		runExternalSoftware(APP_PATH + "\\App\\tools\\7za.exe", ["x", APP_PATH + "\\Update\\master.zip", "-o" + APP_PATH + "\\Update\\Extract", "-aoa"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				R3DITOR_movePercent(25, "Extract OK!");
				R3DITOR_update_1();
			}
		}, 50);
	} else {
		addLog('error', 'ERROR: Something went wrong! - The download files was not found!');
		scrollLog();
	}
}

function R3DITOR_update_1(){
	R3DITOR_movePercent(26, "Removing zip file...");
	fs.unlinkSync(APP_PATH + "\\Update\\master.zip");
	R3DITOR_movePercent(40, "Removing old files...");
	deleteFolderRecursive(APP_PATH + "\\App");
	var timer = setInterval(function(){
		if (EXTERNAL_APP_RUNNING === false){
			clearInterval(timer);
			R3DITOR_update_2();
		}
	}, 50);
}

function R3DITOR_update_2(){
	if (fs.existsSync(APP_PATH + "\\App") == false){
		fs.mkdirSync(APP_PATH + "\\App");
		R3DITOR_movePercent(50, "Moving the new files...");
		runExternalSoftware("cmd", ["/C", "xcopy", APP_PATH + "\\Update\\Extract\\R3ditor-master\\App\\*", APP_PATH + "\\App\\", '/h', '/i', '/c', '/k', '/e', '/r', '/y']);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				R3DITOR_update_3();
			}
		}, 50);
	} else {
		addLog('error', 'UPDATE - Something went wrong! - The old files still there! - let\'s try again...');
		R3DITOR_applyUpdate();
		scrollLog();
	}
}

function R3DITOR_update_3(){
	clearInterval(timer);
	R3DITOR_movePercent(75, "Cleaning some files...");
	deleteFolderRecursive(APP_PATH + "\\Update");
	var timer = setInterval(function(){
		if (EXTERNAL_APP_RUNNING === false){
			clearInterval(timer);
			R3DITOR_update_4();
		}
	}, 50);
}

function R3DITOR_update_4(){
	R3DITOR_movePercent(100, "Update Ok!");
	document.title = APP_NAME + " - Update Ok!";
	$("#img-logo").fadeOut({duration: 2000, queue: false});
	$("#btn_update_ok").fadeIn({duration: 500, queue: false});
	$("#progress_window").css({"top": "528px", "height": "74px"});
	addLog('log', 'INFO - Click on Reload App to apply changes!');
	scrollLog();
}

/*

	Triggers

*/

/// Save
function triggerLoadSAVE(){
	$("#loadSaveForm").trigger('click');
}

function setLoadSaveFile(){
	var cFile = document.getElementById('loadSaveForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		if (BETA == true){
			addLog("log", "Sav -: Load Canceled!");
		}
	} else {
		SAVE_arquivoBruto = undefined;
		CARREGAR_SAVE(cFile.path);
	}
}

/// MSG
function triggerLoadMSG(){
	$("#loadMSGForm").trigger('click');
}

function setLoadMSGFile(){
	var cFile = document.getElementById('loadMSGForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		if (BETA == true){
			addLog("log", "MSG - Load Canceled!");
		}
	} else {
		MSG_arquivoBruto = undefined;
		MSG_CARREGAR_ARQUIVO(cFile.path);
	}
}

/// RDT
function triggerLoadRDT(){
	$("#loadRDTForm").trigger('click');
}

function setLoadRDTFile(){
	var cFile = document.getElementById('loadRDTForm').files[0]
	if (cFile.path === null || cFile.path === undefined || cFile.path === ""){
		if (BETA == true){
			addLog("log", "RDT - Load Canceled!");
		}
	} else {
		RDT_arquivoBruto = undefined;
		RDT_CARREGAR_ARQUIVO(cFile.path);
	}
}