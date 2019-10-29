/*
	R3ditor - update.js
	Por mitosan/mscore/misto_quente/mscorehdr
	H3LP M3 PL34S3!
*/
var forceUpdat = 0;
var TEST_RELEASE = false;
var internal_version = 13;
var R3DITOR_check_for_updates = false;
function forceUpdate(){
	forceUpdat++;
	main_closeFileList();
	if (forceUpdat > 9){
		fs.writeFileSync(APP_PATH + '\\forceupdate.txt', 'ZmEwNWZjMWQ0ODQzNTE0MTQ5MDA0NjNkMDA0MDQ1NGY0ZjQxMDA0ZDUxNDEwMDUyNGIzZjQxMDA0MTRmNTAzZDAwM2U0MTQ4NGIwMDQ0NGI0NjQxMWJmZTAw', 'utf-8');
		addLog('log', '<font id="hidden_msg" class="none"><i>"Funny... Very Funny... Now get out here, otherwise i\'ll gonna shoot you!" - Evans, RE: Mortal Night.</i></font>');
		if (DESIGN_ENABLE_ANIMS === true){
			$("#img-logo").fadeOut({duration: 2200, queue: false});
			$("#hidden_msg").fadeIn({duration: 2200, queue: false});
		} else {
			$("#img-logo").css({'display': 'none'});
			$("#hidden_msg").css({'display': 'inline'});
		}
		scrollLog();
	}
}
function checkForUpdates(){
	if (navigator.onLine === true){
		R3DITOR_downloadFile('https://raw.githubusercontent.com/themitosan/R3ditor/master/version.r3ditor', APP_PATH + '\\Update\\check.r3ditor');
		var wait = setInterval(function(){
			if (DOWNLOAD_COMPLETE === true){
				R3DITOR_readUpdate(APP_PATH + '\\Update\\check.r3ditor');
				clearInterval(wait);
			}
		}, 50);
	} else {
		addLog('error', 'ERROR - You are offline!');
		scrollLog();
	}
}
function R3DITOR_readUpdate(file){
	var c = 3;
	var update_info = [];
	if (file === undefined || file === null){
		addLog('warn', 'Unable to read update info!');
	} else {
		fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
			update_info.push(line); 
		});
		if (parseInt(update_info[0]) > internal_version || TEST_RELEASE == true){
			if (TEST_RELEASE === true){
			RE3_LIVE_closeForm();
				$("#aplicarUpdate").css({'display': 'none'});
			} else {
				$("#aplicarUpdate").css({'display': 'inline'});
			}
			document.getElementById('new_version').innerHTML = update_info[1];
			document.getElementById('new_version_title').innerHTML = update_info[2];
			if (update_info.length > 3){
				var newHTML = '';
				while (c < update_info.length){
					if (update_info[c] === undefined){
						break;
					}
					newHTML = newHTML + update_info[c];
					c++;
				}
				document.getElementById('updates_info').innerHTML = '<ul>' + newHTML + '</ul>';
			} else {
				document.getElementById('updates_info').innerHTML = '<ul>' + update_info[3] + '</ul>';
			}
			addLog('log', 'INFO - There is a new version of R3ditor avaliable! - Version: ' + update_info[1]);
			R3DITORshowUpdate();
		} else {
			addLog('log', 'INFO - You are using the latest version of R3ditor. (Version: ' + APP_VERSION + ')');
			R3DITORcloseUpdate();
		}
	}
	scrollLog();
}
/// Apply Update
function R3DITOR_applyUpdate(){
	if (navigator.onLine === true){
		R3DITORshowUpdateProgress();
		if (fs.existsSync(APP_PATH + '\\App\\check.r3ditor') === true){
			fs.unlinkSync(APP_PATH + '\\App\\check.r3ditor');
		}
		R3DITOR_movePercent(0, 1, 'Downloading Master branch from GitHub...');
		R3DITOR_downloadFile("https://codeload.github.com/themitosan/R3ditor/zip/master", APP_PATH + '\\Update\\master.zip');
		var timer = setInterval(function(){
			if (DOWNLOAD_COMPLETE === true){
				clearInterval(timer);
				R3DITOR_movePercent(0, 15, 'Download Complete!');
				R3DITOR_update_0();
			}
		}, 50);
	} else {
		document.title = APP_NAME + ' - ERROR!';
		addLog('error', 'ERROR - You are offline!');
		R3DITOR_movePercent(0, 100, 'ERROR - You are offline!');
		addLog('error', 'Check your internet status, Reload R3ditor and try again!');
		if (DESIGN_ENABLE_ANIMS === true){
			$("#btn_update_ok").fadeIn({duration: 200, queue: false});
		} else {
			$("#btn_update_ok").css({'display': 'inline'});
		}
		$("#progress_window").css({'top': '528px', 'height': '74px'});
		scrollLog();
	}
}
function R3DITOR_update_0(){
	clearInterval(timer);
	if (fs.existsSync(APP_PATH + '\\Update\\master.zip') === true){
		R3DITOR_movePercent(0, 20, 'Extracting Package...');
		runExternalSoftware(APP_PATH + "\\App\\tools\\7za.exe", ["x", APP_PATH + "\\Update\\master.zip", "-o" + APP_PATH + "\\Update\\Extract", "-aoa"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				R3DITOR_movePercent(0, 25, 'Extract OK!');
				R3DITOR_update_1();
			}
		}, 50);
	} else {
		addLog('error', 'ERROR: Something went wrong! - The download file was not found!');
		scrollLog();
		R3DITOR_applyUpdate();
	}
}
function R3DITOR_update_1(){
	R3DITOR_movePercent(0, 26, 'Removing zip file...');
	fs.unlinkSync(APP_PATH + '\\Update\\master.zip');
	R3DITOR_movePercent(0, 40, 'Removing old files...');
	deleteFolderRecursive(APP_PATH + '\\App');
	var timer = setInterval(function(){
		if (EXTERNAL_APP_RUNNING === false){
			clearInterval(timer);
			R3DITOR_update_2();
		}
	}, 50);
}
function R3DITOR_update_2(){
	if (fs.existsSync(APP_PATH + '\\App') === false){
		fs.mkdirSync(APP_PATH + '\\App');
		R3DITOR_movePercent(0, 50, 'Moving the new files...');
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
	R3DITOR_movePercent(0, 75, 'Cleaning some files...');
	deleteFolderRecursive(APP_PATH + '\\Update');
	var timer = setInterval(function(){
		if (EXTERNAL_APP_RUNNING === false){
			clearInterval(timer);
			R3DITOR_update_4();
		}
	}, 50);
}
function R3DITOR_update_4(){
	R3DITOR_movePercent(0, 100, 'Update Ok!');
	document.title = APP_NAME + ' - Update Ok!';
	if (DESIGN_ENABLE_ANIMS === true){
		$("#img-logo").fadeOut({duration: 2000, queue: false});
		$("#btn_update_ok").fadeIn({duration: 500, queue: false});
	} else {
		$("#img-logo").css({'display': 'none'});
		$("#btn_update_ok").css({'display': 'inline'});
	}
	$("#progress_window").css({'top': '528px', 'height': '74px'});
	addLog('log', 'INFO - Click on Reload App to apply changes!');
	scrollLog();
}