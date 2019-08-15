/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/

var RDT_ItensArray = [];
var RDT_totalItensGeral = undefined;
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
	addLog("log", "RDT - The file was loaded successfully! - File: " + rdtFile);
	RDT_readItens();
	RDT_showMenu(1);
}

function RDT_readItens(){
	var c = 0;
	RDT_ItensArray = [];
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_totalItensGeral = 0;
	$("#RDT-item-list").empty();
	
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310900");
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02318000"); // Imprensa, 1F
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310800"); // Imprensa, 2F
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310000"); // Padrão encontrado em (quase) todos os itens
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}
	
	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310500");
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310100");
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310200");
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310300");
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310400"); // Shopping Dist. 3
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310a00"); // R503.rdt - Fábrica
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

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
		$("#RDT-btn-aplicarItem").css({"display": "inline"});
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
		$("#RDT-btn-aplicarItem").css({"display": "none"});
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
		if (parseInt(id, 16) > 133 && parseInt(id, 16) < 162){
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
		'(' + typeId + ', \'' + id + '\', \'' + x + '\', \'' + y + '\', \'' + z + '\', \'' + r + '\', \'' + mp + '\', ' + index + ', ' + parseInt(quant, 16) + ');"><br>Quantity: ' + 
		'<font class="italic">' + parseInt(quant, 16) + '</font><br><div class="menu-separador"></div>X Position: <font class="italic RDT-item-lbl-fix">' + x + '</font><br>' +
		'Y Position: <font class="italic RDT-item-lbl-fix">' + y + '</font><br>Z Position: <font class="italic RDT-item-lbl-fix">' + z + '</font><br>Rotation: ' + 
		'<font class="italic RDT-item-lbl-fix">' + r + '</font><br><div class="RDT-Item-Misc">Identifier: <font class="italic RDT-item-lbl-fix-2">' + ident + '</font><br>' + 
		'Animation: <font class="italic RDT-item-lbl-fix-2">' + mp + '</font><br>Header: <font class="italic RDT-item-lbl-fix-2">' + header + '</font><br></div></div>';
		$("#RDT-item-list").append(RDT_ITEM_HTML_TEMPLATE);
	} catch (err){
		var msg = "ERROR: Unable to render item " + id + " - " + msg;
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
			console.log("Hex Gerada: " + RDT_ITEM_COMPILADO);
		}

		RDT_ITEM_COMPILADO = header + novaX + novaY + novaZ + novaR + novaHex + offset1 + quant + offset2 + novaAnim + offset3;
		
		if (BETA === true){
			console.log(RDT_ITEM_COMPILADO);
		}

		localStorage.setItem("RDT_Item-" + index, RDT_ITEM_COMPILADO);
	
		RDT_RECOMPILE_Lv1();

	} else {
		addLog("warn", "WARNING: " + error);
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
	if (ORIGINAL_FILENAME !== undefined){
		RDT_Backup();
		try{
			log_separador();
			var RDT_CLONE = RDT_arquivoBruto;
			var c = 0;
	
			// Apply Itens
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
			RDT_readItens();

		} catch(err){
			console.error(err);
			addLog("error", "ERROR: Something went wrong! " + err);
		}
	} else {
		addLog("error", "You cannot save an RDT file if you have not opened it!");
	}
}

function RDT_doAfterSave(){
	RDT_totalItensGeral = undefined;
	RDT_itemIndexRAW = undefined;
	RDT_arquivoBruto = undefined;
	RDT_ItensArray = [];
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_editItemCancel();
}