/*
	R3ditor - MEMORY_JS.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Hullo Hullo!
	
	Node escrito por Rob-- (https://github.com/Rob--)
	Pagina oficial do memoryjs: https://github.com/Rob--/memoryjs
*/

var MEM_JS_canRender = false;
var RE3_LIVE_RENDER_TIME = 50;

var REALTIME_X_Pos = '????';
var REALTIME_Y_Pos = '????';
var REALTIME_Z_Pos = '????';
var REALTIME_R_Pos = '????';
var REALTIME_CurrentCam = '??';
var REALTIME_CurrentHP = '????';
var REALTIME_CurrentStage = '??';
var REALTIME_CurrentRDT = '????';
var REALTIME_CurrentWeapon = '??';
var REALTIME_CurrentRoomNumber = '??';

function MEMORY_JS_initMemoryJs(){
	var c = 0;
	var PROCESSES = MEM_JS.getProcesses();
	PROCESS_OBJ = undefined;
	while(c < PROCESSES.length){
		if (PROCESSES[c]["szExeFile"] === "ResidentEvil3.exe"){
			var p_info = PROCESSES[c];
			addLog('log', 'INFO - MemoryJS - Load Process: Done! (PID: ' + p_info['th32ProcessID'] + ')');
			PROCESS_OBJ = MEM_JS.openProcess(p_info['th32ProcessID']);
			if (RE3_RUNNING === false){
				EXTERNAL_APP_PID = p_info['th32ProcessID'];
				RE3_RUNNING = true;
				R3DITOR_RUNGAME(0);
			}
			// Some render goes here!
			document.getElementById('RE3_LIVESTATUS_lbl_processHandle').innerHTML = PROCESS_OBJ["handle"];
			document.getElementById('RE3_LIVESTATUS_lbl_processID').innerHTML = PROCESS_OBJ["th32ProcessID"];
			document.getElementById('RE3_LIVESTATUS_lbl_processThreads').innerHTML = PROCESS_OBJ["cntThreads"];
			document.getElementById('RE3_LIVESTATUS_lbl_parentProcessID').innerHTML = PROCESS_OBJ["th32ParentProcessID"];
			document.getElementById('RE3_LIVESTATUS_closeGameBtn').onclick = function(){
				killExternalSoftware(PROCESS_OBJ["th32ProcessID"]);
			}
			R3ditor_enableLiveStatusButton();
			break;
		} else {
			c++;
		}
	}
	scrollLog();
}
function MEMORY_JS_fixVars(input, v){
	var size = parseInt(v);
	if (input !== '' && input !== null){
		while (input.length !== size){
			input = '0' + input;
		}
		return input;
	}
}
function MEMORY_JS_renderInfo(){
	// Running
	if (PROCESS_OBJ !== undefined && RE3_RUNNING === true && MEM_JS_canRender === true){
		// Coordenates
		var X1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD68, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var X2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD69, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Y1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD70, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Y2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD71, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Z1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD6C, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Z2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD6D, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var R1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CDA2, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var R2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CDA3, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		REALTIME_X_Pos			   = X1 + X2;
		REALTIME_Y_Pos			   = Y1 + Y2;
		REALTIME_Z_Pos			   = Z1 + Z2;
		REALTIME_R_Pos			   = R1 + R2;
		// Stage
		REALTIME_CurrentStage 	   = parseInt(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA620E6, MEM_JS.BYTE) + 1).toString();
		REALTIME_CurrentRoomNumber = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA620E8, MEM_JS.BYTE).toString(16), 2).toUpperCase();
		REALTIME_CurrentCam 	   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CD2E, MEM_JS.BYTE).toString(16), 2).toUpperCase();
		REALTIME_CurrentRDT 	   = 'R' + REALTIME_CurrentStage + REALTIME_CurrentRoomNumber;
		// Status
		var HPC8 				   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CE00, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var HP00 				   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA5CE01, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		REALTIME_CurrentWeapon 	   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA623CD, MEM_JS.BYTE).toString(16), 2);
		REALTIME_CurrentHP 		   = HPC8 + HP00;
		// Render all info
		RE3_LIVE_RENDER();
	} else {
		RE3_LIVE_closeForm();
	}
}
function RE3_LIVE_closeForm(){
	MEM_JS_canRender = false;
	clearInterval(RE3_LIVE_RENDERTIMER);
	RE3_LIVE_RENDERTIMER = undefined;
	if (main_currentMenu === undefined){
		$("#menu-topo").css({'top': '32px'});
		$("#menu-utility-aba-2").css({'display': 'inline-block'});
	}
	$("#R3DITOR_RE3_LIVESTATUS").css({"display": "none"});
	scrollLog();
}
function RE3_LIVE_openForm(){
	if (RE3_RUNNING === true){
		main_closeFileList();
		MEM_JS_canRender = true;
		if (main_currentMenu === undefined){
			$("#menu-topo").css({'top': '8px'});
			$("#menu-utility-aba-2").css({'display': 'none'});
		}
		$("#R3DITOR_RE3_LIVESTATUS").css({"display": "block"});
		RE3_LIVE_RENDERTIMER = setInterval(function(){
			MEMORY_JS_renderInfo();
		}, RE3_LIVE_RENDER_TIME);
	} else {
		RE3_LIVE_closeForm();
		R3ditor_disableLiveStatusButton();
	}
}