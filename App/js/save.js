/*
	R3ditor - save.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please!
*/
var SAVE_arquivoBruto;
var CURRENT_SAVE_SLOT = 1;

// Mapa dos Saves
var INDICADOR_01;
var INDICADOR_02;
var INDICADOR_03;
var INDICADOR_04;
var INDICADOR_05;
var INDICADOR_06;
var INDICADOR_07;
var INDICADOR_08;
var INDICADOR_09;
var INDICADOR_10;
var INDICADOR_11;
var INDICADOR_12;
var INDICADOR_13;
var INDICADOR_14;
var INDICADOR_15;
/*
	Ranges
*/
var SAVE_INDICADOR_HEADER;		  // Header completa
var SAVE_INDICADOR_HEADER_START;  // 0x0000 até 0x2000
var SAVE_INDICADOR_HEADER_MIDDLE;						
var SAVE_INDICADOR_HEADER_END;
var S_HEADER;					  // Cabeçalho de cada slot de save
var S_END;						  // Final de cada slot de save
var range_0x2204_0x2207;							
var range_0x2209_0x220D;							
var range_0x2210_0x2211;							
var range_0x2217_0x2217;							
var range_0x2219_0x2219;							
var range_0x221C_0x224D;							
var range_0x224F_0x224F;							
var range_0x2251_0x225D;							
var range_0x225F_0x23FE;							
var range_0x2400_0x2402;							
var range_0x240A_0x240B;							
var range_0x2534_0x2534;							
var range_0x2537_0x254B;							
var range_0x2674_0x2674;							
var range_0x2677_0x28D3;							
/*
	Variaveis de Save
*/
// Baú
var JILL_BAU = [];
var CARLOS_BAU = [];
// Inventários
var JILL_INVENT = [];
var CARLOS_INVENT = [];
// Dificuldade
var dificuldade;
// Total Saves
var totalVezesSaves;
// Sala de Save
var localSave;
// Local da cidade
var lCidade;
// Roupa
var outf;
// Player Atual
var cPlayer;
// Jill - Arma equipada
var jArmaEquip;
// Carlos - Arma equipada
var cArmaEquip;
// Jill e Carlos - Sidepack
var jSide;
var cSide;
// Posição X e Y
var xPos;
var yPos;
// Room / Event
var rEvent
// Epilogos
var epil;
// Files
var j_files;
// Versão do game
var gVersion;
var gDetails;
// Mapas Obtidos - WIP
var mapExtractA;
var mapExtractB;
// Vida e Poison
var life;
var veneno;
var SAV_godMode = false;
// Tempo
var IGTExtract;
var h_0x2200;
var h_0x2201;
var h_0x2202;
var h_0x2203;
/* 
	Misc.
*/
// Variaveis de tempo
var milesimos = 0;
var segundos  = 0;
var decimos   = 0;
var minutos   = 0;
var hora      = 0;
var dia       = 0;

/*
	Functions
*/

