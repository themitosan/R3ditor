/*
	R3ditor - save.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/

var SAVE_arquivoBruto = undefined;
var CURRENT_SAVE_SLOT = 1;

// Mapa dos Saves
var INDICADOR_01 = undefined;
var INDICADOR_02 = undefined;
var INDICADOR_03 = undefined;
var INDICADOR_04 = undefined;
var INDICADOR_05 = undefined;
var INDICADOR_06 = undefined;
var INDICADOR_07 = undefined;
var INDICADOR_08 = undefined;
var INDICADOR_09 = undefined;
var INDICADOR_10 = undefined;
var INDICADOR_11 = undefined;
var INDICADOR_12 = undefined;
var INDICADOR_13 = undefined;
var INDICADOR_14 = undefined;
var INDICADOR_15 = undefined;

/*

	Ranges

*/

var SAVE_INDICADOR_HEADER 	      = undefined; // Header completa
var SAVE_INDICADOR_HEADER_START   = undefined; // 0x0000 at� 0x2000
var SAVE_INDICADOR_HEADER_MIDDLE  = undefined;
var SAVE_INDICADOR_HEADER_END     = undefined;

var S_HEADER 					  = undefined; // Cabe�alho de cada slot de save
var S_END 					      = undefined; // Final de cada slot de save
var range_0x2204_0x2207           = undefined;
var range_0x2209_0x220D           = undefined;
var range_0x2210_0x2211           = undefined;
var range_0x2217_0x2217           = undefined;
var range_0x2219_0x2219           = undefined;
var range_0x221C_0x224D           = undefined;
var range_0x224F_0x224F           = undefined;
var range_0x2251_0x225D           = undefined;
var range_0x225F_0x23FE           = undefined;
var range_0x2400_0x2402           = undefined;
var range_0x240A_0x240B			  = undefined;
var range_0x2534_0x2534 		  = undefined;
var range_0x2537_0x254B			  = undefined;
var range_0x2674_0x2674			  = undefined;
var range_0x2677_0x28D3			  = undefined;

/*

	Variaveis de Save

*/

// Ba�
var JILL_BAU = [];
var CARLOS_BAU = [];

// Invent�rios
var JILL_INVENT = [];
var CARLOS_INVENT = [];

// Dificuldade
var dificuldade = undefined;

// Total Saves
var totalVezesSaves = undefined;

// Sala de Save
var localSave = undefined;

// Local da cidade
var lCidade = undefined;

// Roupa
var outf = undefined;

// Player Atual
var cPlayer = undefined;

// Jill - Arma equipada
var jArmaEquip = undefined;

// Carlos - Arma equipada
var cArmaEquip = undefined;

// Jill e Carlos - Sidepack
var jSide = undefined;
var cSide = undefined;

// Posi��o X e Y
var xPos = undefined;
var yPos = undefined;

// Room / Event
var rEvent = undefined

// Epilogos
var epil = undefined;

// Files
var j_files = undefined;

// Vers�o do game
var gVersion = undefined;
var gDetails = undefined;

// Mapas Obtidos - wip
var mapExtractA = undefined;
var mapExtractB = undefined;

// Vida e Poison
var life = undefined;
var veneno = undefined;

// Tempo
var IGTExtract = undefined;
var h_0x2200 = undefined;
var h_0x2201 = undefined;
var h_0x2202 = undefined;
var h_0x2203 = undefined;

/* 

	Misc.

*/

// Variaveis de tempo
var milesimos = 0;
var decimos   = 0;
var segundos  = 0;
var minutos   = 0;
var hora      = 0;
var dia       = 0;

function MAKE_SAVE(slot){
	if (ORIGINAL_FILENAME !== undefined){
		S_HEADER = localStorage.getItem("Save_" + slot).slice(RANGES["save_HEADER"][0], RANGES["save_HEADER"][1]); 					// 0x2000 - 0x21FF

		// Gerando Invent�rio da Jill
		var J_INV_TEMP = "";
		var c = 0;
		while(c < JILL_INVENT.length){
			J_INV_TEMP = J_INV_TEMP + JILL_INVENT[c];
			c++;
		}

		// Gerando Ba� da Jill
		var J_BOX_TEMP = "";
		c = 0;
		while(c < JILL_BAU.length){
			J_BOX_TEMP = J_BOX_TEMP + JILL_BAU[c];
			c++;
		}

		// Gerando Invent�rio do Carlos
		var C_INV_TEMP = "";
		var c = 0;
		while(c < CARLOS_INVENT.length){
			C_INV_TEMP = C_INV_TEMP + CARLOS_INVENT[c];
			c++;
		}

		// Gerando Ba� do Carlos
		var C_BOX_TEMP = "";
		c = 0;
		while(c < CARLOS_BAU.length){
			C_BOX_TEMP = C_BOX_TEMP + CARLOS_BAU[c];
			c++;
		}

		// Ranges n�o mapeadas
		range_0x2204_0x2207 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2204-0x2207"][0], RANGES["0x2204-0x2207"][1]); // 0x2204 - 0x2207
		range_0x2209_0x220D = localStorage.getItem("Save_" + slot).slice(RANGES["0x2209-0x220D"][0], RANGES["0x2209-0x220D"][1]); // 0x2209 - 0x220D
		range_0x2210_0x2211 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2210-0x2211"][0], RANGES["0x2210-0x2211"][1]); // 0x2209 - 0x220D
		range_0x2217_0x2217 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2217-0x2217"][0], RANGES["0x2217-0x2217"][1]); // 0x2217
		range_0x2219_0x2219 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2219-0x2219"][0], RANGES["0x2219-0x2219"][1]); // 0x2219
		range_0x221C_0x224D = localStorage.getItem("Save_" + slot).slice(RANGES["0x221C-0x224D"][0], RANGES["0x221C-0x224D"][1]); // 0x221C - 0x224D
		range_0x224F_0x224F = localStorage.getItem("Save_" + slot).slice(RANGES["0x224F-0x224F"][0], RANGES["0x224F-0x224F"][1]); // 0x224F
		range_0x2251_0x225D = localStorage.getItem("Save_" + slot).slice(RANGES["0x2251-0x225D"][0], RANGES["0x2251-0x225D"][1]); // 0x2251 - 0x225D
		range_0x225F_0x23FE = localStorage.getItem("Save_" + slot).slice(RANGES["0x225F-0x23FE"][0], RANGES["0x225F-0x23FE"][1]); // 0x225F - 0x23FE
		range_0x2400_0x2402 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2400-0x2402"][0], RANGES["0x2400-0x2402"][1]); // 0x2400 - 0x2402
		range_0x240A_0x240B = localStorage.getItem("Save_" + slot).slice(RANGES["0x240A-0x240B"][0], RANGES["0x240A-0x240B"][1]); // 0x240A - 0x240B
		range_0x2534_0x2534 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2534-0x2534"][0], RANGES["0x2534-0x2534"][1]); // 0x2534
		range_0x2537_0x254B = localStorage.getItem("Save_" + slot).slice(RANGES["0x2537-0x254B"][0], RANGES["0x2537-0x254B"][1]); // 0x2537 - 0x254B
		range_0x2674_0x2674 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2674-0x2674"][0], RANGES["0x2674-0x2674"][1]); // 0x2674
		range_0x2677_0x28D3 = localStorage.getItem("Save_" + slot).slice(RANGES["0x2677-0x28D3"][0], RANGES["0x2677-0x28D3"][1]); // 0x2677 - 0x28D3
	
		S_END = localStorage.getItem("Save_" + slot).slice(RANGES["save_END"][0], RANGES["save_END"][1]);
	
		TEMP_SLOT = S_HEADER + IGTExtract + range_0x2204_0x2207 + dificuldade + range_0x2209_0x220D + xPos + range_0x2210_0x2211 + yPos + life + epil + 
		range_0x2217_0x2217 + totalVezesSaves + range_0x2219_0x2219 + veneno + localSave + range_0x221C_0x224D + lCidade + range_0x224F_0x224F + rEvent + 
		range_0x2251_0x225D + cPlayer + range_0x225F_0x23FE + mapExtractA + range_0x2400_0x2402 + mapExtractB + j_files + range_0x240A_0x240B + J_INV_TEMP + 
		J_BOX_TEMP + range_0x2534_0x2534 + jArmaEquip + jSide + range_0x2537_0x254B + C_INV_TEMP + C_BOX_TEMP + range_0x2674_0x2674 + cArmaEquip + cSide + 
		range_0x2677_0x28D3 + outf + S_END;
	
		// Final
		if (TEMP_SLOT.length === RANGES["slot-offset"][0]){
			localStorage.setItem("Save_" + slot, TEMP_SLOT);
			addLog("log", "O slot " + slot + " foi salvo com sucesso!");
			finalizeSave();
		} else {
			var msg = "N�o foi poss�vel salvar o slot por que o tamanho final do slot gerado n�o � igual ao esperado - Tamanho Esperado: " + RANGES["slot-offset"][0] + " - Tamanho atual: " + TEMP_SLOT.length;
			console.error("ERRO: " + msg);
			addLog("error", msg);
		}
	} else {
		var msg = "N�o � poss�vel gerar slot se o arquivo for indefinido! (File: " + ORIGINAL_FILENAME + ")"
		addLog("error", "ERRO: " + msg);
		console.error(msg);
	}
}

