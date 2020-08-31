/*
	R3ditor - RE3SET.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Can you give me a tea? Pleeeeeease! ~wink~ ;)
*/
var RE3SET_iniTab, RE3SET_fName, RE3SET_gameVersion, RE3SET_arquivoBruto, RE3SET_jillHard, RE3SET_carlosHard, RE3SET_jillEasy, RE3SET_carlosEasy, RE3SET_inventoryHex;
// Edit Start Item Vars
var RE3SET_itemStart_currentId, RE3SET_itemStart_currentPlayer, RE3SET_itemStart_currentMode;
// Edit Start Pos. Vars
var RE3SET_startPos_xPos, RE3SET_startPos_yPos, RE3SET_startPos_rPos, RE3SET_startPos_roomNumber, RE3SET_startPos_roomCam;
// Edit Item Desc
var RE3SET_itemDesc_canSave = false;
var RE3SET_itemDesc_origSize = 19872;
var RE3SET_itemDesc_raw, RE3SET_itemDesc_tempWinTitle, RE3SET_itemDesc_totalMsgs;
/*
	Functions
*/
function RE3SET_loadFile(exe, mode){
	sessionStorage.clear();
	ORIGINAL_FILENAME = exe;
	RE3SET_itemStart_showEdit(1);
	RE3SET_fName = getFileName(exe);
	RE3SET_arquivoBruto = fs.readFileSync(exe, 'hex');
	RE3SET_gameVersion = DROP_fileTypes[RE3SET_fName][1];
	var RE3SET_LOADTAB_1 = false;
	var RE3SET_LOADTAB_2 = false;
	var RE3SET_LOADTAB_3 = false;
	// Enable Tabs
	if (RE3SET_gameVersion === 0){ // PC
		RE3SET_iniTab = 1;
		RE3SET_LOADTAB_1 = true;
		RE3SET_LOADTAB_2 = true;
		RE3SET_LOADTAB_3 = true;
	}
	if (RE3SET_gameVersion === 1){ // PS
		RE3SET_iniTab = 1;
		RE3SET_LOADTAB_1 = true;
		RE3SET_LOADTAB_2 = false;
		RE3SET_LOADTAB_3 = true;
		alert('WARN - Due some settings are not set on this file, R3ditor will not be able to edit the following settings:\n\nStarting Map & Pos.');
		LOG_addLog('warn', 'WARN - Due some settings are not set on this file, R3ditor will not be able to edit the following settings: Starting Map & Pos.');
	}
	if (RE3SET_gameVersion === 2){ // GC
		RE3SET_iniTab = 3;
		RE3SET_LOADTAB_1 = false;
		RE3SET_LOADTAB_2 = false;
		RE3SET_LOADTAB_3 = true;
		alert('WARN - Due some settings are not set on this file, R3ditor will not be able to edit the following settings:\n\nStarting Map & Pos.\nItem start');
		LOG_addLog('warn', 'WARN - Due some settings are not set on this file, R3ditor will not be able to edit the following settings: Item start, Start Map & Pos.');
	}
	if (RE3SET_gameVersion === 3){ // DC
		RE3SET_iniTab = 1;
		RE3SET_LOADTAB_1 = true;
		RE3SET_LOADTAB_2 = false;
		RE3SET_LOADTAB_3 = false;
		alert('WARN - Due some settings are not set on this file, R3ditor will not be able to edit the following settings:\n\nStarting Map & Pos.\nItem desc.');
		LOG_addLog('warn', 'WARN - Due some settings are not set on this file, R3ditor will not be able to edit the following settings: Item Desc., Starting Map & Pos.');
	}
	/*
		Tab 1
		Start items
	*/
	if (RE3SET_LOADTAB_1 === true){
		$('#RE3SET-aba-menu-1').removeClass('none');
		RE3SET_inventoryHex = RE3SET_arquivoBruto.slice(RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][0], RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][1]);
		RE3SET_jillHard     = RE3SET_inventoryHex.slice(0, 32).match(/.{8,8}/g);
		RE3SET_carlosHard   = RE3SET_inventoryHex.slice(40, 64).match(/.{8,8}/g);
		RE3SET_jillEasy     = RE3SET_inventoryHex.slice(80, 120).match(/.{8,8}/g);
		RE3SET_carlosEasy   = RE3SET_inventoryHex.slice(128, RE3SET_inventoryHex.length).match(/.{8,8}/g);
		RE3SET_decompileInventory();
	} else {
		$('#RE3SET-aba-menu-1').addClass('none');
	}
	/*
		Tab 2
		Other Settings
	*/
	if (RE3SET_LOADTAB_2 === true){
		$('#RE3SET-aba-menu-2').removeClass('none');
		RE3SET_startPos_xPos 	   = RE3SET_arquivoBruto.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomXpos'][0],   RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomXpos'][1]);
		RE3SET_startPos_yPos  	   = RE3SET_arquivoBruto.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomYpos'][0],   RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomYpos'][1]);
		RE3SET_startPos_rPos  	   = RE3SET_arquivoBruto.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomRpos'][0],   RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomRpos'][1]);
		RE3SET_startPos_roomNumber = RE3SET_arquivoBruto.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomNumber'][0], RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomNumber'][1]);
		RE3SET_startPos_roomCam    = RE3SET_arquivoBruto.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomCam'][0],    RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomCam'][1]);
		RE3SET_showOtherSettingsInfo();
	} else {
		$('#RE3SET-aba-menu-2').addClass('none');
	}
	/*
		Tab 3
		Item Description
	*/
	if (RE3SET_LOADTAB_3 === true){
		$('#RE3SET-aba-menu-3').removeClass('none');
		RE3SET_itemDesc_raw = RE3SET_arquivoBruto.slice(RANGES['RE3SET_' + RE3SET_gameVersion + '_itemInfos'][0], RANGES['RE3SET_' + RE3SET_gameVersion + '_itemInfos'][1]);
		RE3SET_itemDesc_decompileItemDesc();
	} else {
		$('#RE3SET-aba-menu-3').addClass('none');
	}
	/*
		End - Using DROP_fileTypes because it works!
	*/
	LOG_addLog('log', 'RE3SET - File loaded sucessfully! (Mode: ' + DROP_fileTypes[RE3SET_fName][0] + ')');
	LOG_addLog('log', 'RE3SET - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
	if (mode === 0){
		main_menu(12);
		if (RE3SET_gameVersion === 2){
			$('#RE3SET-aba-menu-3').addClass('aba-left-fix');
		} else {
			$('#RE3SET-aba-menu-3').removeClass('aba-left-fix');
		}
		$('#RE3SET-aba-menu-' + RE3SET_iniTab).trigger('click');
	}
	LOG_scroll();
}
/*
	Item Description
*/
function RE3SET_itemDesc_decompileItemDesc(){
	document.getElementById('RE3SET_itemDesc_holder').innerHTML = '';
	var ITEM_DB_DECOMP = RE3SET_itemDesc_raw.match(/.{2,2}/g);
	var ITEM_DB_TOTAL = ITEM_DB_DECOMP.length;
	var TEMP_TEXT_HOLDER = '';
	var c = 0;
	var cItem = c;
	while (c < ITEM_DB_TOTAL){
		if (ITEM_DB_DECOMP[c] !== 'fe'){
			TEMP_TEXT_HOLDER = TEMP_TEXT_HOLDER + ITEM_DB_DECOMP[c];
		} else {
			sessionStorage.setItem('RE3SET_ITEMDESC_' + cItem, TEMP_TEXT_HOLDER);
			RE3SET_itemDesc_appendItemDesc(cItem);
			TEMP_TEXT_HOLDER = '';
			cItem++;
		}
		c++;
	}
	RE3SET_itemDesc_totalMsgs = cItem;
}
function RE3SET_itemDesc_appendItemDesc(id){
	var d = 0;
	var formatHex = '';
	var hex = sessionStorage.getItem('RE3SET_ITEMDESC_' + id);
	var hexMatch = hex.match(/.{2,2}/g);
	var cMessage = MSG_startMSGDecrypt_Lv1(hex);
	while (d < hexMatch.length){
		formatHex = formatHex + hexMatch[d].toUpperCase() + ' ';
		d++;
	}
	var ITEMDESC_HTML_TEMPLATE = '<div class="RDT-Item RDT-msg-bg" id="RE3SET_itemDesc_' + id + '"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" value="Modify" onclick="RE3SET_transferMessageToMsgEdit(' + id + ')">' + 
								 'ID: ' + id + '<br>Message: <div class="RE3SET-message-content">' + cMessage + '</div><div class="menu-separador"></div>Hex: <div class="RE3SET-message-content user-can-select">' + formatHex + '</div></div>';
	// Prevent Last FE 00
	if (id < 150){
		$('#RE3SET_itemDesc_holder').append(ITEMDESC_HTML_TEMPLATE);
	}
}
function RE3SET_itemDesc_updateList(){
	var c = 0;
	document.getElementById('RE3SET_itemDesc_holder').innerHTML = '';
	while (c < RE3SET_itemDesc_totalMsgs){
		RE3SET_itemDesc_appendItemDesc(c);
		c++;
	}
	RE3SET_itemDesc_recompileDB();
}
function RE3SET_itemDesc_recompileDB(){
	var d = 0;
	var tempHex = '';
	while (d < RE3SET_itemDesc_totalMsgs){
		var cHex = sessionStorage.getItem('RE3SET_ITEMDESC_' + d);
		tempHex = tempHex + cHex + 'fe';
		d++;
	}
	tempHex = tempHex + '00';
	var dbPercentage = parsePercentage(tempHex.length, RE3SET_itemDesc_origSize);
	document.getElementById('RE3SET_LBL_itemDesc_totalPercentage').innerHTML = dbPercentage;
	document.getElementById('RE3SET_LBL_itemDesc_topTotalOf').innerHTML = parseInt(tempHex.length).toString(16).toUpperCase();
	document.getElementById('RE3SET_LBL_itemDesc_topTotalSize').innerHTML = parseInt(RE3SET_itemDesc_origSize).toString(16).toUpperCase();
	if (dbPercentage !== 100){
		RE3SET_itemDesc_canSave = false;
		$('#RE3SET_applyItemDesc').css({'display': 'none'});
	} else {
		RE3SET_itemDesc_raw = tempHex;
		RE3SET_itemDesc_canSave = true;
		if (RE3SET_currentMenu === 3){
			$('#RE3SET_applyItemDesc').css({'display': 'inline'});
		}
	}
}
function RE3SET_transferMessageToMsgEdit(msgId){
	var msg_transfer = sessionStorage.getItem('RE3SET_ITEMDESC_' + msgId);
	if (msg_transfer !== null && msg_transfer !== undefined){
		MSG_ID = msgId;
		document.getElementById('RDT_MSG_NUMBER').innerHTML = 'Message ' + parseInt(msgId + 1) + ' - ';
		MSG_startMSGDecrypt_Lv2(msg_transfer);
		RE3SET_TRANSFER_TO_MSG();
	} else {
		LOG_addLog('error', 'RE3SET - ERROR: Unable to read message because it was not found!');
	}
	LOG_scroll();
}
function RE3SET_TRANSFER_TO_MSG(){
	main_closeFileList();
	document.title = APP_NAME + ' - Transfering message...';
	$('#menu-topo-MOD').css({'display': 'none'});
	$('#MSG_openInHex').css({'display': 'none'});
	$('#menu-topo-msg').css({'display': 'block'});
	$('#RDT_MSG_NUMBER').css({'display': 'inline'});
	$('#menu-topo-RE3SET').css({'display': 'none'});
	$('#menu-RE3SET-editor').css({'display': 'none'});
	$('#btn-goback-RE3SET').css({'display': 'inline'});
	$('#MSG_applyMessageRE3SET').css({'display': 'inline'});
	document.getElementById('RDT_MSG-holder').innerHTML = ' ';
	document.getElementById('MSG_saveAs').value = 'Save as MSG';
	MSG_showMenu(1);
	MSG_hideTranslateInput();
	$('#MSG_ADDFUNC_BTN_11').css({'display': 'none'});
	LOG_scroll();
}
function RE3SET_applyItemDesc(){
	if (RE3SET_itemDesc_canSave !== false){
		//console.info(RE3SET_itemDesc_raw);
		RE3SET_RECOMPILE(2, RE3SET_itemDesc_raw);
	}
}
/*
	Start Location
*/
function RE3SET_showOtherSettingsInfo(){
	document.getElementById('RE3SET_EDIT_STARTPOS_XPOS').value       = RE3SET_startPos_xPos;
	document.getElementById('RE3SET_EDIT_STARTPOS_YPOS').value       = RE3SET_startPos_yPos;
	document.getElementById('RE3SET_EDIT_STARTPOS_RPOS').value       = RE3SET_startPos_rPos;
	document.getElementById('RE3SET_EDIT_STARTPOS_ROOMCAM').value    = RE3SET_startPos_roomCam;
	document.getElementById('RE3SET_EDIT_STARTPOS_ROOMNUMBER').value = RE3SET_startPos_roomNumber;
	RE3SET_startPos_updateImgBg();
}
function RE3SET_startPos_applyLiveStatus(){
	if (REALTIME_CurrentStage === '1'){
		document.getElementById('RE3SET_EDIT_STARTPOS_XPOS').value       = REALTIME_X_Pos;
		document.getElementById('RE3SET_EDIT_STARTPOS_YPOS').value       = REALTIME_Y_Pos;
		document.getElementById('RE3SET_EDIT_STARTPOS_RPOS').value       = REALTIME_R_Pos;
		document.getElementById('RE3SET_EDIT_STARTPOS_ROOMCAM').value    = REALTIME_CurrentCam;
		document.getElementById('RE3SET_EDIT_STARTPOS_ROOMNUMBER').value = REALTIME_CurrentRoomNumber;
		RE3SET_startPos_updateImgBg();
	} else {
		LOG_addLog('warn', 'WARN - Unable to set player pos!');
		LOG_addLog('warn', 'WARN - Reason: Only Stage 1 is supported! (Current Stage: ' + REALTIME_CurrentStage + ')');
		LOG_scroll();
	}
}
/*
	Start Items
*/
function RE3SET_decompileInventory(){
	var c = 0;
	var currentHex, IT, QT, AT, SV;
	// Jill Hard
	while (c < RE3SET_jillHard.length){
		currentHex = RE3SET_jillHard[c];
		localStorage.setItem('RE3SET_INVENT_J_H_' + c, currentHex);
		// Decompile Item
		IT = currentHex.slice(0, 2);
		QT = parseInt(currentHex.slice(2, 4), 16);
		AT = currentHex.slice(4, 6);
		SV = currentHex.slice(6, 8); // On SAV, this is the same thing of Null
		if (AT !== '00'){
			$('#RE3SET_LBL_JILL_HARD_' + (c + 1)).css({'display': '-webkit-box', 'color': ATTR[AT][1]});
		} else {
			$('#RE3SET_LBL_JILL_HARD_' + (c + 1)).css({'display': 'none'});
		}
		if (AT !== '02' && AT !== '06' && AT !== '0a' && AT !== '0e' && AT !== '16' && AT !== '13'){
			if (AT !== '03' && AT !== '07' && AT !== '0b' && AT !== '0f' && AT !== '17'){
				document.getElementById('RE3SET_LBL_JILL_HARD_' + (c + 1)).innerHTML = QT;
			} else {
				document.getElementById('RE3SET_LBL_JILL_HARD_' + (c + 1)).innerHTML = 'Inf.';
			}
		} else {
			document.getElementById('RE3SET_LBL_JILL_HARD_' + (c + 1)).innerHTML = QT + '%';
		}
		document.getElementById('RE3SET_IMG_HARD_JILL_' + (c + 1)).title = ITEM[IT][0];
		document.getElementById('RE3SET_IMG_HARD_JILL_' + (c + 1)).src = APP_PATH + '\\App\\img\\items\\' + IT + '.png';
		c++;
	}
	// Carlos Hard
	c = 0;
	while (c < RE3SET_carlosHard.length){
		currentHex = RE3SET_carlosHard[c];
		localStorage.setItem('RE3SET_INVENT_C_H_' + c, currentHex);
		IT = currentHex.slice(0, 2);
		QT = parseInt(currentHex.slice(2, 4), 16);
		AT = currentHex.slice(4, 6);
		SV = currentHex.slice(6, 8);
		if (AT !== '00'){
			$('#RE3SET_LBL_CARLOS_HARD_' + (c + 1)).css({'display': '-webkit-box', 'color': ATTR[AT][1]});
		} else {
			$('#RE3SET_LBL_CARLOS_HARD_' + (c + 1)).css({'display': 'none'});
		}
		if (AT !== '02' && AT !== '06' && AT !== '0a' && AT !== '0e' && AT !== '16' && AT !== '13'){
			if (AT !== '03' && AT !== '07' && AT !== '0b' && AT !== '0f' && AT !== '17'){
				document.getElementById('RE3SET_LBL_CARLOS_HARD_' + (c + 1)).innerHTML = QT;
			} else {
				document.getElementById('RE3SET_LBL_CARLOS_HARD_' + (c + 1)).innerHTML = 'Inf.';
			}
		} else {
			document.getElementById('RE3SET_LBL_CARLOS_HARD_' + (c + 1)).innerHTML = QT + '%';
		}
		document.getElementById('RE3SET_IMG_HARD_CARLOS_' + (c + 1)).title = ITEM[IT][0];
		document.getElementById('RE3SET_IMG_HARD_CARLOS_' + (c + 1)).src = APP_PATH + '\\App\\img\\items\\' + IT + '.png';
		c++;
	}
	// Jill Easy
	c = 0;
	while (c < RE3SET_jillEasy.length){
		currentHex = RE3SET_jillEasy[c];
		localStorage.setItem('RE3SET_INVENT_J_E_' + c, currentHex);
		IT = currentHex.slice(0, 2);
		QT = parseInt(currentHex.slice(2, 4), 16);
		AT = currentHex.slice(4, 6);
		SV = currentHex.slice(6, 8);
		if (AT !== '00'){
			$('#RE3SET_LBL_JILL_EASY_' + (c + 1)).css({'display': '-webkit-box', 'color': ATTR[AT][1]});
		} else {
			$('#RE3SET_LBL_JILL_EASY_' + (c + 1)).css({'display': 'none'});
		}
		if (AT !== '02' && AT !== '06' && AT !== '0a' && AT !== '0e' && AT !== '16' && AT !== '13'){
			if (AT !== '03' && AT !== '07' && AT !== '0b' && AT !== '0f' && AT !== '17'){
				document.getElementById('RE3SET_LBL_JILL_EASY_' + (c + 1)).innerHTML = QT;
			} else {
				document.getElementById('RE3SET_LBL_JILL_EASY_' + (c + 1)).innerHTML = 'Inf.';
			}
		} else {
			document.getElementById('RE3SET_LBL_JILL_EASY_' + (c + 1)).innerHTML = QT + '%';
		}
		document.getElementById('RE3SET_IMG_EASY_JILL_' + (c + 1)).title = ITEM[IT][0];
		document.getElementById('RE3SET_IMG_EASY_JILL_' + (c + 1)).src = APP_PATH + '\\App\\img\\items\\' + IT + '.png';
		c++;
	}
	// Carlos Easy
	c = 0;
	while (c < RE3SET_carlosEasy.length){
		currentHex = RE3SET_carlosEasy[c];
		localStorage.setItem('RE3SET_INVENT_C_E_' + c, currentHex);
		IT = currentHex.slice(0, 2);
		QT = parseInt(currentHex.slice(2, 4), 16);
		AT = currentHex.slice(4, 6);
		SV = currentHex.slice(6, 8);
		if (AT !== '00'){
			$('#RE3SET_LBL_CARLOS_EASY_' + (c + 1)).css({'display': '-webkit-box', 'color': ATTR[AT][1]});
		} else {
			$('#RE3SET_LBL_CARLOS_EASY_' + (c + 1)).css({'display': 'none'});
		}
		if (AT !== '02' && AT !== '06' && AT !== '0a' && AT !== '0e' && AT !== '16' && AT !== '13'){
			if (AT !== '03' && AT !== '07' && AT !== '0b' && AT !== '0f' && AT !== '17'){
				document.getElementById('RE3SET_LBL_CARLOS_EASY_' + (c + 1)).innerHTML = QT;
			} else {
				document.getElementById('RE3SET_LBL_CARLOS_EASY_' + (c + 1)).innerHTML = 'Inf.';
			}
		} else {
			document.getElementById('RE3SET_LBL_CARLOS_EASY_' + (c + 1)).innerHTML = QT + '%';
		}
		document.getElementById('RE3SET_IMG_EASY_CARLOS_' + (c + 1)).title = ITEM[IT][0];
		document.getElementById('RE3SET_IMG_EASY_CARLOS_' + (c + 1)).src = APP_PATH + '\\App\\img\\items\\' + IT + '.png';
		c++;
	}
}
// Show on Edit
function RE3SET_EDITSTARTITEM(mode, char, id){
	// Item Slot
	RE3SET_itemStart_currentId = parseInt(id);
	// Game Mode (0 = Easy, 1 = Hard)
	RE3SET_itemStart_currentMode = mode;
	// Char Name (0 = Jill, 1 = Carlos)
	RE3SET_itemStart_currentPlayer = char;
	var itemHex, gMode, gChar, IT, QT, AT;
	if (RE3SET_itemStart_currentMode === 0){
		gMode = 'E';
	} else {
		gMode = 'H';
	}
	if (RE3SET_itemStart_currentPlayer === 0){
		gChar = 'J';
	} else {
		gChar = 'C';
	}
	itemHex = localStorage.getItem('RE3SET_INVENT_' + gChar + '_' + gMode + '_' + RE3SET_itemStart_currentId);
	IT = itemHex.slice(0, 2);
	QT = parseInt(itemHex.slice(2, 4), 16);
	AT = itemHex.slice(4, 6);
	document.getElementById('RE3SET_EDIT_ITEMSTART_IT').value = IT;
	document.getElementById('RE3SET_EDIT_ITEMSTART_AT').value = AT;
	document.getElementById('RE3SET_EDIT_ITEMSTART_QT').value = QT;
	document.getElementById('RE3SET_LBL_editItemName').innerHTML = ITEM[IT][0];
	document.getElementById('RE3SET_EDIT_LBL_ITEMDESC').innerHTML = ITEM[IT][1];
	// End
	RE3SET_itemStart_showEdit(0);
}
function RE3SET_ITEMSTART_CHECK(){
	var IT = document.getElementById('RE3SET_EDIT_ITEMSTART_IT').value;
	var AT = document.getElementById('RE3SET_EDIT_ITEMSTART_AT').value;
	var QU = document.getElementById('RE3SET_EDIT_ITEMSTART_QT').value;
	if (QU === '' || parseInt(QU) === NaN){
		QU = 0;
	}
	var QT = parseInt(QU).toString(16);
	if (QT.length !== 2){
		QT = '0' + QT;
	}
	RE3SET_ITEMSTART_APPLY(IT + QT + AT + '00');
}
function RE3SET_ITEMSTART_APPLY(itemHex){
	var c, gMode, gChar, newJillHardInvent, newCarlosHardInvent, newJillEasyInvent, newCarlosEasyInvent, FINAL_HEX;
	if (RE3SET_itemStart_currentMode === 0){
		gMode = 'E';
	} else {
		gMode = 'H';
	}
	if (RE3SET_itemStart_currentPlayer === 0){
		gChar = 'J';
	} else {
		gChar = 'C';
	}
	localStorage.setItem('RE3SET_INVENT_' + gChar + '_' + gMode + '_' + RE3SET_itemStart_currentId, itemHex);
	// Recompile Inventory
	FINAL_HEX = newJillHardInvent = newCarlosHardInvent = newJillEasyInvent = newCarlosEasyInvent = '';
	// Jill Hard
	c = 0;
	while (c < RE3SET_jillHard.length){
		newJillHardInvent = newJillHardInvent + localStorage.getItem('RE3SET_INVENT_J_H_' + c);
		c++;
	}
	// Carlos Hard
	c = 0;
	while (c < RE3SET_carlosHard.length){
		newCarlosHardInvent = newCarlosHardInvent + localStorage.getItem('RE3SET_INVENT_C_H_' + c);
		c++;
	}
	// Jill Easy
	c = 0;
	while (c < RE3SET_jillEasy.length){
		newJillEasyInvent = newJillEasyInvent + localStorage.getItem('RE3SET_INVENT_J_E_' + c);
		c++;
	}
	// Carlos Easy
	c = 0;
	while (c < RE3SET_carlosEasy.length){
		newCarlosEasyInvent = newCarlosEasyInvent + localStorage.getItem('RE3SET_INVENT_C_E_' + c);
		c++;
	}
	FINAL_HEX = newJillHardInvent + 'ffffffff' + newCarlosHardInvent + 'ffffffff00000000' + newJillEasyInvent + 'ffffffff' + newCarlosEasyInvent;
	RE3SET_RECOMPILE(0, FINAL_HEX);
}
/*
	~~~~~~~~~~~~~~~~~~~~~~
	{RECOMPILE Executable}
	~~~~~~~~~~~~~~~~~~~~~~
	Mode 0: Item Start
	Mode 1: Starting Location (Other Settings)
	Mode 2: Item Description
*/
function RE3SET_RECOMPILE(mode, hexReplace){
	var EXE_REASON = '';
	var EXE_CAN_SAVE = true;
	var EXE_START, EXE_END, EXE_FINAL;
	if (mode === 0){
		EXE_START = RE3SET_arquivoBruto.slice(0, RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][0]);
		EXE_END   = RE3SET_arquivoBruto.slice(RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][1], RE3SET_arquivoBruto.length);
		EXE_FINAL = EXE_START + hexReplace + EXE_END;
	}
	if (mode === 1){
		/*
			Start Position
		*/
		RE3SET_startPos_xPos = document.getElementById('RE3SET_EDIT_STARTPOS_XPOS').value;
		RE3SET_startPos_yPos = document.getElementById('RE3SET_EDIT_STARTPOS_YPOS').value;
		RE3SET_startPos_rPos = document.getElementById('RE3SET_EDIT_STARTPOS_RPOS').value;
		RE3SET_startPos_roomCam = document.getElementById('RE3SET_EDIT_STARTPOS_ROOMCAM').value;
		RE3SET_startPos_roomNumber = document.getElementById('RE3SET_EDIT_STARTPOS_ROOMNUMBER').value;
		// Fix Vars
		if (RE3SET_startPos_xPos === '' || RE3SET_startPos_xPos.length !== 4){
			EXE_CAN_SAVE = false;
			EXE_REASON = EXE_REASON + '\nX Pos. have invalid value!';
		}
		if (RE3SET_startPos_yPos === '' || RE3SET_startPos_yPos.length !== 4){
			EXE_CAN_SAVE = false;
			EXE_REASON = EXE_REASON + '\nY Pos. have invalid value!';
		}
		if (RE3SET_startPos_rPos === '' || RE3SET_startPos_rPos.length !== 4){
			EXE_CAN_SAVE = false;
			EXE_REASON = EXE_REASON + '\nR Pos. have invalid value!';
		}
		if (RE3SET_startPos_roomCam === '' || RE3SET_startPos_roomCam.length !== 2){
			EXE_CAN_SAVE = false;
			EXE_REASON = EXE_REASON + '\nRoom Cam have invalid value!';
		}
		if (RE3SET_startPos_roomNumber === '' || RE3SET_startPos_roomNumber.length !== 2){
			EXE_CAN_SAVE = false;
			EXE_REASON = EXE_REASON + '\nRoom Number have invalid value!';
		}
		if (EXE_CAN_SAVE === true){
			// X Pos.
			EXE_START = RE3SET_arquivoBruto.slice(0, RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomXpos'][0]);
			EXE_END   = RE3SET_arquivoBruto.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomXpos'][1], RE3SET_arquivoBruto.length);
			EXE_FINAL = EXE_START + RE3SET_startPos_xPos + EXE_END;
			// Y Pos.
			EXE_START = EXE_FINAL.slice(0, RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomYpos'][0]);
			EXE_END   = EXE_FINAL.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomYpos'][1], EXE_FINAL.length);
			EXE_FINAL = EXE_START + RE3SET_startPos_yPos + EXE_END;
			// R Pos.
			EXE_START = EXE_FINAL.slice(0, RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomRpos'][0]);
			EXE_END   = EXE_FINAL.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomRpos'][1], EXE_FINAL.length);
			EXE_FINAL = EXE_START + RE3SET_startPos_rPos + EXE_END;
			// Room Cam
			EXE_START = EXE_FINAL.slice(0, RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomCam'][0]);
			EXE_END   = EXE_FINAL.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomCam'][1], EXE_FINAL.length);
			EXE_FINAL = EXE_START + RE3SET_startPos_roomCam + EXE_END;
			// Room Number
			EXE_START = EXE_FINAL.slice(0, RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomNumber'][0]);
			EXE_END   = EXE_FINAL.slice(RANGES['RE3SET_local_' + RE3SET_gameVersion + '_roomNumber'][1], EXE_FINAL.length);
			EXE_FINAL = EXE_START + RE3SET_startPos_roomNumber + EXE_END;
		}
	}
	if (mode === 2){
		EXE_START = RE3SET_arquivoBruto.slice(0, RANGES['RE3SET_' + RE3SET_gameVersion + '_itemInfos'][0]);
		EXE_END   = RE3SET_arquivoBruto.slice(RANGES['RE3SET_' + RE3SET_gameVersion + '_itemInfos'][1], RE3SET_arquivoBruto.length);
		EXE_FINAL = EXE_START + hexReplace + EXE_END;
	}
	// Save File
	if (RE3_RUNNING !== true){
		if (EXE_CAN_SAVE === true){
			try {
				RE3SET_Backup();
				if (RE3SET_gameVersion === 0){
					R3_CHECK_WATERMARK(EXE_FINAL);
				} else {
					fs.writeFileSync(ORIGINAL_FILENAME, EXE_FINAL.toLowerCase(), 'hex');
				}
				LOG_separator();
				LOG_addLog('log', 'RE3SET - File saved sucessfully!');
				LOG_addLog('log', 'RE3SET - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
				RE3SET_loadFile(ORIGINAL_FILENAME, 0);
			} catch (err) {
				LOG_addLog('error', 'ERROR - Something went wrong while saving data!');
				LOG_addLog('error', 'ERROR - Reason: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
			}
		} else {
			LOG_addLog('warn', 'WARN - Unable to save file!');
			LOG_addLog('warn', 'WARN - Reason: ' + EXE_REASON);
		}
	} else {
		LOG_addLog('warn', 'WARN - Unable to save file!');
		LOG_addLog('warn', 'WARN - Reason: Resident Evil 3 is Running!');
	}
	LOG_scroll();
}
function RE3SET_Backup(){
	R3DITOR_CHECK_FILES_AND_DIRS();
	if (RE3SET_arquivoBruto !== undefined){
		try{
			var RE3SET_backupName = getFileName(ORIGINAL_FILENAME).toUpperCase() + '-RE3SET-' + currentTime() + DROP_fileTypes[RE3SET_fName][2];
			fs.writeFileSync(APP_PATH + '\\Backup\\RE3SET\\' + RE3SET_backupName, RE3SET_arquivoBruto, 'hex');
			LOG_addLog('log', 'INFO - The backup was made successfully! - File: ' + RE3SET_backupName);
			LOG_addLog('log', 'INFO - Path: <font class="user-can-select">' + APP_PATH + '\\Backup\\RE3SET\\' + RE3SET_backupName + '</font>');
			LOG_separator();
		} catch (err) {
			LOG_addLog('error', 'ERROR - Unable to make backup!');
			LOG_addLog('error', 'ERROR - Reason: ' + err);
		}
	} else {
		LOG_addLog('error', 'ERROR - You can\'t make a backup if you haven\'t opened a file yet!');
	}
}