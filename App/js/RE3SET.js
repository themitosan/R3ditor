/*
	R3ditor - RE3SET.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Can you give me a tea? Pleeeeeease! ~wink~ ;)
*/
var RE3SET_fName, RE3SET_gameVersion, RE3SET_arquivoBruto, RE3SET_jillHard, RE3SET_carlosHard, RE3SET_jillEasy, RE3SET_carlosEasy, RE3SET_inventoryHex;
// Edit Start Item Vars
var RE3SET_itemStart_currentId, RE3SET_itemStart_currentPlayer, RE3SET_itemStart_currentMode;
/*
	Functions
*/
function RE3SET_loadFile(exe, mode){
	ORIGINAL_FILENAME = exe;
	RE3SET_itemStart_showEdit(1);
	RE3SET_fName = getFileName(exe);
	RE3SET_arquivoBruto = fs.readFileSync(exe, 'hex');
	RE3SET_gameVersion = DROP_fileTypes[RE3SET_fName][1];
	/*
		Item start
	*/
	if (RE3SET_gameVersion !== 2){
		RE3SET_inventoryHex = RE3SET_arquivoBruto.slice(RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][0], RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][1]);
		RE3SET_jillHard     = RE3SET_inventoryHex.slice(0, 32).match(/.{8,8}/g);
		RE3SET_carlosHard   = RE3SET_inventoryHex.slice(40, 64).match(/.{8,8}/g);
		RE3SET_jillEasy     = RE3SET_inventoryHex.slice(80, 120).match(/.{8,8}/g);
		RE3SET_carlosEasy   = RE3SET_inventoryHex.slice(128, RE3SET_inventoryHex.length).match(/.{8,8}/g);
		RE3SET_decompileInventory();
	} else {
		alert('WARN - This is GC Version!\nDue starting items settings are not set on this file, Item start will not be avaliable!');
		LOG_addLog('warn', 'WARN - This is GC Version! Due starting items settings are not set on this file, Item start will not be avaliable!');
		reload();
	}
	//
	// End - Using DROP_fileTypes because it works!
	LOG_addLog('log', 'RE3SET - File loaded sucessfully! (Mode: ' + DROP_fileTypes[RE3SET_fName][0] + ')');
	LOG_addLog('log', 'RE3SET - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
	if (mode === 0){
		main_menu(12);
	}
	LOG_scroll();
}
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
	RECOMPILE Executable
	~~~~~~~~~~~~~~~~~~~~
	Mode 0: Item Start
*/
function RE3SET_RECOMPILE(mode, hexReplace){
	var EXE_START, EXE_END, EXE_FINAL;
	if (mode === 0){
		EXE_START = RE3SET_arquivoBruto.slice(0, RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][0]);
		EXE_END = RE3SET_arquivoBruto.slice(RANGES['RE3SET_invent_' + RE3SET_gameVersion + '_startItems'][1], RE3SET_arquivoBruto.length);
		EXE_FINAL = EXE_START + hexReplace + EXE_END;
	}
	// Save File
	if (RE3_RUNNING !== true){
		try {
			RE3SET_Backup();
			fs.writeFileSync(ORIGINAL_FILENAME, EXE_FINAL.toLowerCase(), 'hex');
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
			LOG_addLog('log', 'Path: <font class="user-can-select">' + APP_PATH + '\\Backup\\RE3SET\\' + RE3SET_backupName + '</font>');
			LOG_separator();
		} catch (err) {
			LOG_addLog('error', 'ERROR - Unable to make backup!');
			LOG_addLog('error', 'ERROR - Reason: ' + err);
		}
	} else {
		LOG_addLog('error', 'ERROR - You can\'t make a backup if you haven\'t opened a file yet!');
	}
}