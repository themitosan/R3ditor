/*
	R3ditor - MEMORY_JS.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Hullo Hullo!
	
	Node escrito por Rob-- (https://github.com/Rob--)
	Pagina oficial do memoryjs: https://github.com/Rob--/memoryjs
*/

var MEM_JS_canRender = false;
var RE3_LIVE_RENDER_TIME = 50;

var REALTIME_X_Pos = '0000';
var REALTIME_Y_Pos = '0000';
var REALTIME_Z_Pos = '0000';
var REALTIME_R_Pos = '0000';
var REALTIME_CurrentCam = '00';
var REALTIME_CurrentHP = '0000';
var REALTIME_CurrentStage = '00';
var REALTIME_CurrentRDT = '0000';
var REALTIME_CurrentWeapon = '00';
var REALTIME_CurrentRoomNumber = '00';
//
var PREV_INVENT = '';
//

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
		// Inventory
		var SLOT_1_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622A4, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_1_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622A5, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_1_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622A6, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_1_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622A7, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622A8, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622A9, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622AA, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622AB, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622AC, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622AD, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622AE, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622AF, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B0, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B1, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B2, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B3, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B4, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B5, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B6, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B7, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B8, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622B9, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622BA, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622BB, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622BC, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622BD, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622BE, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622BF, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C0, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C1, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C2, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C3, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C4, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C5, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C6, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C7, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_HEX = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C8, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_QNT = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622C9, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_ATR = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622CA, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_NUL = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, 0xA622CB, MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		localStorage.setItem('REALTIME_INVENT_SLOT_1', SLOT_1_ITEM_HEX  + SLOT_1_ITEM_QNT  + SLOT_1_ITEM_ATR  + SLOT_1_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_2', SLOT_2_ITEM_HEX  + SLOT_2_ITEM_QNT  + SLOT_2_ITEM_ATR  + SLOT_2_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_3', SLOT_3_ITEM_HEX  + SLOT_3_ITEM_QNT  + SLOT_3_ITEM_ATR  + SLOT_3_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_4', SLOT_4_ITEM_HEX  + SLOT_4_ITEM_QNT  + SLOT_4_ITEM_ATR  + SLOT_4_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_5', SLOT_5_ITEM_HEX  + SLOT_5_ITEM_QNT  + SLOT_5_ITEM_ATR  + SLOT_5_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_6', SLOT_6_ITEM_HEX  + SLOT_6_ITEM_QNT  + SLOT_6_ITEM_ATR  + SLOT_6_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_7', SLOT_7_ITEM_HEX  + SLOT_7_ITEM_QNT  + SLOT_7_ITEM_ATR  + SLOT_7_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_8', SLOT_8_ITEM_HEX  + SLOT_8_ITEM_QNT  + SLOT_8_ITEM_ATR  + SLOT_8_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_9', SLOT_9_ITEM_HEX  + SLOT_9_ITEM_QNT  + SLOT_9_ITEM_ATR  + SLOT_9_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_10', SLOT_10_ITEM_HEX + SLOT_10_ITEM_QNT + SLOT_10_ITEM_ATR + SLOT_10_ITEM_NUL);
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
		if (DEBUG_LOCKRENDER === false){
			RE3_LIVE_RENDER();
		}
	} else {
		RE3_LIVE_closeForm();
	}
}
function RE3_LIVE_cheatInfiniteLife(){
	if (DEBUG_LOCKRENDER === false && PROCESS_OBJ !== undefined && RE3_RUNNING === true && MEM_JS_canRender === true){
		if (REALTIME_CurrentHP.toLowerCase() !== 'c800'){
			MEM_JS.writeMemory(PROCESS_OBJ.handle, 0xA5CE00, 200, MEM_JS.BYTE);
			MEM_JS.writeMemory(PROCESS_OBJ.handle, 0xA5CE01, 0, MEM_JS.BYTE);
		}
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