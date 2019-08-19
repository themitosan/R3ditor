/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/

var RDT_MSG_END = [];
var RDT_ItensArray = [];
var RDT_messagesArray = [];
var RDT_totalItensGeral = undefined;
var RDT_totalMessages = undefined;
var RDT_messasgesRaw = undefined;
var RDT_itemIndexRAW = undefined;
var RDT_arquivoBruto = undefined;
var RDT_totalItens = 0;
var RDT_totalFiles = 0;
var RDT_totalMapas = 0;

function RDT_CARREGAR_ARQUIVO(rdtFile){
	RDT_editItemCancel();
	localStorage.clear();
	ORIGINAL_FILENAME = rdtFile;
	RDT_arquivoBruto = fs.readFileSync(rdtFile, 'hex');
	document.getElementById('RDT-aba-menu-2').disabled = "";
	addLog("log", "RDT - The file was loaded successfully! - File: " + rdtFile);
	log_separador();
	RDT_readItens();
	RDT_showMenu(1);
	scrollLog();
}

function RDT_readItens(){
	var c = 0;
	RDT_ItensArray = [];
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
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
		localStorage.setItem("RDT_Item-" + c, RDT_ITEMRAW);
		RDT_decompileItens(c, false);
		c++;
	}
	RDT_readMessages();
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
	// wip
	if (header === "68"){
		itemXX 		  = "[WIP]";
		itemYY 		  = "[WIP]";
		itemZZ 		  = "[WIP]";
		itemRR 		  = "[WIP]";
		itemID 		  = currentItem.slice(RANGES["RDT_item-1-itemID"][0], 	   RANGES["RDT_item-1-itemID"][1]);
		espaco2 	  = currentItem.slice(RANGES["RDT_item-1-espaco2"][0],	   RANGES["RDT_item-1-espaco2"][1]);
		itemQuant 	  = currentItem.slice(RANGES["RDT_item-1-itemQuant"][0],   RANGES["RDT_item-1-itemQuant"][1]);
		espaco3 	  = "[WIP]";
		itemMP 		  = "[WIP]";
	}

	var RDT_motivo = undefined;
	//console.log("Header: " + header + "\nHex: " + itemID);

	if (header === "90" || header === "51" || header === "02"){
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
		var header = localStorage.getItem("RDT_Item-" + index).slice(0, 12);  
		var offset1 = localStorage.getItem("RDT_Item-" + index).slice(30, 32);
		var offset2 = localStorage.getItem("RDT_Item-" + index).slice(34, 42);
		var offset3 = localStorage.getItem("RDT_Item-" + index).slice(44, localStorage.getItem("RDT_Item-" + index).length);
		var RDT_ITEM_COMPILADO = undefined
		if (BETA === true){
			RDT_ITEM_COMPILADO = header + " " + novaX + " " + novaY + " " + novaZ + " " + novaR + " " + novaHex + " " + offset1 + " " + quant + " " + offset2 + " " + novaAnim + " " + offset3;
			console.log("Index: " + index + " - New Hex: " + RDT_ITEM_COMPILADO);
		}
		RDT_ITEM_COMPILADO = header + novaX + novaY + novaZ + novaR + novaHex + offset1 + quant + offset2 + novaAnim + offset3;
		localStorage.setItem("RDT_Item-" + index, RDT_ITEM_COMPILADO);
		RDT_RECOMPILE_Lv1();
	} else {
		addLog("warn", "WARNING: There was an error while processing: " + error);
	}
}