function finalizeSave() {
	var FILE = SAVE_INDICADOR_HEADER + 
	localStorage.Save_1 + 
	localStorage.Save_2 + 
	localStorage.Save_3 + 
	localStorage.Save_4 + 
	localStorage.Save_5 + 
	localStorage.Save_6 + 
	localStorage.Save_7 + 
	localStorage.Save_8 + 
	localStorage.Save_9 + 
	localStorage.Save_10 + 
	localStorage.Save_11 + 
	localStorage.Save_12 + 
	localStorage.Save_13 + 
	localStorage.Save_14 + 
	localStorage.Save_15
	fs.writeFileSync(ORIGINAL_FILENAME, FILE, 'hex');
	TEMP_SLOT = "";
	CARREGAR_SAVE(ORIGINAL_FILENAME);
}

function CARREGAR_SAVE(sFile){
	localStorage.clear();
	SAVE_arquivoBruto = undefined;
	ORIGINAL_FILENAME = sFile;
	log_separador();
	addLog("log", "Carregando arquivo de save: " + sFile);
	log_separador();
	SAVE_arquivoBruto = fs.readFileSync(sFile, 'hex');
	
	// Montar Arquivo Nas variaveis para reconstruir novamente
	// Essa parte do processo ser� feita aqui pois essas informa��es n�o ser�o modificadas pelo usu�rio

	INDICADOR_01 = SAVE_arquivoBruto.slice(RANGES["he-indicador-1"][0],   RANGES["he-indicador-1"][1]);
	INDICADOR_02 = SAVE_arquivoBruto.slice(RANGES["he-indicador-2"][0],   RANGES["he-indicador-2"][1]);
	INDICADOR_03 = SAVE_arquivoBruto.slice(RANGES["he-indicador-3"][0],   RANGES["he-indicador-3"][1]);
	INDICADOR_04 = SAVE_arquivoBruto.slice(RANGES["he-indicador-4"][0],   RANGES["he-indicador-4"][1]);
	INDICADOR_05 = SAVE_arquivoBruto.slice(RANGES["he-indicador-5"][0],   RANGES["he-indicador-5"][1]);
	INDICADOR_06 = SAVE_arquivoBruto.slice(RANGES["he-indicador-6"][0],   RANGES["he-indicador-6"][1]);
	INDICADOR_07 = SAVE_arquivoBruto.slice(RANGES["he-indicador-7"][0],   RANGES["he-indicador-7"][1]);
	INDICADOR_08 = SAVE_arquivoBruto.slice(RANGES["he-indicador-8"][0],   RANGES["he-indicador-8"][1]);
	INDICADOR_09 = SAVE_arquivoBruto.slice(RANGES["he-indicador-9"][0],   RANGES["he-indicador-9"][1]);
	INDICADOR_10 = SAVE_arquivoBruto.slice(RANGES["he-indicador-10"][0], RANGES["he-indicador-10"][1]);
	INDICADOR_11 = SAVE_arquivoBruto.slice(RANGES["he-indicador-11"][0], RANGES["he-indicador-11"][1]);
	INDICADOR_12 = SAVE_arquivoBruto.slice(RANGES["he-indicador-12"][0], RANGES["he-indicador-12"][1]);
	INDICADOR_13 = SAVE_arquivoBruto.slice(RANGES["he-indicador-13"][0], RANGES["he-indicador-13"][1]);
	INDICADOR_14 = SAVE_arquivoBruto.slice(RANGES["he-indicador-14"][0], RANGES["he-indicador-14"][1]);
	INDICADOR_15 = SAVE_arquivoBruto.slice(RANGES["he-indicador-15"][0], RANGES["he-indicador-15"][1]);
	SAVE_INDICADOR_HEADER_START  = SAVE_arquivoBruto.slice(RANGES["he-esp-incial"][0], RANGES["he-esp-incial"][1]);
	SAVE_INDICADOR_HEADER_MIDDLE = SAVE_arquivoBruto.slice(RANGES["he-esp-meio"][0],   RANGES["he-esp-meio"][1]);
	SAVE_INDICADOR_HEADER_END 	 = SAVE_arquivoBruto.slice(RANGES["he-esp-final"][0],  RANGES["he-esp-final"][1]);
	SAVE_INDICADOR_HEADER 		 = SAVE_INDICADOR_HEADER_START + INDICADOR_01 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_02 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_03 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_04 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_05 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_06 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_07 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_08 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_09 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_10 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_11 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_12 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_13 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_14 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_15 + SAVE_INDICADOR_HEADER_END;
	
	localStorage.setItem("Save_1", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0],  	  RANGES["slot-offset"][0] * 2));
	localStorage.setItem("Save_2", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 2,  RANGES["slot-offset"][0] * 3));
	localStorage.setItem("Save_3", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 3,  RANGES["slot-offset"][0] * 4));
 
	localStorage.setItem("Save_4", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 4,  RANGES["slot-offset"][0] * 5));
	localStorage.setItem("Save_5", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 5,  RANGES["slot-offset"][0] * 6));
	localStorage.setItem("Save_6", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 6,  RANGES["slot-offset"][0] * 7));
	localStorage.setItem("Save_7", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 7,  RANGES["slot-offset"][0] * 8));
	localStorage.setItem("Save_8", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 8,  RANGES["slot-offset"][0] * 9));
	localStorage.setItem("Save_9", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0]  * 9,  RANGES["slot-offset"][0] * 10));
	localStorage.setItem("Save_10", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 10, RANGES["slot-offset"][0] * 11));
	localStorage.setItem("Save_11", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 11, RANGES["slot-offset"][0] * 12));
	localStorage.setItem("Save_12", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 12, RANGES["slot-offset"][0] * 13));
	localStorage.setItem("Save_13", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 13, RANGES["slot-offset"][0] * 14));
	localStorage.setItem("Save_14", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 14, RANGES["slot-offset"][0] * 15));
	localStorage.setItem("Save_15", SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 15, RANGES["slot-offset"][0] * 16));

	// Render Infos
	save_renderSlot(CURRENT_SAVE_SLOT);
}

