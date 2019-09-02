/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/
var RDT_MSG_END = [];
var RDT_totalItens = 0;
var RDT_totalFiles = 0;
var RDT_totalMapas = 0;
var RDT_ItensArray = [];

var RDT_MSG_RESULT_1 = 0;
var RDT_MSG_RESULT_2 = 0;
var RDT_MSG_RESULT_3 = 0;
var RDT_MSG_RESULT_4 = 0;
var RDT_MSG_CURRENT_TEST = 0;

var RDT_FILEMAP_MSG = [];
var RDT_MSG_POINTERS = [];
var RDT_MAPFILE = undefined;
var RDT_generateMapFile = false;

var RDT_messagesArray = [];
var RDT_MSG_finalLenght = 0;
var RDT_MSG_startLength = 0;
var RDT_arquivoBruto = undefined;
var RDT_messasgesRaw = undefined;
var RDT_itemIndexRAW = undefined;
var RDT_totalMessages = undefined;
var RDT_totalItensGeral = undefined;

function RDT_CARREGAR_ARQUIVO(rdtFile){
	RDT_editItemCancel();
	localStorage.clear();
	RDT_FILEMAP_MSG = [];
	RDT_MSG_RESULT_1 = 0;
	RDT_MSG_RESULT_2 = 0;
	RDT_MSG_RESULT_3 = 0;
	RDT_MSG_RESULT_4 = 0;
	RDT_MAPFILE = undefined;
	RDT_MSG_CURRENT_TEST = 0;
	RDT_generateMapFile = false;
	ORIGINAL_FILENAME = rdtFile;
	RDT_arquivoBruto = fs.readFileSync(rdtFile, 'hex');
	document.getElementById('RDT-aba-menu-2').disabled = "";
	addLog("log", "RDT - The file was loaded successfully! - File: " + rdtFile);
	log_separador();
	RDT_readItens();
	RDT_BG_display();
	scrollLog();
}
function RDT_readItens(){
	var c = 0;
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_ItensArray = [];
	RDT_totalItensGeral = 0;
	$("#RDT-item-list").empty();
	RDT_generateItemIndexRaw("02310900");
	RDT_generateItemIndexRaw("02318000");
	RDT_generateItemIndexRaw("02310800");
	RDT_generateItemIndexRaw("02310000"); // Padrão encontrado em (quase) todos os itens
	RDT_generateItemIndexRaw("02310500");
	RDT_generateItemIndexRaw("02310100");
	RDT_generateItemIndexRaw("02310200");
	RDT_generateItemIndexRaw("02310300");
	RDT_generateItemIndexRaw("02310400");
	RDT_generateItemIndexRaw("02310a00"); // R503.rdt - Fábrica
	RDT_totalItensGeral = RDT_ItensArray.length;
	c = 0;
	
	while (c < RDT_totalItensGeral){
		var RDT_itemStartRange = RDT_ItensArray[c] - 4;
		var RDT_itemEndRange = parseInt(RDT_ItensArray[c] - 4) + 52;
		var RDT_ITEMRAW = RDT_arquivoBruto.slice(RDT_itemStartRange, RDT_itemEndRange);
		if (RDT_ITEMRAW.slice(0, 2) === "68"){
			RDT_ITEMRAW = RDT_arquivoBruto.slice(RDT_itemStartRange, parseInt(RDT_itemEndRange + 8));
		}
		localStorage.setItem("RDT_Item-" + c, RDT_ITEMRAW);
		RDT_decompileItens(c, false);
		c++;
	}
	RDT_lookForRDTConfigFile();
}
function RDT_generateItemIndexRaw(str){
	var c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, str);
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}
}
function RDT_decompileItens(id, edit){
	var RDT_CanRender = true;
	var currentItem = localStorage.getItem("RDT_Item-" + id);
	
	var header		  = currentItem.slice(RANGES["RDT_item-header"][0], 	   RANGES["RDT_item-header"][1]);
	var itemIdetifier = currentItem.slice(RANGES["RDT_item-itemIdetifier"][0], RANGES["RDT_item-itemIdetifier"][1]);
	var espaco1		  = currentItem.slice(RANGES["RDT_item-espaco1"][0], 	   RANGES["RDT_item-espaco1"][1]);

	var itemXX 		  = undefined;
	var itemYY 		  = undefined;
	var itemZZ 		  = undefined;
	var itemRR 		  = undefined;
	var itemID 		  = undefined;
	var espaco2 	  = undefined;
	var itemQuant 	  = undefined;
	var espaco3 	  = undefined;
	var itemMP 	 	  = undefined;

	if (header === "67"){
		itemXX 		  = currentItem.slice(RANGES["RDT_item-0-itemXX"][0], 	   RANGES["RDT_item-0-itemXX"][1]);
		itemYY 		  = currentItem.slice(RANGES["RDT_item-0-itemYY"][0], 	   RANGES["RDT_item-0-itemYY"][1]);
		itemZZ 		  = currentItem.slice(RANGES["RDT_item-0-itemZZ"][0], 	   RANGES["RDT_item-0-itemZZ"][1]);
		itemRR 		  = currentItem.slice(RANGES["RDT_item-0-itemRR"][0], 	   RANGES["RDT_item-0-itemRR"][1]);
		itemID 		  = currentItem.slice(RANGES["RDT_item-0-itemID"][0], 	   RANGES["RDT_item-0-itemID"][1]);
		espaco2 	  = currentItem.slice(RANGES["RDT_item-0-espaco2"][0],	   RANGES["RDT_item-0-espaco2"][1]);
		itemQuant 	  = currentItem.slice(RANGES["RDT_item-0-itemQuant"][0],   RANGES["RDT_item-0-itemQuant"][1]);
		espaco3 	  = currentItem.slice(RANGES["RDT_item-0-espaco3"][0], 	   RANGES["RDT_item-0-espaco3"][1]);
		itemMP 		  = currentItem.slice(RANGES["RDT_item-0-itemMP"][0], 	   RANGES["RDT_item-0-itemMP"][1]);
	}
	// WIP
	if (header === "68"){
		itemXX 		  = "[WIP]";
		itemYY 		  = "[WIP]";
		itemZZ 		  = "[WIP]";
		itemRR 		  = "[WIP]";
		itemID 		  = currentItem.slice(RANGES["RDT_item-1-itemID"][0], 	   RANGES["RDT_item-1-itemID"][1]);
		espaco2 	  = currentItem.slice(RANGES["RDT_item-1-espaco2"][0],	   RANGES["RDT_item-1-espaco2"][1]);
		itemQuant 	  = currentItem.slice(RANGES["RDT_item-1-itemQuant"][0],   RANGES["RDT_item-1-itemQuant"][1]);
		espaco3 	  = "[WIP]";
		itemMP 		  = currentItem.slice(RANGES["RDT_item-1-itemMP"][0], 	   RANGES["RDT_item-1-itemMP"][1]);
	}

	var RDT_motivo = undefined;
	//console.log("Header: " + header + "\nHex: " + itemID + "\nHex Completa:\n" + currentItem);

	if (header === "90" || header === "51" || header === "02" || header === "c0"){
		RDT_totalItensGeral--;
		RDT_CanRender = false;
		RDT_ItensArray.splice(id, 1);
		localStorage.removeItem("RDT_Item-" + id);
		RDT_motivo = "Item, map or file has unknown header (" + header + ")";
	}

	if (RDT_CanRender === true){
		if (edit === false){
			RDT_renderItens(id, itemIdetifier, itemID, itemQuant, itemXX, itemYY, itemZZ, itemRR, itemMP, header);
		}
	} else {
		console.warn("WARNING: Unable to render item " + id + " - " + RDT_motivo);
	}
}
function RDT_renderItens(index, ident, id, quant, x, y, z, r, mp, header){
	var tipo = undefined;
	var cssFix = undefined;
	var typeId = undefined;
	var convert = undefined;
	try{
		if (parseInt(id, 16) < 134){
			typeId = 1;
			tipo = "Item";
			cssFix = "RDT-item-bg";
			convert = ITEM[id][0];
			RDT_totalItens++;
		}
		if (parseInt(id, 16) > 133 && parseInt(id, 16) < 163){
			typeId = 2;
			tipo = "File";
			cssFix = "RDT-file-bg";
			convert = FILES[id][0];
			RDT_totalFiles++;
		}
		if (parseInt(id, 16) > 162){
			typeId = 3;
			tipo = "Mapa";
			cssFix = "RDT-map-bg";
			convert = RDT_MAPAS[id][0];
			RDT_totalMapas++;
		}
		if (id.length < 2){
			id = "0" + id;
		}
		var RDT_ITEM_HTML_TEMPLATE = '<div class="RDT-Item ' + cssFix + '" id="RDT-item-' + index + '">(' + index + ') ' + tipo + ': <font class="italic">' + convert + 
		' (Hex: ' + id + ')</font><input type="button" class="btn-remover-comando" style="margin-top: 0px;" value="Modify" onclick="RDT_displayItemEdit' + 
		'(' + typeId + ', \'' + id + '\', \'' + x + '\', \'' + y + '\', \'' + z + '\', \'' + r + '\', \'' + mp + '\', ' + index + ', ' + parseInt(quant, 16) + ', \'' + header + '\');"><br>Quantity: ' + 
		'<font class="italic">' + parseInt(quant, 16) + '</font><br><div class="menu-separador"></div>X Position: <font class="italic RDT-item-lbl-fix">' + x + '</font><br>' +
		'Y Position: <font class="italic RDT-item-lbl-fix">' + y + '</font><br>Z Position: <font class="italic RDT-item-lbl-fix">' + z + '</font><br>Rotation: ' + 
		'<font class="italic RDT-item-lbl-fix">' + r + '</font><br><div class="RDT-Item-Misc">Identifier: <font class="italic RDT-item-lbl-fix-2">' + ident + '</font><br>' + 
		'Animation: <font class="italic RDT-item-lbl-fix-2">' + mp + '</font><br>Header: <font class="italic RDT-item-lbl-fix-2">' + header + '</font><br></div></div>';
		$("#RDT-item-list").append(RDT_ITEM_HTML_TEMPLATE);
	} catch (err){
		var msg = "RDT - ERROR: Unable to render item " + id + " - " + msg;
		console.error(msg);
		addLog("error", msg);
	}
}
function RDT_ITEM_APPLY(index, type){
	var novaHex = undefined;
	var nQuant = undefined;
	if (type === 1){
		novaHex = document.getElementById('RDT-item-select').value;
		nQuant = parseInt(document.getElementById('RDT_item-edit-Quant').value);
	}
	if (type === 2){
		novaHex = document.getElementById('RDT-file-select').value;
		nQuant = 1;
	}
	if (type === 3){
		novaHex = document.getElementById('RDT-map-select').value;
		nQuant = 1;
	}
	if (nQuant > 255){
		nQuant = 255;
	}
	if (nQuant < 0){
		nQuant = 0;
	}
	var quant = nQuant.toString(16);
	if (quant.length < 2){
		quant = "0" + quant;
	}
	var novaX = document.getElementById('RDT_item-edit-X').value.slice(0, 4);
	var novaY = document.getElementById('RDT_item-edit-Y').value.slice(0, 4);
	var novaZ = document.getElementById('RDT_item-edit-Z').value.slice(0, 4);
	var novaR = document.getElementById('RDT_item-edit-R').value.slice(0, 4);
	var novaAnim = document.getElementById('RDT_item-edit-A').value.slice(0, 2);
	if (novaX === ""){
		novaX = "0000";
	}
	if (novaY === ""){
		novaY = "0000";
	}
	if (novaZ === ""){
		novaZ = "0000";
	}
	if (novaR === ""){
		novaR = "0000";
	}
	if (novaAnim === ""){
		novaAnim = "00";
	}
	
	var canBuild = true;
	var error = undefined;

	if (novaX.length < 4){
		canBuild = false;
		error = "The X var must be 16 bytes long!";
	}
	if (novaY.length < 4){
		canBuild = false;
		error = "The Y var must be 16 bytes long!";
	}
	if (novaZ.length < 4){
		canBuild = false;
		error = "The Z var must be 16 bytes long!";
	}
	if (novaR.length < 4){
		canBuild = false;
		error = "The R var must be 16 bytes long!";
	}
	if (novaAnim.length < 2){
		canBuild = false;
		error = "The Animation var must be 8 bytes long!";
	}
	// Reconstruindo item
	if (canBuild === true){
		var RDT_ITEM_COMPILADO = undefined;
		var header = localStorage.getItem("RDT_Item-" + index).slice(0, 12);  
		if (header.slice(0, 2) === "67"){
			var offset1 = localStorage.getItem("RDT_Item-" + index).slice(30, 32);
			var offset2 = localStorage.getItem("RDT_Item-" + index).slice(34, 42);
			var offset3 = localStorage.getItem("RDT_Item-" + index).slice(44, localStorage.getItem("RDT_Item-" + index).length);
			if (BETA === true){
				RDT_ITEM_COMPILADO = header + " " + novaX + " " + novaY + " " + novaZ + " " + novaR + " " + novaHex + " " + offset1 + " " + quant + " " + offset2 + " " + novaAnim + " " + offset3;
				console.log("Index: " + index + "\nNew Hex: " + RDT_ITEM_COMPILADO);
			}
			RDT_ITEM_COMPILADO = header + novaX + novaY + novaZ + novaR + novaHex + offset1 + quant + offset2 + novaAnim + offset3;
			localStorage.setItem("RDT_Item-" + index, RDT_ITEM_COMPILADO);
			RDT_RECOMPILE_Lv1();
		} else {
			// Header 68
			var offset1 = localStorage.getItem("RDT_Item-" + index).slice(12, 44); // Até item id
			var offset2 = localStorage.getItem("RDT_Item-" + index).slice(46, 48); // 00 entre item id e quantidade
			var offset3 = localStorage.getItem("RDT_Item-" + index).slice(50, 58); // quantidade até anim
			RDT_ITEM_COMPILADO = header + offset1 + novaHex + offset2 + quant + offset3 + novaAnim;
			localStorage.setItem("RDT_Item-" + index, RDT_ITEM_COMPILADO);
			RDT_RECOMPILE_Lv1();
		}
	} else {
		addLog("warn", "WARNING: There was an error while processing: " + error);
		scrollLog();
	}
}
function RDT_readMessages(){
	var c = 0;
	//console.clear();
	RDT_MSG_END = [];
	var RDT_readTry = 0;
	RDT_messasgesRaw = [];
	RDT_totalMessages = 0;
	RDT_messagesArray = [];
	if (RDT_generateMapFile == false){
		RDT_MSG_CURRENT_TEST++;
	}
	if (RDT_MSG_CURRENT_TEST > 4){
		RDT_MSG_CURRENT_TEST = 4;
	}
	var current_rdt = getFileName(ORIGINAL_FILENAME).toLowerCase()
	RDT_MSG_startLength = 0;
	RDT_MSG_finalLenght = RDT_arquivoBruto.length;
	document.getElementById('RDT_MSG-holder').innerHTML = " ";
	// Pattern of function start message
	RDT_pickStartMessages("fa02");
	RDT_pickStartMessages("fa00");
	RDT_pickStartMessages("fa01");
	RDT_pickStartMessages("fa03");
	RDT_pickStartMessages("fa04");
	RDT_pickStartMessages("fa05");
	RDT_pickStartMessages("fa06");
	RDT_pickStartMessages("fa07");
	RDT_pickStartMessages("fa08");
	RDT_pickStartMessages("fa09");
	RDT_pickStartMessages("fa10");

	if (RDT_messagesArray.length < 1){
		addLog('warn', 'RDT - R3ditor was unable to find any messages on this file!');
		scrollLog();
	}

	// Finding the end of every message
	c = 0;
	while(c < RDT_messagesArray.length){
		RDT_MSG_END = getAllIndexes(RDT_arquivoBruto, "fe");
		// This will elimiate (almost) every wrong guess of end message!
		var r = undefined;
		if (RDT_arquivoBruto.length > 14088){
			// In the most part of the files, the messages is found after 14.5% of the file!
			r = 7000;
		} else {
			r = 9999;
		}
		while(RDT_MSG_END[0] < RDT_messagesArray[0] || RDT_MSG_END[0] < r){
			RDT_MSG_END.splice(0, 1);
		}
		c++;
	}

	c = 0;
	while(c < RDT_MSG_END.length){
		RDT_MSGEndMessageFilter();
		c++;
	}

	// Make the message, inspect the result and insert them on localStorage
	c = 0;
	while(c < RDT_messagesArray.length){
		var RDT_canAdd = true;
		var RDT_canAdd_lvl = 0;
		var RDT_canAdd_reason = "";

		if (RDT_MSG_END[c] === undefined || RDT_MSG_END[c] === NaN){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 2;
			RDT_canAdd_reason = "The current pos. in RDT_MSG_END (" + c + ") is Null or Undefined!";
			break;
		}
		if (RDT_MSG_CURRENT_TEST !== 4 && RDT_messagesArray[c] > RDT_MSG_finalLenght || RDT_MSG_CURRENT_TEST !== 4 && RDT_MSG_END[c] > RDT_MSG_finalLenght){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message position is very far than usual!";
			break;
		}
		var MESSAGE = undefined;
		var MESSAGE_RAW = undefined;
		if (parseInt(RDT_MSG_END[c] + 4) < RDT_messagesArray[c]){
			var subs = c;
			while(parseInt(RDT_MSG_END[subs] + 4) < RDT_messagesArray[c]){
				subs++;
			}
			if (RDT_messagesArray[c] === parseInt(RDT_MSG_END[subs] + 4)){
				subs++;
			}
			//console.log("Attempts: " + RDT_readTry + " - Index: " + c + " Subs: " + subs + " - " + RDT_messagesArray[c] + ", " + parseInt(RDT_MSG_END[subs] + 4));
			MESSAGE_RAW = RDT_arquivoBruto.slice(RDT_messagesArray[c], parseInt(RDT_MSG_END[subs] + 4));
		} else {
			if (RDT_messagesArray[c] === parseInt(RDT_MSG_END[c] + 4)){
				MESSAGE_RAW = RDT_arquivoBruto.slice(RDT_messagesArray[c], parseInt(RDT_MSG_END[c + 1] + 4));
				if (BETA === true){
					//console.log("Modo com finalização na proxima casa");
					//console.log("Ranges: " + RDT_messagesArray[c] + ", " + parseInt(RDT_MSG_END[c + 1] + 4));
				}
			} else {
				// Fix for cases like R20B.RDT, R102.RDT
				if (RDT_MSG_CURRENT_TEST === 1 && RDT_arquivoBruto.slice(parseInt(RDT_MSG_END[c] + 4), parseInt(RDT_MSG_END[c + 1] + 4)).indexOf("fa") === -1){
					if (parseInt(RDT_MSG_END[c + 1] + 4) !== NaN){
						//console.log("Modo sem inicialização - 1");
						//console.log("Ranges: " + parseInt(RDT_MSG_END[c] + 4) + ", " + parseInt(RDT_MSG_END[c + 1] + 4));
						MESSAGE_RAW = RDT_arquivoBruto.slice(parseInt(RDT_MSG_END[c] + 4), parseInt(RDT_MSG_END[c + 1] + 4));
					} else {
						break;
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The next pos. of RDT_MSG_END returns NaN!";
					}
				} else {
					//console.log("Mensagem em modo normal");
					//console.log("Ranges: " + RDT_messagesArray[c] + ", " + parseInt(RDT_MSG_END[c] + 4));
					MESSAGE_RAW = RDT_arquivoBruto.slice(RDT_messagesArray[c], parseInt(RDT_MSG_END[c] + 4));
				}
			}
		}

		if (MESSAGE_RAW !== undefined){
			MESSAGE = MESSAGE_RAW.slice(0, parseInt(MESSAGE_RAW.indexOf("fe") + 4));
		} else {
			MESSAGE = "";
		}
		//console.log("Message " + c + ":\n" + MESSAGE);

		// HACKS - Não me orgulho disso - 2!
		var RDT_MSG_infoAdicional = undefined;
		if (MESSAGE.indexOf("fa023c03950397039a03c403") === 0){
			RDT_MSG_infoAdicional = "fa023c03950397039a03c403";
			MESSAGE = MESSAGE.slice(RDT_MSG_infoAdicional.length, MESSAGE.length);
		} else {
			RDT_MSG_infoAdicional = "";
		}

		// Process of Validation - Let's see if MESSAGE contains a REAL message!

		// Step 1 - Length
		if (MESSAGE.length > 500 || MESSAGE.length < 17){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "It is too big (or small) to be a real message!";
		}

		// Step 2 - Number of specific hex value
		// Case: Yes / No
		var RDT_MSGfilter = getAllIndexes(MESSAGE, "fb");
		if (RDT_MSGfilter.length > 2){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message contains more than 2 cases of <i>(Yes / No)</i> option!";
		}

		// Step 3 - Number of specific hex value
		// Case: Unknown hex appears more than usual - 78
		RDT_MSGfilter = getAllIndexes(MESSAGE, "78");
		if (RDT_MSGfilter.length > 2){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message contains more than 2 cases of an Unknown Function! - Hex 78 (Total: " + RDT_MSGfilter.length + ")";
		}

		// Step 4 - Number of specific hex value
		// Case: Hex FF appears more than usual
		RDT_MSGfilter = getAllIndexes(MESSAGE, "ff");
		if (RDT_MSGfilter.length > 2){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message contains more than 2 cases of ff!";
		}

		// Step 5 - Known fake messages
		if (RDT_MSG_MENSAGENSINVALIDAS[solveHEX(MESSAGE)] !== undefined){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "This message is listed as a fake message on database!";
		}

		var d = 0;
		// Step 6 - Every single message contain 8 bytes per char or 16 per command
		var MESSAGE_SPLIT = MESSAGE.match(/.{1,2}/g);
		while(RDT_canAdd == true && d < MESSAGE_SPLIT.length){
			if (MESSAGE_SPLIT[d].length < 2){
				RDT_canAdd = false;
				RDT_canAdd_lvl = 1;
				RDT_canAdd_reason = "The message hex is broken!";
			}
			d++;
		}

		// Step 7 - Number of specific hex value
		// Case: Hex 00 appears WAY more than usual
		RDT_MSGfilter = getAllIndexes(MESSAGE, "00");
		if (RDT_MSG_CURRENT_TEST === 3 && RDT_MSGfilter.length > 61){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message contains WAY more cases of 00! (Total: " + RDT_MSGfilter.length + ")";
		}

		// Step 8 - Duplicate
		// Case: Message contains part / is the same message of previous search
		if (RDT_MSG_CURRENT_TEST === 2){
			var S2 = 0;
			while(S2 < RDT_MSG_RESULT_1){
				var prev = localStorage.getItem("RDT_MESSAGE-" + S2);
				if (prev === MESSAGE || prev !== null && prev.indexOf(MESSAGE) !== -1){
					RDT_canAdd = false;
					RDT_canAdd_lvl = 1;
					RDT_canAdd_reason = "This message is a duplicate of another message!";
				}
				S2++;
			}
		}

		// Step 9 - Number of specific hex value
		// Case: Hex 00 appears WAY more than usual
		RDT_MSGfilter = parseInt(getAllIndexes(MESSAGE, "dc").length + getAllIndexes(MESSAGE, "ba").length);
		if (RDT_MSGfilter > 1){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message contains WAY more cases of DC or BA! (Total: " + RDT_MSGfilter + ")";
		}

		// Step 10 - Especific size with abnormal fe attr
		// Case: Message with size 32 and FE attr !== 00
		if (MESSAGE.length === 32 && MESSAGE.slice(MESSAGE.length - 2) !== "00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 1)";
		}

		// Step 11 - Skip Climax Messages
		// Case: Message Like "Fight The Monster", "Enter the Police Station"
		if (MESSAGE.indexOf("fa00fba0") !== -1 || MESSAGE.indexOf("fa02fba0") !== -1){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "Skipping Climax Messages - this kind of message are not selected on this tab";
		}

		// Step 12 - Another pattern
		// Case: Contains FE with strange pattern (100 = 64 in hex)
		if (getAllIndexes(MESSAGE, "fa").length > 2 && parseInt(MESSAGE.slice(MESSAGE.length - 2), 16) > 100){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 2)";
		}

		// Step 13 - Use more than 3 times Function F8 (show item name) / Wrong Offset
		// Case: Another Wrong Offset
		if (MESSAGE.Length > 31 && getAllIndexes(MESSAGE, "f8").length > 3 && MESSAGE.slice(MESSAGE.length - 5, MESSAGE.length) === "efe00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 3)";
		}

		// Step 14 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.slice(0, 2) !== "fa" && MESSAGE.slice(MESSAGE.length - 5, MESSAGE.length) === "efe00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 4)";
		}

		// Step 15 - Show Unknown Item Name
		// Case: Command F8 with attr higher than 85
		if (getAllIndexes(MESSAGE, "f8").length > 0){
			var C2 = 0;
			var F8Cases = getAllIndexes(MESSAGE, "f8");
			while(C2 < F8Cases.length){
				var caseSlice = MESSAGE.slice(parseInt(F8Cases[C2] + 2), parseInt(F8Cases[C2] + 4));
				if (parseInt(caseSlice, 16) > 133){
					RDT_canAdd = false;
					RDT_canAdd_lvl = 1;
					RDT_canAdd_reason = "Command F8 have Attr higher than 85! (Value: " + caseSlice + ")";
				}
				C2++;
			}
		}

		// Step 16 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.slice(parseInt(MESSAGE.length - 8), MESSAGE.length) === "fbb9fe00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 5)";
		}

		// Step 17 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.length < 22 && MESSAGE.slice(parseInt(MESSAGE.length - 2), MESSAGE.length) !== "00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 6)";
		}

		// Step 18 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.length < 38 && MESSAGE.slice(parseInt(MESSAGE.length - 6), MESSAGE.length) === "3efe00" && getAllIndexes(MESSAGE, "bafa00").length > 0){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 7)";
		}

		// Step 19 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.length < 22 && MESSAGE.slice(parseInt(MESSAGE.length - 6), MESSAGE.length) === "3efe00" && MESSAGE.slice(0, 4) === "fa00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 8)";
		}

		// Step 20 - Count of unknown functions and hex integrity
		// Case: Message with a lot of unknown functions / chars
		var hexAnalysis = MESSAGE.match(/.{1,2}/g);
		if (hexAnalysis !== null && hexAnalysis.length > 0){
			var C2 = 0;
			var tot_unk = 0;
			while(C2 < hexAnalysis.length){
				if (hexAnalysis[C2].length > 1){
					if (MSG_DICIONARIO[hexAnalysis[C2]][0] === false && MSG_DICIONARIO[hexAnalysis[C2]][2] === true){
						tot_unk++;
					}
				} else {
					RDT_canAdd = false;
					RDT_canAdd_lvl = 1;
					RDT_canAdd_reason = "The hex integrity of this message is broken!";
				}
				C2++;
			}
			if (tot_unk > 3){
				RDT_canAdd = false;
				RDT_canAdd_lvl = 1;
				RDT_canAdd_reason = "The message contains more unknown function than usual! (Total: " + tot_unk + ")";
			}
		}

		// Step 21 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.indexOf("5d") !== -1 && MESSAGE.slice(MESSAGE.length - 2, MESSAGE.length) !== "00" && MESSAGE.indexOf("fa00") !== -1){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 9)";
		}

		// Step 22 - Another Pattern - Variant of 13
		// Case: Another wrong offset
		if (MESSAGE.indexOf("7dfafef2") !== -1 && MESSAGE.length < 24 || MESSAGE.indexOf("68") !== -1 && MESSAGE.slice(MESSAGE.length - 2, MESSAGE.length) !== "00"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 10)";
		}

		// Step 23 - Another Pattern - Variant of 13!
		// Case: Another wrong offset
		if (MESSAGE.indexOf("c7") !== -1 && MESSAGE.indexOf("e5") !== -1 && MESSAGE.slice(0, 4) !== "fa02"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 11)";
		}

		// Step 24 - Another Pattern - Variant of 13!
		// Case: Map R20C.RDT returning 60+ messages!
		if (MESSAGE.slice(MESSAGE.length - 8, MESSAGE.length - 6) === "fa" && getAllIndexes(MESSAGE, "00").length > 71 && MESSAGE.length > 70 && MESSAGE.slice(MESSAGE.length - 4, MESSAGE.length) !== "fe00" && MESSAGE.slice(0, 4) !== "fa02"){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 12)";
		}

		// Final process
		if (RDT_canAdd === true){
			var MSGSTART = RDT_arquivoBruto.indexOf(MESSAGE);
			var MSGEND = parseInt(RDT_arquivoBruto.indexOf(MESSAGE) + MESSAGE.length);
			localStorage.setItem("RDT_MESSAGE_ADICIONAL-" + c, RDT_MSG_infoAdicional);
			localStorage.setItem("RDT_MESSAGE-START-" + c, MSGSTART);
			localStorage.setItem("RDT_MESSAGE-END-" + c, MSGEND);
			localStorage.setItem("RDT_MESSAGE-" + c, MESSAGE);
			RDT_totalMessages++;
		} else {
			var msg = "Something went wrong in message analysis - Message: " + c + " - Reason: ";
			if (RDT_canAdd_lvl === 1){
				console.warn("WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
			}
			if (RDT_canAdd_lvl === 2){
				console.error("ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
			}
		}
		c++;
	}
	// Second fix for R20B.RDT
	var valorTemp = parseInt(c - RDT_MSG_END.length);
	var valorFinal = valorTemp - valorTemp - valorTemp;
	if (RDT_MSG_END[c] !== RDT_MSG_END.length && valorFinal < 4){
		while(c < RDT_MSG_END.length){
			if (RDT_MSG_END[c + 1] === undefined || RDT_MSG_END[c + 1] === NaN){
				break;
			} else {
				var RDT_canAdd = true;
				var RDT_canAdd_lvl = 0;
				var MESSAGE = undefined;
				var RDT_canAdd_reason = "";
				var MESSAGE_RAW = undefined;
				var RDT_MSG_infoAdicional = "";
				if (RDT_arquivoBruto.slice(parseInt(RDT_MSG_END[c] + 4), parseInt(RDT_MSG_END[c + 1] + 4)).indexOf("fa") === -1){
					MESSAGE_RAW = RDT_arquivoBruto.slice(parseInt(RDT_MSG_END[c] + 4), parseInt(RDT_MSG_END[c + 1] + 4));
					//console.log("Modo sem inicialização - 2");
					//console.log("Ranges: " + parseInt(RDT_MSG_END[c] + 4) + ", " + parseInt(RDT_MSG_END[c + 1] + 4));
					MESSAGE = MESSAGE_RAW.slice(0, parseInt(MESSAGE_RAW.indexOf("fe") + 4));
					
					// Step 1 - Length
					if (MESSAGE.length > 500 || MESSAGE.length < 15){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "It is too big (or small) to be a real message!";
					}
			
					// Step 2 - Number of specific hex values
					// Case: Yes / No
					var RDT_MSGfilter1 = getAllIndexes(MESSAGE, "fb");
					if (RDT_MSGfilter1.length > 2){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message contains more than 2 cases of <i>(Yes / No)</i> option!";
					}
			
					// Step 3 - Number of specific hex values
					// Case: Unknown hex appears more than usual - 78
					var RDT_MSGfilter2 = getAllIndexes(MESSAGE, "78");
					if (RDT_MSGfilter2.length > 2){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message contains more than 2 cases of an Unknown Function! - Hex 78";
					}
			
					// Step 4 - Number of specific hex value
					// Case: Hex FF appears more than usual
					RDT_MSGfilter = getAllIndexes(MESSAGE, "ff");
					if (RDT_MSGfilter.length > 2){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message contains more than 2 cases of ff!";
					}
			
					// Step 5 - Known fake messages
					if (RDT_MSG_MENSAGENSINVALIDAS[solveHEX(MESSAGE)] !== undefined){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "This message is listed as a fake message on database!";
					}
			
					var d = 0;
					// Step 6 - Every single message contain 8 bytes per char or 16 per command
					var MESSAGE_SPLIT = MESSAGE.match(/.{1,2}/g);
					while(RDT_canAdd == true && d < MESSAGE_SPLIT.length){
						if (MESSAGE_SPLIT[d].length < 2){
							RDT_canAdd = false;
							RDT_canAdd_lvl = 1;
							RDT_canAdd_reason = "The message hex is broken!";
						}
						d++;
					}
			
					// Step 7 - Number of specific hex value
					// Case: Hex 00 appears WAY more than usual
					RDT_MSGfilter = getAllIndexes(MESSAGE, "00");
					if (RDT_MSGfilter.length > 61){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message contains WAY more cases of 00! (Total: " + RDT_MSGfilter.length + ")";
					}
			
					// Step 8 - Duplicate
					// Case: Message contains part / is the same message of previous search
					if (RDT_MSG_CURRENT_TEST === 2){
						var S2 = 0;
						while(S2 < RDT_MSG_RESULT_1){
							var prev = localStorage.getItem("RDT_MESSAGE-" + S2);
							if (prev === MESSAGE || prev !== null && prev.indexOf(MESSAGE) !== -1){
								RDT_canAdd = false;
								RDT_canAdd_lvl = 1;
								RDT_canAdd_reason = "This message is a duplicate of another message!";
							}
							S2++;
						}
					}

					// Step 9 - Number of specific hex value
					// Case: Hex 00 appears WAY more than usual
					RDT_MSGfilter = parseInt(getAllIndexes(MESSAGE, "dc").length + getAllIndexes(MESSAGE, "ba").length);
					if (RDT_MSGfilter > 1){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message contains WAY more cases of DC or BA! (Total: " + RDT_MSGfilter + ")";
					}

					// Step 10 - Especific size with abnormal fe attr
					// Case: Message with size 32 and FE attr !== 00
					if (MESSAGE.length === 32 && MESSAGE.slice(MESSAGE.length - 2) !== "00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset!";
					}

					// Step 11 - Skip Nemesis Messages
					// Case: Message Like "Fight The Monster", "Enter the Police Station"
					if (MESSAGE.indexOf("fa00fba0") !== -1 || MESSAGE.indexOf("fa02fba0") !== -1){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "Skipping Climax Messages - this kind of message are not selected on this tab";
					}

					// Step 12 - Another pattern
					// Case: Contains FE with strange pattern (100 = 64 in hex)
					if (getAllIndexes(MESSAGE, "fa").length > 2 && parseInt(MESSAGE.slice(MESSAGE.length - 2), 16) > 100){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Case 2)";
					}
					
					// Step 13 - Use more than 3 times Function F8 (show item name) Or Wrong Offset
					// Case: Message was extracted from wrong offset
					if (MESSAGE.Length < 32 && MESSAGE.slice(MESSAGE.length - 5, MESSAGE.length) === "efe00" || MESSAGE.Length > 31 && getAllIndexes(MESSAGE, "f8").length > 3 && MESSAGE.slice(MESSAGE.length - 5, MESSAGE.length) === "efe00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Case 3)";
					}

					// Step 14 - Variant of 13
					// Case: Message was extracted from wrong offset
					if (MESSAGE.slice(0, 2) !== "fa" && MESSAGE.slice(MESSAGE.length - 5, MESSAGE.length) === "efe00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Case 4)";
					}

					// Step 15 - Show Unknown Item Name
					// Case: Command F8 with attr higher than 85
					if (getAllIndexes(MESSAGE, "f8").length > 0){
						var C2 = 0;
						var F8Cases = getAllIndexes(MESSAGE, "f8");
						while(C2 < F8Cases.length){
							var caseSlice = MESSAGE.slice(parseInt(F8Cases[C2] + 2), parseInt(F8Cases[C2] + 4));
							if (parseInt(caseSlice, 16) > 133){
								RDT_canAdd = false;
								RDT_canAdd_lvl = 1;
								RDT_canAdd_reason = "Command F8 have Attr higher than 85! (Value: " + caseSlice + ")";
							}
							C2++;
						}
					}

					// Step 16 - Another Pattern - Variant of 13
					// Case: Another wrong offset
					if (MESSAGE.slice(parseInt(MESSAGE.length - 8), MESSAGE.length) === "fbb9fe00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 5)";
					}

					// Step 17 - Another Pattern - Variant of 13
					// Case: Another wrong offset
					if (MESSAGE.length < 22 && MESSAGE.slice(parseInt(MESSAGE.length - 2), MESSAGE.length) !== "00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 6)";
					}

					// Step 18 - Another Pattern - Variant of 13
					// Case: Another wrong offset
					if (MESSAGE.length < 38 && MESSAGE.slice(parseInt(MESSAGE.length - 6), MESSAGE.length) === "3efe00" && getAllIndexes(MESSAGE, "bafa00").length > 0){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 7)";
					}

					// Step 19 - Another Pattern - Variant of 13
					// Case: Another wrong offset
					if (MESSAGE.length < 22 && MESSAGE.slice(parseInt(MESSAGE.length - 6), MESSAGE.length) === "3efe00" && MESSAGE.slice(0, 4) === "fa00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 8)";
					}

					// Step 20 - Count of unknown functions and hex integrity
					// Case: Message with a lot of unknown functions / chars
					var hexAnalysis = MESSAGE.match(/.{1,2}/g);
					if (hexAnalysis !== null && hexAnalysis.length > 0){
						var C2 = 0;
						var tot_unk = 0;
						while(C2 < hexAnalysis.length){
							if (hexAnalysis[C2].length > 1){
								if (MSG_DICIONARIO[hexAnalysis[C2]][0] === false && MSG_DICIONARIO[hexAnalysis[C2]][2] === true){
									tot_unk++;
								}
							} else {
								RDT_canAdd = false;
								RDT_canAdd_lvl = 1;
								RDT_canAdd_reason = "The hex integrity of this message is broken!";
							}
							C2++;
						}
						if (tot_unk > 3){
							RDT_canAdd = false;
							RDT_canAdd_lvl = 1;
							RDT_canAdd_reason = "The message contains more unknown function than usual! (Total: " + tot_unk + ")";
						}
					}

					// Step 21 - Another Pattern - Variant of 13
					// Case: Another wrong offset
					if (MESSAGE.indexOf("5d") !== -1 && MESSAGE.slice(MESSAGE.length - 2, MESSAGE.length) !== "00" && MESSAGE.indexOf("fa00") !== -1){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 9)";
					}

					// Step 22 - Another Pattern - Variant of 13
					// Case: Another wrong offset
					if (MESSAGE.indexOf("7dfafef2") !== -1 && MESSAGE.length < 24 || MESSAGE.indexOf("68") !== -1 && MESSAGE.slice(MESSAGE.length - 2, MESSAGE.length) !== "00"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 10)";
					}

					// Step 23 - Another Pattern - Variant of 13!
					// Case: Another wrong offset
					if (MESSAGE.indexOf("c7") !== -1 && MESSAGE.indexOf("e5") !== -1 && MESSAGE.slice(0, 4) !== "fa02"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 11)";
					}

					// Step 24 - Another Pattern - Variant of 13!
					// Case: Map R20C.RDT returning 60+ messages!
					if (MESSAGE.slice(MESSAGE.length - 8, MESSAGE.length - 6) === "fa" && getAllIndexes(MESSAGE, "00").length > 71 && MESSAGE.length > 70 && MESSAGE.slice(MESSAGE.length - 4, MESSAGE.length) !== "fe00" && MESSAGE.slice(0, 4) !== "fa02"){
						RDT_canAdd = false;
						RDT_canAdd_lvl = 1;
						RDT_canAdd_reason = "The message was extracted from incorrect offset! (Type 12)";
					}
			
					// Final process
					if (RDT_canAdd === true){
						var MSGSTART = RDT_arquivoBruto.indexOf(MESSAGE);
						var MSGEND = parseInt(RDT_arquivoBruto.indexOf(MESSAGE) + MESSAGE.length);
						localStorage.setItem("RDT_MESSAGE_ADICIONAL-" + c, RDT_MSG_infoAdicional);
						localStorage.setItem("RDT_MESSAGE-START-" + c, MSGSTART);
						localStorage.setItem("RDT_MESSAGE-END-" + c, MSGEND);
						localStorage.setItem("RDT_MESSAGE-" + c, MESSAGE);
						RDT_totalMessages++;
					} else {
						var msg = "Something went wrong in message analysis - Message: " + c + " (Final part) - Reason: ";
						if (RDT_canAdd_lvl === 1){
							console.warn("WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
						}
						if (RDT_canAdd_lvl === 2){
							console.error("ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
						}
					}
				} else {
					console.log("Skipping last verification on RDT_MSG_END[" + c + "]");
				}
			}
			c++;
		}
	} else {
		console.log("RDT - MSG Done!");
	}
	log_separador();
	addLog('log', 'RDT - Message scanning completed the test ' + RDT_MSG_CURRENT_TEST + ' and found ' + RDT_totalMessages + ' messages.');
	log_separador();
	if (RDT_MSG_CURRENT_TEST === 1){
		RDT_MSG_RESULT_1 = RDT_totalMessages;
	}
	if (RDT_MSG_CURRENT_TEST === 2){
		RDT_MSG_RESULT_2 = RDT_totalMessages;
	}
	if (RDT_MSG_CURRENT_TEST === 3){
		RDT_MSG_RESULT_3 = RDT_totalMessages;
	}
	if (RDT_MSG_CURRENT_TEST === 4){
		RDT_MSG_RESULT_3 = RDT_totalMessages;
	}
	console.info("\nTeste atual: " + RDT_MSG_CURRENT_TEST + "\nResultado do Teste 1: " + RDT_MSG_RESULT_1 + "\nResultado do Teste 2: " + RDT_MSG_RESULT_2 + "\nResultado do Teste 3: " + RDT_MSG_RESULT_3 + "\nResultado do Teste 4: " + RDT_MSG_RESULT_4 + "\n\n");
	if (RDT_generateMapFile === true && BETA === false){
		RDT_postMessageProcess();
	}
	if (BETA === true){
		RDT_showMenu(1);
	}
	scrollLog();
}
function RDT_postMessageProcess(){
	var c = 0;
	RDT_FILEMAP_MSG = [];
	while(c < RDT_totalMessages){
		var ED = parseInt(localStorage.getItem("RDT_MESSAGE-END-" + c));
		var ST = parseInt(localStorage.getItem("RDT_MESSAGE-START-" + c));
		if (ST !== 0 && ED !== 0){
			console.log(localStorage.getItem("RDT_MESSAGE-END-" + c));
			console.log(localStorage.getItem("RDT_MESSAGE-START-" + c));
			RDT_FILEMAP_MSG.push(ST + "\n" + ED);
			c++;
		} else {
			c++;
		}
	}
	RDT_makeRDTConfigFile();
}
function RDT_lookForRDTConfigFile(){
	var c = 0;
	RDT_generateMapFile = false;
	document.getElementById('RDT_MSG-holder').innerHTML = " ";
	if (fs.existsSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap") === true){
		addLog('log', 'INFO - Loading Map for ' + getFileName(ORIGINAL_FILENAME).toUpperCase() + " (" + APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap)");
		var mapfile = [];
		RDT_FILEMAP_MSG = [];
		RDT_MSG_POINTERS = [];
		RDT_messagesArray = [];
		RDT_MAPFILE = fs.readFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", 'utf-8').toString().split('\n').forEach(function(line){ 
			mapfile.push(line); 
		});
		// Messages (MSG)
		var soma = 0;
		var firstEndOffset = 5;
		var firstStartOffset = 6;
		var e_offset = undefined;
		var s_offset = undefined;
		var tMessages = parseInt(mapfile[parseInt(mapfile.indexOf("[POINTERS]") + 1)]);
		while(c < tMessages){
			s_offset = mapfile[parseInt(firstEndOffset + soma)];
			e_offset = mapfile[parseInt(firstStartOffset + soma)];
			RDT_MSG_POINTERS.push(RDT_arquivoBruto.slice(parseInt(s_offset), parseInt(e_offset)));
			soma = soma + 2;
			c++;
		}
		c = 0;
		var pointerCompiled = "";
		while (c < RDT_MSG_POINTERS.length){
			pointerCompiled = pointerCompiled + RDT_MSG_POINTERS[c];
			c++;
		}
		c = 1;
		soma = 0;
		var SIZE = 0;
		var POS_END = 0;
		var POS_START = 0;
		var LAST_POS_END = 0;
		var MSG_START = RDT_arquivoBruto.indexOf(pointerCompiled) + pointerCompiled.length;
		while(c < RDT_MSG_POINTERS.length){
			if (c !== RDT_MSG_POINTERS.length - 1){
				var pAtual = RDT_MSG_POINTERS[parseInt(c)];
				var pProximo = RDT_MSG_POINTERS[parseInt(c + 1)];
				console.log(pAtual + "\n" + pProximo);
				SIZE = parsePositive(parseInt(processBIO3Vars(pAtual) - processBIO3Vars(pProximo)) * 2);
				//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\
				if (POS_START === 0 && LAST_POS_END === 0){
					console.log(processBIO3Vars(pAtual) + " - " + processBIO3Vars(pProximo));
					POS_START = MSG_START;
					POS_END = MSG_START + SIZE;
					RDT_messagesArray.push(POS_START, POS_END);
				} else {
					console.log(processBIO3Vars(pAtual) + " - " + processBIO3Vars(pProximo));
					POS_START = LAST_POS_END;
					POS_END = POS_START + SIZE;
					RDT_messagesArray.push(POS_START, POS_END);
				}
				console.log(POS_START + " - " + POS_END + "\n\n" + MSG_startMSGDecrypt_Lv1(RDT_arquivoBruto.slice(POS_START, POS_END)) + "\n\nHex: \n" + DEBUG_splitHex(RDT_arquivoBruto.slice(POS_START, POS_END)));
				LAST_POS_END = POS_END;
				c++;
			} else {
				break;
			}
		}
		c = 0;
		soma = 0;
		// Final
		var sta_offset = 0;
		var end_offset = 1;
		while(c < RDT_messagesArray.length){
			if (c !== RDT_messagesArray.length - 1){
				sta_offset = RDT_messagesArray[c];
				end_offset = RDT_messagesArray[c + 1];
				console.log(sta_offset + " - " + end_offset);
				RDT_renderMessages(soma, sta_offset, end_offset);
				c = c + 2;
				soma++;
			} else {
				break;
			}
		}
		// Final
		RDT_MAPFILE = APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap";
		RDT_totalMessages = soma;
		RDT_showMenu(1);
	} else {
		RDT_startMessageAnalysis();
	}
}
function RDT_findPointers(){
	if (RDT_totalMessages !== 0){
		var pont = "";
		var fatorA = 4;
		var fatorB = 0;
		var totalVezesPush = 0;
		var startFirstMessage = parseInt(RDT_FILEMAP_MSG[0].slice(0, RDT_FILEMAP_MSG[0].indexOf("-")));
		console.log("Procurando ponteiro com base em " + startFirstMessage);
		while(totalVezesPush < RDT_totalMessages * 4){
			if (pont === "0000" || pont === "0100"){
				break;
			} else {
				fatorA = fatorA + 4;
				fatorB = fatorB + 4;
				pont = RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB));
				console.log("Found: " + pont);
			}
			totalVezesPush++;
		}
		if (pont === "0000" || pont === "0100"){
			console.log("Ponteiro Encontrado! (Tipo: " + pont + ")");
			console.log("Resultado: \n\nQuantas vezes foi procurado: " + totalVezesPush + "\nFator A: " + fatorA + "\nFator B: " + fatorB + "\nPos: " + parseInt(startFirstMessage - fatorA) + " - " + parseInt(startFirstMessage - fatorB));
			return [totalVezesPush, parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB)];
		} else {
			console.error("ERROR!!");
		}
	}
}
function RDT_renderMessages(id, startOffset, endOffset){
	var SAMPLE = RDT_arquivoBruto.slice(startOffset, endOffset);
	
	console.log("RDT Map File - Start: " + startOffset + " - End: " + endOffset + "\n\nMessage " + id + ":\n" + SAMPLE);
	console.log("Hex View:\n" + DEBUG_splitHex(SAMPLE));

	var MESSAGE_TO_TEXT = MSG_startMSGDecrypt_Lv1(SAMPLE);
	var RDT_MESSAGE_HTML_TEMPLATE = '<div id="RDT_MSG-' + id + '" class="RDT-Item RDT-msg-bg"><input type="button" class="botao-menu right" value="Edit Message" onclick="WIP();">' + 
		'(' + id + ') Message: <div class="RDT-message-content">' + MESSAGE_TO_TEXT + '</div><div class="menu-separador"></div>Hex: <div class="RDT-message-content user-can-select">' + MSG_DECRYPT_LV1_LAST + '</div></div>';
	$("#RDT_MSG-holder").append(RDT_MESSAGE_HTML_TEMPLATE);
}
function RDT_makeRDTConfigFile(){
	var c = 0; // The great c!
	var fatorMinus = 0;
	var foundMessages = "";
	var fileHeader = "Map for " + getFileName(ORIGINAL_FILENAME).toUpperCase() + "\nGenerated With " + APP_NAME + "\n\n[POINTERS]\n";
	while(c < RDT_FILEMAP_MSG.length){
		if (RDT_FILEMAP_MSG[c].indexOf("NaN") !== -1){
			console.warn("WARN - Skipping Message " + c + " - It's a NaN Case!");
			RDT_FILEMAP_MSG.splice(c, 1);
			fatorMinus++;
		} else {
			foundMessages = foundMessages + parseInt(c - fatorMinus) + "\n" + RDT_FILEMAP_MSG[c] + "\n";
		}
		c++;
	}
	console.log(RDT_FILEMAP_MSG);
	var ponteiro_start = RDT_findPointers()[1];
	var max = RDT_findPointers()[0];
	RDT_messagesArray = [];
	RDT_totalMessages = 0;
	foundMessages = "";
	var PONTEIRO = "";
	RDT_MSG_END = [];
	//
	var increment_A = 0;
	var increment_B = 4;
	var totalMessages = 0;
	c = 0;
	while(c < parseInt(max + 1)){
		PONTEIRO = PONTEIRO + parseInt(ponteiro_start + increment_A) + "\n" + parseInt(ponteiro_start + increment_B) + "\n";
		increment_A = increment_A + 4;
		increment_B = increment_B + 4;
		totalMessages++;
		c++;
	}

	totalMessages = totalMessages + "\n";

	// Final
	var FILE_COMPILED = fileHeader + totalMessages + PONTEIRO;
	//console.log(FILE_COMPILED);
	try{
		fs.writeFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", FILE_COMPILED, 'utf-8');
		addLog('log', 'INFO - RDT Map was saved successfully! (' + getFileName(ORIGINAL_FILENAME).toUpperCase() + ')');
		log_separador();
		RDT_generateMapFile = false;
	} catch (err){
		console.error("ERROR while saving RDT map!\n" + err);
		addLog('error', "ERROR - Something went wrong while saving RDT map!");
		addLog('error', err);
	}
	RDT_lookForRDTConfigFile();
	scrollLog();
}
function RDT_finishMessageAnalysis(){
	if (RDT_MSG_RESULT_1 > RDT_MSG_RESULT_2 || RDT_MSG_RESULT_1 > RDT_MSG_RESULT_3 || RDT_MSG_RESULT_1 > RDT_MSG_RESULT_4){
		RDT_MSG_CURRENT_TEST = 1;
	}
	if (RDT_MSG_RESULT_2 < RDT_MSG_RESULT_1 || RDT_MSG_RESULT_2 < RDT_MSG_RESULT_3 || RDT_MSG_RESULT_2 < RDT_MSG_RESULT_4){
		RDT_MSG_CURRENT_TEST = 2;
	}
	if (RDT_MSG_RESULT_3 > RDT_MSG_RESULT_1 || RDT_MSG_RESULT_3 > RDT_MSG_RESULT_2 || RDT_MSG_RESULT_3 > RDT_MSG_RESULT_4){
		RDT_MSG_CURRENT_TEST = 3;
	}
	if (RDT_MSG_RESULT_4 > RDT_MSG_RESULT_1 || RDT_MSG_RESULT_4 > RDT_MSG_RESULT_2 || RDT_MSG_RESULT_4 > RDT_MSG_RESULT_3){
		RDT_MSG_CURRENT_TEST = 4;
	}
	RDT_generateMapFile = true;
	console.info("\nMelhor Opção: " + RDT_MSG_CURRENT_TEST + "\nResultado do Teste 1: " + RDT_MSG_RESULT_1 + "\nResultado do Teste 2: " + RDT_MSG_RESULT_2 + "\nResultado do Teste 3: " + RDT_MSG_RESULT_3 + "\nResultado do Teste 4: " + RDT_MSG_RESULT_4 + "\n\n");
	RDT_readMessages();
	addLog('log', 'RDT - Analysis Complete!');
	scrollLog();
}
function RDT_startMessageAnalysis(){
	RDT_generateMapFile = false;
	addLog('log', 'RDT - Running Message Analysis - Test ' + RDT_MSG_CURRENT_TEST);
	RDT_readMessages();
	addLog('log', 'RDT - Running Message Analysis - Test ' + RDT_MSG_CURRENT_TEST);
	RDT_readMessages();
	addLog('log', 'RDT - Running Message Analysis - Test ' + RDT_MSG_CURRENT_TEST);
	RDT_readMessages();
	addLog('log', 'RDT - Running Message Analysis - Test ' + RDT_MSG_CURRENT_TEST);
	RDT_readMessages();
	RDT_finishMessageAnalysis();
}
function RDT_transferMessageToMSG(startOffset, endOffset){
	var msg_transfer = RDT_arquivoBruto.slice(startOffset, endOffset);
	if (msg_transfer !== null){
		MSG_MAX_LENGTH = msg_transfer.length;
		MSG_CURRENT_RDT_MESSAGE_END = parseInt(endOffset);
		MSG_CURRENT_RDT_MESSAGE_START = parseInt(startOffset);
		MSG_startMSGDecrypt_Lv2(msg_transfer);
		TRANSFER_RDT_TO_MSG();
	} else {
		addLog('error', 'ERROR - Unable to read message because it was not found!');
		scrollLog();
	}
}
function RDT_MSGEndMessageFilter(){
	var d = 0;
	while(d < RDT_MSG_END.length){
		if (RDT_MSG_END[d] > RDT_MSG_finalLenght){
			RDT_MSG_END.splice(d, 1);
		}
		d++;
	}
}
function RDT_pickStartMessages(str){
	var c = 0;
	RDT_messasgesRaw = getAllIndexes(RDT_arquivoBruto, str);
	while (c < RDT_messasgesRaw.length){
		if (RDT_messasgesRaw[c] > RDT_ItensArray[0]){
			RDT_messagesArray.push(RDT_messasgesRaw[c]);
		} else {
			if (RDT_messasgesRaw[c] > RDT_MSG_startLength){
				RDT_messagesArray.push(RDT_messasgesRaw[c]);
			} else {
				console.log("RDT - Wrong message index! - Index: " + RDT_messasgesRaw[c]);
				RDT_messasgesRaw.splice(c, 1);
			}
		}
		c++;
	}
}
function RDT_Backup(){
	checkFolders();
	if (RDT_arquivoBruto !== undefined){
		try{
			var backup_name = getFileName(ORIGINAL_FILENAME) + "-" + currentTime() + ".rdtbackup";
			fs.writeFileSync(APP_PATH + "\\Backup\\RDT\\" + backup_name, RDT_arquivoBruto, 'hex');
			log_separador();
			addLog("log", "INFO: A backup of your RDT file was made successfully! - File: " + backup_name);
			addLog("log", "Folder: " + APP_PATH + "\\Backup\\RDT\\" + backup_name);
		} catch (err){
			addLog("error", "ERROR: Unable to make backup! - " + err);
		}
	} else {
		addLog("error", "ERROR: You can't make a backup if you haven't opened a map yet!");
	}
}
function RDT_RECOMPILE_Lv1(){
	var c = 0;
	if (ORIGINAL_FILENAME !== undefined){
		RDT_Backup();
		try{
			log_separador();
			var RDT_CLONE = RDT_arquivoBruto;
	
			// Apply Itens, Maps and Files
			while(c < RDT_ItensArray.length){
				var NEW_ITEM = localStorage.getItem("RDT_Item-" + c);
				if (NEW_ITEM.slice(0, 2) === "67"){
					var TEMP_RDT_MIN = RDT_CLONE.slice(0, RDT_ItensArray[c] - 4);
					var TEMP_RDT_MAX = RDT_CLONE.slice(parseInt(parseInt(RDT_ItensArray[c] - 4) + 52), RDT_CLONE.length);
					RDT_CLONE = TEMP_RDT_MIN + localStorage.getItem("RDT_Item-" + c) + TEMP_RDT_MAX;
				} else {
					var TEMP_RDT_MIN = RDT_CLONE.slice(0, RDT_ItensArray[c] - 4);
					var TEMP_RDT_MAX = RDT_CLONE.slice(parseInt(parseInt(RDT_ItensArray[c] - 4) + 60), RDT_CLONE.length);
					RDT_CLONE = TEMP_RDT_MIN + localStorage.getItem("RDT_Item-" + c) + TEMP_RDT_MAX;
				}
				c++;
			}

			// Generate the final file
			fs.writeFileSync(ORIGINAL_FILENAME, RDT_CLONE, 'hex');
			addLog("log", "INFO: The file was saved successfully! - File: " + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdt");
			addLog("log", "Folder: " + ORIGINAL_FILENAME);
			log_separador();

			RDT_doAfterSave();
			RDT_arquivoBruto = RDT_CLONE;
			addLog("log", "RDT - Reloading File: " + ORIGINAL_FILENAME);
			RDT_readItens();

		} catch(err){
			addLog("error", "ERROR: Something went wrong on save process!");
			addLog("error", err);
			console.error(err);
		}
	} else {
		addLog("error", "ERROR - You cannot save an RDT file if you have not opened it!");
	}
	scrollLog();
}
function RDT_doAfterSave(){
	RDT_totalItensGeral = undefined;
	RDT_itemIndexRAW = undefined;
	RDT_arquivoBruto = undefined;
	RDT_messagesArray = [];
	RDT_messasgesRaw = [];
	RDT_totalMessages = 0;
	RDT_ItensArray = [];
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_MSG_END = [];
	RDT_editItemCancel();
	scrollLog();
}