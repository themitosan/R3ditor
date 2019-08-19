/*
	R3ditor - MSG.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/

var MSG_increment = true;
var MSG_totalComandos = 0;
var MSG_Commands = undefined;
var MSG_DECRYPT_LV1_LAST = "";
var MSG_arquivoBruto = undefined;

function MSG_CARREGAR_ARQUIVO(msgFile){
	MSG_Commands = [];
	localStorage.clear();
	MSG_increment = true;
	MSG_totalComandos = 0;
	ORIGINAL_FILENAME = msgFile;
	addLog("log", "MSG - Loading MSG File: " + msgFile);
	MSG_arquivoBruto = fs.readFileSync(msgFile, 'hex');
	MSG_startMSGDecrypt_Lv2(MSG_arquivoBruto);
	scrollLog();
}

function MSG_startMSGDecrypt_Lv1(RAW_DATA){
	var c = 0; // The great c = 0!
	MSG_DECRYPT_LV1_LAST = "";
	$("#RDT-aba-menu-2").css({"display": "inline"});
	var RAW_DATA_ARRAY = RAW_DATA.match(/.{1,2}/g);
	var formatHex = RAW_DATA.match(/.{2,2}/g);
	try{
		while(c < formatHex.length){
			MSG_DECRYPT_LV1_LAST = MSG_DECRYPT_LV1_LAST + formatHex[c] + " ";
			c++; 
		}
	} catch(err){
		$("#RDT-aba-menu-2").css({"display": "none"});
		addLog('error', 'MSG - Error in formatHex: The array is null or empty!');
		addLog('error', err);
		console.error(err);
		log_separador();
		scrollLog();
	}
	MSG_DECRYPT_LV1_LAST = MSG_DECRYPT_LV1_LAST.slice(0, parseInt(MSG_DECRYPT_LV1_LAST.length - 1));
	var t = undefined;
	if (RAW_DATA_ARRAY !== null){
		t = RAW_DATA_ARRAY.length;
	} else {
		t = 0;
	}
	var cAtual = 0;
	var final = "";
	var startPoint = 0;
	var textoTraduzido = "";
	var COMMAND = undefined;
	while (startPoint < t){
		// Se for um comando / função especial
		if (MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][0] === true){
			if (textoTraduzido !== ""){
				final = final + " " + textoTraduzido;
				textoTraduzido = "";
				cAtual++;
			}
			// Show Item Name
			if (RAW_DATA_ARRAY[startPoint] === "f8"){
				console.log("Item hex: " + RAW_DATA_ARRAY[startPoint + 1]);
				COMMAND = ITEM[RAW_DATA_ARRAY[startPoint + 1]][0];
			} else {
				COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + " - Attr: " + RAW_DATA_ARRAY[startPoint + 1] + ")";
			}
			// Special char
			if (RAW_DATA_ARRAY[startPoint] === "ea"){
				COMMAND = MSG_CHARESPECIAL[RAW_DATA_ARRAY[startPoint] + RAW_DATA_ARRAY[startPoint + 1]];
			}
			if (BETA === true){
				if (RAW_DATA_ARRAY[startPoint] === "f3" || RAW_DATA_ARRAY[startPoint] === "f5"){
					COMMAND = "";
				}
			}
			final = final + " " + COMMAND;
			startPoint = startPoint + 2;
			cAtual++;
		} else {
			textoTraduzido = textoTraduzido + MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1];
			startPoint++;
		}
	}
	if (textoTraduzido !== ""){
		final = final + " " + textoTraduzido;
		textoTraduzido = "";
		cAtual++;
	}
	return final;
}

function MSG_startMSGDecrypt_Lv2(RAW_DATA){
	MSG_Commands = [];
	document.getElementById("msg-lista-eventos").innerHTML = "<!-- You are not seeing me! -->";
	var RAW_DATA_ARRAY = RAW_DATA.match(/.{1,2}/g);
	document.getElementById("lbl-msg-length").innerHTML = RAW_DATA.length;
	var t = undefined;
	if (RAW_DATA_ARRAY !== null){
		t = RAW_DATA_ARRAY.length;
	} else {
		t = 0;
	}
	var finalArray = "";
	var c = 0;
	while(c < t){
		finalArray = finalArray + RAW_DATA_ARRAY[c] + " ";
		c++;
	}
	var cAtual = 0;
	var textoHex = "";
	var startPoint = 0;
	var textoTraduzido = "";
	var COMMAND = undefined;
	var COMMAND_HEX = undefined;
	var COMMAND_ATTR = undefined;
	while (startPoint < t){
		// Se for um comando / função especial
		if (MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][0] === true){
			if (textoTraduzido !== ""){
				localStorage.setItem("MSG_comando-" + cAtual, textoHex);
				localStorage.setItem("MSG_Mensagem-" + cAtual, textoTraduzido);
				MSG_Commands.push([3, textoHex]);
				textoTraduzido = "";
				textoHex = "";
				cAtual++;
			}
			COMMAND_HEX = RAW_DATA_ARRAY[startPoint];
			COMMAND_ATTR = RAW_DATA_ARRAY[startPoint + 1];
			COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][2];
			MSG_Commands.push([COMMAND_HEX, COMMAND_ATTR]);
			localStorage.setItem("MSG_comando-" + cAtual, COMMAND_HEX + COMMAND_ATTR);
			startPoint = startPoint + 2;
			cAtual++;
		} else {
			textoHex = textoHex + RAW_DATA_ARRAY[startPoint];
			textoTraduzido = textoTraduzido + MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1];
			startPoint++;
		}
	}
	if (textoTraduzido !== ""){
		localStorage.setItem("MSG_comando-" + cAtual, textoHex);
		localStorage.setItem("MSG_Mensagem-" + cAtual, textoTraduzido);
		MSG_Commands.push([3, textoHex]);
		textoTraduzido = "";
		textoHex = "";
		cAtual++;
	}
	// Final
	document.getElementById("text-msg-raw").innerHTML = finalArray;
	MSG_doTheTitleThing();
	MSG_renderCommands();
}

function MSG_addCommandToList(com, args, hexCommand, index){
	var COM_HTML_TEMPLATE = undefined;
	// Iniciar Mensagem
	if (com === 1){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-4" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Start Message / Change text speed<input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(1, ' + args + ', ' + index + ', true);"><br>Text Speed: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + '</font></div>';
	}
	// Finalizar Mensgagem
	if (com === 2){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-4" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: End Message <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' +
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(2, ' + args + ', ' + index + ', true);"><br>Final Value: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + '</font></div>'
	}
	// Exibir Texto
	if (com === 3){
		var displayText = localStorage.getItem('MSG_Mensagem-' + index);
		COM_HTML_TEMPLATE = '<div class="evento evt-type-0" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Show Text <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', true);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(3, \'' + index + '\', ' + index + ', true);"><br>Text: ' + 
			'<div class="italic msg-command-text-fix" id="msg-comand-args' + index + '">' + displayText + '</div></div>';
	}
	// Exibir Caracter Especial
	if (com === 4){
		var MSG_CHAR = MSG_CHARESPECIAL[localStorage.getItem("MSG_comando-" + index)];
		var RAW_COM = localStorage.getItem("MSG_comando-" + index);
		COM_HTML_TEMPLATE = '<div class="evento evt-type-3" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Show Special Char <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(4, \'' + RAW_COM + '\', ' + index + ', true);"><br>Char ID: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + ' (' + MSG_CHAR + ')</font></div>';
	}
	// Exibir o nome de item
	if (com === 5){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-5" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Show Item Name <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(5, ' + args + ', ' + index + ', true);"><br>Item Hex: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + ' (' + ITEM[args][0] + ')</font></div>';
	}
	// Reproduzir SE
	if (com === 6){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-1" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Execute SE <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(6, ' + args + ', ' + index + ', true);"><br>SE Hex: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + '</font></div>';
	}
	// Trocar a Câmera
	if (com === 7){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-2" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Change Camera <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(7, ' + args + ', ' + index + ', true);"><br>Camera: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + '</font></div>';
	}
	// COMANDO DESCONHECIDO USADO EM R101.RDT - SEPTEMBER 28TH
	if (com === 8){
		COM_HTML_TEMPLATE = '<div class="evento evt-type-8" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Unknown Function (F5) <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(8, ' + args + ', ' + index + ', true);"><br>Args: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + args + '</font></div>';
	}

	// Final
	if (MSG_increment == true){
		MSG_totalComandos++;
	}
	$("#msg-lista-eventos").append(COM_HTML_TEMPLATE);
	document.getElementById("msg-lbl-totalCommands").innerHTML = MSG_totalComandos;
}

function MSG_renderCommands(){
	var total = MSG_Commands.length;
	var c = 0;
	while(c !== total){
		var COM = undefined;
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
	document.getElementById("msg-lista-eventos").innerHTML = "<!-- You are not seeing me here! -->";
	document.getElementById("msg-lbl-totalCommands").innerHTML = MSG_totalComandos;
	var hValues = document.getElementById('msg-hex-toTrans').value;
	if (hValues !== ""){
		var solved = solveHEX(hValues);
		MSG_startMSGDecrypt_Lv2(solved);
	} else {
		cleanMSGFields();
	}
}

function MSG_COMMAND_STARTMSG(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var txtSpeed = document.getElementById('msg-comeco-id').value;
	if (txtSpeed === ""){
		txtSpeed = "02";
	}
	if (parseInt(txtSpeed) < 1){
		txtSpeed = "01";
	}
	if (parseInt(txtSpeed) > 10){
		txtSpeed = "10";
	}
	if (txtSpeed.length < 2){
		txtSpeed = "0" + txtSpeed;
	}
	localStorage.setItem("MSG_comando-" + index, "fa" + txtSpeed);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

function MSG_COMMAND_ENDMSG(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-fim-id').value;
	if (attrFinal === ""){
		attrFinal = "00";
	}
	if (parseInt(attrFinal) > 10){
		attrFinal = "10";
	}
	if (attrFinal.length < 2){
		attrFinal = "0" + attrFinal;
	}
	localStorage.setItem("MSG_comando-" + index, "fe" + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

function MSG_COMMAND_SHOWITEMNAME(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-lblitem-id').value;
	if (attrFinal === ""){
		attrFinal = "01";
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = "01";
	}
	if (parseInt(attrFinal, 16) > 133){
		attrFinal = "85";
	}
	if (attrFinal.length < 2){
		attrFinal = "0" + attrFinal;
	}
	localStorage.setItem("MSG_comando-" + index, "f8" + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

function MSG_COMMAND_EXECSE(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-execse-id').value;
	if (attrFinal === ""){
		attrFinal = "00";
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = "01";
	}
	if (parseInt(attrFinal, 16) > 255){
		attrFinal = "ff";
	}
	if (attrFinal.length < 2){
		attrFinal = "0" + attrFinal;
	}
	localStorage.setItem("MSG_comando-" + index, "f3" + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

function MSG_COMMAND_ADDCHAR(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-char-id').value;
	localStorage.setItem("MSG_comando-" + index, attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

function MSG_COMMAND_SHOWCAMERA(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-cam-id').value;
	if (attrFinal === ""){
		attrFinal = "00";
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = "01";
	}
	if (parseInt(attrFinal, 16) > 255){
		attrFinal = "ff";
	}
	if (attrFinal.length < 2){
		attrFinal = "0" + attrFinal;
	}
	localStorage.setItem("MSG_comando-" + index, "f4" + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

function MSG_COMMAND_ADDTEXT(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var textToTrans = document.getElementById('msg-txt-toTrans').value;
	var RAW_DATA_ARRAY = textToTrans.match(/.{1,1}/g);
	var t = undefined;
	if (RAW_DATA_ARRAY !== null){
		t = RAW_DATA_ARRAY.length;
	} else {
		t = 0;
	}
	var txtFinal = "";
	var startPoint = 0;
	while (startPoint < t){
		txtFinal = txtFinal + MSG_DICIONARIO_REVERSO[RAW_DATA_ARRAY[startPoint]];
		startPoint++;
	}
	localStorage.setItem("MSG_comando-" + index, txtFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

// Unknown Function F5
function MSG_COMMAND_F5(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var attrFinal = document.getElementById('msg-f5-id').value;
	if (attrFinal === ""){
		attrFinal = "00";
	}
	if (parseInt(attrFinal, 16) < 0){
		attrFinal = "01";
	}
	if (parseInt(attrFinal, 16) > 255){
		attrFinal = "ff";
	}
	if (attrFinal.length < 2){
		attrFinal = "0" + attrFinal;
	}
	localStorage.setItem("MSG_comando-" + index, "f5" + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(false);
}

// Lado escuro do código
// Like... DON'T TOUCH THIS PART!
function MSG_REMOVECOMMAND(comandId, isTxt){
	MSG_totalComandos--;
	MSG_increment = false;
	if (MSG_totalComandos < 0){
		MSG_totalComandos = 0;
	}
	if (isTxt === true){
		localStorage.removeItem("MSG_Mensagem-" + comandId);
	}
	$("#msg-evento-" + comandId).remove();
	localStorage.removeItem("MSG_comando-" + comandId);
	MSG_applyMSGCommand(false);
}

function MSG_applyMSGCommand(save){
	document.getElementById("msg-lbl-totalCommands").innerHTML = MSG_totalComandos;
	var newHex = "";
	var c = 0;
	while(c !== MSG_totalComandos + 1){
		if (localStorage.getItem("MSG_comando-" + c) === null){
			c++;
		} else {
			newHex = newHex + localStorage.getItem("MSG_comando-" + c);
			c++;
		}
	}
	var RAW_DATA_ARRAY = newHex.match(/.{1,2}/g);

	var u = undefined;
	if (RAW_DATA_ARRAY !== null){
		u = RAW_DATA_ARRAY.length;
	} else {
		u = 0;
	}
	var finalArray = "";
	var c = 0;

	while(c < u){
		finalArray = finalArray + RAW_DATA_ARRAY[c] + " ";
		c++;
	}

	document.getElementById("lbl-msg-length").innerHTML = newHex.length;
	document.getElementById("text-msg-raw").innerHTML = finalArray;

	if (save === true){
		if (MSG_totalComandos !== 0){
			var ask = prompt("Insert the file name");
			if (ask !== null){
				try{
					if (ask === ""){
						ask = "Mensagem";
					}
					var newMsgFile = APP_PATH + "\\MSG\\" + ask + ".msg";
					fs.writeFileSync(newMsgFile, newHex, 'hex');
					addLog("log", "INFO: The file " + ask + " was saved successfully!");
					addLog("log", "Caminho: " + newMsgFile);
				} catch(err){
					addLog("error", "ERROR: Unable to save the MSG File " + ask + " - " + err);
				}
			} else {
				addLog("log", "MSG: The user has canceled the form");
			}
		} else {
			addLog("warn", "WARNING: You can't save an empty save file!");
		}
	}
	MSG_Commands = [];
	localStorage.clear();
	MSG_startMSGDecrypt_Lv2(newHex);
}