function save_renderSlot(slotID){
	if (slotID < 1 || slotID > 15 || slotID === undefined){
		slotID === 1;
	}
	resetTimer();
	cleanForSaveLoad();
	document.title = APP_NAME + " - Editor de Saves (*.sav) - Slot " + slotID + " - Arquivo: " + ORIGINAL_FILENAME;
	$("#lbl-currentSlot").html(slotID);
	CURRENT_SAVE_SLOT = slotID;
	save_renderInvent(slotID);
}

function save_renderSaveSlots() {
	var cu = 1;
	var to = 16;
	var checker = undefined;
	var tmpSaveSlot = undefined;
	while(cu < to){
		tmpSaveSlot = SAVE_arquivoBruto.slice(RANGES["he-indicador-" + cu][0], RANGES["he-indicador-" + cu][1]);
		checker = tmpSaveSlot.slice(0, 4);
		if (checker === "5100"){ 
			// Save presente
			var totVSave = localStorage.getItem("Save_" + cu).slice(RANGES["totalSaves"][0], RANGES["totalSaves"][1]);
			var locSave = localStorage.getItem("Save_" + cu).slice(RANGES["localSave"][0], RANGES["localSave"][1]);
			$("#slt-save-" + cu).html("(" + parseInt(totVSave, 16) + ") " + LOCAIS[locSave][0]);
			$("#slt-save-" + cu).addClass("slot-presente");
		} else {
			// Save Vazio
			$("#slt-save-" + cu).html("Vazio");
			$("#slt-save-" + cu).addClass("slot-ausente");
		}
		cu++;
	}

	// Final
	save_Backup();
	SAVE_showMenu(0);
}

function save_renderInvent(s_slot, mode){
	JILL_INVENT = [];
	CARLOS_INVENT = [];
	// Invent�rio da Jill
	var itens = 11;
	var atual = 1;
	while(atual !== itens){
		var slt = localStorage.getItem('Save_' + s_slot).slice(RANGES["jillInvent-" + atual][0], RANGES["jillInvent-" + atual][1]);
		JILL_INVENT.push(slt);
		var ite = slt.slice(0, 2);
		var qua = slt.slice(2, 4);
		var atr = slt.slice(4, 6);
		var nul = slt.slice(6, 8);
		addInvent(0, ite, qua, atual, atr, nul);
		if (ite.length < 2){
			ite = "0" + ite;
		}
		document.getElementById('btn-exchange-item-' + atual).href = "javascript:showModItem(" + 1 + ", " + 0 + ", " + atual + ", '" + ite + "');";
		atual++;
	}
	// Invent�rio do Carlos
	log_separador();
	itens = 11;
	atual = 1;
	while(atual !== itens){
		var slt = localStorage.getItem('Save_' + s_slot).slice(RANGES["carlosInvent-" + atual][0], RANGES["carlosInvent-" + atual][1]);
		CARLOS_INVENT.push(slt);
		var ite = slt.slice(0, 2);
		var qua = slt.slice(2, 4);
		var atr = slt.slice(4, 6);
		var nul = slt.slice(6, 8);
		addInvent(1, ite, qua, atual, atr, nul);
		if (ite.length < 2){
			ite = "0" + ite;
		}
		document.getElementById('btn-c-exchange-item-' + atual).href = "javascript:showModItem(" + 1 + ", " + 1 + ", " + atual + ", '" + ite + "');";
		atual++;
	}
	save_renderInfos(s_slot);
}

