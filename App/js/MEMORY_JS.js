/*
	R3ditor - MEMORY_JS.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Hullo Hullo!
	
	Plugin para Node.js escrito por Rob-- (https://github.com/Rob--)
	Pagina oficial do memoryjs: https://github.com/Rob--/memoryjs
*/
var MEM_JS_updatePosTimer;
var MEM_JS_canRender = false;
var RE3_LIVE_RENDER_TIME = 80;
var MEM_JS_requreSucess = false;
var REALTIME_renderToolbar = false;

var REALTIME_X_Pos;
var REALTIME_Y_Pos;
var REALTIME_Z_Pos;
var REALTIME_R_Pos;
var REALTIME_CurrentCam = '00';
var REALTIME_CurrentHP = '0000';
var REALTIME_CurrentStage = '00';
var REALTIME_CurrentRDT = '0000';
var REALTIME_CurrentWeapon = '00';
var REALTIME_CurrentRoomNumber = '00';
//
var PREV_INVENT = '';
/*
	Current mod is the version of the game.
	To add support to other versions, increase this number and add the vars in database.js
	The first version is Sourcenext US (Eidos)
*/
var RE3_LIVE_CURRENTMOD = 1;
//
function MEMORY_JS_verifyNodeJsVer(){
	if (process.versions['node-webkit'] === '0.37.4'){
		MEM_JS = require('memoryjs');
		MEM_JS_requreSucess = true;
	} else {
		MEM_JS_requreSucess = false;
		addLog('warn', 'INFO - Your node-webkit version are not compatible with Memory JS! (Your version: ' + process.versions['node-webkit'] + ' - Compatible Version: 0.37.4)');
		addLog('warn', 'INFO - You will not able to use RE3 Live Info!');
	}
	scrollLog();
}
function MEMORY_JS_initMemoryJs(){
	var c = 0;
	var PROCESSES = MEM_JS.getProcesses();
	PROCESS_OBJ = undefined;
	while(c < PROCESSES.length){
		if (PROCESSES[c]['szExeFile'] === 'ResidentEvil3.exe'){
			var p_info = PROCESSES[c];
			addLog('log', 'INFO - MemoryJS - Load Process: Done! (PID: ' + p_info['th32ProcessID'] + ')');
			PROCESS_OBJ = MEM_JS.openProcess(p_info['th32ProcessID']);
			if (RE3_RUNNING === false){
				EXTERNAL_APP_PID = p_info['th32ProcessID'];
				RE3_RUNNING = true;
				R3DITOR_RUNGAME(0);
			}
			// Some render goes here!
			document.getElementById('RE3_LIVESTATUS_lbl_processHandle').innerHTML = PROCESS_OBJ['handle'];
			document.getElementById('RE3_LIVESTATUS_lbl_processID').innerHTML = PROCESS_OBJ['th32ProcessID'];
			document.getElementById('RE3_LIVESTATUS_lbl_processThreads').innerHTML = PROCESS_OBJ['cntThreads'];
			document.getElementById('RE3_LIVESTATUS_lbl_parentProcessID').innerHTML = PROCESS_OBJ['th32ParentProcessID'];
			document.getElementById('RE3_LIVESTATUS_closeGameBtn').onclick = function(){
				killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
			}
			RE3_LIVE_enableDisableToolBar(0);
			R3ditor_enableLiveStatusButton();
			MEM_JS_updatePosTimer = setInterval(function(){
				MEMORY_JS_getPosition();
			}, RE3_LIVE_RENDER_TIME);
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
function MEMORY_JS_getPosition(){
	if (MEM_JS_requreSucess === true && PROCESS_OBJ !== undefined && RE3_RUNNING === true){
		// Stage
		REALTIME_CurrentStage 	   = 		  parseInt(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_Stage'][0], MEM_JS.BYTE) + 1).toString();
		REALTIME_CurrentRoomNumber = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_currentRoomNumber'][0], MEM_JS.BYTE).toString(16), 2).toUpperCase();
		REALTIME_CurrentCam 	   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_currentCam'][0], MEM_JS.BYTE).toString(16), 2).toUpperCase();
		REALTIME_CurrentRDT 	   = 'R' + REALTIME_CurrentStage + REALTIME_CurrentRoomNumber;
		// XYZR
		var X1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_xPosition'][0], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var X2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_xPosition'][1], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Y1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_yPosition'][0], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Y2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_yPosition'][1], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Z1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_zPosition'][0], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var Z2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_zPosition'][1], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var R1 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_rPosition'][0], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var R2 = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_rPosition'][1], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		REALTIME_X_Pos = X1 + X2;
		REALTIME_Y_Pos = Y1 + Y2;
		REALTIME_Z_Pos = Z1 + Z2;
		REALTIME_R_Pos = R1 + R2;
		var NEWPOS = REALTIME_X_Pos + REALTIME_Y_Pos + REALTIME_Z_Pos + REALTIME_R_Pos;
		if (NEWPOS !== RE3_LIVE_POS){
			RE3_LIVE_RENDER_POSITIONS();
			RE3_LIVE_CANVAS_RENDER();
			RE3_LIVE_POS = REALTIME_X_Pos + REALTIME_Y_Pos + REALTIME_Z_Pos + REALTIME_R_Pos;
		}
	}
}
function MEMORY_JS_renderInfo(){
	// Running
	if (MEM_JS_requreSucess === true && PROCESS_OBJ !== undefined && RE3_RUNNING === true && MEM_JS_canRender === true){
		// Inventory
		var SLOT_1_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-1'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_1_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-1'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_1_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-1'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_1_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-1'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-2'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-2'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-2'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_2_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-2'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-3'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-3'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-3'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_3_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-3'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-4'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-4'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-4'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_4_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-4'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-5'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-5'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-5'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_5_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-5'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-6'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-6'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-6'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_6_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-6'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-7'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-7'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-7'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_7_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-7'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-8'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-8'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-8'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_8_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-8'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_HEX  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-9'][0],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_QNT  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-9'][1],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_ATR  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-9'][2],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_9_ITEM_NUL  = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-9'][3],  MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_HEX = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-10'][0], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_QNT = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-10'][1], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_ATR = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-10'][2], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var SLOT_10_ITEM_NUL = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-10'][3], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		localStorage.setItem('REALTIME_INVENT_SLOT_1',  SLOT_1_ITEM_HEX  + SLOT_1_ITEM_QNT  + SLOT_1_ITEM_ATR  + SLOT_1_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_2',  SLOT_2_ITEM_HEX  + SLOT_2_ITEM_QNT  + SLOT_2_ITEM_ATR  + SLOT_2_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_3',  SLOT_3_ITEM_HEX  + SLOT_3_ITEM_QNT  + SLOT_3_ITEM_ATR  + SLOT_3_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_4',  SLOT_4_ITEM_HEX  + SLOT_4_ITEM_QNT  + SLOT_4_ITEM_ATR  + SLOT_4_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_5',  SLOT_5_ITEM_HEX  + SLOT_5_ITEM_QNT  + SLOT_5_ITEM_ATR  + SLOT_5_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_6',  SLOT_6_ITEM_HEX  + SLOT_6_ITEM_QNT  + SLOT_6_ITEM_ATR  + SLOT_6_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_7',  SLOT_7_ITEM_HEX  + SLOT_7_ITEM_QNT  + SLOT_7_ITEM_ATR  + SLOT_7_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_8',  SLOT_8_ITEM_HEX  + SLOT_8_ITEM_QNT  + SLOT_8_ITEM_ATR  + SLOT_8_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_9',  SLOT_9_ITEM_HEX  + SLOT_9_ITEM_QNT  + SLOT_9_ITEM_ATR  + SLOT_9_ITEM_NUL);
		localStorage.setItem('REALTIME_INVENT_SLOT_10', SLOT_10_ITEM_HEX + SLOT_10_ITEM_QNT + SLOT_10_ITEM_ATR + SLOT_10_ITEM_NUL);
		// Status
		var HP_C8 				   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_HP'][0], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		var HP_00 				   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_HP'][1], MEM_JS.BYTE).toString(16).toUpperCase(), 2);
		REALTIME_CurrentWeapon 	   = MEMORY_JS_fixVars(MEM_JS.readMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_currentWeapon'][0], MEM_JS.BYTE).toString(16), 2);
		REALTIME_CurrentHP 		   = HP_C8 + HP_00;
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
			MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_HP'][0], 200, MEM_JS.BYTE);
			MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_HP'][1], 0, MEM_JS.BYTE);
		}
	}
}
function RE3_LIVE_ADDGODHP(){
	if (DEBUG_LOCKRENDER === false && PROCESS_OBJ !== undefined && RE3_RUNNING === true && MEM_JS_canRender === true){
		document.getElementById('RE3_LIVESTATUS_CHEAT_INFHP').checked = false;
		MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_HP'][0], 48, MEM_JS.BYTE);
		MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_HP'][1], 117, MEM_JS.BYTE);
	}
}
function RE3_LIVE_APPLYITEM(slotID){
	if (DEBUG_LOCKRENDER === false && PROCESS_OBJ !== undefined && RE3_RUNNING === true && MEM_JS_canRender === true){
		var quantidade = parseInt(document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_QNT').value);
		if (quantidade === '' || quantidade === NaN){
			quantidade = 1;
		}
		if (quantidade > 255){
			quantidade = 255;
		}
		if (quantidade < 0){
			quantidade = 1;
		}
		var novoItem = parseInt(document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_HEX').value, 16);
		var novoAttr = parseInt(document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_ATTR').value, 16);
		// Apply code to game
		MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-' + slotID][0], novoItem, MEM_JS.BYTE);
		MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-' + slotID][1], quantidade, MEM_JS.BYTE);
		MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-' + slotID][2], novoAttr, MEM_JS.BYTE);
		MEM_JS.writeMemory(PROCESS_OBJ.handle, MEMJS_HEXPOS['RE3_mode_' + RE3_LIVE_CURRENTMOD + '_invent_item-' + slotID][3], 0, MEM_JS.BYTE);
		// After
		$('#RE3_LIVESTATUS_inernalTab_editSlot').css({'display': 'none'});
		$('#RE3_LIVESTATUS_editItemSlot_window').css({'display': 'none'});
	}
}
function RE3_LIVE_COPY_LOCATION(){
	if (RE3_RUNNING === true && PROCESS_OBJ !== undefined){
		var TEXT_FOR_CP = '[CURRENT LOCATION]\nCurrent Map: R' + parseInt(REALTIME_CurrentStage) + REALTIME_CurrentRoomNumber + '.RDT\nX Pos: ' + REALTIME_X_Pos + '\nY Pos: ' + REALTIME_Y_Pos + '\nZ Pos: ' + REALTIME_Z_Pos + '\nR Pos: ' + REALTIME_R_Pos;
		R3DITOR_COPY(TEXT_FOR_CP);
	}
}
/*
	Open and Close
*/
function RE3_LIVE_closeForm(){
	MEM_JS_canRender = false;
	clearInterval(RE3_LIVE_RENDERTIMER);
	RE3_LIVE_RENDERTIMER = undefined;
	if (main_currentMenu === undefined){
		$('#menu-topo').css({'top': '32px'});
		$('#menu-utility-aba-2').css({'display': 'inline-block'});
	}
	$('#R3DITOR_RE3_LIVESTATUS').css({'display': 'none'});
	scrollLog();
}
function RE3_LIVE_openForm(){
	if (RE3_RUNNING === true){
		main_closeFileList();
		if (main_currentMenu === 3){
			RDT_editItemCancel();
		}
		MEM_JS_canRender = true;
		if (main_currentMenu === undefined){
			$('#menu-topo').css({'top': '8px'});
			$('#menu-utility-aba-2').css({'display': 'none'});
		}
		$('#R3DITOR_RE3_LIVESTATUS').css({'display': 'block'});
		RE3_LIVE_RENDERTIMER = setInterval(function(){
			MEMORY_JS_renderInfo();
		}, RE3_LIVE_RENDER_TIME);
	} else {
		RE3_LIVE_closeForm();
		R3ditor_disableLiveStatusButton();
	}
}