function RDT_readMessages(){
	var c = 0;
	RDT_MSG_END = [];
	var RDT_readTry = 0;
	RDT_messasgesRaw = [];
	RDT_totalMessages = 0;
	RDT_messagesArray = [];
	document.getElementById('RDT_MSG-holder').innerHTML = "<!-- Hello :) -->";

	// Pattern of function start message
	RDT_pickStartMessages("fa02");
	RDT_readTry++;

	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa00");
		RDT_readTry++;
	}

	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa01");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa03");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa04");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa05");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa06");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa07");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa08");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa09");
		RDT_readTry++;
	}
	if (RDT_messagesArray.length < 1){
		RDT_pickStartMessages("fa10");
		RDT_readTry++;
	}
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
			break;
			RDT_canAdd = false;
			RDT_canAdd_lvl = 2;
			RDT_canAdd_reason = "The current pos. in RDT_MSG_END (" + c + ") is Null or Undefined!";
		}
		if (RDT_messagesArray[c] > 43840 || RDT_MSG_END[c] > 43840){
			break;
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message position is very far than usual!";
		}
		var MESSAGE = undefined;
		var MESSAGE_RAW = undefined;
		if (parseInt(RDT_MSG_END[c] + 4) < RDT_messagesArray[c]){
			var subs = c;
			while(parseInt(RDT_MSG_END[subs] + 4) < RDT_messagesArray[c]){
				subs++;
			}
			console.log("Attempts: " + RDT_readTry + " - Index: " + c + " Subs: " + subs + " - " + RDT_messagesArray[c] + ", " + parseInt(RDT_MSG_END[subs] + 4));
			MESSAGE_RAW = RDT_arquivoBruto.slice(RDT_messagesArray[c], parseInt(RDT_MSG_END[subs] + 4));
		} else {
			if (RDT_messagesArray[c] === parseInt(RDT_MSG_END[c] + 4)){
				MESSAGE_RAW = RDT_arquivoBruto.slice(RDT_messagesArray[c], parseInt(RDT_MSG_END[c + 1] + 4));
				if (BETA === true){
					console.log("Modo com finalização na proxima casa");
					console.log("Ranges: " + RDT_messagesArray[c] + ", " + parseInt(RDT_MSG_END[c + 1] + 4));
				}
			} else {
				// Fix for cases like R20B.RDT
				if (RDT_arquivoBruto.slice(parseInt(RDT_MSG_END[c] + 4), parseInt(RDT_MSG_END[c + 1] + 4)).indexOf("fa") === -1){
					MESSAGE_RAW = RDT_arquivoBruto.slice(parseInt(RDT_MSG_END[c] + 4), parseInt(RDT_MSG_END[c + 1] + 4));
					console.log("Modo sem inicialização - 1");
					console.log("Ranges: " + parseInt(RDT_MSG_END[c] + 4) + ", " + parseInt(RDT_MSG_END[c + 1] + 4));
				} else {
					MESSAGE_RAW = RDT_arquivoBruto.slice(RDT_messagesArray[c], parseInt(RDT_MSG_END[c] + 4));
					console.log("Mensagem em modo normal");
					console.log("Ranges: " + RDT_messagesArray[c] + ", " + parseInt(RDT_MSG_END[c] + 4));
				}
			}
		}

		MESSAGE = MESSAGE_RAW.slice(0, parseInt(MESSAGE_RAW.indexOf("fe") + 4));
		console.log("Message " + c + ":\n" + MESSAGE);

		// HACKS - não me orgulho disso
		var RDT_MSG_infoAdicional = undefined;
		if (MESSAGE.indexOf("fa023c03950397039a03c403") === 0){
			RDT_MSG_infoAdicional = "fa023c03950397039a03c403";
			MESSAGE = MESSAGE.slice(RDT_MSG_infoAdicional.length, MESSAGE.length);
		} else {
			RDT_MSG_infoAdicional = "";
		}

		// Process of Validation - Let's see if MESSAGE contains a REAL message!

		// Step 1 - Length
		if (MESSAGE.length > 550 || MESSAGE.length < 15){
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

		// Final process
		if (RDT_canAdd === true){
			localStorage.setItem("RDT_MESSAGE-" + c, MESSAGE);
			localStorage.setItem("RDT_MESSAGE_ADICIONAL-" + c, RDT_MSG_infoAdicional);
			RDT_renderMessages(c);
			RDT_totalMessages++;
		} else {
			var msg = "Something went wrong in message analysis - Message: " + c + " - Reason: ";
			if (RDT_canAdd_lvl === 1){
				console.warn("WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
				addLog('warn', "WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
			}
			if (RDT_canAdd_lvl === 2){
				console.error("ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
				addLog('error', "ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
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
					console.log("Modo sem inicialização - 2");
					console.log("Ranges: " + parseInt(RDT_MSG_END[c] + 4) + ", " + parseInt(RDT_MSG_END[c + 1] + 4));
					MESSAGE = MESSAGE_RAW.slice(0, parseInt(MESSAGE_RAW.indexOf("fe") + 4));
					
					// Step 1 - Length
					if (MESSAGE.length > 550 || MESSAGE.length < 15){
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
			
					// Final process
					if (RDT_canAdd === true){
						localStorage.setItem("RDT_MESSAGE-" + c, MESSAGE);
						localStorage.setItem("RDT_MESSAGE_ADICIONAL-" + c, RDT_MSG_infoAdicional);
						RDT_renderMessages(c);
						RDT_totalMessages++;
					} else {
						var msg = "Something went wrong in message analysis - Message: " + c + " (Final part) - Reason: ";
						if (RDT_canAdd_lvl === 1){
							console.warn("WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
							addLog('warn', "WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
						}
						if (RDT_canAdd_lvl === 2){
							console.error("ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
							addLog('error', "ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
						}
					}
				} else {
					console.log("Skipping last verification on RDT_MSG_END[" + c + "]");
				}
			}
			c++;
		}
	} else {
		console.log("RDT - MSG: Done!");
	}

	addLog('log', 'RDT - Message scanning completed with ' + RDT_readTry + ' attempts and found ' + RDT_totalMessages + ' messages.');
	scrollLog();
}

function RDT_MSGEndMessageFilter(){
	var d = 0;
	while(d < RDT_MSG_END.length){
		if (RDT_MSG_END[d] > 43840){
			RDT_MSG_END.splice(d, 1);
		}
		d++;
	}
}

function RDT_pickStartMessages(str){
	var c = 0;
	var r = undefined;
	if (RDT_arquivoBruto.length > 14088){
		// In the most part of the files, the messages is found after 14.5% of the file!
		// Also, 14088 is the size of the smallest file - R10F.RDT (Boutique)
		r = 7000;
	} else {
		r = 9999;
	}
	RDT_messasgesRaw = getAllIndexes(RDT_arquivoBruto, str);
	while (c < RDT_messasgesRaw.length){
		if (RDT_messasgesRaw[c] > RDT_ItensArray[0]){
			RDT_messagesArray.push(RDT_messasgesRaw[c]);
		} else {
			// In the most cases, the number is higher than 9999
			if (RDT_totalItensGeral < 1 && RDT_messasgesRaw[c] > r){
				RDT_messagesArray.push(RDT_messasgesRaw[c]);
			} else {
				console.log("RDT - Wrong message index! - Index: " + RDT_messasgesRaw[c]);
				RDT_messasgesRaw.splice(c, 1);
			}
		}
		c++;
	}
}

function RDT_renderMessages(id){
	var MESSAGE_TO_TEXT = MSG_startMSGDecrypt_Lv1(localStorage.getItem("RDT_MESSAGE-" + id));
	var RDT_MESSAGE_HTML_TEMPLATE = '<div id="RDT_MSG-' + id + '" class="RDT-Item RDT-msg-bg"><input type="button" class="botao-menu right" value="Edit Message" onclick="WIP();">' + 
		'(' + id + ') Message: <div class="RDT-message-content">' + MESSAGE_TO_TEXT + '</div><div class="menu-separador"></div>Hex: <div class="RDT-message-content user-can-select">' + MSG_DECRYPT_LV1_LAST + '</div></div>';
	$("#RDT_MSG-holder").append(RDT_MESSAGE_HTML_TEMPLATE);
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
	if (ORIGINAL_FILENAME !== undefined){
		RDT_Backup();
		try{
			log_separador();
			var RDT_CLONE = RDT_arquivoBruto;
			var c = 0;
	
			// Apply Itens, Maps and Files
			while(c < RDT_ItensArray.length){
				var TEMP_RDT_MIN = RDT_CLONE.slice(0, RDT_ItensArray[c] - 4);
				var TEMP_RDT_MAX = RDT_CLONE.slice(parseInt(parseInt(RDT_ItensArray[c] - 4) + 52), RDT_CLONE.length);
				RDT_CLONE = TEMP_RDT_MIN + localStorage.getItem("RDT_Item-" + c) + TEMP_RDT_MAX;
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
			console.error(err);
			addLog("error", "ERROR: Something went wrong! " + err);
		}
	} else {
		addLog("error", "ERROR - You cannot save an RDT file if you have not opened it!");
	}
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