function SAV_GenerateNewSave(){
	if (main_currentMenu === 1 && SAVE_arquivoBruto === undefined){
		if (fs.existsSync(APP_PATH + '\\App\\tools\\format.r3save') === true){
			SAVE_arquivoBruto = fs.readFileSync(APP_PATH + '\\App\\tools\\format.r3save', 'hex');
			R3DITOR_SAVE('Bu00.sav', SAVE_arquivoBruto, 'hex', 'sav');
			SAVE_arquivoBruto = undefined;
		} else {
			addLog('error', 'SAVE - Unable to find blank save file!');
		}
	}
	scrollLog();
}
function MAKE_SAVE(slot){
	if (ORIGINAL_FILENAME !== undefined){
		S_HEADER = localStorage.getItem('Save_' + slot).slice(RANGES["save_HEADER"][0], RANGES["save_HEADER"][1]); // 0x2000 - 0x21FF
		// Gerando Inventário da Jill
		var J_INV_TEMP = '';
		var c = 0;
		while(c < JILL_INVENT.length){
			J_INV_TEMP = J_INV_TEMP + JILL_INVENT[c];
			c++;
		}
		// Gerando Baú da Jill
		var J_BOX_TEMP = '';
		c = 0;
		while(c < JILL_BAU.length){
			J_BOX_TEMP = J_BOX_TEMP + JILL_BAU[c];
			c++;
		}
		// Gerando Inventário do Carlos
		var C_INV_TEMP = '';
		var c = 0;
		while(c < CARLOS_INVENT.length){
			C_INV_TEMP = C_INV_TEMP + CARLOS_INVENT[c];
			c++;
		}
		// Gerando Baú do Carlos
		var C_BOX_TEMP = '';
		c = 0;
		while(c < CARLOS_BAU.length){
			C_BOX_TEMP = C_BOX_TEMP + CARLOS_BAU[c];
			c++;
		}
		// Ranges não mapeadas
		range_0x2204_0x2207 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2204-0x2207'][0], RANGES['0x2204-0x2207'][1]); // 0x2204 - 0x2207
		range_0x2209_0x220D = localStorage.getItem('Save_' + slot).slice(RANGES['0x2209-0x220D'][0], RANGES['0x2209-0x220D'][1]); // 0x2209 - 0x220D
		range_0x2210_0x2211 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2210-0x2211'][0], RANGES['0x2210-0x2211'][1]); // 0x2209 - 0x220D
		range_0x2217_0x2217 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2217-0x2217'][0], RANGES['0x2217-0x2217'][1]); // 0x2217
		range_0x2219_0x2219 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2219-0x2219'][0], RANGES['0x2219-0x2219'][1]); // 0x2219
		range_0x221C_0x224D = localStorage.getItem('Save_' + slot).slice(RANGES['0x221C-0x224D'][0], RANGES['0x221C-0x224D'][1]); // 0x221C - 0x224D
		range_0x224F_0x224F = localStorage.getItem('Save_' + slot).slice(RANGES['0x224F-0x224F'][0], RANGES['0x224F-0x224F'][1]); // 0x224F
		range_0x2251_0x225D = localStorage.getItem('Save_' + slot).slice(RANGES['0x2251-0x225D'][0], RANGES['0x2251-0x225D'][1]); // 0x2251 - 0x225D
		range_0x225F_0x23FE = localStorage.getItem('Save_' + slot).slice(RANGES['0x225F-0x23FE'][0], RANGES['0x225F-0x23FE'][1]); // 0x225F - 0x23FE
		range_0x2400_0x2402 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2400-0x2402'][0], RANGES['0x2400-0x2402'][1]); // 0x2400 - 0x2402
		range_0x240A_0x240B = localStorage.getItem('Save_' + slot).slice(RANGES['0x240A-0x240B'][0], RANGES['0x240A-0x240B'][1]); // 0x240A - 0x240B
		range_0x2534_0x2534 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2534-0x2534'][0], RANGES['0x2534-0x2534'][1]); // 0x2534
		range_0x2537_0x254B = localStorage.getItem('Save_' + slot).slice(RANGES['0x2537-0x254B'][0], RANGES['0x2537-0x254B'][1]); // 0x2537 - 0x254B
		range_0x2674_0x2674 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2674-0x2674'][0], RANGES['0x2674-0x2674'][1]); // 0x2674
		range_0x2677_0x28D3 = localStorage.getItem('Save_' + slot).slice(RANGES['0x2677-0x28D3'][0], RANGES['0x2677-0x28D3'][1]); // 0x2677 - 0x28D3
		S_END = localStorage.getItem('Save_' + slot).slice(RANGES['save_END'][0], RANGES['save_END'][1]);
		TEMP_SLOT = S_HEADER + IGTExtract + range_0x2204_0x2207 + dificuldade + range_0x2209_0x220D + xPos + range_0x2210_0x2211 + yPos + life + epil + 
		range_0x2217_0x2217 + totalVezesSaves + range_0x2219_0x2219 + veneno + localSave + range_0x221C_0x224D + lCidade + range_0x224F_0x224F + rEvent + 
		range_0x2251_0x225D + cPlayer + range_0x225F_0x23FE + mapExtractA + range_0x2400_0x2402 + mapExtractB + j_files + range_0x240A_0x240B + J_INV_TEMP + 
		J_BOX_TEMP + range_0x2534_0x2534 + jArmaEquip + jSide + range_0x2537_0x254B + C_INV_TEMP + C_BOX_TEMP + range_0x2674_0x2674 + cArmaEquip + cSide + 
		range_0x2677_0x28D3 + outf + S_END;
		// Final
		if (TEMP_SLOT.length === RANGES['slot-offset'][0]){
			localStorage.setItem("Save_" + slot, TEMP_SLOT);
			addLog("log", "The Slot " + slot + " was saved successfully!");
			save_Backup();
			finalizeSave();
		} else {
			var msg = "Unable to save current slot because compilation is divergent size: Size Expected: " + RANGES["slot-offset"][0] + " - Current Size: " + TEMP_SLOT.length;
			console.error("ERROR - " + msg);
			addLog("error", msg);
		}
	} else {
		var msg = "Unable to save the game save if you haven't opened it yet! (File: " + ORIGINAL_FILENAME + ")";
		addLog("error", "ERROR - " + msg);
		console.error(msg);
	}
}
function finalizeSave(){
	var FILE = SAVE_INDICADOR_HEADER + 
	localStorage.Save_1 + localStorage.Save_2 + localStorage.Save_3 + localStorage.Save_4 + localStorage.Save_5 + 
	localStorage.Save_6 + localStorage.Save_7 + localStorage.Save_8 + localStorage.Save_9 + localStorage.Save_10 + 
	localStorage.Save_11 + localStorage.Save_12 + localStorage.Save_13 + localStorage.Save_14 + localStorage.Save_15;
	fs.writeFileSync(ORIGINAL_FILENAME, FILE, 'hex');
	TEMP_SLOT = "";
	CARREGAR_SAVE(ORIGINAL_FILENAME);
}
function CARREGAR_SAVE(sFile){
	localStorage.clear();
	SAVE_arquivoBruto = undefined;
	ORIGINAL_FILENAME = sFile;
	log_separador();
	addLog("log", "Loading save file: " + sFile);
	log_separador();
	SAVE_arquivoBruto = fs.readFileSync(sFile, 'hex');
	// Montar Arquivo Nas variaveis para reconstruir novamente
	// Essa parte do processo será feita aqui pois essas informações não serão modificadas pelo usuário
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
	
	SAVE_INDICADOR_HEADER 		 = SAVE_INDICADOR_HEADER_START + INDICADOR_01 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_02 + SAVE_INDICADOR_HEADER_MIDDLE + 
	INDICADOR_03 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_04 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_05 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_06 + 
	SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_07 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_08 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_09 + 
	SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_10 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_11 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_12 + 
	SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_13 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_14 + SAVE_INDICADOR_HEADER_MIDDLE + INDICADOR_15 + 
	SAVE_INDICADOR_HEADER_END;

	localStorage.setItem('Save_1',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0],  	   RANGES["slot-offset"][0] * 2));
	localStorage.setItem('Save_2',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 2,  RANGES["slot-offset"][0] * 3));
	localStorage.setItem('Save_3',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 3,  RANGES["slot-offset"][0] * 4));
	localStorage.setItem('Save_4',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 4,  RANGES["slot-offset"][0] * 5));
	localStorage.setItem('Save_5',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 5,  RANGES["slot-offset"][0] * 6));
	localStorage.setItem('Save_6',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 6,  RANGES["slot-offset"][0] * 7));
	localStorage.setItem('Save_7',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 7,  RANGES["slot-offset"][0] * 8));
	localStorage.setItem('Save_8',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 8,  RANGES["slot-offset"][0] * 9));
	localStorage.setItem('Save_9',  SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 9,  RANGES["slot-offset"][0] * 10));
	localStorage.setItem('Save_10', SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 10, RANGES["slot-offset"][0] * 11));
	localStorage.setItem('Save_11', SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 11, RANGES["slot-offset"][0] * 12));
	localStorage.setItem('Save_12', SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 12, RANGES["slot-offset"][0] * 13));
	localStorage.setItem('Save_13', SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 13, RANGES["slot-offset"][0] * 14));
	localStorage.setItem('Save_14', SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 14, RANGES["slot-offset"][0] * 15));
	localStorage.setItem('Save_15', SAVE_arquivoBruto.slice(RANGES["slot-offset"][0] * 15, RANGES["slot-offset"][0] * 16));
	// Render Infos
	$('#SAV_clearFile').css({'display': 'inline'});
	save_renderSlot(CURRENT_SAVE_SLOT);
}
function save_renderSlot(slotID){
	if (slotID < 1 || slotID > 15 || slotID === undefined){
		slotID === 1;
	}
	resetTimer();
	cleanForSaveLoad();
	document.title = APP_NAME + " - Save Editor (*.SAV) - Slot " + slotID + " - File: " + ORIGINAL_FILENAME;
	document.getElementById("lbl-currentSlot").innerHTML = slotID;
	CURRENT_SAVE_SLOT = slotID;
	save_renderInvent(slotID);
}
function save_renderSaveSlots() {
	var cu = 1;
	var to = 16;
	var checker;
	var tmpSaveSlot;
	main_closeFileList();
	while(cu < to){
		tmpSaveSlot = SAVE_arquivoBruto.slice(RANGES["he-indicador-" + cu][0], RANGES["he-indicador-" + cu][1]);
		checker = tmpSaveSlot.slice(0, 4);
		if (checker === '5100'){ 
			// Save presente
			var totVSave = localStorage.getItem("Save_" + cu).slice(RANGES["totalSaves"][0], RANGES["totalSaves"][1]);
			var locSave = localStorage.getItem("Save_" + cu).slice(RANGES["localSave"][0], RANGES["localSave"][1]);
			document.getElementById("slt-save-" + cu).innerHTML = "(" + parseInt(totVSave, 16) + ") " + LOCAIS[locSave][0];
			$("#slt-save-" + cu).addClass("slot-presente");
		} else {
			// Save Vazio
			document.getElementById("slt-save-" + cu).innerHTML = 'Empty';
			$("#slt-save-" + cu).addClass('slot-ausente');
		}
		cu++;
	}
	// Final
	scrollLog();
	SAVE_showMenu(0);
}
function save_renderInvent(s_slot, mode){
	JILL_INVENT = [];
	CARLOS_INVENT = [];
	// Inventário da Jill
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
	// Inventário do Carlos
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
	document.getElementById("JILL-BOX").innerHTML = "<!-- Hey, can you give me a cookie? ~wink~ -->";
	document.getElementById("CARLOS-BOX").innerHTML = "<!-- Hey, can you give me a cookie? ~wink~ -->";
	// Baú Jill
	addLog("log", "Loading Jill Item Box...");
	var totalItens = 63; // 63 = Total de slots no baú
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
			break;
		} else {
			var IT = JILL_BAU[current].slice(0, 2); // Nome do Item
			var QU = JILL_BAU[current].slice(2, 4); // Quantidade
			var AT = JILL_BAU[current].slice(4, 6); // Atributo
			var NU = JILL_BAU[current].slice(6, 8); // Segunda var
			if (ATTR[AT] == undefined){
				var msg = "(Item Box) Item " + current + " have an unknown attr.: " + AT;
				console.warn("WARNING - " + msg);
				addLog("warn", "WARNING - " + msg);
				addLog("log" , "Adding item to Item Box - Jill - HEX: <font class='user-can-select'>" + IT + QU + AT + NU + "</font> - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantity: " + parseInt("0x" + QU) + ", Attr.: " + AT + ", Second Var (aka. null): " + NU);
			} else {
				addLog("log" , "Adding item to Item Box - Jill - HEX: <font class='user-can-select'>" + IT + QU + AT + NU + "</font> - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantity: " + parseInt("0x" + QU) + ", Attr.: " + ATTR[AT][0] + ", Second Var (aka. null): " + NU);
			}
			ADD_ITEM_BOX(0, current, IT, QU, AT, NU);
			current++;
		}
	}
	// Baú Carlos
	log_separador();
	addLog("log", "Loading Carlos Item Box...");
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
			break;
		} else {
			var IT = CARLOS_BAU[current].slice(0, 2); // Nome do Item
			var QU = CARLOS_BAU[current].slice(2, 4); // Quantidade
			var AT = CARLOS_BAU[current].slice(4, 6); // Atributo
			var NU = CARLOS_BAU[current].slice(6, 8); // Segunda var
			if (ATTR[AT] == undefined){
				var msg = "(Item Box) Item " + current + " have unknown attr.: " + AT;
				console.warn("WARN - " + msg);
				addLog("warn", "WARN - " + msg);
				addLog("log" , "Adding item to Item Box - Carlos - HEX: <font class='user-can-select'>" + IT + QU + AT + NU + "</font> - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantity: " + parseInt("0x" + QU) + ", Attr.: " + AT + ", Second Var (Aka. Null) " + NU);
			} else {
				addLog("log" , "Adding item to Item Box - Carlos - HEX: <font class='user-can-select'>" + IT + QU + AT + NU + "</font> - Index: " + current + " - Item: " + ITEM[IT][0] + ", Quantity: " + parseInt("0x" + QU) + ", Attr.: " + ATTR[AT][0] + ", Second Var (Aka. Null) " + NU);
			}
			ADD_ITEM_BOX(1, current, IT, QU, AT, NU);
			current++;
		}
	}
	save_renderSaveSlots();
}
function save_renderInfos(s_slot){
	try{
		log_separador();
		// Render Time
		IGTExtract = localStorage.getItem("Save_" + s_slot).slice(RANGES["IGT"][0], RANGES["IGT"][1]);
		decompileHexTime(IGTExtract.slice(0, 2), IGTExtract.slice(2, 4), IGTExtract.slice(4, 6), IGTExtract.slice(6, 8));
		addLog("log", "IGT (In-Game Time): " + hora + ":" + minutos + ":" + segundos);
		addLog("log", "IGT Complete: " + dia + ":" + hora + ":" + minutos + ":" + segundos + ":" + decimos + ":" + milesimos);
		log_separador();
		// Dificuldade
		dificuldade = localStorage.getItem("Save_" + s_slot).slice(RANGES["leveldificuldade"][0], RANGES["leveldificuldade"][1]);
		var diffi = DIFICULDADE[dificuldade][0];
		document.getElementById("lbl-dificuldade").innerHTML = diffi;
		// Saves
		totalVezesSaves = localStorage.getItem("Save_" + s_slot).slice(RANGES["totalSaves"][0], RANGES["totalSaves"][1]);
		var tvs = parseInt("0x" + totalVezesSaves);
		document.getElementById("lbl-saves").innerHTML = tvs;
		// Sala de Save
		localSave = localStorage.getItem("Save_" + s_slot).slice(RANGES["localSave"][0], RANGES["localSave"][1]);
		var nomeLocSave = LOCAIS[localSave][0];
		document.getElementById("lbl-saveplace").innerHTML = nomeLocSave;
		// Local da cidade
		lCidade = localStorage.getItem("Save_" + s_slot).slice(RANGES["localCidade"][0], RANGES["localCidade"][1]);
		var lCity = CIDADE[lCidade][0];
		document.getElementById("lbl-city").innerHTML = lCity;
		// Roupa
		outf = localStorage.getItem("Save_" + s_slot).slice(RANGES["roupaAtual"][0], RANGES["roupaAtual"][1]);
		var costumeJill = ROUPA[outf][0];
		document.getElementById("lbl-outfit").innerHTML = costumeJill;
		// Player Atual
		cPlayer = localStorage.getItem("Save_" + s_slot).slice(RANGES["characterAtual"][0], RANGES["characterAtual"][1]);
		var plr = PLAYERS[cPlayer][0];
		document.getElementById("lbl-currentPlayer").innerHTML = plr;
		// Jill - Arma equipada
		jArmaEquip = localStorage.getItem("Save_" + s_slot).slice(RANGES["jillArma"][0], RANGES["jillArma"][1]);
		var jcw = ITEM[jArmaEquip][0];
		if (jcw === "Empty Slot"){
			jcw = "No Weapon Equiped";
		}
		document.getElementById("lbl-jArma").innerHTML = jcw;
		// Carlos - Arma equipada
		cArmaEquip = localStorage.getItem("Save_" + s_slot).slice(RANGES["carlosArma"][0], RANGES["carlosArma"][1]);
		var ccw = ITEM[cArmaEquip][0];
		if (ccw === "Empty Slot"){
			ccw = "No Weapon Equiped";
		}
		document.getElementById("lbl-cArma").innerHTML = ccw;
		// Jill e Carlos - Sidepack
		jSide = localStorage.getItem("Save_" + s_slot).slice(RANGES["jill-side"][0], RANGES["jill-side"][1])
		cSide = localStorage.getItem("Save_" + s_slot).slice(RANGES["carlos-side"][0], RANGES["carlos-side"][1]);
		var jSpack = SIDEPACK[jSide][0];
		var cSpack = SIDEPACK[cSide][0];
		document.getElementById("j-sidePack").innerHTML = jSpack;
		document.getElementById("c-sidePack").innerHTML = cSpack;
		// Pos X Y
		xPos = localStorage.getItem("Save_" + s_slot).slice(RANGES["pos-X"][0], RANGES["pos-X"][1]).toUpperCase();
		yPos = localStorage.getItem("Save_" + s_slot).slice(RANGES["pos-Y"][0], RANGES["pos-Y"][1]).toUpperCase();
		document.getElementById("lbl-x-pos").innerHTML = xPos;
		document.getElementById("lbl-y-pos").innerHTML = yPos;
		// Epilogos
		epil = localStorage.getItem("Save_" + s_slot).slice(RANGES["epilogos"][0], RANGES["epilogos"][1]);
		var ep = EPILOGOS[epil][0];
		document.getElementById("lbl-epilogos").innerHTML = ep;
		// Version
		gVersion = VERSAO[SAVE_arquivoBruto.slice(RANGES["gameEdition"][0], RANGES["gameEdition"][1])][0];
		gDetails = VERSAO[SAVE_arquivoBruto.slice(RANGES["gameEdition"][0], RANGES["gameEdition"][1])][1];
		document.getElementById("lbl-gameVersion").innerHTML = gVersion + " (" + gDetails + ")";
		
		// Mapas Obtidos - [WIP]
		mapExtractA = localStorage.getItem("Save_" + s_slot).slice(RANGES["mapas-a"][0], RANGES["mapas-a"][1]);
		mapExtractB = localStorage.getItem("Save_" + s_slot).slice(RANGES["mapas-b"][0], RANGES["mapas-b"][1]);
		var mapStatus; //MAPAS[mapExtractA.slice(0, 2) + mapExtractB.slice(0, 2)];
		document.getElementById("lbl-maps").innerHTML = "[WIP] - " + "BETA" + " (HEX: " + mapExtractA.toUpperCase() + mapExtractB.toUpperCase() + ")";
		// Room / Event [WIP]
		rEvent = localStorage.getItem("Save_" + s_slot).slice(RANGES["room_event"][0], RANGES["room_event"][1]).toUpperCase();
		// Files
		j_files = localStorage.getItem("Save_" + s_slot).slice(RANGES["jill_files"][0], RANGES["jill_files"][1]).toUpperCase();
	} catch (err){
		var msg = "ERROR: There is something wrong here... - \n" + err;
		addLog("error", msg);
		console.error(msg);
	}
	save_renderLife(s_slot);
}
function save_renderLife(s_slot){
	// HP (Vida do personagem atual)
	life = localStorage.getItem('Save_' + s_slot).slice(RANGES["characterHP"][0], RANGES["characterHP"][1]);
	veneno = localStorage.getItem('Save_' + s_slot).slice(RANGES["characterPoison"][0], RANGES["characterPoison"][1]);
	var chkA = life.slice(0, 2);
	var chkB = life.slice(2, 4);
	var HP;
	if (POISON[veneno][0] === "Yes"){
		STATUS = "Poison";
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
			HP = processBIO3Vars(chkA + chkB);
		}
		// Status: MORTO! (Ou Hex FFFF FFFF FFFF FFFF)
		if (HP < 0){
			STATUS = "Dead";
			co = "txt-fine";
		}
		// Status: Danger
		if (HP === 0){
			STATUS = "Between the life and death! (HP: " + HP + ")";
			co = "txt-danger";
		}
		// Status: Danger
		if (HP < 15 || HP > 0){
			STATUS = "Danger";
			co = "txt-danger";
		}
		// Status: Caution Laranja
		if (HP > 14 && HP < 31){
			STATUS = "Caution";
			co = "txt-caution-red";
		}
		// Status: Caution
		if (HP > 30 && HP < 101){
			STATUS = "Caution";
			co = "txt-caution";
		}
		// Status: Fine
		if (HP > 100){
			STATUS = "Fine";
			co = "txt-fine";
		}
		// Status: Hack
		if (HP > 200 && HP < 202){
			STATUS = "Fine...? (HP: " + HP + ")";
			co = "txt-fine";
		}
		if (HP > 201 && HP < 29999){
			STATUS = "Life Hack! (HP: " + HP + ")";
			co = "txt-fine";
		}
		// Status: God Mode
		if (HP > 29999){
			STATUS = "Unfair! (HP: " + HP + ")";
			co = "txt-fine";
		}
	}
	$("#JILL-LIFESTATUS").addClass(co);
	$("#CARLOS-LIFESTATUS").addClass(co);
	document.getElementById("lbl-condition").innerHTML = STATUS;
	document.getElementById("JILL-LIFESTATUS").innerHTML = STATUS;
	document.getElementById("CARLOS-LIFESTATUS").innerHTML = STATUS;
	document.getElementById("lbl-poison").innerHTML = POISON[veneno][0];
	document.getElementById("lbl-HP").innerHTML = HP + " (Hex: " + chkA.toUpperCase() + " " + chkB.toUpperCase() + ")";
	save_renderBox(s_slot);
}
// Fazer Backup
function save_Backup(){
	checkFolders();
	if (SAVE_arquivoBruto !== undefined){
		try{
			var backup_name = gDetails + "-" + getFileName(ORIGINAL_FILENAME) + "-" + currentTime() + ".savbackup";
			fs.writeFileSync(APP_PATH + "\\Backup\\SAV\\" + backup_name, SAVE_arquivoBruto, 'hex');
			log_separador();
			addLog("log", "INFO - The backup was made successfully! - File: " + backup_name);
			addLog("log", "Folder - " + APP_PATH + "\\Backup\\SAV\\" + backup_name);
			log_separador();
		} catch (err){
			addLog('error', "ERROR - Unable to make backup! - " + err);
		}
	} else {
		addLog('error', "ERROR - You can't make a backup if you haven't opened a save yet!");
	}
}
function applyItem(mode, person, pos){
	var itemId = document.getElementById("ex-item-id").value;
	var attr = document.getElementById("ex-item-attr").value;
	var quant = document.getElementById("ex-item-quant").value;
	if (quant == ''){
		quant = '0';
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
	var item = itemId + qu + attr + '00';
	if (mode === 1){ // Invent
		if (person == 0){ // J. Valentine
			JILL_INVENT[pos - 1] = item;
		} else {
			CARLOS_INVENT[pos - 1] = item;
		}
	} else { // Baú
		if (person == 0){
			JILL_BAU[pos] = item;
		} else {
			CARLOS_BAU[pos] = item;
		}
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function applyPerson(){
	var personagemNovo = document.getElementById('ex-person-id').value;
	cPlayer = personagemNovo;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function applyDificuldade(){
	var dificuldadeNova = document.getElementById('ex-dificuldade-id').value;
	dificuldade = dificuldadeNova;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function applyRoupa(){
	var rou = document.getElementById('ex-roupa-id').value;
	outf = rou;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function applySidepack(ppzu){
	var sdpack = document.getElementById('ex-sidepack-id').value;
	if (ppzu === 1){
		jSide = sdpack;
	} else {
		cSide = sdpack;
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function applyArma(personzu){
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
	if (totvezes === ''){
		totalVezesSaves = '00';
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
		totalVezesSaves = '0' + totalVezesSaves;
	}
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function applyHP(){
	var newHP = document.getElementById('ex-HP-id').value;
	if (newHP < 0){
		newHP = 0;
	}
	if (newHP > 30000){
		newHP = 30000;
	}
	var newHPPlus = parseInt(newHP).toString(16);
	if (newHPPlus.length < 2){
		newHPPlus = "0" + newHPPlus;
	}
	if (SAV_godMode === false){
		life = newHPPlus + '00';
	} else {
		SAV_godMode = false;
		life = '3075';
	}
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
	if (HH === ''){
		HH = 0;
	}
	if (MM === ''){
		MM = 0;
	}
	if (SS === ''){
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
		hex01 = '0' + hex01;
	}
	if (hex02.length < 2){
		hex02 = '0' + hex02;
	}
	if (hex03.length < 2){
		hex03 = '0' + hex03;
	}
	if (hex04.length < 2){
		hex04 = '0' + hex04;
	}
	IGTExtract = hex01 + hex02 + hex03 + hex04;
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}
function ADD_ITEM_BOX(PERSON, INDEX, ITEMHEX, QUANTIDADE, ATRIBUTO, VNULO){
	var quan = parseInt('0x' + QUANTIDADE);	
	var atri = ATTR[ATRIBUTO][0];
	var colo = ATTR[ATRIBUTO][1];
	var cfundo = ATTR[ATRIBUTO][2];
	var nome = ITEM[ITEMHEX][0];
	var clip = ITEM[ITEMHEX][2];
	var marg = ITEM[ITEMHEX][3];
	var imse = ITEM[ITEMHEX][4];
	var cssfixbtn = '';
	var cssfix = '';
	if (parseInt(quan) === 0){
		quan = '';
	} else {
		cssfix = 'box-fix-lbl';
		cssfixbtn = 'btn-box-fix';
	}
	if (ATRIBUTO === "03" || ATRIBUTO === "07" || ATRIBUTO === "0f"){
		atri = 'Inf.';
	}
	if (ITEMHEX.length < 2){
		ITEMHEX = "0" + ITEMHEX;
	}
	var HTMLTEMPLATE = '<div class="bau-item" id="item-' + INDEX + '">' +
	'<img src="img/box-set-' + imse + '.png" draggable="false" class="b-icon" style="clip-path: inset(' + clip + '); margin-left:' + marg + ';" id="boxicon-' + INDEX + '" onclick="addInfo(' + PERSON + ', \'' + ITEMHEX + '\');">' + 
	'<font class="b-quant-lbl" id="b-' + PERSON + '-q-lbl-' + INDEX + '" onclick="addInfo(' + PERSON + ', \'' + ITEMHEX + '\');" style="color: ' + colo + ';text-shadow: ' + cfundo + ';">' + quan + '</font>' + 
	'<div class="b-label"><font class="' + cssfix + '" id="b-name-' + INDEX + '" onclick="addInfo(' + PERSON + ', \'' + ITEMHEX + '\');">(' + INDEX + ') ' + nome + '</font>' + 
	'</div><input type="button" class="btn-box ' + cssfixbtn + '" onclick="showModItem(2, ' + PERSON + ', ' + INDEX + ', \'' + ITEMHEX + '\');" value="Modify"></div>';
	if (PERSON === 0){ // Adicionar item ao baú da jill
		$("#JILL-BOX").append(HTMLTEMPLATE);
	} else {		  // Adicionar item ao baú do carlos
		$("#CARLOS-BOX").append(HTMLTEMPLATE);
	}
	// Fix para porcentagem
	if (ATRIBUTO === '0e' || ATRIBUTO === '06' || ATRIBUTO === '02' || ATRIBUTO === '16'){
		var vq = document.getElementById("b-" + PERSON + "-q-lbl-" + INDEX).innerHTML;
		if (vq !== ''){
			$("#b-" + PERSON + "-q-lbl-" + INDEX).css({'margin-left': '-562px'});
			document.getElementById("b-" + PERSON + "-q-lbl-" + INDEX).innerHTML = vq + '%';
		}
	}
}
// Render Info
function addInfo(person, itemId){
	main_closeFileList();
	$('#icon-info-0' + person).css({'display': 'none'});
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
	if (itemId !== '00'){
		document.getElementById('text-info-0' + person).innerHTML = '<center>' + ITEM[itemId][0] + '</center><br>' + ITEM[itemId][1];
	} else {
		document.getElementById('text-info-0' + person).innerHTML = '<!-- Empty Slot -->';
	}
	document.getElementById('icon-info-0' + person).src = "img/details-0" + imgSet + ".png";
	$('#icon-info-0' + person).css({display: "inline", "clip-path": "inset(0px " + finalA + "px 0px " + finalB + "px)", "margin-left": finalMargin + "px"});
}
function addInvent(person, itemHex, quantHex, block, atrib, nulo){
	// Infos
	var cor;
	var shad;
	var quanti;
	var titulo = ITEM[itemHex][0];
	var pushRequest = parseInt(ITEM[itemHex][7]);
	var spriteNumber = parseInt(ITEM[itemHex][8]);
	var percent = false;
	if (atrib === '00'){
		if (itemHex === '00' || quantHex === '00'){
			quanti = '';
		} else {
			quanti = parseInt('0x' + quantHex);
		}
	}
	// Caso seja em porcentagem
	var classN = document.getElementById('J-LBL-' + block).className;
	if (atrib === '0e' || atrib === '06' || atrib === '02' || atrib === '16'){
		quanti = parseInt("0x" + quantHex) + "%";
		percent = true;
	} else {
		quanti = parseInt("0x" + quantHex);
	}
	// Caso seja ammo infinita
	if (atrib === '03' || atrib === '07' || atrib === '0f' || atrib === '13' || atrib === '17'){
		quanti = 'Inf.';
	}
	// Pixels
	var startB = 0;
	var startA = 956;
	var pushOffset = 106;
	var marginOffset = 110;
	var fix = 4;
	var s = 0;
	// Finais
	var finalA = startA;
	var finalB = startB;
	var finalMargin = 0;
	while(s !== pushRequest){
		finalA = finalA - pushOffset;
		finalB = finalB + pushOffset;
		finalMargin = finalMargin - marginOffset + fix;
		s++;
	}
	var p;
	if (person === 0){
		p = "Jill";
	} else {
		p = "Carlos";
	}
	if (ATTR[atrib] !== undefined){
		cor = ATTR[atrib][1];
 		shad = ATTR[atrib][2];
	} else {
		var msg = "(" + p + ") Inventory - The item on slot " + block + " have an unknown Attr! (Attr: " + atrib + ")";
		addLog("warn", "WARN - " + msg);
		console.warn("WARN - " + msg);
	}
	if (person == 0){ // Inventário da Jill
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
		document.getElementById("J-LBL-" + block).innerHTML = quanti;
		$("#J-LBL-" + block).css({color: cor, "text-shadow": shad});
		$("#J-icon-" + block).css({"clip-path": "inset(0px " + finalA + "px 4px " + finalB + "px)", "margin-left": finalMargin + "px"});
	} else { // Inventário do Carlos
		document.getElementById("C-icon-" + block).src = "img/box-set-" + spriteNumber + ".png";
		document.getElementById("C-icon-" + block).onclick = function(){
			addInfo(person, itemHex);
		}
		document.getElementById("C-LBL-" + block).onclick = function(){
			addInfo(person, itemHex);
		}
		document.getElementById("C-LBL-" + block).innerHTML = quanti;
		$("#C-LBL-" + block).css({color: cor, "text-shadow": shad});
		$("#C-icon-" + block).css({"clip-path": "inset(0px " + finalA + "px 4px " + finalB + "px)", "margin-left": finalMargin + "px" });
	}
	if (quanti === ''){
		quanti = '0';
	}
	addLog("log", "Inventory: " + p + " Slot: " + block + " - HEX: <font class='user-can-select'>" + itemHex.toUpperCase() + quantHex.toUpperCase() + atrib.toUpperCase() + nulo.toUpperCase() + 
		"</font> - Item: " + itemHex.toUpperCase() + " (" + titulo + ") - Quantity: " + quantHex.toUpperCase() + " (" + parseInt(quantHex, 16) + ") - Attr.: " + 
		atrib.toUpperCase() + " (" + ATTR[atrib][0] + ")");
}
function SAVE_clearAllSaves(){
	if (SAVE_arquivoBruto !== undefined){
		var ask = confirm("WARNING: This will unrecoverably format your saves file.\n\nDo you want to continue anyway?");
		if (ask === true){
			if(fs.existsSync(ORIGINAL_FILENAME) === true){
				fs.unlinkSync(ORIGINAL_FILENAME);
				var newFile = fs.readFileSync(APP_PATH + '\\App\\tools\\format.r3save', 'hex');
				fs.writeFileSync(ORIGINAL_FILENAME, newFile, 'hex');
				log_separador();
				addLog('log', 'INFO - Process Complete!');
				log_separador();
				scrollLog();
				alert('INFO - Process Complete!');
				reload();
			}
		}
	}
}
/// Time Helpers
/*  _____________________________________________________________________________________________________
   |																									 \
   |   Tempo - 0x2200 até 0x2203 - Valor 32 bytes (00 00 00 00)											  |
   |______________________________________________________________________________________________________|
   |																									  |
   |	    Formato: DD:HH:MM:SS:DS 																	  |
   |    																								  |
   |   Quando o primeiro chega ao seu valor máximo (255 / FF), ele aumenta o próximo endeereço em 1.      |
   |   Exemplo: se o tempo for 00:00:00:04:75 (Quatro Segundos e 75 Milésimos) Em HEX estará              |
   |   ff 00 00 00. Quando mais um milésimo se passar, será quatro segundos e 76 milésimos, 		 	  |
   |   e em HEX estará: 00 01 00 00.																	  |
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
   |	     Oh, come on! I have to translate this too? Throw this at translate.google.com! 			  |
   \______________________________________________________________________________________________________|
*/
function contador0x2200(hex0x2200){
	// Formula: 0x2200 * Milésimos
	var timeOffset = parseInt(hex0x2200, 16) * 1000;
	return timeOffset;
}
function contador0x2201(multiplier){
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2200(m.toString(16));
}
function contador0x2202(multiplier){
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2201(m.toString(16));
}
function contador0x2203(multiplier){
	var m = parseInt(multiplier, 16) * 255;
	return contador0x2202(m.toString(16));
}
function contador0x2204(multiplier){
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
	var restante;
	var minus = 998;
	// Milésimos
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
	// Décimos 
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
		milesimos = '0' + milesimos;
	}
	if (decimos.toString().length < 2){
		decimos = '0' + decimos;
	}
	if (segundos.toString().length < 2){
		segundos = '0' + segundos;
	}
	if (minutos.toString().length < 2){
		minutos = '0' + minutos;
	}
	if (hora.toString().length < 2){
		hora = '0' + hora;
	}
	if (dia.toString().length < 2){
		dia = '0' + dia;
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
	document.getElementById("lbl-time").innerHTML = hora + ":" + minutos + ":" + segundos;
	document.getElementById("lbl-time").title = "Full Time Format:\n" + dia + ":" + hora + ":" + minutos + ":" + segundos + ":" + decimos + ":" + milesimos;
	//console.log("IGT: " + h_0x2200 + " - " + h_0x2201 + " - " + h_0x2202 + " - " + h_0x2203);
}
function resetTimer(){
	milesimos = 0;
	decimos   = 0;
	segundos  = 0;
	minutos   = 0;
	hora      = 0;
	dia       = 0;
	document.getElementById("lbl-time").innerHTML = "00:00:00";
}
function resetIGT(){
	IGTExtract = '00000000';
	request_render_save = true;
	MAKE_SAVE(CURRENT_SAVE_SLOT);
}