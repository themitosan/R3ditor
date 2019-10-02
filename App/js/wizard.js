/*
	R3ditor - wizard.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Isso está indo longe demais!
*/
var EXEC_rofs;
var TEMP_APP_PATH;
var GAME_PATH = "";
var EXEC_BIO3_MERCE;
var WZ_lastMenu = 0;
var EXEC_BIO3_original;
var enable_mod = false;
var WZ_EXTRACTLIST = [];
var WZ_skipRofs = false;
var WZ_showWizard = true;
function WZ_verifyConfigFile(){
	TEMP_APP_PATH = APP_PATH;
	if (fs.existsSync(APP_PATH + "\\Configs\\configs.r3ditor") === false){
		WZ_showWizard = true;
		WZ_showWizardDialog(0);
	} else {
		WZ_showWizard = false;
		WZ_loadFiles(APP_PATH + "\\Configs\\configs.r3ditor");
	}
}
function WZ_showWizardDialog(id){
	WZ_lastMenu = id;
	if (WZ_showWizard === true){
		$("#WZ_dialog").css({"display": "block"});
		if (id === 0){
			$("#img-logo").css({"display": "none"});
			document.getElementById('WZ_title').innerHTML = "Welcome to R3ditor!";
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_0;
			document.getElementById('WZ_BTN_1').value = "No";
			document.getElementById('WZ_BTN_2').value = "Yes";
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
			$("#WZ_BTN_2").css({"display": "none"});
			$("#WZ_progressbar").fadeIn({duration: 500, queue: false});
			document.getElementById('WZ_title').innerHTML = "First Step";
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_1;
			document.getElementById('WZ_BTN_1').value = "Cancel";
			document.getElementById('WZ_BTN_2').value = "Next";
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
			$("#WZ_BTN_2").css({"display": "none"});
			$("#WZ_progressbar").fadeOut({duration: 100, queue: false});
			document.getElementById('WZ_title').innerHTML = "Whoops...";
			if (EXEC_BIO3_original === "Bio3_PC"){
				document.getElementById('WZ_content').innerHTML = WZ_DIALOG_10;
			} else {
				document.getElementById('WZ_content').innerHTML = WZ_DIALOG_2;
			}
			EXEC_BIO3_original = "";
			document.getElementById('WZ_BTN_1').value = "Go Back";
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_showWizardDialog(1);
			};
		}
		// Confirm
		if (id === 3){
			R3DITOR_movePercent(1, 40);
			console.log(GAME_PATH + "\n" + EXEC_BIO3_original);
			GAME_PATH = EXEC_BIO3_original.replace("ResidentEvil3.exe", "");
			$("#WZ_BTN_2").css({"display": "inline"});
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_3;
			document.getElementById('WZ_title').innerHTML = "Great!";
			document.getElementById('WZ_BTN_2').value = "Yes!";
			document.getElementById('WZ_BTN_1').value = "No!";
			document.getElementById('wz_lbl_path').innerHTML = GAME_PATH;
			document.getElementById('WZ_BTN_1').onclick = function(){
				EXEC_BIO3_original = "";
				GAME_PATH = "";
				WZ_showWizardDialog(1);
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				WZ_showWizardDialog(8);
			};
		}
		// Finish Line
		if (id === 4){
			R3DITOR_movePercent(1, 100);
			R3DITOR_movePercent(0, 100, "Done!");
			$("#WZ_BTN_2").css({"display": "none"});
			$("#WZ_BTN_1").css({"display": "inline"});
			$("#progress_window").css({"display": "none"});
			document.getElementById('WZ_BTN_1').value = "Close";
			document.getElementById('WZ_title').innerHTML = "Finish Line!";
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
			$("#WZ_BTN_2").css({"display": "inline"});
			$("#WZ_progressbar").fadeOut({duration: 100, queue: false});
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_5;
			document.getElementById('WZ_title').innerHTML = "Ouch!";
			document.getElementById('WZ_BTN_1').value = "No...";
			document.getElementById('WZ_BTN_2').value = "Try Again";
			document.getElementById('WZ_BTN_2').onclick = function(){
				EXEC_BIO3_original = "";
				EXEC_BIO3_MERCE = "";
				GAME_PATH = "";
				WZ_showWizardDialog(1);
			};
		}
		// Decompile Game
		if (id === 6){
			killExternalSoftware();
			R3DITOR_movePercent(1, 60);
			$("#WZ_BTN_1").css({"display": "inline"});
			$("#WZ_BTN_2").css({"display": "inline"});
			EXEC_rofs = TEMP_APP_PATH + "\\App\\tools\\rofs.exe";
			document.getElementById('WZ_title').innerHTML = "Extract Game Assets";
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_6;
			document.getElementById('WZ_BTN_1').value = "No";
			document.getElementById('WZ_BTN_2').value = "Yes";
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
			document.getElementById('WZ_title').innerHTML = "Extracting Game Assets...";
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_7;
			WZ_STARTFINALPROCESS();
		}
		// Show Hex Editor
		if (id === 8){
			R3DITOR_movePercent(1, 50);
			$("#WZ_BTN_2").css({"display": "none"});
			$("#WZ_BTN_1").css({"display": "inline"});
			document.getElementById('WZ_title').innerHTML = "Open in Hex Editor";
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_8;
			document.getElementById('WZ_BTN_1').value = "Skip";
			document.getElementById('WZ_BTN_2').value = "Yes";
			document.getElementById('WZ_BTN_1').onclick = function(){
				WZ_showWizardDialog(6);
			};
		}
		// Test Hex Editor
		if (id === 9){
			R3DITOR_movePercent(1, 50);
			$("#WZ_BTN_1").css({"display": "inline"});
			$("#WZ_BTN_2").css({"display": "inline"});
			document.getElementById('WZ_title').innerHTML = "Test Hex Editor";
			document.getElementById('WZ_content').innerHTML = WZ_DIALOG_9;
			document.getElementById('WZ_BTN_1').value = "Cancel";
			document.getElementById('WZ_BTN_2').value = "Next";
			document.getElementById('wz_lbl_path_hex').innerHTML = HEX_EDITOR;
			document.getElementById('WZ_BTN_1').onclick = function(){
				SHOW_EDITONHEX = false;
				HEX_EDITOR = "";
				WZ_showWizardDialog(6);
			};
			document.getElementById('WZ_BTN_2').onclick = function(){
				SHOW_EDITONHEX = true;
				WZ_showWizardDialog(6);
			};
		}
	} else {
		$("#WZ_dialog").css({"display": "none"});
		addLog('log', 'WIZARD - Skipping...');
		scrollLog();
	}
}
// Extract game assets process
function WZ_STARTFINALPROCESS(){
	$("#WZ_BTN_1").css({"display": "none"});
	$("#WZ_BTN_2").css({"display": "none"});
	R3DITORshowUpdateProgress();
	R3DITOR_movePercent(1, 62);
	R3DITOR_movePercent(0, 2, "Preparing \"Assets\" Folder...");
	if (fs.existsSync(APP_PATH + "\\Assets") === true){
		deleteFolderRecursive(APP_PATH + "\\Assets");
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_0();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_0();
	}
}
function WZ_EXTRACT_ROFS_0(){
	fs.mkdirSync(APP_PATH + "\\Assets");
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs1.dat") === true){
		R3DITOR_movePercent(1, 66);
		R3DITOR_movePercent(0, 5, "Extracting Rofs1...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs1.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_1();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_1();
	}
}
function WZ_EXTRACT_ROFS_1(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs2.dat") === true){
		R3DITOR_movePercent(1, 70);
		R3DITOR_movePercent(0, 10, "Extracting Rofs2...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs2.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_2();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_2();
	}
}
function WZ_EXTRACT_ROFS_2(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs3.dat") === true){
		R3DITOR_movePercent(1, 72);
		R3DITOR_movePercent(0, 15, "Extracting Rofs3...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs3.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_3();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_3();
	}
}
function WZ_EXTRACT_ROFS_3(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs4.dat") === true){
		R3DITOR_movePercent(1, 74);
		R3DITOR_movePercent(0, 20, "Extracting Rofs4...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs4.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_4();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_4();
	}
}
function WZ_EXTRACT_ROFS_4(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs5.dat") === true){
		R3DITOR_movePercent(1, 76);
		R3DITOR_movePercent(0, 25, "Extracting Rofs5...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs5.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_5();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_5();
	}
}
function WZ_EXTRACT_ROFS_5(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs6.dat") === true){
		R3DITOR_movePercent(1, 78);
		R3DITOR_movePercent(0, 30, "Extracting Rofs6...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs6.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_6();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_6();
	}
}
function WZ_EXTRACT_ROFS_6(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs7.dat") === true){
		R3DITOR_movePercent(1, 80);
		R3DITOR_movePercent(0, 30, "Extracting Rofs7...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs7.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_7();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_7();
	}
}
function WZ_EXTRACT_ROFS_7(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs8.dat") === true){
		R3DITOR_movePercent(1, 82);
		R3DITOR_movePercent(0, 30, "Extracting Rofs8...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs8.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_8();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_8();
	}
}
function WZ_EXTRACT_ROFS_8(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs9.dat") === true){
		R3DITOR_movePercent(1, 84);
		R3DITOR_movePercent(0, 35, "Extracting Rofs9...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs9.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_9();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_9();
	}
}
function WZ_EXTRACT_ROFS_9(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs10.dat") === true){
		R3DITOR_movePercent(1, 86);
		R3DITOR_movePercent(0, 40, "Extracting Rofs10...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs10.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_10();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_10();
	}
}
function WZ_EXTRACT_ROFS_10(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs11.dat") === true){
		R3DITOR_movePercent(1, 88);
		R3DITOR_movePercent(0, 45, "Extracting Rofs11...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs11.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_11();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_11();
	}
}
function WZ_EXTRACT_ROFS_11(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs12.dat") === true){
		R3DITOR_movePercent(1, 90);
		R3DITOR_movePercent(0, 50, "Extracting Rofs12...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs12.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_12();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_12();
	}
}
function WZ_EXTRACT_ROFS_12(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs13.dat") === true){
		R3DITOR_movePercent(1, 92);
		R3DITOR_movePercent(0, 55, "Extracting Rofs13...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs13.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_13();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_13();
	}
}
function WZ_EXTRACT_ROFS_13(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs14.dat") === true){
		R3DITOR_movePercent(1, 94);
		R3DITOR_movePercent(0, 60, "Extracting Rofs14...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs14.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_EXTRACT_ROFS_14();
			}
		}, 50);
	} else {
		WZ_EXTRACT_ROFS_14();
	}
}
function WZ_EXTRACT_ROFS_14(){
	process.chdir(APP_PATH + "\\Assets");
	if (fs.existsSync(GAME_PATH + "Rofs15.dat") === true){
		R3DITOR_movePercent(1, 96);
		R3DITOR_movePercent(0, 65, "Extracting Rofs15...");
		runExternalSoftware(EXEC_rofs, [GAME_PATH + "Rofs15.dat"]);
		var timer = setInterval(function(){
			if (EXTERNAL_APP_RUNNING === false){
				clearInterval(timer);
				WZ_finishExtract();
			}
		}, 50);
	} else {
		WZ_finishExtract();
	}
}
function WZ_finishExtract(){
	R3DITOR_movePercent(1, 97);
	process.chdir(TEMP_APP_PATH);
	R3DITOR_movePercent(0, 75, "Making Configuration File (Bio3.ini) for the extracted version...");
	if (fs.existsSync(GAME_PATH + "Rofs11.dat") === true){
		R3DITOR_movePercent(1, 98);
		R3DITOR_movePercent(0, 80, "Copying Rofs11.dat to Assets folder to enchance compatibility...");
		runExternalSoftware('cmd', ['/C', 'copy', GAME_PATH + "Rofs11.dat", APP_PATH + "\\Assets"]);
		BIO3INI_MAKE_WZINI(1);
	} else {
		R3DITOR_movePercent(1, 98);
		R3DITOR_movePercent(0, 80, "Creating Bio3.ini File...");
		BIO3INI_MAKE_WZINI(0);
	}
	if (fs.existsSync(APP_PATH + "\\Assets\\Save") === false){
		fs.mkdirSync(APP_PATH + "\\Assets\\Save");
	}
	WZ_makeConfigs();
}
function WZ_skip(){
	EXEC_BIO3_original = "";
	SHOW_EDITONHEX = false;
	WZ_showWizard = false;
	EXEC_BIO3_MERCE = "";
	enable_mod = false;
	HEX_EDITOR = "";
	WZ_saveConfigs();
	WZ_loadFiles(APP_PATH + "\\configs.r3ditor");
}
function WZ_LOADRE3(refile){
	var file = getFileName(refile);
	if (file === "residentevil3"){
		EXEC_BIO3_original = refile;
		WZ_showWizardDialog(3);
	} else {
		WZ_showWizardDialog(2);
	}
}
function WZ_LOADHEX(hexExe){
	if (hexExe !== "" || hexExe !== undefined || hexExe !== null){
		HEX_EDITOR = hexExe;
		SHOW_EDITONHEX = true;
		WZ_showWizardDialog(9);
	}
}
function WZ_makeConfigs(){
	EXEC_BIO3_MERCE = "";
	R3DITOR_movePercent(1, 99);
	R3DITOR_movePercent(0, 95, "Creating Configs File...");
	GAME_PATH = EXEC_BIO3_original.replace("ResidentEvil3.exe", "");
	if (fs.existsSync(GAME_PATH + "RE3_MERCE.exe") === true){
		EXEC_BIO3_MERCE = GAME_PATH + "RE3_MERCE.exe";
	}
	if (SHOW_EDITONHEX === false || HEX_EDITOR === undefined){
		HEX_EDITOR = "";
	}
	WZ_saveConfigs();
}
function WZ_saveConfigs(justSave){
	try{
		var CONFIGS = "false\n" + EXEC_BIO3_original + "\n" + EXEC_BIO3_MERCE + "\n" + GAME_PATH + "\n" + enable_mod + "\n" + SHOW_EDITONHEX + "\n" + HEX_EDITOR + "\n" + RDT_lastFileOpened + "\n" + RDT_lastBackup;
		fs.writeFileSync(APP_PATH + "\\Configs\\configs.r3ditor", CONFIGS, 'utf-8');
		if (fs.existsSync(APP_PATH + "\\Configs\\configs.r3ditor" && WZ_showWizard == true && WZ_skipRofs == false)){
			WZ_showWizardDialog(4);
		} else {
			if (justSave === true){
				addLog('log', 'CONFIGS - Configs Saved!');
				scrollLog();
			} else {
				reload();
			}
		}
	} catch(err){
		if (WZ_showWizard === true){
			WZ_showWizardDialog(5);
		}
		addLog('log', 'CONFIGS - Something went wrong! - ' + err);
		console.error(err);
		scrollLog();
	}
}
function WZ_loadFiles(file){
	var cfgs = [];
	process.chdir(TEMP_APP_PATH);
	fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
		cfgs.push(line); 
	});
	R3DITOR_check_for_updates = JSON.parse(cfgs[0]);
	if (cfgs[1] !== undefined){
		EXEC_BIO3_original = cfgs[1];
	} else {
		EXEC_BIO3_original = "";
	}
	if (cfgs[2] !== undefined){
		EXEC_BIO3_MERCE = cfgs[2];
	} else {
		EXEC_BIO3_MERCE = "";
	}
	if (cfgs[3] !== undefined){
		GAME_PATH = cfgs[3];
	} else {
		GAME_PATH = "";
	}
	if (cfgs[4] !== undefined){
		enable_mod = JSON.parse(cfgs[4]);
	} else {
		enable_mod = false;
	}
	if (cfgs[5] !== undefined){
		SHOW_EDITONHEX = JSON.parse(cfgs[5]);
	} else {
		SHOW_EDITONHEX = false;
	}
	if (cfgs[6] !== undefined){
		HEX_EDITOR = cfgs[6];
	} else {
		HEX_EDITOR = "";
	}
	if (cfgs[7] !== undefined){
		RDT_lastFileOpened = cfgs[7];
	} else {
		RDT_lastFileOpened = "";
	}
	if (cfgs[8] !== undefined){
		RDT_lastBackup = cfgs[8];
	} else {
		RDT_lastBackup = "";
	}
	// Visuals
	if (EXEC_BIO3_original !== ""){
		$("#btn_run_bio3").css({"display": "inline"});
		if (HEX_EDITOR !== ""){
			$("#main_openBio3OnHex").css({"display": "inline"});
		}
	}
	if (EXEC_BIO3_MERCE !== ""){
		$("#btn_run_merce").css({"display": "inline"});
		if (HEX_EDITOR !== ""){
			$("#main_openBio3MerceOnHex").css({"display": "inline"});
		}
	}
	if (EXEC_BIO3_MERCE !== "" || EXEC_BIO3_original !== ""){
		$("#menu-topo-MOD").fadeIn({duration: 115, queue: false});
	}
	if (enable_mod === true){
		$("#btn_run_bio3-mod").css({"display": "inline"});
		$("#btn_run_merce-mod").css({"display": "inline"});
	}
	if (fs.existsSync(APP_PATH + "\\forceupdate.txt") == true){
		fs.unlinkSync(APP_PATH + "\\forceupdate.txt");
		$("#menu-topo").css({"display": "none"});
		R3DITOR_applyUpdate();
	} else {
		$("#menu-topo").css({"top": "32px"});
		$("#menu-utility").css({"top": "546px"});
		$("#menu-utility-aba").css({"top": "472px"});
		$("#menu-utility-aba-2").css({"top": "-44px"});
		$("#img-logo").fadeIn({duration: 2000, queue: false});
		$("#menu-topo").fadeIn({duration: 200, queue: false});
		$("#menu-utility").fadeIn({duration: 200, queue: false});
		$("#menu-utility-aba").fadeIn({duration: 200, queue: false});
		$("#menu-utility-aba-2").fadeIn({duration: 200, queue: false});
	}
	if (R3DITOR_check_for_updates === true){
		checkForUpdates();
	}
}