function save_renderBox(s_slot){
	JILL_BAU = [];
	CARLOS_BAU = [];
	$("#JILL-BOX").html("<!-- Por enquanto nada... -->");
	$("#CARLOS-BOX").html("<!-- Por enquanto nada... -->");
	// Ba� Jill
	addLog("log", "Carregando Ba� da Jill - 1� Slot...");
	var totalItens = 63; // 63 = Total de slots no ba�
	var current = 0;
	var position = RANGES["j-box"][0];
	var plus = 8;
	while(current !== totalItens + 1){
		JILL_BAU.push(localStorage.getItem('Save_' + s_slot).slice(position, position + plus));
		position = position + plus;
		current++;
	}
	var l = JILL_BAU.length;
	current = 0;
	while(current !== l){
		if (current > l){
			console.log("PAROU!");
			break;
		} else {
			var IT = JILL_BAU[current].slice(0, 2); // Nome do Item
			var QU = JILL_BAU[current].slice(2, 4); // Quantidade
			var AT = JILL_BAU[current].slice(4, 6); // Atributo
			var NU = JILL_BAU[current].slice(6, 8); // Sempre deve ser 00
			if (ATTR[AT] == undefined){
				var msg = "(Ba�) Item " + current + " cont�m atributo desconhecido: " + AT;
				addLog("warn", "AVISO: " + msg);
				showNotify("AVISO", msg, 10000);
				console.warn("AVISO: " + msg);
				addLog("log" , "Adicionando Item ao Ba� - Jill - HEX: " + IT + QU + AT + NU + " - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantidade: " + parseInt("0x" + QU) + ", Atributo: " + AT + ", Nulo: " + VOID[NU]);
			} else {
				addLog("log" , "Adicionando Item ao Ba� - Jill - HEX: " + IT + QU + AT + NU + " - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantidade: " + parseInt("0x" + QU) + ", Atributo: " + ATTR[AT][0] + ", Nulo: " + VOID[NU]);
			}
			ADD_ITEM_BOX(0, current, IT, QU, AT, NU);
			current++;
		}
	}
	// Ba� Carlos
	log_separador();
	addLog("log", "Carregando Ba� do Carlos - 1� Slot...");
	log_separador();
	current = 0;
	position = RANGES["c-box"][0];
	var hack = totalItens + 1;
	while(current !== hack){
		CARLOS_BAU.push(localStorage.getItem('Save_' + s_slot).slice(position, position + plus));
		position = position + plus;
		current++;
	}
	l = CARLOS_BAU.length;
	current = 0;
	while(current !== l){
		if (current > l){
			console.log("PAROU!");
			break;
		} else {
			var IT = CARLOS_BAU[current].slice(0, 2); // Nome do Item
			var QU = CARLOS_BAU[current].slice(2, 4); // Quantidade
			var AT = CARLOS_BAU[current].slice(4, 6); // Atributo
			var NU = CARLOS_BAU[current].slice(6, 8); // Sempre deve ser 00
			if (ATTR[AT] == undefined){
				var msg = "(Ba�) Item " + current + " cont�m atributo desconhecido: " + AT;
				addLog("warn", "AVISO: " + msg);
				showNotify("AVISO", msg, 10000);
				console.warn("AVISO: " + msg);
				addLog("log" , "Adicionando Item ao Ba� - Carlos - HEX: " + IT + QU + AT + NU + " - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantidade: " + parseInt("0x" + QU) + ", Atributo: " + AT + ", Nulo: " + VOID[NU]);
			} else {
				addLog("log" , "Adicionando Item ao Ba� - Carlos - HEX: " + IT + QU + AT + NU + " - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantidade: " + parseInt("0x" + QU) + ", Atributo: " + ATTR[AT][0] + ", Nulo: " + VOID[NU]);
			}
			ADD_ITEM_BOX(1, current, IT, QU, AT, NU);
			current++;
		}
	}
	save_renderSaveSlots();
}

function save_renderInfos(s_slot){
	log_separador();
	// Render Time
	IGTExtract = localStorage.getItem("Save_" + s_slot).slice(RANGES["IGT"][0], RANGES["IGT"][1]);
	
	decompileHexTime(IGTExtract.slice(0, 2), IGTExtract.slice(2, 4), IGTExtract.slice(4, 6), IGTExtract.slice(6, 8));

	addLog("log", "IGT (In-Game Time): " + hora + ":" + minutos + ":" + segundos);
	addLog("log", "IGT Completa (Formato: DD:HH:MM:SS:DC:MS): " + dia + ":" + hora + ":" + minutos + ":" + segundos + ":" + decimos + ":" + milesimos);
	log_separador();

	// Dificuldade
	dificuldade = localStorage.getItem("Save_" + s_slot).slice(RANGES["leveldificuldade"][0], RANGES["leveldificuldade"][1]);
	var diffi = DIFICULDADE[dificuldade][0];
	$("#lbl-dificuldade").html(diffi);

	// Saves
	totalVezesSaves = localStorage.getItem("Save_" + s_slot).slice(RANGES["totalSaves"][0], RANGES["totalSaves"][1]);
	var tvs = parseInt("0x" + totalVezesSaves);
	$("#lbl-saves").html(tvs);

	// Sala de Save
	localSave = localStorage.getItem("Save_" + s_slot).slice(RANGES["localSave"][0], RANGES["localSave"][1]);
	var nomeLocSave = LOCAIS[localSave][0];
	$("#lbl-saveplace").html(nomeLocSave);

	// Local da cidade
	lCidade = localStorage.getItem("Save_" + s_slot).slice(RANGES["localCidade"][0], RANGES["localCidade"][1]);
	var lCity = CIDADE[lCidade][0];
	$("#lbl-city").html(lCity);

	// Roupa
	outf = localStorage.getItem("Save_" + s_slot).slice(RANGES["roupaAtual"][0], RANGES["roupaAtual"][1]);
	var costumeJill = ROUPA[outf][0];
	$("#lbl-outfit").html(costumeJill);
	
	// Player Atual
	cPlayer = localStorage.getItem("Save_" + s_slot).slice(RANGES["characterAtual"][0], RANGES["characterAtual"][1]);
	var plr = PLAYERS[cPlayer][0];
	$("#lbl-currentPlayer").html(plr);

	// Jill - Arma equipada
	jArmaEquip = localStorage.getItem("Save_" + s_slot).slice(RANGES["jillArma"][0], RANGES["jillArma"][1]);
	var jcw = ITEM[jArmaEquip][0];
	if (jcw == "Slot Vazio"){
		jcw = "Nenhuma arma equipada";
	}
	$("#lbl-jArma").html(jcw);

	// Carlos - Arma equipada
	cArmaEquip = localStorage.getItem("Save_" + s_slot).slice(RANGES["carlosArma"][0], RANGES["carlosArma"][1]);
	var ccw = ITEM[cArmaEquip][0];
	if (ccw == "Slot Vazio"){
		ccw = "Nenhuma arma equipada";
	}
	$("#lbl-cArma").html(ccw);

	// Jill e Carlos - Sidepack
	jSide = localStorage.getItem("Save_" + s_slot).slice(RANGES["jill-side"][0], RANGES["jill-side"][1])
	cSide = localStorage.getItem("Save_" + s_slot).slice(RANGES["carlos-side"][0], RANGES["carlos-side"][1]);
	var jSpack = SIDEPACK[jSide][0];
	var cSpack = SIDEPACK[cSide][0];
	$("#j-sidePack").html(jSpack);
	$("#c-sidePack").html(cSpack);

	// Posi��o X e Y
	xPos = localStorage.getItem("Save_" + s_slot).slice(RANGES["pos-X"][0], RANGES["pos-X"][1]);
	yPos = localStorage.getItem("Save_" + s_slot).slice(RANGES["pos-Y"][0], RANGES["pos-Y"][1]);
	$("#lbl-x-pos").html(xPos);
	$("#lbl-y-pos").html(yPos);

	// Epilogos
	epil = localStorage.getItem("Save_" + s_slot).slice(RANGES["epilogos"][0], RANGES["epilogos"][1]);
	var ep = EPILOGOS[epil][0];
	$("#lbl-epilogos").html(ep);

	// Vers�o do game
	gVersion = VERSAO[SAVE_arquivoBruto.slice(RANGES["gameEdition"][0], RANGES["gameEdition"][1])][0];
	gDetails = VERSAO[SAVE_arquivoBruto.slice(RANGES["gameEdition"][0], RANGES["gameEdition"][1])][1];
	$("#lbl-gameVersion").html(gVersion + " (" + gDetails + ")");
	
	// Mapas Obtidos - [WIP]
	mapExtractA = localStorage.getItem("Save_" + s_slot).slice(RANGES["mapas-a"][0], RANGES["mapas-a"][1]);
	mapExtractB = localStorage.getItem("Save_" + s_slot).slice(RANGES["mapas-b"][0], RANGES["mapas-b"][1]);
	var mapStatus = undefined; //MAPAS[mapExtractA.slice(0, 2) + mapExtractB.slice(0, 2)];
	$("#lbl-maps").html("[WIP] - " + "BETA" + " (HEX: " + mapExtractA + mapExtractB + ")");

	// Room / Event [WIP]
	rEvent = localStorage.getItem("Save_" + s_slot).slice(RANGES["room_event"][0], RANGES["room_event"][1]);

	// Files
	j_files = localStorage.getItem("Save_" + s_slot).slice(RANGES["jill_files"][0], RANGES["jill_files"][1]);

	save_renderLife(s_slot);
}

