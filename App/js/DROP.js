/*
	R3ditor - DROP.js
	Por mitosan/mscore/misto_quente/mscorehdr

	Running short...
*/

var DROP_totalItems = 8,
	DROP_fName, DROP_gameVersion, DROP_arquivoBruto, DROP_databaseItems, DROP_databaseQuant, DROP_databaseCompiled;

/*
	Functions
*/
function DROP_loadFile(exeFile, mode){

	DROP_showEdit(1);
	ORIGINAL_FILENAME = exeFile;
	DROP_fName = getFileName(ORIGINAL_FILENAME);
	DROP_gameVersion = DROP_fileTypes[DROP_fName][1];
	DROP_arquivoBruto = fs.readFileSync(exeFile, 'hex');
	document.getElementById('DROP-holder').innerHTML = '';
	R3_DISC_setActivity('On DROP', '(' + DROP_fileTypes[DROP_fName][0] + ') Editing RE3 nemesis drops');

	// Read Values
	DROP_databaseItems = DROP_arquivoBruto.slice(RANGES['DROP_' + DROP_gameVersion + '_itemIds'][0], RANGES['DROP_' + DROP_gameVersion + '_itemIds'][1]);
	DROP_databaseQuant = DROP_arquivoBruto.slice(RANGES['DROP_' + DROP_gameVersion + '_itemQuant'][0], RANGES['DROP_' + DROP_gameVersion + '_itemQuant'][1]);
	if (mode === 0){
		main_menu(11);
	}
	DROP_decompileItems();

	// End
	LOG_addLog('log', 'DROP - File loaded sucessfully! (Mode: ' + DROP_fileTypes[DROP_fName][0] + ')');
	LOG_addLog('log', 'DROP - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
	LOG_scroll();

}
function DROP_decompileItems(){

	var c = 0,
		currentItem = 0;

	while (c < DROP_totalItems){

		var DROP_itemId = DROP_databaseItems.slice(currentItem, parseInt(currentItem + 2)),
			DROP_itemQu = DROP_databaseQuant.slice(currentItem, parseInt(currentItem + 2));

		localStorage.setItem('DROP_ITEM_ID_' + c, DROP_itemId);
		localStorage.setItem('DROP_ITEM_QU_' + c, DROP_itemQu);
		//console.info('Current Item: ' + c + ' - Item Hex: ' + ITEM[DROP_itemId][0] + ' - Quant: ' + DROP_itemQu);

		var DROP_HTML_TEMPLATE = '<div class="RDT-Item DROP-func-comb-bg" id="DROP_item_' + (c + 1) + '"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" id="DROP_editBtn_' + 
								 c + '" value="Modify" onclick="DROP_showEdit(0, ' + c + ', \'' + DROP_itemId + '\', \'' + DROP_itemQu + '\');DROP_updatePreview();"><img src="' + APP_PATH + '\\App\\Img\\items\\' + 
								 DROP_itemId + '.png" title="' + ITEM[DROP_itemId][0] + '" class="DROP_imgPrev"><div class="DROP_divLeft">(' + (c + 1) + ') Item <font class="user-can-select">' + 
								 DROP_itemId.toUpperCase() + '</font> - ' + ITEM[DROP_itemId][0] + '<div class="menu-separador"></div>Quantity: ' + parseInt(DROP_itemQu, 16) + '</div></div>';
		$('#DROP-holder').append(DROP_HTML_TEMPLATE);
		//
		currentItem = (currentItem + 2);
		c++;
	}

}
function DROP_updatePreview(){
	const itemId = document.getElementById('DROP_EDIT_ITEM').value;
	document.getElementById('DROP_item_preview').src = `${APP_PATH}/App/Img/items/${itemId}.png`;
}
function DROP_checkValues(id){
	var DROP_reason = '',
		DROP_canCompile = true,
		newItem = document.getElementById('DROP_EDIT_ITEM').value,
		newQuan = parseInt(document.getElementById('DROP_EDIT_QUANT').value).toString(16);
	if (newQuan === ''){
		LOG_addLog('warn', 'WARN - Quantity was set to 0!');
		newQuan = '00';
	}
	if (newQuan === NaN || newQuan === 'NaN'){
		DROP_canCompile = false;
		DROP_reason = 'The quantity value are not a number (NaN)';
	}
	if (newQuan.length < 2){
		newQuan = '0' + newQuan;
	}
	if (DROP_canCompile === true){
		localStorage.setItem('DROP_ITEM_ID_' + id, newItem);
		localStorage.setItem('DROP_ITEM_QU_' + id, newQuan);
		DROP_compileItems();
	} else {
		alert('ERROR - Unable to save!\nReason: ' + DROP_reason);
	}
}

function DROP_compileItems(){
	var c = 0,
		FINAL_HEX = '',
		newItemHex = '',
		newQuanHex = '';
	while (c < DROP_totalItems){
		newItemHex = newItemHex + localStorage.getItem('DROP_ITEM_ID_' + c);
		newQuanHex = newQuanHex + localStorage.getItem('DROP_ITEM_QU_' + c);
		c++;
	}
	FINAL_HEX = newItemHex + newQuanHex;
	DROP_saveFile(FINAL_HEX);
}

function DROP_saveFile(hexValue){
	if (RE3_RUNNING !== true){
		try{
			DROP_backup();
			var DROP_START = DROP_arquivoBruto.slice(0, RANGES['DROP_' + DROP_gameVersion + '_itemIds'][0]),
				DROP_END = DROP_arquivoBruto.slice(RANGES['DROP_' + DROP_gameVersion + '_itemQuant'][1], DROP_arquivoBruto.length),
				FINAL_FILE = DROP_START + hexValue + DROP_END;
			if (DROP_gameVersion === 0){
				R3_CHECK_WATERMARK(FINAL_FILE);
			} else {
				fs.writeFileSync(ORIGINAL_FILENAME, FINAL_FILE, 'hex');
			}
			LOG_addLog('log', 'DROP - The file was saved successfull!');
			LOG_addLog('log', 'Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
			LOG_separator();
			DROP_loadFile(ORIGINAL_FILENAME, 0);
		} catch (err) {
			LOG_addLog('error', 'Unable to save file!');
			LOG_addLog('error', 'Reason: ' + err);
			console.error('Unable to save file!\nReason: ' + err);
		}
	} else {
		LOG_addLog('warn', 'WARN - Unable to save file!');
		LOG_addLog('warn', 'WARN - Reason: Resident Evil 3 is Running!');
	}
	LOG_scroll();
}

function DROP_backup(){
	R3DITOR_CHECK_FILES_AND_DIRS();
	if (DROP_arquivoBruto !== undefined){
		try{
			const DROP_backupName = getFileName(ORIGINAL_FILENAME).toUpperCase() + '-DROP-' + currentTime() + DROP_fileTypes[DROP_fName][2];
			fs.writeFileSync(APP_PATH + '\\Backup\\DROP\\' + DROP_backupName, DROP_arquivoBruto, 'hex');
			LOG_addLog('log', 'INFO - The backup was made successfully! - File: ' + DROP_backupName);
			LOG_addLog('log', 'INFO - Path: <font class="user-can-select">' + APP_PATH + '\\Backup\\DROP\\' + DROP_backupName + '</font>');
			LOG_separator();
		} catch (err) {
			LOG_addLog('error', 'ERROR - Unable to make backup! - ' + err);
		}
	} else {
		LOG_addLog('error', 'ERROR - You can\'t make a backup if you haven\'t opened a file yet!');
	}
}