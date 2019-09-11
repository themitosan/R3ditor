/*
	R3ditor - MSG.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/
var MSG_LENGTH = 0;
var MSG_ID = undefined;
var MSG_increment = true;
var MSG_totalComandos = 0;
var MSG_Commands = undefined;
var MSG_FILL_PASS = undefined;
var MSG_DECRYPT_LV1_LAST = "";
var MSG_useSeekCameras = false;
var MSG_arquivoBruto = undefined;
var MSG_CURRENT_RDT_MESSAGE_END = 0;
var MSG_CURRENT_RDT_MESSAGE_START = 0;
function MSG_CARREGAR_ARQUIVO(msgFile){
	MSG_LENGTH = 0;
	MSG_Commands = [];
	MSG_FILL_PASS = "";
	localStorage.clear();
	MSG_increment = true;
	MSG_totalComandos = 0;
	sessionStorage.clear();
	MSG_useSeekCameras = false;
	ORIGINAL_FILENAME = msgFile;
	addLog("log", "MSG - Loading MSG File: " + msgFile);
	MSG_arquivoBruto = fs.readFileSync(msgFile, 'hex');
	$("#MSG_openInHex").css({"display": "inline"});
	MSG_startMSGDecrypt_Lv2(MSG_arquivoBruto);
	scrollLog();
}
function MSG_goBackToRDT(){
	document.title = APP_NAME + " - Please wait...";
	MSG_LENGTH = 0;
	MSG_Commands = [];
	MSG_FILL_PASS = "";
	localStorage.clear();
	MSG_increment = true;
	TRANSFER_MSG_TO_RDT();
	MSG_totalComandos = 0;
	MSG_useSeekCameras = false;
	MSG_CURRENT_RDT_MESSAGE_END = 0;
	MSG_CURRENT_RDT_MESSAGE_START = 0;
	RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
	$("#RDT-aba-menu-2").trigger('click');
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
				console.log("Item hex: " + RAW_DATA_ARRAY[startPoint + 1] + " (F8 " + RAW_DATA_ARRAY[startPoint + 1].toUpperCase() + ")");
				var checkItem = parseInt(RAW_DATA_ARRAY[startPoint + 1], 16);
				if (checkItem < 134){
					COMMAND = ITEM[RAW_DATA_ARRAY[startPoint + 1]][0];
				} else {
					//COMMAND = ITEM[RAW_DATA_ARRAY[startPoint + 1]][0];
					RDT_requestFix(0);
					break;
				}
			} else {
				COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + " - Attr: " + RAW_DATA_ARRAY[startPoint + 1] + ")";
			}
			// Special char
			if (RAW_DATA_ARRAY[startPoint] === "ea"){
				COMMAND = MSG_CHARESPECIAL[RAW_DATA_ARRAY[startPoint] + RAW_DATA_ARRAY[startPoint + 1]];
			}
			// Text Color
			if (RAW_DATA_ARRAY[startPoint] === "f9"){
				if (RAW_DATA_ARRAY[startPoint + 1] === "00"){
					COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + " - Attr: " + MSG_TEXTCOLOR[RAW_DATA_ARRAY[startPoint + 1]] + ")";
				} else {
					COMMAND = MSG_DICIONARIO[RAW_DATA_ARRAY[startPoint]][1] + " - Attr: " + MSG_TEXTCOLOR[RAW_DATA_ARRAY[startPoint + 1].slice(1)] + ")";
				}
			}
			if (RAW_DATA_ARRAY[startPoint] === "f3" || RAW_DATA_ARRAY[startPoint] === "f5"){
				COMMAND = "";
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
	document.getElementById("msg-lista-eventos").innerHTML = "";
	var RAW_DATA_ARRAY = RAW_DATA.match(/.{1,2}/g);
	document.getElementById("lbl-msg-length").innerHTML = RAW_DATA.length + " (Hex: " + parseHex(RAW_DATA.length).toUpperCase() + ")";
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
	// Trocar a cor do texto
	if (com === 9){
		var cor = undefined;
		var argsFilter = undefined;
		if (args === "00"){
			cor = MSG_TEXTCOLOR[args];
			argsFilter = args;
		} else {
			argsFilter = args.toString().slice(1);
			cor = MSG_TEXTCOLOR[args.slice(1)];
		}
		COM_HTML_TEMPLATE = '<div class="evento evt-type-9" id="msg-evento-' + index + '">' + 
			'(' + index + ') Function: Change Text Color <input type="button" value="Remove" class="btn-remover-comando" onclick="MSG_REMOVECOMMAND(' + index + ', false);">' + 
			'<input type="button" value="Modify" class="btn-remover-comando" onclick="MSG_renderDialog(9, \'' + argsFilter + '\', ' + index + ', true);"><br>Color: ' + 
			'<font class="italic" id="msg-comand-args' + index + '">' + cor + '</font></div>';
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
	MSG_renderMSGLength(total);
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
	document.getElementById("msg-lista-eventos").innerHTML = "";
	document.title = APP_NAME + " - Message Editor / Translator";
	document.getElementById("msg-lbl-totalCommands").innerHTML = MSG_totalComandos;
	var hValues = document.getElementById('msg-hex-toTrans').value;
	if (hValues !== ""){
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
	if (RDT_arquivoBruto !== undefined && enable_mod === true && fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\") === true){
		var c = 0; // Here we go!
		MSG_useSeekCameras = true;
		console.log("usando modo camera preview");
		$("#msg-cam-id").css({"display": "none"});
		var listCameras = fs.readdirSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\").filter(fn => fn.startsWith(getFileName(ORIGINAL_FILENAME).toUpperCase()));
		while(c < listCameras.length){
			if (listCameras[c].indexOf(".SLD") !== -1 || listCameras[c].length !== 10){
				listCameras.splice(c, 1);
			}
			c++;
		}
		c = 0;
		while(c < listCameras.length){
			var camId = listCameras[c].slice(4, 6).toLowerCase();
			$("#msg-selectCam-id").append('<option value="' + camId + '">Camera ' + camId.toUpperCase() + '</option>');
			c++;
		}
		$("#MSG_camPreview").css({"display": "inline"});
		$("#msg-selectCam-id").css({"display": "inline"});
		$("#dialog-msg-addcomand").css({"top": "54px", "height": "382px"});
		MSG_renderCamPreview();
	}
}
// Comandos / Funções
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
	MSG_applyMSGCommand(0);
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
	MSG_applyMSGCommand(0);
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
	MSG_applyMSGCommand(0);
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
	MSG_applyMSGCommand(0);
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
	MSG_applyMSGCommand(0);
}

function MSG_COMMAND_ADDTEXT(index, isModify){
	var textToTrans = document.getElementById('msg-txt-toTrans').value;
	if (textToTrans !== ""){
		MSG_renderDialog(0);
		if (isModify === undefined){
			isModify = false;
		}
		MSG_increment = false;
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
		MSG_applyMSGCommand(0);
	} else {
		alert("ERROR: The textbox is empty!");
		addLog('warn', 'WARNING - The textbox is empty!');
		scrollLog();
	}
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
	MSG_applyMSGCommand(0);
}
// Text Color
function MSG_COMMAND_TEXTCOLOR(index, isModify){
	if (isModify === undefined){
		isModify = false;
	}
	MSG_increment = false;
	var newCommand = "f9";
	var attrFinal = document.getElementById('msg-selectColor-id').value;
	if (attrFinal.length < 2){
		newCommand = "f90";
	}
	localStorage.setItem("MSG_comando-" + index, newCommand + attrFinal);
	if (isModify === false){
		MSG_totalComandos++;
	}
	MSG_applyMSGCommand(0);
}
// The dark side of this ENTIRE FILE!
// Like... DON'T TOUCH THIS PART - FOR REAL!
function MAKE_NEW_POINTERS(msg_hex){
	var c = 0;
	var NEXT_POINTER = undefined;
	var OLD_POINTERS = localStorage.getItem("RDT_POINTER_" + getFileName(ORIGINAL_FILENAME).toUpperCase()).match(/.{1,4}/g);
	var NEW_POINTERS = OLD_POINTERS[0];
	console.log("Ponteiros antigos: " + localStorage.getItem("RDT_POINTER_" + getFileName(ORIGINAL_FILENAME).toUpperCase()) + "\n" + OLD_POINTERS);
	while(c < OLD_POINTERS.length){
		console.log("Processando Ponteiro " + c + "\nMSG HEX: " + sessionStorage.getItem("MESSAGE_HEX_" + c));
		if (c !== parseInt(OLD_POINTERS.length - 1)){
			if (c < MSG_ID){
				NEXT_POINTER = OLD_POINTERS[c + 1];
			}
			if (c === MSG_ID){
				console.log("Processando MSG nova");
				var len = parseInt(msg_hex.length / 2);
				var original = processBIO3Vars(OLD_POINTERS[c]);
				NEXT_POINTER = parseDecimalToBIO3Var(parseInt(len + original), 0);
			}
			if (c > MSG_ID){
				var anterior = processBIO3Vars(NEXT_POINTER);
				console.log("Antes: " + anterior + "\n" + NEXT_POINTER);
				var len = parseInt(sessionStorage.getItem("MESSAGE_HEX_" + c).length / 2);
				NEXT_POINTER = parseDecimalToBIO3Var(parseInt(anterior + len), 0);
				console.log("length: " + len);
			}
			console.log("Ponteiros: " + NEW_POINTERS + "\nNext: " + NEXT_POINTER);
			NEW_POINTERS = NEW_POINTERS + NEXT_POINTER;
			c++;
		} else {
			break;
		}
	}
	//console.info("Novos Ponteiros:");
	//console.info(NEW_POINTERS + "\n" + NEW_POINTERS.match(/.{1,4}/g));
	return NEW_POINTERS;
}
function MSG_SAVE_ON_RDT(msgHex){
	if (MSG_totalComandos !== 0 && RDT_arquivoBruto !== undefined && ORIGINAL_FILENAME !== undefined){
		RDT_Backup();
		var RDT_START = RDT_arquivoBruto.slice(0, parseInt(MSG_CURRENT_RDT_MESSAGE_START));
		var RDT_END = RDT_arquivoBruto.slice(parseInt(MSG_CURRENT_RDT_MESSAGE_END), RDT_arquivoBruto.length);
		var NEW_RDT_0 = RDT_START + msgHex + RDT_END;
		var N_PONTEIRO = MAKE_NEW_POINTERS(msgHex);

		var P_START = parseInt(mapfile[5]);
		var P_END = parseInt(P_START + N_PONTEIRO.length);

		RDT_START = NEW_RDT_0.slice(0, P_START);
		RDT_END = NEW_RDT_0.slice(P_END, NEW_RDT_0.length);

		var RDT_FINAL = RDT_START + N_PONTEIRO + RDT_END;

		try {
			fs.writeFileSync(ORIGINAL_FILENAME, RDT_FINAL, 'hex');
			log_separador();
			addLog("log", "INFO: The file was saved successfully! - File: " + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".RDT");
			addLog("log", "Folder: " + ORIGINAL_FILENAME);
			log_separador();
		} catch(err){
			var msgError = "ERROR - Something went wrong while saving - ";
			addLog('error', msgError + err);
			console.error(msgError + err);
		}
	} else {
		addLog('ERROR - Function list are empty or RDT file was not defined!');
	}
	scrollLog();
}
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
	MSG_applyMSGCommand(0);
}
function MSG_applyMSGCommand(mode){
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
	c = 0;
	var finalArray = "";
	while(c < u){
		finalArray = finalArray + RAW_DATA_ARRAY[c] + " ";
		c++;
	}
	MSG_LENGTH = newHex.length;
	var POINTER_HOLD = undefined;
	document.getElementById("text-msg-raw").innerHTML = finalArray;
	document.getElementById("lbl-msg-length").innerHTML = MSG_LENGTH + " (Hex: " + parseHex(MSG_LENGTH).toUpperCase() + ")";
	if (localStorage.getItem("RDT_POINTER_" + getFileName(ORIGINAL_FILENAME).toUpperCase()) !== null){
		POINTER_HOLD = localStorage.getItem("RDT_POINTER_" + getFileName(ORIGINAL_FILENAME).toUpperCase());
	}
	// Save to file
	if (mode === 1){
		if (MSG_totalComandos !== 0){
			var ask = prompt("Please insert the file name");
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
					addLog("error", "ERROR - Unable to save the MSG File " + ask + " - " + err);
				}
			} else {
				addLog("log", "MSG - The user has canceled this operation!");
			}
		} else {
			addLog("warn", "WARNING - You can't save an empty save file!");
		}
	}
	if (mode === 2 && MSG_totalComandos !== 0){ // SAVE MESSAGE ON RDT (I STILL very tense writing this lines!)
		MSG_SAVE_ON_RDT(newHex);
		MSG_goBackToRDT();
	}
	MSG_Commands = [];
	MSG_FILL_PASS = "";
	localStorage.clear();
	if (POINTER_HOLD !== undefined){
		localStorage.setItem("RDT_POINTER_" + getFileName(ORIGINAL_FILENAME).toUpperCase(), POINTER_HOLD);
	}
	MSG_startMSGDecrypt_Lv2(newHex);
	scrollLog();
}