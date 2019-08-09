/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/

var RDT_ItensArray = []
var RDT_totalItens = undefined;
var RDT_itemIndexRAW = undefined;
var RDT_arquivoBruto = undefined;

function RDT_CARREGAR_ARQUIVO(rdtFile){
	localStorage.clear();
	ORIGINAL_FILENAME = rdtFile;
	$("#RDT-item-list").empty();
	var msg = "RDT - Carregado com sucesso! - File: " + rdtFile;
	RDT_arquivoBruto = fs.readFileSync(rdtFile, 'hex');
	addLog("log", msg);
	RDT_readItens();
}

function RDT_readItens(){
	var c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310000"); // Padrão encontrado em (quase) todos os itens
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
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, "02310500");
	while (c < RDT_itemIndexRAW.length){
		RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		c++;
	}

	RDT_totalItens = RDT_ItensArray.length;

	c = 0;
	while (c < RDT_totalItens){
		var RDT_itemStartRange = RDT_ItensArray[c] - 4;
		var RDT_itemEndRange = RDT_ItensArray[c] + 64;
		var RDT_ITEMRAW = RDT_arquivoBruto.slice(RDT_itemStartRange, RDT_itemEndRange);
		localStorage.setItem("RDT_Item-" + c, RDT_ITEMRAW);
		RDT_decompileItens(c, false);
		c++;
	}
	RDT_showMenu(1);
}

function RDT_decompileItens(id, edit){
	var currentItem = localStorage.getItem("RDT_Item-" + id);
	
	var header		  = currentItem.slice(RANGES["RDT_item-header"][0], 	   RANGES["RDT_item-header"][1]);
	var itemIdetifier = currentItem.slice(RANGES["RDT_item-itemIdetifier"][0], RANGES["RDT_item-itemIdetifier"][1]);
	var espaco1		  = currentItem.slice(RANGES["RDT_item-espaco1"][0], 	   RANGES["RDT_item-espaco1"][1]);

	var itemXX = undefined;
	var itemYY = undefined;
	var itemZZ = undefined;
	var itemRR = undefined;
	var itemID = undefined;
	var espaco2 = undefined;
	var itemQuant = undefined;
	var espaco3 = undefined;
	var itemMP = undefined;
	var final = undefined;


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
		final 		  = currentItem.slice(RANGES["RDT_item-0-final"][0], 	   RANGES["RDT_item-0-final"][1]);
	} else {
		itemXX 		  = "[WIP]";
		itemYY 		  = "[WIP]";
		itemZZ 		  = "[WIP]";
		itemRR 		  = "[WIP]";
		itemID 		  = currentItem.slice(RANGES["RDT_item-1-itemID"][0], 	   RANGES["RDT_item-1-itemID"][1]);
		espaco2 	  = currentItem.slice(RANGES["RDT_item-1-espaco2"][0],	   RANGES["RDT_item-1-espaco2"][1]);
		itemQuant 	  = currentItem.slice(RANGES["RDT_item-1-itemQuant"][0],   RANGES["RDT_item-1-itemQuant"][1]);
		espaco3 	  = "[WIP]";
		itemMP 		  = "[WIP]";
		final 		  = "[WIP]";
	}

	if (edit === false){
		RDT_renderItens(id, itemIdetifier, itemID, itemQuant, itemXX, itemYY, itemZZ, itemRR, itemMP);
	}

}

function RDT_renderItens(index, ident, id, quant, x, y, z, r, mp){
	var tipo = undefined;
	var cssFix = undefined;
	console.log(id);
	if (parseInt(id, 16) > 133){
		cssFix = "RDT-file-bg";
		tipo = "File";
	} else {
		tipo = "Item";
		cssFix = "RDT-item-bg";
	}
	var RDT_ITEM_HTML_TEMPLATE = '<div class="RDT-Item ' + cssFix + '" id="RDT-item-' + index + '">(' + index + ') ' + tipo + ': <font class="italic">' + id + ' (' + ITEM[id][0] + ')</font>' + 
		'<input type="button" class="btn-remover-comando" style="margin-top: 0px;" value="Modificar" onclick="RDT_editItem();"><br>Quantidade: ' + 
		'<font class="italic">' + parseInt(quant, 16) + '</font><br><div class="menu-separador"></div>Posição X: <font class="italic">' + x + '</font><br>' +
		'Posição Y: <font class="italic">' + y + '</font><br>Posição Z: <font class="italic">' + z + '</font><br>Posição R: <font class="italic">' + r + '</font><br>' + 
		'<div class="RDT-Item-Misc">Identificador: <font class="italic">' + ident + '</font><br>Animação: <font class="italic">' + mp + '</font><br></div></div>';

	$("#RDT-item-list").append(RDT_ITEM_HTML_TEMPLATE);
}

function RDT_editItem(){
	addLog("warn", "AVISO: Sinto muito mais acho que essa opção está em outro castelo! #WIP");
}