function save_renderLife(s_slot) {
	// HP (Vida do personagem atual)
	life = localStorage.getItem('Save_' + s_slot).slice(RANGES["characterHP"][0], RANGES["characterHP"][1]);
	veneno = localStorage.getItem('Save_' + s_slot).slice(RANGES["characterPoison"][0], RANGES["characterPoison"][1]);
	var chkA = life.slice(0, 2);
	var chkB = life.slice(2, 4);
	var HP = undefined;
	if (POISON[veneno][0] == "Sim"){
		STATUS = "Envenenado(a)";
		co = "txt-poison";
	} else {
		var co = "txt-fine";
		$("#JILL-LIFESTATUS").removeClass('txt-poison');
		$("#CARLOS-LIFESTATUS").removeClass('txt-poison');
		if (chkB === "00"){
			// Caso a vida esteja conforme o game manda = 200
			HP = parseInt("0x" + chkA);
		} else {
			// ...hack
			HP = parseInt("0x" + chkA + chkB);
		}
		// Status: MORTO! (Ou Hex 00 00)
		if (HP < 0){
			STATUS = "Indefinido";
			co = "txt-fine";
		}
		// Status: Danger
		if (HP < 11){
			STATUS = "Perigo (Danger)";
			co = "txt-danger";
		}
		// Status: Caution Laranja
		if (HP > 10 && HP < 31){
			STATUS = "Cuidado (Caution Laranja)";
			co = "txt-caution-red";
		}
		// Status: Caution
		if (HP > 30 && HP < 101){
			STATUS = "Cuidado (Caution)";
			co = "txt-caution";
		}
		// Status: Fine
		if (HP > 100){
			STATUS = "Bem (Fine)";
			co = "txt-fine";
		}
		// Status: Hack
		if (HP > 200){
			STATUS = "Vida acima do normal (HP: " + HP + ")";
			co = "txt-fine";
		}
	}
	$("#lbl-condition").html(STATUS);
	$("#JILL-LIFESTATUS").html(STATUS);
	$("#JILL-LIFESTATUS").addClass(co);
	$("#CARLOS-LIFESTATUS").addClass(co);
	$("#CARLOS-LIFESTATUS").html(STATUS);
	$("#lbl-poison").html(POISON[veneno][0]);
	$("#lbl-HP").html(HP + " (Hex: " + chkA + " " + chkB + ")");
	save_renderBox(s_slot);
}

// Fazer Backup
function save_Backup(){
	checkFolders();
	if (SAVE_arquivoBruto !== undefined){
		try{
			var backup_name = gDetails + "-" + getFileName(ORIGINAL_FILENAME) + "-" + currentTime() + ".savbackup";
			fs.writeFileSync(APP_PATH + "\\Backup\\" + backup_name, SAVE_arquivoBruto, 'hex');
			log_separador();
			addLog("log", "INFO: Backup foi criado com sucesso! - Nome do arquivo: " + backup_name);
			addLog("log", "Pasta de destino: " + APP_PATH + "\\Backup\\" + backup_name);
			log_separador();
		} catch (err){
			addLog("error", "ERRO: N�o foi poss�vel fazer backup do arquivo de save! - " + err);
		}
	} else {
		addLog("error", "ERRO: N�o � poss�vel criar um backup de save caso voc� n�o tenha especificado o mesmo!");
	}
}

