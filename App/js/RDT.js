/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/
var RDT_selectedPoint = 0;
var RDT_CURRENT_X = "";
var RDT_CURRENT_Y = "";
var RDT_CURRENT_Z = "";
var RDT_CURRENT_R = "";

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

var RDT_MAPFILE;
var mapfile = [];
var RDT_loop = 0;
var block_size_hex;
var startFirstMessage;
var RDT_loading = false;
var RDT_FILEMAP_MSG = [];
var RDT_MSG_POINTERS = [];
var RDT_requestReload = false;
var RDT_generateMapFile = false;
var RDT_requestReloadWithFix0 = false;
var RDT_requestReloadWithFix1 = false;

var RDT_arquivoBruto;
var RDT_messasgesRaw;
var RDT_itemIndexRAW;
var RDT_totalMessages;
var RDT_totalItensGeral;
var RDT_lastBackup = "";
var RDT_messagesArray = [];
var RDT_MSG_finalLenght = 0;
var RDT_MSG_startLength = 0;
var RDT_lastFileOpened = "";
function RDT_resetVars(){
	mapfile = [];
	RDT_loop = 0;
	RDT_MSG_END = [];
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_loading = false;
	RDT_ItensArray = [];
	RDT_MSG_RESULT_1 = 0;
	RDT_MSG_RESULT_2 = 0;
	RDT_MSG_RESULT_3 = 0;
	RDT_MSG_RESULT_4 = 0;
	RDT_FILEMAP_MSG = [];
	RDT_MSG_POINTERS = [];
	RDT_messagesArray = [];
	RDT_MSG_finalLenght = 0;
	RDT_MSG_startLength = 0;
	RDT_MAPFILE = undefined;
	RDT_MSG_CURRENT_TEST = 0;
	RDT_requestReload = false;
	block_size_hex = undefined;
	RDT_generateMapFile = false;
	RDT_arquivoBruto = undefined;
	RDT_messasgesRaw = undefined;
	RDT_itemIndexRAW = undefined;
	startFirstMessage = undefined;
	RDT_totalMessages = undefined;
	RDT_totalItensGeral = undefined;
	RDT_requestReloadWithFix0 = false;
	RDT_requestReloadWithFix1 = false;
}
function RDT_openFile(file){
	RDT_loop = 0;
	RDT_CARREGAR_ARQUIVO(file);
}
function RDT_CARREGAR_ARQUIVO(rdtFile){
	mapfile = [];
	RDT_doAfterSave();
	RDT_loading = true;
	RDT_editItemCancel();
	localStorage.clear();
	RDT_FILEMAP_MSG = [];
	RDT_MSG_RESULT_1 = 0;
	RDT_MSG_RESULT_2 = 0;
	RDT_MSG_RESULT_3 = 0;
	RDT_MSG_RESULT_4 = 0;
	RDT_MAPFILE = undefined;
	RDT_MSG_CURRENT_TEST = 0;
	block_size_hex = undefined;
	RDT_generateMapFile = false;
	ORIGINAL_FILENAME = rdtFile;
	if (RDT_lastFileOpened !== ORIGINAL_FILENAME){
		RDT_loop = 0;
		RDT_lastFileOpened = rdtFile;
		WZ_saveConfigs(true);
	}
	startFirstMessage = undefined;
	$("#RDT-aba-menu-4").css({'display': 'none'});
	$("#RDT-aba-menu-2").css({"display": "inline"});
	$("#RDT-aba-menu-3").css({"display": "inline"});
	RDT_arquivoBruto = fs.readFileSync(rdtFile, 'hex');
	document.getElementById('RDT_CANVAS_0').innerHTML = "";
	document.getElementById('RDT-aba-menu-2').disabled = "";
	document.getElementById('RDT_MSG-holder').innerHTML = "";
	document.getElementById('RDT_lbl_selectedPoint').innerHTML = "";
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
	RDT_generateItemIndexRaw("02310000");// Padrão encontrado em (quase) todos os itens
	RDT_generateItemIndexRaw("02310500");
	RDT_generateItemIndexRaw("02310100");
	RDT_generateItemIndexRaw("02310200");
	RDT_generateItemIndexRaw("02310300");
	RDT_generateItemIndexRaw("02310400");
	RDT_generateItemIndexRaw("02310a00");// R503.rdt - Fábrica
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
	var itemXX;
	var itemYY;
	var itemZZ;
	var itemRR;
	var itemID;
	var espaco2;
	var itemQuant;
	var espaco3;
	var itemMP;

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
	var RDT_motivo;
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
	var tipo;
	var cssFix;
	var typeId;
	var convert;
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
		RDT_addIconToCanvas(typeId, index, x, y, z, r, id);
		var RDT_ITEM_HTML_TEMPLATE = '<div class="RDT-Item ' + cssFix + '" id="RDT-item-' + index + '">(' + index + ') ' + tipo + ': <font class="italic">' + convert + 
		' (Hex: ' + id + ')</font><input type="button" class="btn-remover-comando" id="RDT_editItemBtn_' + index + '" style="margin-top: 0px;" value="Modify" onclick="RDT_selectPoint(' + index + ');RDT_displayItemEdit' + 
		'(' + typeId + ', \'' + id + '\', \'' + x + '\', \'' + y + '\', \'' + z + '\', \'' + r + '\', \'' + mp + '\', ' + index + ', ' + parseInt(quant, 16) + ', \'' + header + '\');"><br>Quantity: ' + 
		'<font class="italic">' + parseInt(quant, 16) + '</font><br><div class="menu-separador"></div>X Position: <font class="italic RDT-item-lbl-fix">' + x + '</font><br>' +
		'Y Position: <font class="italic RDT-item-lbl-fix">' + y + '</font><br>Z Position: <font class="italic RDT-item-lbl-fix">' + z + '</font><br>Rotation: ' + 
		'<font class="italic RDT-item-lbl-fix">' + r + '</font><br><div class="RDT-Item-Misc">Identifier: <font class="italic RDT-item-lbl-fix-2">' + ident + '</font><br>' + 
		'Animation: <font class="italic RDT-item-lbl-fix-2">' + mp + '</font><br>Header: <font class="italic RDT-item-lbl-fix-2">' + header + '</font><br></div></div>';
		$("#RDT-item-list").append(RDT_ITEM_HTML_TEMPLATE);
	} catch (err){
		var msg = "RDT - ERROR: Unable to render item " + id + " - " + msg;
		addLog("error", msg);
		console.error(msg);
	}
	scrollLog();
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
	var novaX = document.getElementById('RDT_lbl_point_x_hex').value.slice(0, 4).toLowerCase();
	var novaY = document.getElementById('RDT_lbl_point_y_hex').value.slice(0, 4).toLowerCase();
	var novaZ = document.getElementById('RDT_lbl_point_z_hex').value.slice(0, 4).toLowerCase();
	var novaR = document.getElementById('RDT_lbl_point_r_hex').value.slice(0, 4).toLowerCase();
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
	var error;
	var canBuild = true;
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
	console.clear();
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
	var current_rdt = getFileName(ORIGINAL_FILENAME).toLowerCase();
	RDT_MSG_startLength = 0;
	RDT_MSG_finalLenght = RDT_arquivoBruto.length;
	document.getElementById('RDT_MSG-holder').innerHTML = "";
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
		// Step 7 - Number of specific hex value
		// Case: Hex 00 appears WAY more than usual
		RDT_MSGfilter = getAllIndexes(MESSAGE, "00");
		if (RDT_MSG_CURRENT_TEST === 3 && RDT_MSGfilter.length > 61){
			RDT_canAdd = false;
			RDT_canAdd_lvl = 1;
			RDT_canAdd_reason = "The message contains WAY more cases of 00! (Total: " + RDT_MSGfilter.length + ")";
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
			localStorage.setItem("RDT_MESSAGE-START-" + c, MSGSTART);
			localStorage.setItem("RDT_MESSAGE-END-" + c, MSGEND);
			localStorage.setItem("RDT_MESSAGE-" + c, MESSAGE);
			RDT_totalMessages++;
		} else {
			var msg = "Something went wrong in message analysis - Message: " + c + " - Reason: ";
			if (RDT_canAdd_lvl === 1){
				//console.warn("WARNING - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
			}
			if (RDT_canAdd_lvl === 2){
				//console.error("ERROR - " + msg + RDT_canAdd_reason + " - This message will be discarted.");
			}
		}
		c++;
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
	if (RDT_generateMapFile === true){
		RDT_postMessageProcess();
	}
	scrollLog();
}
function RDT_postMessageProcess(){
	var c = 0;
	var plus = 0;
	console.log("Post Message: \nTotal Messages: " + RDT_totalMessages + "\n\n" + localStorage.getItem("RDT_MESSAGE-END-" + c) + "\n" + localStorage.getItem("RDT_MESSAGE-START-" + c));
	if (RDT_totalMessages === 1){
		plus = 1;
	}
	RDT_FILEMAP_MSG = [];
	var fixValue = 0;
	if (RDT_requestReloadWithFix1 === true){
		fixValue = 1;
	}
	while(c < parseInt(RDT_totalMessages + fixValue)){
		var ED = parseInt(localStorage.getItem("RDT_MESSAGE-END-" + c));
		var ST = parseInt(localStorage.getItem("RDT_MESSAGE-START-" + c));
		console.log("Adicionando itens na RDT_FILEMAP_MSG: \n" + localStorage.getItem("RDT_MESSAGE-START-" + c) + "\n" + localStorage.getItem("RDT_MESSAGE-END-" + c));
		if (ST !== 0 && ED !== 0 && RDT_arquivoBruto.slice(ST, ST + 2) === "fa"){
			RDT_FILEMAP_MSG.push(ST + "\n" + ED);
			c++;
		} else {
			c++;
		}
	}
	RDT_makeRDTConfigFile();
}
function RDT_findPointers(){
	var c = 0;
	document.title = APP_NAME + " - Generating File Map (Step 3 / 4)";
	if (getFileName(ORIGINAL_FILENAME) === "r40c"){
		RDT_totalMessages++;
	}
	if (RDT_totalMessages !== 0){
		var pont = "";
		var fatorA = 4;
		var fatorB = 0;
		var totalVezesPush = 0;
		while (c < RDT_FILEMAP_MSG.length){
			if (RDT_FILEMAP_MSG[c].indexOf("NaN") !== -1){
				RDT_FILEMAP_MSG.splice(c, 1);
			}
			c++;
		}
		if (startFirstMessage === undefined){
			var askPrompt = prompt("File: " + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".RDT\n\nInsert the first message - it looks like:\n\"FA 02 XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX FE 00\"\n\"FA 01 XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX FE 00\"");
			if (askPrompt !== "" && askPrompt !== null && RDT_arquivoBruto.indexOf(solveHEX(askPrompt)) !== -1){
				startFirstMessage = RDT_arquivoBruto.indexOf(solveHEX(askPrompt));
			} else {
				RDT_findPointers();
			}
		}
		console.log("Looking for pointer with base " + startFirstMessage);
		while(totalVezesPush < RDT_totalMessages * 20){
			if (RDT_mapHack2[getFileName(ORIGINAL_FILENAME)] !== undefined){
				if (RDT_POINTERTYPE4[pont] !== undefined){
					break;
				} else {
					fatorA = fatorA + 4;
					fatorB = fatorB + 4;
					pont = RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB));
					if (RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB) + 8) === "00fa02fcfe00"){
						fatorA = 4;
						fatorB = 0;
						totalVezesPush = 0;
						startFirstMessage = parseInt(RDT_arquivoBruto.indexOf("fa02fcfe00"));
					} else {
						console.log("Pointer - Current Result: " + pont);
						totalVezesPush++;
					}
				}
			} else {
				if (getFileName(ORIGINAL_FILENAME) === "r210" || getFileName(ORIGINAL_FILENAME) === "r301"){
					if (RDT_THIRDPOINTERTYPE[pont] !== undefined){
						break;
					} else {
						fatorA = fatorA + 4;
						fatorB = fatorB + 4;
						pont = RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB));
						if (RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB) + 8) === "00fa02fcfe00"){
							fatorA = 4;
							fatorB = 0;
							totalVezesPush = 0;
							startFirstMessage = parseInt(RDT_arquivoBruto.indexOf("fa02fcfe00"));
						} else {
							console.log("Pointer - Current Result: " + pont);
							totalVezesPush++;
						}
					}
				} else {
					if (getFileName(ORIGINAL_FILENAME) === "r30d"){
						if (RDT_THIRDPOINTERTYPE[pont] !== undefined){
							break;
						} else {
							fatorA = fatorA + 4;
							fatorB = fatorB + 4;
							pont = RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB));
							if (RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB) + 8) === "00fa02fcfe00"){
								fatorA = 4;
								fatorB = 0;
								totalVezesPush = 0;
								startFirstMessage = parseInt(RDT_arquivoBruto.indexOf("fa02fcfe00"));
							} else {
								console.log("Pointer - Current Result: " + pont);
								totalVezesPush++;
							}
						}
					} else {
						if (RDT_FIRSTPOINTERTYPE[pont] !== undefined){
							break;
						} else {
							fatorA = fatorA + 4;
							fatorB = fatorB + 4;
							pont = RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB));
							if (RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB) + 8) === "00fa02fcfe00"){
								fatorA = 4;
								fatorB = 0;
								totalVezesPush = 0;
								startFirstMessage = parseInt(RDT_arquivoBruto.indexOf("fa02fcfe00"));
							} else {
								console.log("Pointer - Current Result: " + pont);
								totalVezesPush++;
							}
						}
					}
				}
			}
		}
		var fake = pont;
		var pointerTest = RDT_MSG_pointerTest(parseInt(startFirstMessage - fatorB));
		if (pointerTest === false){
			pont = "";
			fatorA = 4;
			fatorB = 0;
			totalVezesPush = 0;
			while(totalVezesPush < RDT_totalMessages * 20){
				if (RDT_SECONDPOINTERTYPE[pont] !== undefined && pont !== fake){
					break;
				} else {
					fatorA = fatorA + 4;
					fatorB = fatorB + 4;
					pont = RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB));
					if (RDT_arquivoBruto.slice(parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB) + 8) === "00fa02fcfe00"){
						fatorA = 4;
						fatorB = 0;
						totalVezesPush = 0;
						startFirstMessage = parseInt(RDT_arquivoBruto.indexOf("fa02fcfe00"));
					} else {
						console.log("Pointer - Current Result: " + pont);
						totalVezesPush++;
					}
				}
			}
		}
		if (RDT_FIRSTPOINTERTYPE[pont] !== undefined || RDT_SECONDPOINTERTYPE[pont] !== undefined || RDT_THIRDPOINTERTYPE !== undefined){
			console.log("Pointer Found! (Type: " + pont + ")");
			console.log("Result: \n\nTotal Searches: " + totalVezesPush + "\nFator A: " + fatorA + "\nFator B: " + fatorB + "\nPos: " + parseInt(startFirstMessage - fatorA) + " - " + parseInt(startFirstMessage - fatorB));
			return [totalVezesPush, parseInt(startFirstMessage - fatorA), parseInt(startFirstMessage - fatorB)];
		} else {
			console.error("ERROR - Unable to find pointers on this file!");
			addLog('error', "ERROR - Unable to find pointers on this file!");
			scrollLog();
		}
	}
}
function RDT_MSG_pointerTest(fPointer){
	var firstPointer = processBIO3Vars(RDT_arquivoBruto.slice(fPointer, fPointer + 4));
	var secondPointer = processBIO3Vars(RDT_arquivoBruto.slice(fPointer + 4, fPointer + 8));
	if (parseInt(secondPointer - firstPointer) < 0){
		console.log("Pointer test deu errado!\n Second: " + secondPointer + " - First: " + firstPointer);
		return false;
	} else {
		return true;
	}
}
function RDT_makeRDTConfigFile(){
	var c = 0;
	var fatorMinus = 0;
	var foundMessages = "";
	var fileHeader = "Map for " + getFileName(ORIGINAL_FILENAME).toUpperCase() + "\nGenerated With " + APP_NAME + "\n\n[POINTERS]\n";
	console.log(RDT_FILEMAP_MSG);
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
	var PONTEIRO = "";
	foundMessages = "";
	var totalMessages = 0;
	RDT_requestReload = true;
	document.getElementById('RDT_MSG-holder').innerHTML = "";
	if (RDT_FILEMAP_MSG.length !== 0){
		if (RDT_requestReloadWithFix0 === true){
			var CASE1 = RDT_arquivoBruto.indexOf("fa00fc");
			if (CASE1 !== -1 && CASE1 < parseInt(RDT_FILEMAP_MSG[0].slice(0, RDT_FILEMAP_MSG[0].indexOf("-")))){
				RDT_FILEMAP_MSG[0] = CASE1 + "-" + RDT_FILEMAP_MSG[0].slice(RDT_FILEMAP_MSG[0].indexOf("-"), RDT_FILEMAP_MSG[0].length);
			}
		}
		var ponteiro_start = RDT_findPointers()[1];
		var max = RDT_findPointers()[0];
		RDT_messagesArray = [];
		RDT_totalMessages = 0;
		RDT_MSG_END = [];
		var increment_A = 0;
		var increment_B = 4;
		c = 0;
		while(c < parseInt(max + 1)){
			PONTEIRO = PONTEIRO + parseInt(ponteiro_start + increment_A) + "\n" + parseInt(ponteiro_start + increment_B) + "\n";
			increment_A = increment_A + 4;
			increment_B = increment_B + 4;
			totalMessages++;
			c++;
		}
	} else {
		addLog('info', 'INFO - R3ditor was unable to find any messages on this file!');
		scrollLog();
	}
	document.title = APP_NAME + " - Generating File Map (Step 4 / 4)";
	totalMessages = totalMessages + "\n";
	// Final
	var FILE_COMPILED = fileHeader + totalMessages + PONTEIRO;
	try{
		fs.writeFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", FILE_COMPILED, 'utf-8');
		addLog('log', 'INFO - RDT Map was saved successfully! (' + getFileName(ORIGINAL_FILENAME).toUpperCase() + ')');
		log_separador();
		RDT_generateMapFile = false;
	} catch (err){
		console.error("ERROR - Something went wrong while saving RDT map!\n" + err);
		addLog('error', "ERROR - Something went wrong while saving RDT map!");
		addLog('error', err);
	}
	RDT_lookForRDTConfigFile();
	scrollLog();
}
function RDT_generateDummyMapFile(){
	var FILE_COMPILED = "Map for " + getFileName(ORIGINAL_FILENAME).toUpperCase() + "\nGenerated With " + APP_NAME + "\n\n[POINTERS]\n0";
	try{
		fs.writeFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", FILE_COMPILED, 'utf-8');
		addLog('log', 'INFO - RDT Map was saved successfully! (' + getFileName(ORIGINAL_FILENAME).toUpperCase() + ')');
		log_separador();
		RDT_generateMapFile = false;
	} catch (err){
		console.error("ERROR - Something went wrong while saving RDT map!\n" + err);
		addLog('error', "ERROR - Something went wrong while saving RDT map!");
		addLog('error', err);
	}
}
function RDT_requestFix(fix){
	RDT_loop++;
	localStorage.clear();
	RDT_FILEMAP_MSG = [];
	RDT_FILEMAP_MSG = [];
	RDT_MSG_POINTERS = [];
	RDT_totalMessages = 0;
	RDT_messagesArray = [];
	RDT_MAPFILE = undefined;
	RDT_generateMapFile = false;
	document.getElementById('RDT_MSG-holder').innerHTML = "";
	if (fs.existsSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap") === true){
		fs.unlinkSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap");
	}
	if (fix === 0){
		RDT_requestReloadWithFix0 = true;
	}
	if (fix === 1){
		RDT_requestReloadWithFix1 = true;
	}
	log_separador();
	addLog("warn", "WARN - Generating map file using fix " + fix);
	log_separador();
	RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
}
function RDT_finishMessageAnalysis(){
	document.title = APP_NAME + " - Generating File Map (Step 2 / 4)";
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
	document.title = APP_NAME + " - Generating File Map (Step 1 / 4)";
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
function RDT_lookForRDTConfigFile(){
	var c = 0;
	if (getFileName(ORIGINAL_FILENAME) === "r216" || getFileName(ORIGINAL_FILENAME) === "r50b" || getFileName(ORIGINAL_FILENAME) === "r212"){
		RDT_loop = 665;
	} else {
		RDT_loop++;
	}
	RDT_generateMapFile = false;
	startFirstMessage = undefined;
	document.title = APP_NAME + " - Please wait...";
	document.getElementById('RDT_MSG-holder').innerHTML = "";
	if (fs.existsSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap") === true && RDT_loop < 4){
		addLog('log', 'INFO - Loading Map for ' + getFileName(ORIGINAL_FILENAME).toUpperCase() + " (" + APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap)");
		RDT_FILEMAP_MSG = [];
		RDT_MSG_POINTERS = [];
		RDT_messagesArray = [];
		RDT_MAPFILE = fs.readFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", 'utf-8').toString().split('\n').forEach(function(line){ 
			mapfile.push(line); 
		});
		// Messages (MSG)
		var soma = 0;
		console.clear();
		var BLOCK_MSGS = "";
		var firstEndOffset = 5;
		var firstStartOffset = 6;
		var e_offset = undefined;
		var s_offset = undefined;
		var pointerSplit = "Undefined";
		var tMessages = parseInt(mapfile[parseInt(mapfile.indexOf("[POINTERS]") + 1)]);
		if (tMessages !== 0){
			while(c < tMessages){
				s_offset = mapfile[parseInt(firstEndOffset + soma)];
				e_offset = mapfile[parseInt(firstStartOffset + soma)];
				RDT_MSG_POINTERS.push(RDT_arquivoBruto.slice(parseInt(s_offset), parseInt(e_offset)));
				soma = soma + 2;
				c++;
			}
			c = 0;
			pointerSplit = "";
			var pointerCompiled = "";
			while (c < RDT_MSG_POINTERS.length){
				pointerCompiled = pointerCompiled + RDT_MSG_POINTERS[c];
				pointerSplit = pointerSplit + RDT_MSG_POINTERS[c].toUpperCase() + " ";
				c++;
			}
			console.log("File: " + getFileName(ORIGINAL_FILENAME).toUpperCase() + " - Pointers: " + pointerCompiled + "\nHex: " + DEBUG_splitHex(pointerCompiled, 1));
			c = 1;
			soma = 0;
			var SIZE = 0;
			var POS_END = 0;
			var MSG_START = 0;
			var POS_START = 0;
			var sta_offset = 0;
			var end_offset = 1;
			var LAST_POS_END = 0;
			if (RDT_mapHack[getFileName(ORIGINAL_FILENAME)] !== undefined){
				MSG_START = e_offset;
			} else {
				MSG_START = RDT_arquivoBruto.indexOf(pointerCompiled) + pointerCompiled.length;
			}
			if (getFileName(ORIGINAL_FILENAME) === "r301"){
				RDT_MSG_POINTERS.splice(0, 1);
			}
			localStorage.setItem("RDT_POINTER_" + getFileName(ORIGINAL_FILENAME).toUpperCase(), pointerCompiled);
			if (RDT_MSG_POINTERS.length !== 2){
				while(c < RDT_MSG_POINTERS.length){
					if (c !== RDT_MSG_POINTERS.length - 1){
						var pAtual = RDT_MSG_POINTERS[parseInt(c)];
						var pProximo = RDT_MSG_POINTERS[parseInt(c + 1)];
						SIZE = parsePositive(parseInt(processBIO3Vars(pAtual) - processBIO3Vars(pProximo)) * 2);
						if (POS_START === 0 && LAST_POS_END === 0){
							POS_START = MSG_START;
							POS_END = MSG_START + SIZE;
							RDT_messagesArray.push(POS_START, POS_END);
						} else {
							POS_START = LAST_POS_END;
							POS_END = POS_START + SIZE;
							RDT_messagesArray.push(POS_START, POS_END);
						}
						BLOCK_MSGS = BLOCK_MSGS + RDT_arquivoBruto.slice(POS_START, POS_END);
						LAST_POS_END = POS_END;
						c++;
					} else {
						POS_START = LAST_POS_END;
						var SEEK = getAllIndexes(RDT_arquivoBruto, "fe");
						while(parseInt(SEEK[0]) < LAST_POS_END){
							SEEK.splice(0, 1);
						}
						if (SEEK.length > 0){
							// If is an climax message
							if (RDT_arquivoBruto.slice(SEEK[1], parseInt(SEEK[1] + 4)) === "fefe"){
								POS_END = parseInt(SEEK[1] + 4);
								RDT_messagesArray.push(POS_START, POS_END);
							} else {
								POS_END = parseInt(SEEK[0] + 4);
								RDT_messagesArray.push(POS_START, POS_END);
							}
							BLOCK_MSGS = BLOCK_MSGS + RDT_arquivoBruto.slice(POS_START, POS_END);
						} else {
							console.error('Something went wrong on search - Unable to find end of the last message! (Seek Result: ' + SEEK + ')');
							addLog('error', 'Something went wrong on search - Unable to find end of the last message! (Seek Result: ' + SEEK + ')');
							scrollLog();
						}
						c++;
					}
				}
			} else {
				POS_START = MSG_START;
				var SEEK = getAllIndexes(RDT_arquivoBruto, "fe");
				while(parseInt(SEEK[0]) < POS_START){
					SEEK.splice(0, 1);
				}
				if (SEEK.length > 0){
					// If is an climax message
					if (RDT_arquivoBruto.slice(SEEK[1], parseInt(SEEK[1] + 4)) === "fefe"){
						POS_END = parseInt(SEEK[1] + 4);
						RDT_messagesArray.push(POS_START, POS_END);
					} else {
						POS_END = parseInt(SEEK[0] + 4);
						RDT_messagesArray.push(POS_START, POS_END);
					}
					BLOCK_MSGS = BLOCK_MSGS + RDT_arquivoBruto.slice(POS_START, POS_END);
				} else {
					console.error('Something went wrong on search - Unable to find end of the last message! (Seek Result: ' + SEEK + ')');
					addLog('error', 'Something went wrong on search - Unable to find end of the last message! (Seek Result: ' + SEEK + ')');
					scrollLog();
				}
			}
			// Final
			c = 0;
			soma = 0;
			sta_offset = 0;
			end_offset = 1;
			while(c < parseInt(RDT_messagesArray.length - 1)){
				sta_offset = RDT_messagesArray[c];
				end_offset = RDT_messagesArray[c + 1];
				if (sta_offset !== end_offset){
					console.log("Message " + soma + ": \nStart: " + sta_offset + "\nEnd: " + end_offset); 
					console.log(RDT_arquivoBruto.slice(sta_offset, end_offset) + "\nHex: " + DEBUG_splitHex(RDT_arquivoBruto.slice(sta_offset, end_offset), 0));
					sessionStorage.setItem("MESSAGE_HEX_" + parseInt(soma + 1), RDT_arquivoBruto.slice(sta_offset, end_offset));
					sessionStorage.setItem("MESSAGE_START_" + parseInt(soma + 1), sta_offset);
					sessionStorage.setItem("MESSAGE_END_" + parseInt(soma + 1), end_offset);
					RDT_renderMessages(parseInt(soma + 1), sta_offset, end_offset);
				} else {
					console.warn('Something went wrong on search - Unable to render message ' + soma + ' because the start offset is the same value of end offset! (Maybe is R203.RDT?)');
					addLog('warn', 'Something went wrong on search - Unable to render message ' + soma + ' because the start offset is the same value of end offset! (Maybe is R203.RDT?)');
					scrollLog();
				}
				c = c + 2;
				soma++;
			}
			RDT_totalMessages = soma;
		} else {
			RDT_totalMessages = 0;
		}
		if (RDT_requestReloadWithFix1 === false && RDT_totalMessages === 0){
			RDT_requestFix(1);
		}
		if (RDT_requestReloadWithFix1 === true && RDT_totalMessages === 0){
			RDT_requestReloadWithFix1 = false;
			addLog('log', 'INFO - R3ditor was unable to find any messages on this map!');
			scrollLog();
		}
		if (RDT_requestReloadWithFix0 === true){
			RDT_totalMessages = 0;
			RDT_requestReloadWithFix0 = false;
			RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
		}
		// Final
		if (RDT_requestReload === false){
			startFirstMessage = undefined;
			if (RDT_totalMessages !== 0){
				block_size_hex = mapfile[parseInt(mapfile.indexOf("[MSGBLOCK]") + 1)];
				var block_size_str = parseInt(block_size_hex, 16);
				var c_block_size_hex = BLOCK_MSGS.length.toString(16);
				var c_block_size_str = BLOCK_MSGS.length;
				if (c_block_size_str === block_size_str){
					$("#MSG_RDT_lbl_blockUsage").addClass('green');
					$("#RDT_lbl-msg_c_blockHex").addClass('green');
					$("#RDT_lbl-msg_c_blockHex").removeClass('red');
				} else {
					$("#RDT_lbl-msg_c_blockHex").addClass('red');
					$("#RDT_lbl-msg_c_blockHex").removeClass('green');
					$("#MSG_RDT_lbl_blockUsage").removeClass('green');
				}
				document.getElementById('RDT_lbl-msg_blockHex').innerHTML = "Hex: " + block_size_hex.toUpperCase() + " (Bio 3 Mode: " + parseDecimalToBIO3Var(block_size_str, 0).toUpperCase() + " - String: " + block_size_str + ")";
				document.getElementById('RDT_lbl-msg_c_blockHex').innerHTML = "Hex: " + c_block_size_hex.toUpperCase() + " (" + parsePercentage(parseInt(c_block_size_hex, 16), parseInt(block_size_hex, 16)) + "%)";
				document.getElementById('MSG_RDT_lbl_blockSize').innerHTML = block_size_hex.toUpperCase();
				document.getElementById('MSG_RDT_lbl_blockUsage').innerHTML = c_block_size_hex.toUpperCase() + " (" + Math.floor((parseInt(c_block_size_hex, 16) / parseInt(block_size_hex, 16)) * 100) + "%)";
			} else {
				document.getElementById('RDT_lbl-msg_blockHex').innerHTML = "Undefined";
				document.getElementById('RDT_lbl-msg_c_blockHex').innerHTML = "Undefined";
			}
			RDT_MAPFILE = APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap";
			document.getElementById('RDT_lbl-msg_pointerSplit').innerHTML = pointerSplit;
			RDT_loading = false;
			RDT_showMenu(1);
		} else {
			var newMapFile = fs.readFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", 'utf-8');
			var BLOCK_SECTOR = newMapFile + "\n[MSGBLOCK]\n" + BLOCK_MSGS.length.toString(16) + "\n";
			try{
				fs.writeFileSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap", BLOCK_SECTOR, 'utf-8');
			}catch(err){
				console.error(err);
				addLog('error', 'ERROR - Something went wrong while saving mapfile!');
				addLog('error', err);
				scrollLog();
			}
			RDT_requestReload = false;
			RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
		}
	} else {
		if (RDT_loop < 3){
			RDT_startMessageAnalysis();
		} else {
			RDT_generateDummyMapFile();
			RDT_totalMessages = 0;
			startFirstMessage = undefined;
			RDT_requestReloadWithFix0 = false;
			RDT_requestReloadWithFix1 = false;
			$("#RDT_lbl-msg_c_blockHex").removeClass('red');
			$("#RDT_lbl-msg_c_blockHex").removeClass('green');
			if (fs.existsSync(APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap") === true){
				RDT_MAPFILE = APP_PATH + "\\Configs\\RDT\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdtmap";
			} else {
				RDT_MAPFILE = "The map was not generated due an error";
			}
			RDT_showMenu(1);
		}
	}
}
function RDT_renderMessages(id, startOffset, endOffset){
	if (startOffset !== endOffset){
		var SAMPLE = RDT_arquivoBruto.slice(startOffset, endOffset);
		var MESSAGE_TO_TEXT = MSG_startMSGDecrypt_Lv1(SAMPLE);
		var RDT_MESSAGE_HTML_TEMPLATE = '<div id="RDT_MSG-' + id + '" class="RDT-Item RDT-msg-bg"><input type="button" class="botao-menu right" value="Edit Message" onclick="RDT_transferMessageToMSG(' + id + ');">' + 
			'(' + id + ') Message: <div class="RDT-message-content">' + MESSAGE_TO_TEXT + '</div><div class="menu-separador"></div>Hex: <div class="RDT-message-content user-can-select">' + MSG_DECRYPT_LV1_LAST + '</div></div>';
		$("#RDT_MSG-holder").append(RDT_MESSAGE_HTML_TEMPLATE);
	}
}
function RDT_hideCanvasTab(){
	var c = 0;
	var cItem = localStorage.getItem('RDT_Item-' + RDT_selectedPoint);
	var offset1 = cItem.slice(0, RANGES["RDT_item-0-itemXX"][0]);
	var offset2 = cItem.slice(RANGES["RDT_item-0-itemRR"][1], cItem.length);
	var X = document.getElementById('RDT_lbl_point_x_hex').value.toLowerCase();
	var Y = document.getElementById('RDT_lbl_point_y_hex').value.toLowerCase();
	var Z = document.getElementById('RDT_lbl_point_z_hex').value.toLowerCase();
	var R = document.getElementById('RDT_lbl_point_r_hex').value.toLowerCase();
	
	var NOVA_POS = offset1 + X + Y + Z + R + offset2;
	localStorage.setItem('RDT_Item-' + RDT_selectedPoint, NOVA_POS);

	document.getElementById('RDT-item-list').innerHTML = "";
	document.getElementById('RDT_CANVAS_0').innerHTML = "";

	var tItems = RDT_totalItens;
	RDT_totalItens = 0;

	while(c < tItems){
		console.warn(localStorage.getItem("RDT_Item-" + c));
		RDT_decompileItens(c, false);
		c++;
	}

	//
	$("#RDT-aba-menu-4").css({'display': 'none'});
	$("#RDT-aba-menu-3").trigger('click');
}
function RDT_selectPoint(id){
	var c = 0;
	RDT_selectedPoint = id;
	document.getElementById('RDT_lbl_selectedPoint').innerHTML = RDT_selectedPoint;
	var cItem = localStorage.getItem("RDT_Item-" + RDT_selectedPoint);
	if (cItem.slice(0, 2) === "67"){
		RDT_CURRENT_X = cItem.slice(RANGES["RDT_item-0-itemXX"][0], RANGES["RDT_item-0-itemXX"][1]);
		RDT_CURRENT_Y = cItem.slice(RANGES["RDT_item-0-itemYY"][0], RANGES["RDT_item-0-itemYY"][1]);
		RDT_CURRENT_Z = cItem.slice(RANGES["RDT_item-0-itemZZ"][0], RANGES["RDT_item-0-itemZZ"][1]);
		RDT_CURRENT_R = cItem.slice(RANGES["RDT_item-0-itemRR"][0], RANGES["RDT_item-0-itemRR"][1]);
		var itemName = cItem.slice(RANGES["RDT_item-0-itemID"][0], RANGES["RDT_item-0-itemID"][1]);
		document.getElementById('RDT_lbl_point_x_bio').value = processBIO3Vars(RDT_CURRENT_X);
		document.getElementById('RDT_lbl_point_y_bio').value = processBIO3Vars(RDT_CURRENT_Y);
		document.getElementById('RDT_lbl_point_z_bio').value = processBIO3Vars(RDT_CURRENT_Z);
		document.getElementById('RDT_lbl_point_r_bio').value = processBIO3Vars(RDT_CURRENT_R);
		document.getElementById('RDT_lbl_point_x_hex').value = RDT_CURRENT_X.toUpperCase();
		document.getElementById('RDT_lbl_point_y_hex').value = RDT_CURRENT_Y.toUpperCase();
		document.getElementById('RDT_lbl_point_z_hex').value = RDT_CURRENT_Z.toUpperCase();
		document.getElementById('RDT_lbl_point_r_hex').value = RDT_CURRENT_R.toUpperCase();
		document.getElementById('RDT_lbl_px').innerHTML = processBIO3Vars(RDT_CURRENT_X);
		document.getElementById('RDT_lbl_py').innerHTML = processBIO3Vars(RDT_CURRENT_Y);
		document.getElementById('RDT_lbl_pz').innerHTML = processBIO3Vars(RDT_CURRENT_Z);
		document.getElementById('RDT_lbl_pr').innerHTML = processBIO3Vars(RDT_CURRENT_R);
		document.getElementById('RDT_slider_X').value = processBIO3Vars(RDT_CURRENT_X);
		document.getElementById('RDT_slider_Y').value = processBIO3Vars(RDT_CURRENT_Y);
		document.getElementById('RDT_slider_Z').value = processBIO3Vars(RDT_CURRENT_Z);
		document.getElementById('RDT_slider_R').value = processBIO3Vars(RDT_CURRENT_R);
		if (parseInt(itemName, 16) < 134){
			document.getElementById('RDT_lbl_canvasItemName').innerHTML = ITEM[itemName][0];
		}
		if (parseInt(itemName, 16) > 133 && parseInt(itemName, 16) < 163){
			document.getElementById('RDT_lbl_canvasItemName').innerHTML = FILES[itemName][0];
		}
		if (parseInt(itemName, 16) > 162){
			document.getElementById('RDT_lbl_canvasItemName').innerHTML = RDT_MAPAS[itemName][0];
		}
		while (c < 100){
			$("#RDT_ICONCANVAS_" + c).removeClass('render-item-select');
			c++;
		}
		$("#RDT_ICONCANVAS_" + RDT_selectedPoint).addClass('render-item-select');
	} else {
		document.getElementById('RDT_lbl_selectedPoint').innerHTML = "";
	}
}
function RDT_addIconToCanvas(type, id, x, y, z, r, hex){
	var tipo;
	var nome;
	if (parseInt(hex, 16) < 134){
		tipo = "Item";
		nome = "(" + hex + ") " + ITEM[hex][0];
	}
	if (parseInt(hex, 16) > 133 && parseInt(hex, 16) < 163){
		tipo = "File";
		nome = "(" + hex + ") " + FILES[hex][0];
	}
	if (parseInt(hex, 16) > 162){
		tipo = "Map";
		nome = "(" + hex + ") " + RDT_MAPAS[hex][0];
	}
	if (x === "" || x === undefined){
		x = "0000";
	}
	if (y === "" || y === undefined){
		y = "0000";
	}
	if (z === "" || z === undefined){
		z = "0000";
	}
	if (r === "" || r === undefined){
		r = "0000";
	}
	var HTML_ICONCANVAS_TEMPLATE = '<div class="render-item render-item-color-' + type + '" title="Type: ' + tipo + '\nName: ' + nome + 
		'\n\nOriginal Info:\nX: ' + processBIO3Vars(x) + ' (' + x.toUpperCase() + ')\nY: ' + processBIO3Vars(y) + ' (' + y.toUpperCase() + ')\nZ: ' + processBIO3Vars(z) + 
		' (' + z.toUpperCase() + ')\nR: ' + processBIO3Vars(r) + ' (' + r.toUpperCase() + ')" id="RDT_ICONCANVAS_'+ id + '">' + id +'</div>';
	var posX = calcCanvasXY(parsePercentage(processBIO3Vars(x), 65535), 410);
	var posY = calcCanvasXY(parsePercentage(processBIO3Vars(y), 65535), 410);
	var posZ = calcCanvasXY(parsePercentage(processBIO3Vars(z), 65535), 0.5) + 1;
	//var posR = processBIO3Vars(r) / 16; // <-- isso não está correto ainda

	// Final
	$("#RDT_CANVAS_0").append(HTML_ICONCANVAS_TEMPLATE);
	$("#RDT_ICONCANVAS_" + id).css({"left": posX + "px", "top": posY + "px", "transform": "scale(" + posZ + ")"});
}
function RDT_updateCanvasInfos(mode){
	// Ranges
	if (mode === 0){
		RDT_CURRENT_X = parseDecimalToBIO3Var(document.getElementById('RDT_slider_X').value, 0);
		RDT_CURRENT_Y = parseDecimalToBIO3Var(document.getElementById('RDT_slider_Y').value, 0);
		RDT_CURRENT_Z = parseDecimalToBIO3Var(document.getElementById('RDT_slider_Z').value, 0);
		RDT_CURRENT_R = parseDecimalToBIO3Var(document.getElementById('RDT_slider_R').value, 0);
	}
	// Decimal
	if (mode === 1){
		if (document.getElementById('RDT_lbl_point_x_bio').value > 65535){
			document.getElementById('RDT_lbl_point_x_bio').value = 65535;
		}
		if (document.getElementById('RDT_lbl_point_y_bio').value > 65535){
			document.getElementById('RDT_lbl_point_y_bio').value = 65535;
		}
		if (document.getElementById('RDT_lbl_point_z_bio').value > 65535){
			document.getElementById('RDT_lbl_point_z_bio').value = 65535;
		}
		if (document.getElementById('RDT_lbl_point_r_bio').value > 65535){
			document.getElementById('RDT_lbl_point_r_bio').value = 65535;
		}
		if (document.getElementById('RDT_lbl_point_x_bio').value < 0){
			document.getElementById('RDT_lbl_point_x_bio').value = 0;
		}
		if (document.getElementById('RDT_lbl_point_y_bio').value < 0){
			document.getElementById('RDT_lbl_point_y_bio').value = 0;
		}
		if (document.getElementById('RDT_lbl_point_z_bio').value < 0){
			document.getElementById('RDT_lbl_point_z_bio').value = 0;
		}
		if (document.getElementById('RDT_lbl_point_r_bio').value < 0){
			document.getElementById('RDT_lbl_point_r_bio').value = 0;
		}
		RDT_CURRENT_X = parseDecimalToBIO3Var(document.getElementById('RDT_lbl_point_x_bio').value, 0);
		RDT_CURRENT_Y = parseDecimalToBIO3Var(document.getElementById('RDT_lbl_point_y_bio').value, 0);
		RDT_CURRENT_Z = parseDecimalToBIO3Var(document.getElementById('RDT_lbl_point_z_bio').value, 0);
		RDT_CURRENT_R = parseDecimalToBIO3Var(document.getElementById('RDT_lbl_point_r_bio').value, 0);
	}
	// Bio 3 Mode
	if (mode === 2){
		if (parseInt(document.getElementById('RDT_lbl_point_x_hex').value, 16) > 65535){
			document.getElementById('RDT_lbl_point_x_hex').value = "FFFF";
		}
		if (parseInt(document.getElementById('RDT_lbl_point_y_hex').value, 16) > 65535){
			document.getElementById('RDT_lbl_point_y_hex').value = "FFFF";
		}
		if (parseInt(document.getElementById('RDT_lbl_point_z_hex').value, 16) > 65535){
			document.getElementById('RDT_lbl_point_z_hex').value = "FFFF";
		}
		if (parseInt(document.getElementById('RDT_lbl_point_r_hex').value, 16) > 65535){
			document.getElementById('RDT_lbl_point_r_hex').value = "FFFF";
		}
		if (document.getElementById('RDT_lbl_point_x_hex').value === "" || document.getElementById('RDT_lbl_point_x_hex').value.length > 4){
			document.getElementById('RDT_lbl_point_x_hex').value = "0000";
		}
		if (document.getElementById('RDT_lbl_point_y_hex').value === "" || document.getElementById('RDT_lbl_point_y_hex').value.length > 4){
			document.getElementById('RDT_lbl_point_y_hex').value = "0000";
		}
		if (document.getElementById('RDT_lbl_point_z_hex').value === "" || document.getElementById('RDT_lbl_point_z_hex').value.length > 4){
			document.getElementById('RDT_lbl_point_z_hex').value = "0000";
		}
		if (document.getElementById('RDT_lbl_point_r_hex').value === "" || document.getElementById('RDT_lbl_point_r_hex').value.length > 4){
			document.getElementById('RDT_lbl_point_r_hex').value = "0000";
		}
		if (document.getElementById('RDT_lbl_point_x_hex').value.length > 3 && document.getElementById('RDT_lbl_point_x_hex').value.length < 5){
			RDT_CURRENT_X = document.getElementById('RDT_lbl_point_x_hex').value;
		}
		if (document.getElementById('RDT_lbl_point_y_hex').value.length > 3 && document.getElementById('RDT_lbl_point_y_hex').value.length < 5){
			RDT_CURRENT_Y = document.getElementById('RDT_lbl_point_y_hex').value;
		}
		if (document.getElementById('RDT_lbl_point_z_hex').value.length > 3 && document.getElementById('RDT_lbl_point_z_hex').value.length < 5){
			RDT_CURRENT_Z = document.getElementById('RDT_lbl_point_z_hex').value;
		}
		if (document.getElementById('RDT_lbl_point_r_hex').value.length > 3 && document.getElementById('RDT_lbl_point_r_hex').value.length < 5){
			RDT_CURRENT_R = document.getElementById('RDT_lbl_point_r_hex').value;
		}
	}
	var posX = calcCanvasXY(parsePercentage(processBIO3Vars(RDT_CURRENT_X), 65535), 410);
	var posY = calcCanvasXY(parsePercentage(processBIO3Vars(RDT_CURRENT_Y), 65535), 410);
	var posZ = calcCanvasXY(parsePercentage(processBIO3Vars(RDT_CURRENT_Z), 65535), 0.5) + 1;
	//var posR = processBIO3Vars(RDT_CURRENT_R) / 16;
	document.getElementById('RDT_lbl_point_x_bio').value = processBIO3Vars(RDT_CURRENT_X);
	document.getElementById('RDT_lbl_point_y_bio').value = processBIO3Vars(RDT_CURRENT_Y);
	document.getElementById('RDT_lbl_point_z_bio').value = processBIO3Vars(RDT_CURRENT_Z);
	document.getElementById('RDT_lbl_point_r_bio').value = processBIO3Vars(RDT_CURRENT_R);
	document.getElementById('RDT_lbl_point_x_hex').value = RDT_CURRENT_X.toUpperCase();
	document.getElementById('RDT_lbl_point_y_hex').value = RDT_CURRENT_Y.toUpperCase();
	document.getElementById('RDT_lbl_point_z_hex').value = RDT_CURRENT_Z.toUpperCase();
	document.getElementById('RDT_lbl_point_r_hex').value = RDT_CURRENT_R.toUpperCase();
	document.getElementById('RDT_lbl_px').innerHTML = processBIO3Vars(RDT_CURRENT_X);
	document.getElementById('RDT_lbl_py').innerHTML = processBIO3Vars(RDT_CURRENT_Y);
	document.getElementById('RDT_lbl_pz').innerHTML = processBIO3Vars(RDT_CURRENT_Z);
	document.getElementById('RDT_lbl_pr').innerHTML = processBIO3Vars(RDT_CURRENT_R);
	document.getElementById('RDT_slider_X').value = processBIO3Vars(RDT_CURRENT_X);
	document.getElementById('RDT_slider_Y').value = processBIO3Vars(RDT_CURRENT_Y);
	document.getElementById('RDT_slider_Z').value = processBIO3Vars(RDT_CURRENT_Z);
	document.getElementById('RDT_slider_R').value = processBIO3Vars(RDT_CURRENT_R);
	$("#RDT_ICONCANVAS_" + RDT_selectedPoint).css({"left": posX + "px", "top": posY + "px", "transform": "scale(" + posZ + ")"});
}
function RDT_posMoveDiagonal(mode){
	if (mode === 0){
		document.getElementById('RDT_slider_X').value = document.getElementById('RDT_slider_D').value;
		document.getElementById('RDT_slider_Y').value = document.getElementById('RDT_slider_D').value;
		document.getElementById('RDT_lbl_pd').innerHTML = document.getElementById('RDT_slider_D').value;
	}
	if (mode === 1){
		var x = 65535 - document.getElementById('RDT_slider_D2').value;
		var y = 0 + document.getElementById('RDT_slider_D2').value;
		document.getElementById('RDT_slider_X').value = x;
		document.getElementById('RDT_slider_Y').value = y;
		document.getElementById('RDT_lbl_pd2').innerHTML = document.getElementById('RDT_slider_D2').value;
	}
	RDT_updateCanvasInfos(0);
}
function RDT_canvasResetPos(){
	document.getElementById('RDT_slider_X').value = 32767;
	document.getElementById('RDT_slider_Y').value = 32767;
	document.getElementById('RDT_slider_D').value = 32767;
	document.getElementById('RDT_slider_D2').value = 32767;
	document.getElementById('RDT_lbl_pd').innerHTML = "32767";
	document.getElementById('RDT_lbl_pd2').innerHTML = "32767";
	RDT_updateCanvasInfos(0);
}
function RDT_transferMessageToMSG(msgId){
	var msg_transfer = sessionStorage.getItem("MESSAGE_HEX_" + msgId);
	if (msg_transfer !== null && msg_transfer !== undefined){
		MSG_ID = msgId;
		console.clear();
		document.getElementById('RDT_MSG_NUMBER').innerHTML = "Message " + msgId + " - ";
		MSG_CURRENT_RDT_MESSAGE_END = parseInt(sessionStorage.getItem("MESSAGE_END_" + msgId));
		MSG_CURRENT_RDT_MESSAGE_START = parseInt(sessionStorage.getItem("MESSAGE_START_" + msgId));
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
			addLog("log", "INFO - A backup of your RDT file was made successfully! - File: " + backup_name);
			addLog("log", "Folder - " + APP_PATH + "\\Backup\\RDT\\" + backup_name);
			RDT_lastBackup = APP_PATH + "\\Backup\\RDT\\" + backup_name;
			WZ_saveConfigs(true);
		} catch (err){
			addLog("error", "ERROR - Unable to make backup! - " + err);
		}
	} else {
		addLog("error", "ERROR - You can't make a backup if you haven't opened a map yet!");
	}
}
function RDT_restoreLastBackup(){
	if (RDT_lastBackup !== ""){
		var loc = "Unknown";
		var mName = getFileName(RDT_lastBackup).slice(0, getFileName(RDT_lastBackup).indexOf("-")).toUpperCase();
		if (RDT_locations[mName] !== undefined && RDT_locations[mName] !== null){
			loc = RDT_locations[mName][0];
		}
		var ask = confirm("Restore Last Backup\n\nMap: " + mName + "\nOriginal Local Name: " + loc + "\nPath: " + RDT_lastBackup + "\n\nDo you want to proceed?");
		if (ask === true){
			try{
				if (fs.existsSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\" + mName + ".RDT") === true){
					fs.unlinkSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\" + mName + ".RDT");
				}
				RDT_restoreLastBackup_1(mName);
			} catch (err){
				console.error(err);
				addLog('error', "ERROR - Unable to delete RDT!");
				addLog('error', err);
			}
		}
	}
}
function RDT_restoreLastBackup_1(name){
	try{
		var BK = fs.readFileSync(RDT_lastBackup, 'hex');
		fs.writeFileSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\" + name + ".RDT", BK, 'hex');
		alert('File: ' + name + '.RDT\n\nThe backup was restored successfully!');
		if (ORIGINAL_FILENAME !== undefined){
			RDT_CARREGAR_ARQUIVO(APP_PATH + "\\Assets\\DATA_E\\RDT\\" + name + ".RDT");
		}
	} catch (err){
		console.error(err);
		addLog('error', "ERROR - Unable to restore backup!");
		addLog('error', err);
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
			document.getElementById('RDT_CANVAS_0').innerHTML = "";
			addLog("log", "RDT - Reloading File: " + ORIGINAL_FILENAME);
			RDT_readItens();
			$("#RDT-aba-menu-3").trigger('click');
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