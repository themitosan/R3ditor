/*
	R3ditor - MSG.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Réupi mi!
*/
var MSG_ID;
var MSG_Commands;
var MSG_FILL_PASS;
var MSG_LENGTH = 0;
var MSG_arquivoBruto;
var MSG_useSlice = false;
var MSG_increment = true;
var MSG_totalComandos = 0;
var MSG_useClimaxFix = false;
var MSG_CONTAINS_FE00 = false;
var MSG_DECRYPT_LV1_LAST = '';
var MSG_useSeekCameras = false;
var MSG_CURRENT_RDT_MESSAGE_END = 0;
var MSG_CURRENT_RDT_MESSAGE_START = 0;
function MSG_goBackToRDT(){
	localStorage.clear();
	sessionStorage.clear();
	MSG_LENGTH = 0;
	RDT_resetVars();
	MSG_ID = undefined;
	MSG_increment = true;
	MSG_totalComandos = 0;
	MSG_Commands = undefined;
	MSG_FILL_PASS = undefined;
	MSG_CONTAINS_FE00 = false;
	MSG_DECRYPT_LV1_LAST = '';
	MSG_useSeekCameras = false;
	MSG_arquivoBruto = undefined;
	MSG_CURRENT_RDT_MESSAGE_END = 0;
	MSG_CURRENT_RDT_MESSAGE_START = 0;
	document.title = APP_NAME + ' - Please wait...';
	RDT_MSG_checkBlockHealth();
	TRANSFER_MSG_TO_RDT();
	RDT_openFile(ORIGINAL_FILENAME);
	$('#RDT-aba-menu-2').trigger('click');
}
function MSG_CARREGAR_ARQUIVO(msgFile){
	if (fs.existsSync(msgFile) === true){
		MSG_LENGTH = 0;
		MSG_Commands = [];
		MSG_FILL_PASS = '';
		RE3_LIVE_closeForm();
		localStorage.clear();
		MSG_increment = true;
		MSG_totalComandos = 0;
		sessionStorage.clear();
		MSG_useSeekCameras = false;
		ORIGINAL_FILENAME = msgFile;
		LOG_addLog('log', 'MSG - Loading MSG File: <font class="user-can-select">' + msgFile + '</font>');
		MSG_arquivoBruto = fs.readFileSync(msgFile, 'hex');
		$('#MSG_openInHex').css({'display': 'inline'});
		MSG_startMSGDecrypt_Lv2(MSG_arquivoBruto);
		MSG_hideTranslateInput();
	} else {
		LOG_addLog('error', 'ERROR - Unable to read ' + getFileName(msgFile) + '!');
		LOG_addLog('error', 'Reason: 404 - File not found! (Path: <font class="user-can-select">' + msgFile + '</font>)');
	}
	LOG_scroll();
}
function MSG_startMSGDecrypt_Lv1(RAW_DATA){
	if (RAW_DATA !== '' && RAW_DATA !== undefined && RAW_DATA !== null){
		var t;
		var c = 0;
		MSG_DECRYPT_LV1_LAST = '';
		$('#RDT-aba-menu-2').css({'display': 'inline'});
		var RAW_DATA_ARRAY = RAW_DATA.match(/.{1,2}/g);
		var formatHex = RAW_DATA.match(/.{2,2}/g);
		try{
			while(c < formatHex.length){
				MSG_DECRYPT_LV1_LAST = MSG_DECRYPT_LV1_LAST + formatHex[c] + ' ';
				c++; 
			}
		} catch(err){
			$('#RDT-aba-menu-2').css({'display': 'none'});
			LOG_addLog('error', 'MSG - Error in formatHex: The array is null or empty!');
			LOG_addLog('error', err);
			console.error(err);
			LOG_separator();
			LOG_scroll();
		}
		MSG_DECRYPT_LV1_LAST = MSG_DECRYPT_LV1_LAST.slice(0, parseInt(MSG_DECRYPT_LV1_LAST.length - 1));
		if (RAW_DATA_ARRAY !== null){
			t = RAW_DATA_ARRAY.length;
		} else {
			t = 0;
		}
		var COMMAND;
		var cAtual = 0;
		var final = '';
		var startPoint = 0;
		var textoTraduzido = '';
		while (startPoint < t){
			// If is a funcion / special command
			if (MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][0] === true){
				if (textoTraduzido !== ''){
					final = final + ' ' + textoTraduzido.replace('(Yes / No)(Function: Climax)', '*(Function: Climax)<br>');
					textoTraduzido = '';
					cAtual++;
				}
				// Show Item Name
				if (RAW_DATA_ARRAY[startPoint] === 'f8'){
					//console.log('Item hex: ' + RAW_DATA_ARRAY[startPoint + 1] + ' (F8 ' + RAW_DATA_ARRAY[startPoint + 1].toUpperCase() + ')');
					var checkItem = parseInt(RAW_DATA_ARRAY[startPoint + 1], 16);
					if (checkItem < 134){
						COMMAND = ITEM[RAW_DATA_ARRAY[startPoint + 1]][0];
					} else {
						//COMMAND = ITEM[RAW_DATA_ARRAY[startPoint + 1]][0];
						LOG_addLog('error', 'MSG - ERROR: Unknown Hex! (' + checkItem.toString(16) + ')');
						break;
					}
				} else {
					COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + ' - Attr: ' + RAW_DATA_ARRAY[startPoint + 1] + ')<br>';
				}
				// End message - fix for last message
				if (RAW_DATA_ARRAY[startPoint] === 'fe'){
					MSG_CONTAINS_FE00 = true;
				}
				// End message - fix for climax
				if (RAW_DATA_ARRAY[startPoint] === 'fe' && MSG_useClimaxFix === true){
					COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1].slice(0, MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1].length - 1) + ')<br>';
					MSG_useClimaxFix = false;
					startPoint--;
				}
				// Special char
				if (RAW_DATA_ARRAY[startPoint] === 'ea'){
					COMMAND = MSG_CHARESPECIAL[RAW_DATA_ARRAY[startPoint] + RAW_DATA_ARRAY[startPoint + 1]];
				}
				// Text Color
				if (RAW_DATA_ARRAY[startPoint] === 'f9'){
					if (RAW_DATA_ARRAY[startPoint + 1] === '00'){
						COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + ' - Attr: ' + MSG_TEXTCOLOR[RAW_DATA_ARRAY[startPoint + 1]] + ')<br>';
					} else {
						COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + ' - Attr: ' + MSG_TEXTCOLOR[RAW_DATA_ARRAY[startPoint + 1].slice(1)] + ')<br>';
					}
				}
				if (RAW_DATA_ARRAY[startPoint] === 'f3' || RAW_DATA_ARRAY[startPoint] === 'f5'){
					COMMAND = '';
				}
				final = final + ' ' + COMMAND;
				startPoint = startPoint + 2;
				cAtual++;
			} else {
				if (RAW_DATA_ARRAY[startPoint] === 'a0'){
					MSG_useClimaxFix = true;
				}
				textoTraduzido = textoTraduzido + MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1];
				startPoint++;
			}
		}
		if (textoTraduzido !== ''){
			final = final + ' ' + textoTraduzido.replace('(Yes / No)(Function: Climax)', '*(Function: Climax)<br>');
			textoTraduzido = '';
			cAtual++;
		}
		return final.replace('(Yes / No)(Function: Climax)', '*(Function: Climax)').replace(new RegExp('<code><</code>', 'gi'), '(').replace(new RegExp('<code>></code>', 'gi'), ')');
	} else {
		return '';
	}
}
function MSG_startMSGDecrypt_Lv2(RAW_DATA){
	MSG_Commands = [];
	var RAW_DATA_ARRAY = RAW_DATA.match(/.{1,2}/g);
	document.getElementById('msg-lista-eventos').innerHTML = '';
	document.getElementById('lbl-msg-length').innerHTML = RAW_DATA.length + ' (Hex: ' + parseHex(RAW_DATA.length).toUpperCase() + ')';
	var t;
	if (RAW_DATA_ARRAY !== null){
		t = RAW_DATA_ARRAY.length;
	} else {
		t = 0;
	}
	var finalArray = '';
	var c = 0;
	while(c < t){
		finalArray = finalArray + RAW_DATA_ARRAY[c] + ' ';
		c++;
	}
	var COMMAND;
	var cAtual = 0;
	var COMMAND_HEX;
	var COMMAND_ATTR;
	var textoHex = '';
	var startPoint = 0;
	var textoTraduzido = '';
	while (startPoint < t){
		// if is a command / special function
		if (MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][0] === true){
			if (textoTraduzido !== ''){
				localStorage.setItem('MSG_comando-' + cAtual, textoHex);
				localStorage.setItem('MSG_Mensagem-' + cAtual, textoTraduzido.replace('(Yes / No)(Function: Climax)', '*(Function: Climax)'));
				MSG_Commands.push([3, textoHex]);
				textoTraduzido = '';
				textoHex = '';
				cAtual++;
			}
			COMMAND_HEX = RAW_DATA_ARRAY[startPoint];
			COMMAND_ATTR = RAW_DATA_ARRAY[startPoint + 1];
			COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][2];
			MSG_Commands.push([COMMAND_HEX, COMMAND_ATTR]);
			localStorage.setItem('MSG_comando-' + cAtual, COMMAND_HEX + COMMAND_ATTR);
			startPoint = startPoint + 2;
			cAtual++;
		} else {
			if (RAW_DATA_ARRAY[startPoint] === 'a0'){
				MSG_useClimaxFix = true;
			}
			textoHex = textoHex + RAW_DATA_ARRAY[startPoint];
			textoTraduzido = textoTraduzido + MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1];
			startPoint++;
		}
	}
	if (textoTraduzido !== ''){
		localStorage.setItem('MSG_comando-' + cAtual, textoHex);
		localStorage.setItem('MSG_Mensagem-' + cAtual, textoTraduzido.replace('(Yes / No)(Function: Climax)', '*(Function: Climax)'));
		MSG_Commands.push([3, textoHex]);
		textoTraduzido = '';
		textoHex = '';
		cAtual++;
	}
	// Final
	document.getElementById('text-msg-textPrev').innerHTML = MSG_startMSGDecrypt_Lv1(RAW_DATA);
	document.getElementById('text-msg-raw').innerHTML = finalArray.toUpperCase();
	MSG_doTheTitleThing();
	MSG_renderCommands();
}
function MSG_addCommandToList(com, args, hexCommand, index){
	var COM_HTML_TEMPLATE;
	// Start Message
	if (com === 1){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-4" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Start Message / Change text speed (<font class="italic">FA</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(1, \'' + args + '\', ' + index + ', true);"><br>Text Speed: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + '</font></div>';
	}
	// End Message
	if (com === 2){
		MSG_CONTAINS_FE00 = true;
		COM_HTML_TEMPLATE = '<div class="evento evt-type-4" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: End Message (<font class="italic">FE</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' +
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(2, \'' + args + ', ' + index + '\', true);"><br>Final Value: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + '</font></div>'
	}
	// Show Text
	if (com === 3){
		var displayText = localStorage.getItem('MSG_Mensagem-' + index).replace(new RegExp('<code><</code>', 'gi'), '(').replace(new RegExp('<code>></code>', 'gi'), ')');
		COM_HTML_TEMPLATE = '<div class="evento evt-type-0" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Show Text <input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', true);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(3, \'' + index + '\', ' + index + ', true);">' + 
			'<input type="button" value="Hex Edit" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(10, \'' + index + '\', ' + index + ', true);"><br>Text: ' + 
			'<div class="italic msg-command-text-fix" id="msg-comand-args' + index + '">' + displayText + '</div></div>';
	}
	// Display Special Char
	if (com === 4){
		var MSG_CHAR = MSG_CHARESPECIAL[localStorage.getItem('MSG_comando-' + index)];
		var RAW_COM = localStorage.getItem('MSG_comando-' + index);
		COM_HTML_TEMPLATE = '<div class="evento evt-type-3" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Show Special Char (<font class="italic">EA</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" btn-editMSGfix onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(4, \'' + RAW_COM + '\', ' + index + ', true);"><br>Char ID: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + ' (' + MSG_CHAR + ')</font></div>';
	}
	// Display Item Name
	if (com === 5){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-5" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Show Item Name (<font class="italic">F8</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(5, \'' + args + '\', ' + index + ', true);"><br>Item Hex: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + ' (' + ITEM[args][0] + ')</font></div>';
	}
	// Play SE
	if (com === 6){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-1" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Execute SE (<font class="italic">F3</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(6, \'' + args + '\', ' + index + ', true);"><br>SE Hex: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + '</font></div>';
	}
	// Exchange the camera
	if (com === 7){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-2" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Change Camera (<font class="italic">F4</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(7, \'' + args + '\', ' + index + ', true);"><br>Camera: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + '</font></div>';
	}
	/*
		SPECIAL FUNCION USED ON R101.RDT - SEPTEMBER 28TH
		I Think this is a "Wait" function - it put the message execution on hold for a XX time)
	*/
	if (com === 8){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-8" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Unknown Function (<font class="italic">F5</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(8, \'' + args + '\', ' + index + ', true);"><br>Args: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + '</font></div>';
	}
	// Change camera
	if (com === 9){
		var cor;
		var argsFilter;
		if (args === '00'){
			cor = MSG_TEXTCOLOR[args];
			argsFilter = args;
		} else {
			argsFilter = args.toString().slice(1);
			cor = MSG_TEXTCOLOR[args.slice(1)];
		}
		COM_HTML_TEMPLATE = '<div class="evento evt-type-9" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Change Text Color (F9)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(9, \'' + argsFilter + '\', ' + index + ', true);"><br>Color: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + cor + '</font></div>';
	}
	// Select Option R113.RDT
	if (com === 11){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-11" id="msg-evento-' + index + '">' + 
			'(' + parseInt(index + 1) + ') Function: Select Option (<font class="italic">70</font>)<input type="button" value="Remove" class="btn-remover-comando btn-editMSGfix" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando btn-editMSGfix" onclick="MSG_renderDialog(11, \'' + args + '\', ' + index + ', true);"><br>Args: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args.toUpperCase() + '</font></div>';
	}
	// Final
	if (MSG_increment === true){
		MSG_totalComandos++;
	}
	$('#msg-lista-eventos').append(COM_HTML_TEMPLATE);
	document.getElementById('msg-lbl-totalCommands').innerHTML = MSG_totalComandos;
}
function MSG_checkHexLength(){
	var c = 0;
	$('#msg-addcomand-confirm').css({'display': 'inline'});
	document.getElementById('MSG_lbl_hexLength').innerHTML = parseInt(document.getElementById('msg-insertHexManual').value.length / 2);
	var hex = document.getElementById('msg-insertHexManual').value;
	if (hex !== ''){
		var check = hex.match(/.{1,2}/g);
		while(c < check.length){
			if (check[c].length < 2){
				$('#msg-addcomand-confirm').css({'display': 'none'});
			}
			c++;
		}
	} else {
		$('#msg-addcomand-confirm').css({'display': 'none'});
	}
}
function MSG_renderCommands(){
	var c = 0;
	var total = MSG_Commands.length;
	MSG_renderMSGLength(total);
	while(c !== total){
		var COM;
		if (MSG_Commands[c][0] === 3){
			COM = 3;
		} else {
			COM = MSG_DICIONARIO[MSG_Commands[c][0]][2];
		}
		var ATT = MSG_Commands[c][1];
		var hexCom = COM + ATT;
		MSG_addCommandToList(COM, ATT, hexCom, c);
		c++;
	}
}
function MSG_translateHexValues(){
	MSG_Commands = [];
	MSG_increment = true;
	MSG_totalComandos = 0;
	MSG_renderDialog(0);
	document.getElementById('msg-lista-eventos').innerHTML = '';
	document.title = APP_NAME + ' - Message Editor / Translator';
	document.getElementById('msg-lbl-totalCommands').innerHTML = MSG_totalComandos;
	var hValues = document.getElementById('msg-hex-toTrans').value;
	if (hValues !== ''){
		var solved = solveHEX(hValues);
		if (BETA === true){
			console.log(solved);
		}
		MSG_startMSGDecrypt_Lv2(solved);
	} else {
		cleanMSGFields();
	}
}
function MSG_seekCameras(){
	if (RDT_arquivoBruto !== undefined && enable_mod === true && fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\') === true && RDT_fileType === 'RDT'){
		var c = 0;
		MSG_useSeekCameras = true;
		$('#msg-cam-id').css({'display': 'none'});
		var listCameras = fs.readdirSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\').filter(fn => fn.startsWith(getFileName(ORIGINAL_FILENAME).toUpperCase()));
		while(c < listCameras.length){
			if (listCameras[c].indexOf('.SLD') !== -1 || listCameras[c].length !== 10){
				listCameras.splice(c, 1);
			}
			c++;
		}
		c = 0;
		while(c < listCameras.length){
			var camId = listCameras[c].slice(4, 6).toLowerCase();
			$('#msg-selectCam-id').append('<option value="' + camId + '">Camera ' + camId.toUpperCase() + '</option>');
			c++;
		}
		$('#MSG_camPreview').css({'display': 'inline'});
		$('#msg-selectCam-id').css({'display': 'inline'});
		$('#dialog-msg-addcomand').css({'top': '54px', 'height': '382px'});
		MSG_renderCamPreview();
	}
}
// Commands / Functions
function MSG_COMMAND_STARTMSG(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var txtSpeed = document.getElementById('msg-comeco-id').value;
	if (txtSpeed === ''){
		txtSpeed = '02';
	}
	if (parseInt(txtSpeed) < 0){
		txtSpeed = '00';
	}
	if (parseInt(txtSpeed) > 10){
		txtSpeed = '10';
	}
	if (txtSpeed.length < 2){
		txtSpeed = '0' + txtSpeed;
	}
	localStorage.setItem('MSG_comando-' + index, 'fa' + txtSpeed);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
function MSG_COMMAND_ENDMSG(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	MSG_CONTAINS_FE00 = true;
	var attrFinal = document.getElementById('msg-fim-id').value;
	if (attrFinal !== '*#'){
		if (attrFinal === '' || attrFinal.length > 2){
			attrFinal = '00';
		}
		if (attrFinal.length < 2){
			attrFinal = '0' + attrFinal;
		}
		localStorage.setItem('MSG_comando-' + index, 'fe' + attrFinal);
	} else {
		localStorage.setItem('MSG_comando-' + index, 'fe  ');
	}
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
function MSG_COMMAND_SHOWITEMNAME(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-lblitem-id').value;
	localStorage.setItem('MSG_comando-' + index, 'f8' + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
function MSG_COMMAND_EXECSE(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-execse-id').value;
	if (attrFinal === ''){
		attrFinal = '00';
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = '01';
	}
	if (parseInt(attrFinal, 16) > 255){
		attrFinal = 'ff';
	}
	if (attrFinal.length < 2){
		attrFinal = '0' + attrFinal;
	}
	localStorage.setItem('MSG_comando-' + index, 'f3' + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
function MSG_COMMAND_ADDCHAR(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-char-id').value;
	localStorage.setItem('MSG_comando-' + index, attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
function MSG_COMMAND_SHOWCAMERA(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = undefined;
	if (MSG_useSeekCameras === true){
		attrFinal = document.getElementById('msg-selectCam-id').value;
	} else {
		attrFinal = document.getElementById('msg-cam-id').value;
	}
	if (attrFinal === ''){
		attrFinal = '00';
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = '01';
	}
	if (parseInt(attrFinal, 16) > 255){
		attrFinal = 'ff';
	}
	if (attrFinal.length < 2){
		attrFinal = '0' + attrFinal;
	}
	localStorage.setItem('MSG_comando-' + index, 'f4' + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
function MSG_COMMAND_ADDTEXT(index, isModify){
	var textToTrans = document.getElementById('msg-txt-toTrans').value;
	if (textToTrans !== ''){
		MSG_renderDialog(0);
		if (isModify === undefined){
			isModify = false;
		}
		MSG_increment = false;
		var RAW_DATA_ARRAY = textToTrans.match(/.{1,1}/g);
		var t;
		if (RAW_DATA_ARRAY !== null){
			t = RAW_DATA_ARRAY.length;
		} else {
			t = 0;
		}
		var txtFinal = '';
		var startPoint = 0;
		while (startPoint < t){
			txtFinal = txtFinal + MSG_DICIONARIO_REVERSO[RAW_DATA_ARRAY[startPoint]];
			startPoint++;
		}
		localStorage.setItem('MSG_comando-' + index, txtFinal);
		if (isModify === false){
			MSG_totalComandos++;
		}
		MSG_applyMSGCommand(0);
	} else {
		alert('ERROR: The textbox is empty!');
		LOG_addLog('warn', 'WARNING - The textbox is empty!');
		LOG_scroll();
	}
}
// Unknown Function F5
function MSG_COMMAND_F5(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-f5-id').value;
	if (attrFinal === ''){
		attrFinal = '00';
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = '01';
	}
	if (parseInt(attrFinal, 16) > 255){
		attrFinal = 'ff';
	}
	if (attrFinal.length < 2){
		attrFinal = '0' + attrFinal;
	}
	localStorage.setItem('MSG_comando-' + index, 'f5' + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
// Text Color
function MSG_COMMAND_TEXTCOLOR(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var newCommand = 'f9';
	var attrFinal = document.getElementById('msg-selectColor-id').value;
	if (attrFinal.length < 2){
		newCommand = 'f90';
	}
	localStorage.setItem('MSG_comando-' + index, newCommand + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
// Select Option
function MSG_COMMAND_SELECTOPTION(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-selectOption-id').value;
	if (attrFinal === ''){
		attrFinal = '00';
	}
	if (attrFinal.length < 2){
		attrFinal = '0' + attrFinal;
	}
	localStorage.setItem('MSG_comando-' + index, '70' + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
	MSG_renderDialog(0);
}
// Insert Hex Manual
function MSG_COMMAND_INSERTHEXMANUAL(index, isModify){
	var attrFinal = document.getElementById('msg-insertHexManual').value;
	if (attrFinal !== ''){
		if (isModify === undefined){
			isModify = false;
		}
		MSG_increment = false;
		localStorage.setItem('MSG_comando-' + index, solveHEX(attrFinal));
		if (isModify === false){
			MSG_totalComandos++;
		}
		MSG_applyMSGCommand(0);
		MSG_renderDialog(0);
	} else {
		alert('WARN: The textbox is empty!');
		LOG_addLog('warn', 'WARNING - The textbox is empty!');
		LOG_scroll();
	}
}
/*
	The dark side of this ENTIRE FILE!
	Like... DON'T TOUCH THIS PART - FOR REAL!
*/
function MSG_renderPreviewBlock(c_msg_hex){
	if (RDT_arquivoBruto !== undefined){
		var c = 1;
		var msgs = '';
		while(c < RDT_totalMessages){
			if (c === MSG_ID){
				c++;
			} else {
				msgs = msgs + sessionStorage.getItem('MESSAGE_HEX_' + c);
				c++;
			}
		}
		msgs = msgs + c_msg_hex;
		var testResult = parseInt(msgs.length / 2).toString(16);
		if (testResult === RDT_MSGTEXT_MAXSIZE){
			$('#MSG_RDT_lbl_blockUsage').removeClass('red');
			$('#MSG_RDT_lbl_blockUsage').addClass('green');
		} else {
			$('#MSG_RDT_lbl_blockUsage').removeClass('green');
			$('#MSG_RDT_lbl_blockUsage').addClass('red');
		}
		return '<font class="user-can-select">' + testResult.toUpperCase() + '</font> (' + parsePercentage(parseInt(msgs.length / 2), parseInt(RDT_MSGTEXT_MAXSIZE, 16)) + '%)';
	}
}
function MAKE_NEW_POINTERS(msg_hex){
	var c = 0;
	var NEXT_POINTER;
	var OLD_POINTERS = localStorage.getItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase()).match(/.{1,4}/g);
	var NEW_POINTERS = OLD_POINTERS[0];
	//console.log('Old pointers: ' + localStorage.getItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase()) + '\n' + OLD_POINTERS);
	while(c < OLD_POINTERS.length){
		if (c !== parseInt(OLD_POINTERS.length - 1)){
			if (c < MSG_ID){
				NEXT_POINTER = OLD_POINTERS[c + 1];
			}
			if (c === MSG_ID){
				var len = parseInt(msg_hex.length / 2);
				var original = processBIO3Vars(OLD_POINTERS[c]);
				NEXT_POINTER = parseDecimalToBIO3Var(parseInt(len + original), 0);
			}
			if (c > MSG_ID){
				var anterior = processBIO3Vars(NEXT_POINTER);
				var len = parseInt(sessionStorage.getItem('MESSAGE_HEX_' + c).length / 2);
				NEXT_POINTER = parseDecimalToBIO3Var(parseInt(anterior + len), 0);
			}
			//console.log('Ponteiros: ' + NEW_POINTERS + '\nNext: ' + NEXT_POINTER);
			NEW_POINTERS = NEW_POINTERS + NEXT_POINTER;
			c++;
		} else {
			break;
		}
	}
	console.log('Novos ponteiros: ' + NEW_POINTERS);
	return NEW_POINTERS;
}
function MSG_SAVE_ON_RDT(msgHex){
	if (MSG_totalComandos !== 0 && RDT_arquivoBruto !== undefined && ORIGINAL_FILENAME !== undefined){
		RDT_Backup();
		var RDT_START = RDT_arquivoBruto.slice(0, parseInt(MSG_CURRENT_RDT_MESSAGE_START));
		var RDT_END = RDT_arquivoBruto.slice(parseInt(MSG_CURRENT_RDT_MESSAGE_END), RDT_arquivoBruto.length);
		var NEW_RDT_0 = RDT_START + msgHex + RDT_END;
		var N_PONTEIRO = MAKE_NEW_POINTERS(msgHex);
		MSG_updateMapFile(N_PONTEIRO);
		var P_START = RDT_arquivoBruto.indexOf(localStorage.getItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase()));
		var P_END = parseInt(P_START + N_PONTEIRO.length);
		RDT_START = NEW_RDT_0.slice(0, P_START);
		RDT_END = NEW_RDT_0.slice(P_END, NEW_RDT_0.length);
		var RDT_FINAL = RDT_START + N_PONTEIRO + RDT_END;
		try {
			fs.writeFileSync(ORIGINAL_FILENAME, RDT_FINAL, 'hex');
			LOG_separator();
			LOG_addLog('log', 'MSG - INFO: The file was saved successfully! - File: ' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.' + RDT_fileType);
			LOG_addLog('log', 'MSG - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
			LOG_separator();
		} catch(err){
			LOG_addLog('error', 'MSG - ERROR: Something went wrong while saving!');
			LOG_addLog('error', 'MSG - Details: ' + err);
		}
	} else {
		LOG_addLog('error', 'ERROR - Function list are empty or <u>you are not using this software properly!</u>');
	}
	LOG_scroll();
}
function MSG_updateMapFile(pointer){
	if (pointer !== ''){
		var c = 0;
		var temp_fm_file = [];
		var newLine = 'POINTERS = ' + btoa(pointer.match(/.{4,4}/g).reverse().toString().replace(new RegExp(',', 'gi'), ''));
		fs.readFileSync(RDT_fm_path).toString().split('\n').forEach(function(line){ 
			temp_fm_file.push(line);
		});
		temp_fm_file[5] = newLine;
		var MapFile_new = '';
		while (c < temp_fm_file.length){
			MapFile_new = MapFile_new + temp_fm_file[c] + '\n';
			c++;
		}
		MapFile_new = MapFile_new.slice(0, parseInt(MapFile_new.length - 1));
		try{
			LOG_separator();
			fs.writeFileSync(RDT_fm_path, MapFile_new, 'utf-8');
			LOG_addLog('log', 'MSG - INFO: The MapFile was updated successfully!');
			LOG_addLog('log', 'MSG - Path: <font class="user-can-select">' + RDT_fm_path + '</font>');
		} catch(err){
			LOG_addLog('error', 'MSG - ERROR: Error while updating MapFile!');
			LOG_addLog('error', 'MSG - Details: ' + err);
		}
	}
	LOG_scroll();
}
function MSG_REMOVECOMMAND(comandId, isTxt){
	MSG_totalComandos--;
	MSG_increment = false;
	if (MSG_totalComandos < 0){
		MSG_totalComandos = 0;
	}
	if (isTxt === true){
		localStorage.removeItem('MSG_Mensagem-' + comandId);
	}
	$('#msg-evento-' + comandId).remove();
	localStorage.removeItem('MSG_comando-' + comandId);
	MSG_applyMSGCommand(0);
}
function MSG_applyMSGCommand(mode){
	var u;
	var c = 0;
	var newHex = '';
	var POINTER_HOLD;
	var finalArray = '';
	document.getElementById('msg-lbl-totalCommands').innerHTML = MSG_totalComandos;
	while(c !== MSG_totalComandos + 1){
		if (localStorage.getItem('MSG_comando-' + c) === null){
			c++;
		} else {
			newHex = newHex + localStorage.getItem('MSG_comando-' + c);
			c++;
		}
	}
	var RAW_DATA_ARRAY = newHex.match(/.{1,2}/g);
	if (RAW_DATA_ARRAY !== null){
		u = RAW_DATA_ARRAY.length;
	} else {
		u = 0;
	}
	c = 0;
	while(c < u){
		finalArray = finalArray + RAW_DATA_ARRAY[c] + ' ';
		c++;
	}
	MSG_LENGTH = newHex.length;
	document.getElementById('text-msg-raw').innerHTML = finalArray.toUpperCase();
	document.getElementById('lbl-msg-length').innerHTML = MSG_LENGTH + ' (Hex: ' + parseHex(MSG_LENGTH).toUpperCase() + ')';
	if (ORIGINAL_FILENAME !== undefined){
		if (localStorage.getItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase()) !== null){
			POINTER_HOLD = localStorage.getItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase());
		}
	}
	if (RDT_arquivoBruto !== undefined){
		document.getElementById('MSG_RDT_lbl_blockUsage').innerHTML = MSG_renderPreviewBlock(newHex);
	}
	// Save to file
	if (mode === 1){
		if (MSG_totalComandos !== 0){
			try{
				R3DITOR_SAVE('MyMessage.msg', newHex, 'hex', 'msg');
			} catch(err){
				LOG_addLog('error', 'ERROR - Unable to save the MSG File ' + ask + ' - ' + err);
			}
		} else {
			LOG_addLog('warn', 'WARNING - You can\'t save an empty save file!');
		}
	}
	if (mode === 2 && MSG_totalComandos !== 0){
		if (MSG_CONTAINS_FE00 === true){
			MSG_SAVE_ON_RDT(newHex);
			MSG_goBackToRDT();
		} else {
			LOG_addLog('warn', 'WARN - Unable to save message: You need insert \"End Message\" function before saving!');
			alert('ERROR - Unable to save message!\nYou need insert \"End Message\" function before saving!');
		}
	} else {
		MSG_Commands = [];
		MSG_FILL_PASS = '';
		localStorage.clear();
		if (POINTER_HOLD !== undefined){
			localStorage.setItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase(), POINTER_HOLD);
		}
		MSG_CONTAINS_FE00 = false;
		document.getElementById('text-msg-textPrev').innerHTML = MSG_startMSGDecrypt_Lv1(newHex);
		MSG_startMSGDecrypt_Lv2(newHex);
	}
	LOG_scroll();
}