function applyItem(mode, person, pos){
	var itemId = document.getElementById("ex-item-id").value;
	var attr = document.getElementById("ex-item-attr").value;
	var quant = document.getElementById("ex-item-quant").value;
	if (quant == ""){
		quant = "0";
	}
	if (quant < 0){
		quant = 0;
	}
	if (quant > 255){
		quant = 255;
	}
	qu = parseInt(quant).toString(16);
	if (qu.length < 2){
		qu = "0" + qu;
	}
	var item = itemId + qu + attr + "00";
	if (mode === 1){ // Invent
		if (person == 0){ // J. Valentine
			JILL_INVENT[pos - 1] = item;
		} else {
			CARLOS_INVENT[pos - 1] = item;
		}
	} else { // Ba�
		if (person == 0){
			JILL_BAU[pos] = item;
		} else {
			CARLOS_BAU[pos] = item;
		}
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyPerson() {
	var personagemNovo = document.getElementById('ex-person-id').value;
	cPlayer = personagemNovo;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyDificuldade() {
	var dificuldadeNova = document.getElementById('ex-dificuldade-id').value;
	dificuldade = dificuldadeNova;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyRoupa() {
	var rou = document.getElementById('ex-roupa-id').value;
	outf = rou;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applySidepack(ppzu) {
	var sdpack = document.getElementById('ex-sidepack-id').value;
	if (ppzu === 1){
		jSide = sdpack;
	} else {
		cSide = sdpack;
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyArma(personzu) {
	var newArma = document.getElementById('ex-arma-id').value;
	if (personzu === 1){
		jArmaEquip = newArma;
	} else {
		cArmaEquip = newArma;
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyPoison() {
	var newPoison = document.getElementById('ex-poison-id').value;
	veneno = newPoison;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applySaveCount(){
	var totvezes = document.getElementById('ex-savecount-id').value;
	if (totvezes == ""){
		totalVezesSaves = "00";
	} else {
		if (totvezes < 0){
			totvezes = 0;
		}
		if (totvezes > 255){
			totvezes = 255;
		}
		totalVezesSaves = totvezes.toString(16);
	}
	if (totalVezesSaves.length < 2){
		totalVezesSaves = "0" + totalVezesSaves;
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyHP(){
	var newHP = document.getElementById('ex-HP-id').value;
	if (newHP < 0){
		newHP = 0;
	}
	if (newHP > 255){
		newHP = 255;
	}
	var newHPPlus = parseInt(newHP).toString(16);
	if (newHPPlus.length < 2){
		newHPPlus = "0" + newHPPlus;
	}
	life = newHPPlus + "00";
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function applyEpil(){
	var newEps = document.getElementById('ex-epilogues-id').value;
	epil = newEps;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function makeHexTime(){
	var HH = document.getElementById('ex-IGT-HH').value;
	var MM = document.getElementById('ex-IGT-MM').value;
	var SS = document.getElementById('ex-IGT-SS').value;
	if (HH === ""){
		HH = 0;
	}
	if (MM === ""){
		MM = 0;
	}
	if (SS === ""){
		SS = 0;
	}
	if (HH > 23){
		HH = 23;
	}
	if (HH < 0){
		HH = 0;
	}
	if (MM > 59){
		MM = 59;
	}
	if (MM < 0){
		MM = 0;
	}
	if (SS > 59){
		SS = 59;
	}
	if (SS < 0){
		SS = 0;
	}
	var sec = SS * 1000;
	var min = MM * 60 * 1000;
	var hor = HH * 60 * 60 * 1000;
	var mile = parseInt(hor + min + sec) / parseFloat(100 / 6);
	var tempHex01 = mile;
	var tempHex02 = 0;
	var tempHex03 = 0;
	var tempHex04 = 0;
	while (mile > 255){
		mile = mile - 255;
		tempHex01 = mile;
		tempHex02++;
	}
	while (tempHex02 > 255){
		tempHex02 = tempHex02 - 255;
		tempHex03++;
	}
	while (tempHex03 > 255){
		tempHex03 = tempHex03 - 255;
		tempHex04++;
	}
	if (tempHex04 > 255){
		tempHex04 = 255;
	}
	var hex01 = parseInt(Math.round(tempHex01)).toString(16);
	var hex02 = parseInt(Math.round(tempHex02)).toString(16);
	var hex03 = parseInt(Math.round(tempHex03)).toString(16);
	var hex04 = parseInt(Math.round(tempHex04)).toString(16);
	if (hex01.length < 2){
		hex01 = "0" + hex01;
	}
	if (hex02.length < 2){
		hex02 = "0" + hex02;
	}
	if (hex03.length < 2){
		hex03 = "0" + hex03;
	}
	if (hex04.length < 2){
		hex04 = "0" + hex04;
	}
	IGTExtract = hex01 + hex02 + hex03 + hex04;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}

function ADD_ITEM_BOX(PERSON, INDEX, ITEMHEX, QUANTIDADE, ATRIBUTO, VNULO) {
	var quan = parseInt("0x" + QUANTIDADE);	
	var atri = ATTR[ATRIBUTO][0];
	var colo = ATTR[ATRIBUTO][1];
	var cfundo = ATTR[ATRIBUTO][2];
	var nome = ITEM[ITEMHEX][0];
	var clip = ITEM[ITEMHEX][2];
	var marg = ITEM[ITEMHEX][3];
	var imse = ITEM[ITEMHEX][4];
	var cssfix = "";
	var cssfixbtn = "";
	if (quan == 0 || quan == "0"){
		quan = "";
	} else {
		cssfix = "box-fix-lbl";
		cssfixbtn = "btn-box-fix";
	}
	if (ATRIBUTO === "03" || ATRIBUTO === "07" || ATRIBUTO === "0f"){
		atri = "Inf.";
	}
	if (ITEMHEX.length < 2){
		ITEMHEX = "0" + ITEMHEX;
	}
	var HTMLTEMPLATE = '<div class="bau-item" id="item-' + INDEX + '">' +
	'<img src="img/box-set-' + imse + '.png" draggable="false" class="b-icon" style="clip-path: inset(' + clip + '); margin-left:' + marg + ';" id="boxicon-' + INDEX + '" onclick="addInfo(' + PERSON + ', \'' + ITEMHEX + '\');">' + 
	'<font class="b-quant-lbl" id="b-' + PERSON + '-q-lbl-' + INDEX + '" onclick="addInfo(' + PERSON + ', \'' + ITEMHEX + '\');" style="color: ' + colo + ';text-shadow: ' + cfundo + ';">' + quan + '</font>' + 
	'<div class="b-label"><font class="' + cssfix + '" id="b-name-' + INDEX + '" onclick="addInfo(' + PERSON + ', \'' + ITEMHEX + '\');">(' + INDEX + ') ' + nome + '</font>' + 
	'</div><input type="button" class="btn-box ' + cssfixbtn + '" onclick="showModItem(2, ' + PERSON + ', ' + INDEX + ', \'' + ITEMHEX + '\');" value="Alterar"></div>';
	if (VNULO !== "00"){
		var warnInfo = "AVISO: Valor Nulo N�o corresponde ao valor esperado (Valor esperado: 00, Valor atual: " + VNULO + ") - " + VOID[VNULO] + " \nHEX: " + ITEMHEX + QUANTIDADE + ATRIBUTO + VNULO + " \nIndex: " + INDEX + " \nItem Hex: " + ITEMHEX + " (" + nome + ") \nQuantidade: " + QUANTIDADE + " (" + quan + ") \nAtributo: " + ATRIBUTO + " (" + atri + ") \nNulo: " + VNULO;
		console.warn(warnInfo);
		addLog("warn", warnInfo);
	}
	if (PERSON === 0){ // Adicionar item ao ba� da jill
		$("#JILL-BOX").append(HTMLTEMPLATE);
	} else {		  // Adicionar item ao ba� do carlos
		$("#CARLOS-BOX").append(HTMLTEMPLATE);
	}
	// Fix para porcentagem
	if (ATRIBUTO === "0e" || ATRIBUTO === "06" || ATRIBUTO === "02" || ATRIBUTO === "16" || ATRIBUTO === "17"){
		var vq = document.getElementById("b-" + PERSON + "-q-lbl-" + INDEX).innerHTML;
		if (vq !== ""){
			$("#b-" + PERSON + "-q-lbl-" + INDEX).css({"margin-left": "-562px"});
			$("#b-" + PERSON + "-q-lbl-" + INDEX).html(vq + "%");
		}
	}
}

// Render Info
function addInfo(person, itemId){
	$('#icon-info-0' + person).css({display: "none"});
	var imgSet = ITEM[itemId][5];
	var offsetRequest = ITEM[itemId][6];
	var offsetPx = 279;
	var startMargin = 75;
	var startA = 5600;
	var startB = 0;
	var finalA = startA;
	var finalB = startB;
	var finalMargin = startMargin;
	var s = 0;
	var f = parseInt(offsetRequest);
	var fixR = 1;
	var fixL = 1;
	var timer = 0;
	while(s != f){
		finalA = finalA - offsetPx - fixL;
		finalB = finalB + offsetPx + fixL;
		finalMargin = finalMargin - offsetPx - fixL;
		timer++;
		if (timer == 3){
			fixR = fixR + parseInt(fixR / 2);
			fixL = fixL + parseInt(fixL / 4);
			timer = 0;
		}
		s++;
	}
	if (itemId !== "00"){
		$('#text-info-0' + person).html("<center>" + ITEM[itemId][0] + "</center><br>" + ITEM[itemId][1]);
	} else {
		$('#text-info-0' + person).html("<!-- Slot Vazio -->");
	}

	document.getElementById('icon-info-0' + person).src = "img/details-0" + imgSet + ".png";
	$('#icon-info-0' + person).css({display: "inline", "clip-path": "inset(0px " + finalA + "px 0px " + finalB + "px)", "margin-left": finalMargin + "px"});
}

function addInvent(person, itemHex, quantHex, block, atrib, nulo){
	// Infos
	var titulo = ITEM[itemHex][0];
	var pushRequest = parseInt(ITEM[itemHex][7]);
	var spriteNumber = parseInt(ITEM[itemHex][8]);
	var percent = false;
	var cor = undefined;
	var shad = undefined;
	var quanti = undefined;
	if (atrib === "00"){
		if (itemHex === "00" || quantHex === "00"){
			quanti = "";
		} else {
			quanti = parseInt("0x" + quantHex);
		}
	}
	// Caso seja em porcentagem
	var classN = document.getElementById('J-LBL-' + block).className;
	if (atrib === "0e" || atrib === "06" || atrib === "02" || atrib === "16" || atrib === "17"){
		quanti = parseInt("0x" + quantHex) + "%";
		percent = true;
	} else {
		quanti = parseInt("0x" + quantHex);
	}
	// Caso seja ammo infinita
	if (atrib === "03" || atrib === "07" || atrib === "0f"){
		quanti = "Inf.";
	}

	// Pixels
	var startA = 956;
	var startB = 0;
	var pushOffset = 106;
	var marginOffset = 110;
	var fix = 4;
	var s = 0;

	// Finais
	var finalA = startA;
	var finalB = startB;
	var finalMargin = 0;

	while(s != pushRequest){
		finalA = finalA - pushOffset;
		finalB = finalB + pushOffset;
		finalMargin = finalMargin - marginOffset + fix;
		s++;
	}

	var p = undefined;
	if (person == 0){
		p = "Jill";
	} else {
		p = "Carlos";
	}
	
	if (ATTR[atrib] !== undefined){
		cor = ATTR[atrib][1];
 		shad = ATTR[atrib][2];
	} else {
		var msg = "(" + p + ") Invent�rio - Item no slot " + block + " cont�m atributo desconhecido: " + atrib;
		addLog("warn", "AVISO: " + msg);
		showNotify("AVISO", msg, 10000);
		console.warn("AVISO: " + msg);
	}

	if (person == 0){ // Invent�rio da Jill
		document.getElementById("J-icon-" + block).src = "img/box-set-" + spriteNumber + ".png";
		document.getElementById("J-icon-" + block).onclick = function(){
			addInfo(person, itemHex);
		}
		document.getElementById("J-LBL-" + block).onclick = function(){
			addInfo(person, itemHex);
		}
		if (percent === true){
			if (classN === "item-counter-invent-1"){
				$("#J-LBL-" + block).css({"margin-left": "-156px"});
			} else {
				$("#J-LBL-" + block).css({"margin-left": "60px"});
			}
		}
		$("#J-LBL-" + block).html(quanti);
		$("#J-LBL-" + block).css({color: cor, "text-shadow": shad});
		$("#J-icon-" + block).css({"clip-path": "inset(0px " + finalA + "px 4px " + finalB + "px)", "margin-left": finalMargin + "px" });
	} else { // Invent�rio do Carlos
		document.getElementById("C-icon-" + block).src = "img/box-set-" + spriteNumber + ".png";
		document.getElementById("C-icon-" + block).onclick = function(){
			addInfo(person, itemHex);
		}
		document.getElementById("C-LBL-" + block).onclick = function(){
			addInfo(person, itemHex);
		}
		$("#C-LBL-" + block).html(quanti);
		$("#C-LBL-" + block).css({color: cor, "text-shadow": shad});
		$("#C-icon-" + block).css({"clip-path": "inset(0px " + finalA + "px 4px " + finalB + "px)", "margin-left": finalMargin + "px" });
	}
	if (quanti === ""){
		quanti = "0";
	}
	addLog("log", "Invent�rio: " + p + " Slot: " + block + " - HEX: " + itemHex + quantHex + atrib + nulo + " - Item: " + itemHex + " (" + titulo + ") - Quantidade: " + quantHex + " (" + parseInt(quantHex, 16) + ") - Atributo: " + atrib + " (" + ATTR[atrib][0] + ")");
}

/// Time Helpers

/*  _____________________________________________________________________________________________________
   |																									 \
   |   Tempo - 0x2200 at� 0x2203 - Valor de 32 Bits (00 00 00 00)										  |
   |______________________________________________________________________________________________________|
   |																									  |
   |	    Formato: DD:HH:MM:SS:DS 																	  |
   |    																								  |
   |   Quando o primeiro chega ao seu valor m�ximo (255 / FF), ele aumenta por 1 o pr�ximo endere�o       |
   |   Exemplo: se o tempo for 00:00:00:04:75 (Quatro Segundos e 75 Mil�simos) Em HEX estar�              |
   |   ff 00 00 00. Quando mais um mil�simo se passar, ser� quatro segundos e 76 mil�simos, 		 	  |
   |   e em HEX estar�: 00 01 00 00.																	  |
   |   																								      |
   |   Veja abaixo o exemplo acima de forma mais simplificada: 									    	  |
   |   																									  |
   |					       HEX         DD:HH:MM:SS:DS 	 Passagem do Tempo							  |
   |					   										   ____									  |
   |					   fd 00 00 00   - 00:00:00:04:73		  ||||||								  |
   |					   fe 00 00 00   - 00:00:00:04:74		  ||||||								  |
   |					  _____________ 						  ||||||								  |
   |					 |			   \						  ||||||								  |
   |					 | ff 00 00 00 | - 00:00:00:04:75		  ||||||								  |
   |					 | 00 01 00 00 | - 00:00:00:04:76		  ||||||								  |
   |					 \_____________|						  ||||||								  |
   |														  ____||||||____     						  |
   |					   01 01 00 00   - 00:00:00:04:77	  \||||||||||||/							  |
   |					   02 01 00 00   - 00:00:00:04:78	   \||||||||||/								  |
   |					   03 01 00 00   - 00:00:00:04:79	    \||||||||/								  |
   |					   04 01 00 00   - 00:00:00:04:80 		 \||||||/								  |
   |					   05 01 00 00   - 00:00:00:04:82 	      \||||/								  |
   |					   06 01 00 00   - 00:00:00:04:83		   \||/									  |
   |					   07 01 00 00   - 00:00:00:04:84           \/ 									  |
   |																									  |
   \______________________________________________________________________________________________________|
*/

function contador0x2200(hex0x2200){
	// Formula: 0x2200 * Mil�simos
	var timeOffset = parseInt(hex0x2200, 16) * 1000;
	return timeOffset;
}

function contador0x2201(multiplier) {
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2200(m.toString(16));
}

function contador0x2202(multiplier) {
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2201(m.toString(16));
}

function contador0x2203(multiplier) {
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2202(m.toString(16));
}

function contador0x2204(multiplier) {
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2203(m.toString(16));
}

function contadorFinal(DD, HH, MM, SS, DC, MS){

	milesimos = parseInt(milesimos);
	decimos = parseInt(decimos);
	segundos = parseInt(segundos);
	minutos = parseInt(minutos);
	hora = parseInt(hora);
	dia = parseInt(dia);

	if (DD === undefined || DD === null){
		DD = 0;
	} else {
		DD = parseInt(DD);
	}
	if (HH === undefined || HH === null){
		HH = 0;
	} else {
		HH = parseInt(HH);
	}
	if (MM === undefined || MM === null){
		MM = 0;
	} else {
		MM = parseInt(MM);
	}
	if (SS === undefined || SS === null){
		SS = 0;
	} else {
		SS = parseInt(SS);
	}
	if (MS === undefined || MS === null){
		MS = 0;
	} else {
		MS = parseInt(MS);
	}
	if (DC === undefined || DC === null){
		DC = 0;
	} else {
		DC = parseInt(DC);
	}
	//console.log(DD + " - " + HH + " - " + MM + " - " + SS + " - " + DC + " - " + MS);
	var restante = undefined;
	var minus = 999 - 1;

	// Mil�simos
	if (MS > minus){
		while (MS > minus){
			restante = MS - 1000;
			MS = restante;
			milesimos = MS;
			decimos++;
		}
	} else {
		milesimos = milesimos + MS;
		while (MS > minus){
			restante = MS - 1000;
			MS = restante;
			milesimos = MS;
			decimos++;
		}
	}

	// D�cimos 
	if (DC > 59){
		while(DC > 59){
			restante = DC - 60;
			DC = restante;
			segundos++;
		}
	} else {
		decimos = decimos + DC;
		while(decimos > 59){
			restante = decimos - 60;
			decimos = restante;
			segundos++;
		}
	}

	// Segundos 
	if (SS > 59){
		while(SS > 59){
			restante = SS - 60;
			SS = restante;
			minutos++;
		}
	} else {
		segundos = segundos + SS;
		while(segundos > 59){
			restante = segundos - 60;
			segundos = restante;
			minutos++;
		}
	}

	// Minutos
	if (MM > 59){
		while(MM > 59){
			restante = MM - 60;
			MM = restante;
			hora++;
		}
	} else {
		minutos = minutos + MM;
		while(minutos > 59){
			restante = minutos - 60;
			minutos = restante;
			hora++;
		}
	}

	// Hora
	if (HH > 23){
		while(HH > 23){
			restante = HH - 24;
			HH = restante;
			dia++;
		}
	} else {
		hora = hora + HH;
		while(hora > 23){
			restante = hora - 24;
			hora = restante;
			dia++;
		}
	}

	if (milesimos.toString().length < 2){
		milesimos = "0" + milesimos;
	}
	if (decimos.toString().length < 2){
		decimos = "0" + decimos;
	}
	if (segundos.toString().length < 2){
		segundos = "0" + segundos;
	}
	if (minutos.toString().length < 2){
		minutos = "0" + minutos;
	}
	if (hora.toString().length < 2){
		hora = "0" + hora;
	}
	if (dia.toString().length < 2){
		dia = "0" + dia;
	}
	//console.log("DD:HH:MM:SS:DC:MS\n" + dia + ":" + hora + ":" + minutos + ":" + segundos + ":" + decimos + ":" + milesimos);
}

function decompileHexTime(p0x2200, p0x2201, p0x2202, p0x2203){
	resetTimer();
	h_0x2200 = contador0x2200(p0x2200);
	h_0x2201 = contador0x2201(p0x2201);
	h_0x2202 = contador0x2202(p0x2202);
	h_0x2203 = contador0x2203(p0x2203);
	contadorFinal(0, 0, 0, 0, 0, h_0x2200);
	contadorFinal(0, 0, 0, 0, 0, h_0x2201);
	contadorFinal(0, 0, 0, 0, 0, h_0x2202);
	contadorFinal(0, 0, 0, 0, 0, h_0x2203);
	$("#lbl-time").html(hora + ":" + minutos + ":" + segundos);
	document.getElementById("lbl-time").title = "Formato Completo\nDD:HH:MM:SS:DC:MS\n" + dia + ":" + hora + ":" + minutos + ":" + segundos + ":" + decimos + ":" + milesimos;
	//console.log("IGT: " + h_0x2200 + " - " + h_0x2201 + " - " + h_0x2202 + " - " + h_0x2203);
}

function resetTimer(){
	milesimos = 0;
	decimos   = 0;
	segundos  = 0;
	minutos   = 0;
	hora      = 0;
	dia       = 0;
	$("#lbl-time").html("00:00:00");
}

function resetIGT(){
	IGTExtract = "00000000";
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}