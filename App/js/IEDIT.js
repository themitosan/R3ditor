/*
	R3ditor - IEDIT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Mais uma vez, obrigado Biohazard España / ResidentEvilArtist!
*/
var IEDIT_Database;
var IEDIT_fileName;
var IEDIT_arquivoBruto;
/*
	Functions
*/
function IEDIT_loadExec(file, mode){
	var c = 0;
	var push_end = 8;
	var push_start = 0;
	var totalPushes = 134;
	document.getElementById('IEDIT-holder').innerHTML = '';
	IEDIT_arquivoBruto = fs.readFileSync(file, 'hex');
	ORIGINAL_FILENAME = file;
	IEDIT_fileName = getFileName(ORIGINAL_FILENAME);
	IEDIT_Database = IEDIT_arquivoBruto.slice(IEDIT_fileTypes[IEDIT_fileName][1], IEDIT_fileTypes[IEDIT_fileName][2]);
	if (mode === 0){
		while (c < totalPushes){
			var hexSlice = IEDIT_Database.slice(push_start, push_end);
			IEDIT_decompileItem(false, c, hexSlice);
			push_start = push_start + 8;
			push_end = push_end + 8;
			c++;
		}
		LOG_addLog('log', 'IEDIT - File loaded sucessfully! (Mode: ' + IEDIT_fileTypes[IEDIT_fileName][0] + ')');
		LOG_addLog('log', 'IEDIT - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
		main_menu(9);
	} else {
		LOG_addLog('log', 'PATCHER - IEDIT database was loaded!');
	}
	LOG_scroll();
}
function IEDIT_decompileItem(useLocalStorage, id, hex){
	var IEDIT_HEX;
	var IEDIT_CURRENT_ITEM = id.toString(16);
	if (IEDIT_CURRENT_ITEM.length < 2){
		IEDIT_CURRENT_ITEM = '0' + IEDIT_CURRENT_ITEM;
	}
	if (useLocalStorage === false){
		IEDIT_HEX = hex;
		localStorage.setItem('IEDIT_ITEM_' + id, IEDIT_HEX);
	} else {
		IEDIT_HEX = localStorage.getItem('IEDIT_ITEM_' + id);
	}
	var IEDIT_TYPE = IEDIT_HEX.slice(RANGES['IEDIT_ITEM_TYPE'][0], RANGES['IEDIT_ITEM_TYPE'][1]);
	var IEDIT_CAPACITY = IEDIT_HEX.slice(RANGES['IEDIT_MAX_CAPACITY'][0], RANGES['IEDIT_MAX_CAPACITY'][1]);
	var IEDIT_CODE_QUEST = IEDIT_HEX.slice(RANGES['IEDIT_CODE_QUEST'][0], RANGES['IEDIT_CODE_QUEST'][1]);
	var IEDIT_DISPLAY_MODE = IEDIT_HEX.slice(RANGES['IEDIT_DISPLAY_MODE'][0], RANGES['IEDIT_DISPLAY_MODE'][1]);
	var IEDIT_HTML_TEMPLATE = '<div class="RDT-Item MIX-func-comb-bg IEDIT_ITEM_heightFix" id="IEDIT_item_' + id + '"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" id="IEDIT_editBtn_' + id + 
							'" value="Modify" onclick="IEDIT_showEdit(0, ' + id + ', \'' + IEDIT_HEX + '\');">(' + id + ') Item <font class="user-can-select">' + IEDIT_CURRENT_ITEM.toUpperCase() + '</font> - ' + ITEM[IEDIT_CURRENT_ITEM][0] + '<br><div class="menu-separador"></div>' + 
							'Type: <font class="IEDIT_lbl_item_sticky">' + IEDIT_itemType[IEDIT_TYPE] + '</font><br>Capacity: <font class="IEDIT_lbl_item_sticky">' +	parseInt(IEDIT_CAPACITY, 16) + '</font><br>Code Quest: ' + '<font class="IEDIT_lbl_item_sticky user-can-select">' + 
							IEDIT_CODE_QUEST.toUpperCase() + '</font><br>Display Mode: <font class="IEDIT_lbl_item_sticky">' + IEDIT_displayMode[IEDIT_DISPLAY_MODE] + '</font><div class="menu-separador"><div class="IEDIT_lbl_item_hex_fix">Hex: <font class="user-can-select">' + 
							IEDIT_TYPE.toUpperCase() + ' ' + IEDIT_CAPACITY.toUpperCase() + ' ' + IEDIT_CODE_QUEST.toUpperCase() + ' ' + IEDIT_DISPLAY_MODE.toUpperCase() + '</font></div></div>';
	$('#IEDIT-holder').append(IEDIT_HTML_TEMPLATE);
}
function IEDIT_updateList(){
	var c = 0;
	var t = 134;
	document.getElementById('IEDIT-holder').innerHTML = '';
	while (c < 134){
		IEDIT_decompileItem(true, c);
		c++;
	}
}
function IEDIT_applyChanges(id){
	var newType = document.getElementById('IEDIT_edit_itemType').value;
	var newCodeQuest = document.getElementById('IEDIT_edit_itemCodeQuest').value;
	var newDisplayMode = document.getElementById('IEDIT_edit_itemDisplayMode').value;
	var newCapacity = MEMORY_JS_fixVars(parseInt(document.getElementById('IEDIT_edit_itemQuantity').value).toString(16), 2);
	if (newCapacity > 255){
		newCapacity = 250;
	}
	var IEDIT_NEW_HEX = newType + newCapacity + newCodeQuest + newDisplayMode;
	localStorage.setItem('IEDIT_ITEM_' + id, IEDIT_NEW_HEX);
	IEDIT_showEdit(1);
	IEDIT_saveOnFile();
}
function IEDIT_saveOnFile(){
	if (IEDIT_arquivoBruto !== undefined){
		IEDIT_Backup();
		var c = 0;
		var RE3_FILE_START = IEDIT_arquivoBruto.slice(0, IEDIT_fileTypes[IEDIT_fileName][1]);
		var RE3_FILE_END = IEDIT_arquivoBruto.slice(IEDIT_fileTypes[IEDIT_fileName][2], IEDIT_arquivoBruto.length);
		var IEDIT_NEW_DATABASE = '';
		while (c < 134){
			IEDIT_NEW_DATABASE = IEDIT_NEW_DATABASE + localStorage.getItem('IEDIT_ITEM_' + c);
			c++;
		}
		var NEW_FILE = RE3_FILE_START + IEDIT_NEW_DATABASE + RE3_FILE_END;
		try {
			fs.writeFileSync(ORIGINAL_FILENAME, NEW_FILE, 'hex');
			LOG_addLog('log', 'IEDIT - The file was saved successfull!');
			LOG_addLog('log', 'Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
			LOG_separator();
			IEDIT_updateList();
		} catch (err){
			LOG_addLog('error', 'ERROR - Unable to save IEDIT file!');
			LOG_addLog('error', 'INFO: ' + err);
		}
	}
	LOG_scroll();
}
function IEDIT_Backup(){
	R3DITOR_CHECK_FILES_AND_DIRS();
	if (IEDIT_arquivoBruto !== undefined){
		try{
			var backup_name;
			backup_name = getFileName(ORIGINAL_FILENAME).toUpperCase() + '-IEDIT-' + currentTime() + IEDIT_fileTypes[IEDIT_fileName][3];
			fs.writeFileSync(APP_PATH + '\\Backup\\IEDIT\\' + backup_name, IEDIT_arquivoBruto, 'hex');
			LOG_addLog('log', 'INFO - The backup was made successfully! - File: ' + backup_name);
			LOG_addLog('log', 'Path: <font class="user-can-select">' + APP_PATH + '\\Backup\\IEDIT\\' + backup_name + '</font>');
			LOG_separator();
		} catch (err){
			LOG_addLog('error', 'ERROR - Unable to make backup! - ' + err);
		}
	} else {
		LOG_addLog('error', 'ERROR - You can\'t make a backup if you haven\'t opened a file yet!');
	}
}