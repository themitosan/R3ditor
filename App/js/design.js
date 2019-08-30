/*
	R3ditor - design.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/
var RDT_totalMenus = 3;
var SAVE_totalMenus = 4;
var RDT_aba_atual = undefined;
var SAVE_aba_atual = undefined;
var request_render_save = undefined;
var l_separador = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";

window.onclose = function(){
	localStorage.clear();
}

window.onresize = function(){
	window.resizeBy(1340, 733);
}

function reload(){
	process.chdir(TEMP_APP_PATH);
	localStorage.clear();
	location.reload();
}

function scrollLog(){
	document.getElementById("log-programa").scrollTop = document.getElementById("log-programa").scrollHeight;
}

function SAVE_applyMenuFocus(menuId){
	SAVE_aba_atual = menuId;
	var i = 0;
	while(i < SAVE_totalMenus){
		$('#menu-' + i).removeClass('aba-select');
		i++;
	}
	$('#menu-' + menuId).addClass('aba-select');
	scrollLog();
}

function main_menu(anim){
	localStorage.clear();
	if (anim === 0){ // Voltar
		reload();
	} else {
		$("#menu-topo").css({"display": "none"});
	}
	if (anim === 1){ // Save
		document.title = APP_NAME + " - Save Editor (*.sav)";
		$("#menu-topo-save").css({"display": "block"});
	}
	if (anim === 2){ // MSG
		document.title = APP_NAME + " - Message Editor (*.msg)";
		$("#msg-lbl-totalCommands").html(MSG_totalComandos);
		$("#menu-topo-msg").css({"display": "block"});
		$("#menu-topo-MOD").css({"display": "none"});
		MSG_showMenu(1);
	}
	if (anim === 3){ // RDT
		document.title = APP_NAME + " - Map Editor (*.rdt)";
		$("#menu-topo-RDT").css({"display": "block"});
	}
}
function SAVE_showMenu(menuId){
	$("#SAV_reload").css({"display": "inline"});
	$("#menu-topo-MOD").css({"display": "none"});
	$("#img-logo").fadeOut({duration: 100, queue: false});
	if (SHOW_EDITONHEX === true){
		$("#SAV_openInHex").css({"display": "inline"});
	} else {
		$("#SAV_openInHex").css({"display": "none"});
	}
	if (request_render_save !== true){
		$("#menu-SAVE").css({"display": "block"});
	}
	cancelShowModItem();
	if (menuId === 0){ // Menu Geral
		if (request_render_save == false){
			addInfo(0, "00");
			addInfo(1, "00");
			$("#log-programa").css({"height": "54px", "top": "656px"});
			SAVE_applyMenuFocus(1);
			$("#s-menu-general").css({"display": "block", "width": "74%"});
			$("#save-geral").removeClass('none');
			$("#save-geral").css({"height": "550px"});
			$("#menu-info").css({"height": "560px"});
			$("#msg-viewer").addClass('none');
			$("#save-carlos").addClass('none');
			$("#save-jill").addClass('none');
		}
		request_render_save = false;
	} else {
		$("#log-programa").css({"height": "86px", "top": "626px"});
		$("#save-geral").css({"height": "530px"});
		$("#menu-info").css({"height": "530px"});
	}
	if (menuId === 1){ // Menu JILL
		addInfo(0, "00");
		SAVE_applyMenuFocus(2);
		$("#save-geral").addClass('none');
		$("#save-carlos").addClass('none');
		$("#msg-viewer").addClass('none');
		$("#save-jill").removeClass('none');
	}
	if (menuId === 2){ // Menu Carlos
		addInfo(1, "00");
		SAVE_applyMenuFocus(3);
		$("#save-jill").addClass('none');
		$("#save-geral").addClass('none');
		$("#msg-viewer").addClass('none');
		$("#save-carlos").removeClass('none');
	}
	if (menuId === 3){ // Menu Opções
		addInfo(1, "00");
		SAVE_applyMenuFocus(4);
		$("#save-jill").addClass('none');
		$("#save-geral").addClass('none');
		$("#save-carlos").addClass('none');
		$("#msg-viewer").removeClass('none');
		$("#o-menu-general").css({"display": "block"});
	}
	scrollLog();
}
function cleanForSaveLoad(){
	var cu = 1;
	var to = 16;
	adjustDialogSave(40);
	$("#JILL-BOX").empty();
	$("#CARLOS-BOX").empty();
	$("#JILL-LIFESTATUS").removeClass('txt-caution-red');
	$("#JILL-LIFESTATUS").removeClass('txt-caution');
	$("#JILL-LIFESTATUS").removeClass('txt-danger');
	$("#JILL-LIFESTATUS").removeClass('txt-posion');
	$("#JILL-LIFESTATUS").removeClass('txt-fine');
	$("#CARLOS-LIFESTATUS").removeClass('txt-caution-red');
	$("#CARLOS-LIFESTATUS").removeClass('txt-caution');
	$("#CARLOS-LIFESTATUS").removeClass('txt-danger');
	$("#CARLOS-LIFESTATUS").removeClass('txt-posion');
	$("#CARLOS-LIFESTATUS").removeClass('txt-fine');
	while(cu !== to){
		$("#slt-save-" + cu).removeClass("slot-ausente");
		$("#slt-save-" + cu).removeClass("slot-presente");
		cu++;
	}
}
function showModItem(modo, person, pos, itemId){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_ITEM;
	document.getElementById("lbl-exchange-item").innerHTML = ITEM[itemId][0];
	document.getElementById("btn-item-apply").onclick = function(){
		applyItem(modo, person, pos);
		cancelShowModItem(0);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}
function showModPerson(person){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_PERSON;
	document.getElementById("lbl-exchange-person").innerHTML = PLAYERS[person][0];
	document.getElementById("btn-item-apply").onclick = function(){
		applyPerson();
		cancelShowModItem(1);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}
function showModDificuldade(diff){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_DIFICULDADE;
	document.getElementById("lbl-exchange-dificuldade").innerHTML = DIFICULDADE[diff][0];
	document.getElementById("btn-item-apply").onclick = function(){
		applyDificuldade();
		cancelShowModItem(2);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}
function showModRoupa(roupa){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_ROUPA;
	document.getElementById("lbl-exchange-roupas").innerHTML = ROUPA[roupa][0];
	document.getElementById("btn-item-apply").onclick = function(){
		applyRoupa();
		cancelShowModItem(3);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}
function showModSaveCount(nSaves){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_SAVECOUNT;
	document.getElementById("lbl-exchange-savecount").innerHTML = parseInt("0x" + nSaves);
	document.getElementById("btn-item-apply").onclick = function(){
		applySaveCount();
		cancelShowModItem(4);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}
function showModHP(showLife){
	adjustDialogSave(40);
	hideMenusForDialog();
	var ll = showLife.slice(0, 2);
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_HP;
	document.getElementById("lbl-exchange-HP").innerHTML = parseInt("0x" + ll);
	document.getElementById("btn-item-apply").onclick = function(){
		applyHP();
		cancelShowModItem(5);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}
function showModEpilogos(eps){
	adjustDialogSave(37);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_EPILOGO;
	document.getElementById("lbl-exchange-epilogues").innerHTML = EPILOGOS[eps][0];
	document.getElementById("btn-item-apply").onclick = function(){
		applyEpil();
		cancelShowModItem(6);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModIGT(){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_IGT;
	document.getElementById("lbl-exchange-IGT").innerHTML = hora + ":" + minutos + ":" + segundos;
	document.getElementById("btn-item-apply").onclick = function(){
		makeHexTime();
		cancelShowModItem(7);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModSidepack(person){
	adjustDialogSave(40);
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_SIDEPACK;
	var pp = undefined;
	var st = undefined;
	if (person === 1){ // J
		pp = "Jill Valentine";
		st = SIDEPACK[jSide][0];
	} else {
		pp = "Carlos Oliveira";
		st = SIDEPACK[cSide][0];
	}
	hideMenusForDialog();
	document.getElementById("person-sidepack").innerHTML = pp;
	document.getElementById("lbl-exchange-sidepack").innerHTML = st;
	document.getElementById("btn-item-apply").onclick = function(){
		applySidepack(person);
		cancelShowModItem(8);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModCurrentArma(person){
	adjustDialogSave(34);
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_ARMA;
	var pp = undefined;
	var st = undefined;
	var arma = undefined;
	if (person === 1){ // J
		pp = "Jill Valentine";
		arma = jArmaEquip;
	} else {
		pp = "Carlos Oliveira";
		arma = cArmaEquip;
	}
	if (arma === "00"){
		st = "No Weapon Equiped";
	} else {
		st = ITEM[arma][0];
	}
	hideMenusForDialog();
	document.getElementById("person-arma").innerHTML = pp;
	document.getElementById("lbl-exchange-arma").innerHTML = st;
	document.getElementById("btn-item-apply").onclick = function(){
		applyArma(person);
		cancelShowModItem(9);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModPoison(){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_POISON;
	document.getElementById("lbl-exchange-poison").innerHTML = POISON[veneno][0];
	document.getElementById("btn-item-apply").onclick = function(){
		applyPoison();
		cancelShowModItem(10);
	}
	document.getElementById("btn-item-cancel").onclick = function(){
		cancelShowModItem(10);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function cancelShowModItem(){
	$("#menu-mod-item").css({"display": "none"});
	if (SAVE_aba_atual === 1){
		$("#s-menu-general").css({"display": "block"});
	}
	if (SAVE_aba_atual === 4){
		$("#o-menu-general").css({"display": "block"});
	}
	$("#j_box").css({"display": "block"});
	$("#c_box").css({"display": "block"});
	$("#c_info").css({"display": "block"});
	$("#j_info").css({"display": "block"});
	$("#j_invent").css({"display": "block"});
	$("#c_invent").css({"display": "block"});
	$("#JILL-STATUS").css({"display": "block"});
	$("#save-alterar").css({"display": "block"});
	$("#CARLOS-STATUS").css({"display": "block"});
}
function hideMenusForDialog(){
	$("#JILL-STATUS").css({"display": "none"});
	$("#CARLOS-STATUS").css({"display": "none"});
	$("#s-menu-general").css({"display": "none"});
	$("#save-alterar").css({"display": "none"});
	$("#j_box").css({"display": "none"});
	$("#j_box").css({"display": "none"});
	$("#j_info").css({"display": "none"});
	$("#j_invent").css({"display": "none"});
	$("#c_box").css({"display": "none"});
	$("#c_info").css({"display": "none"});
	$("#c_invent").css({"display": "none"});
}
function adjustDialogSave(percent) {
	$("#menu-mod-item").css({"top": percent + "%"});
}
function log_separador() {
	addLog("log", l_separador);
}
/// About
function showAbout(){
	$("#menu-topo").css({"display": "none"});
	$("#log-programa").css({"display": "none"});
	$("#menu-topo-MOD").css({"display": "none"});
	$("#about-r3ditor").fadeIn({duration: 500, queue: false});
}
/// MSG
function MSG_showMenu(id){
	scrollLog();
	$("#img-logo").css({"display": "none"});
	$("#lbl-msg-length").removeClass("red");
	if (SHOW_EDITONHEX === true && MSG_arquivoBruto !== undefined){
		$("#MSG_openInHex").css({"display": "inline"});
	} else {
		$("#MSG_openInHex").css({"display": "none"});
	}
	if (RDT_arquivoBruto == undefined && MSG_arquivoBruto !== undefined){
		$("#MSG_reload").css({"display": "inline"});	
	} else {
		$("#MSG_reload").css({"display": "none"});
	}
	if (id === 1){ // Inicial
		$("#menu-MSG").css({"display": "block"});
		$("#log-programa").css({"height": "84px"});
		MSG_doTheTitleThing();
	}
}
function MSG_doTheTitleThing(){
	if (ORIGINAL_FILENAME === undefined){
		document.title = APP_NAME + " - Message Editor / Translator";
	} else {
		document.title = APP_NAME + " - Message Editor / Translator - File: " + ORIGINAL_FILENAME;
	}
}
function TRANSFER_MSG_TO_RDT(){
	$("#menu-MSG").css({"display": "none"});
	$("#menu-topo-msg").css({"display": "none"});
	$("#MSG_openInHex").css({"display": "none"});
	$("#menu-topo-RDT").css({"display": "block"});
	$("#btn-goback-rdt").css({"display": "none"});
	if (enable_mod === true && EXTERNAL_APP_RUNNING === false){
		$("#menu-topo-MOD").css({"display": "inline"});
	}
}
function cleanMSGFields(){
	MSG_arquivoBruto = undefined;
	ORIGINAL_FILENAME = undefined;
	$("#MSG_saveAs").css({"display": "none"});
	$("#MSG_applyMessageRDT").css({"display": "none"});
	document.getElementById('msg-hex-toTrans').value = "";
	document.getElementById("text-msg-raw").innerHTML = " ";
	document.getElementById("lbl-msg-length").innerHTML = "0";
}
function MSG_clearHexTextfield(){
	document.getElementById('msg-hex-toTrans').value = " ";
}
function MSG_triggerMiscClick(){
	$("#MSG_chkbok_fillMessage").trigger('click');
	WZ_saveConfigs();
}
function MSG_renderMSGLength(totalMsg){
	if (totalMsg === 0){
		$("#MSG_saveAs").css({"display": "none"});
		$("#MSG_applyMessageRDT").css({"display": "none"});
	} else {
		$("#MSG_saveAs").css({"display": "inline"});
		if (RDT_arquivoBruto !== undefined){
			if (MSG_LENGTH < MSG_MAX_LENGTH){
				$("#lbl-msg-length").removeClass("red");
				$("#lbl-msg-length").removeClass("green");
				$("#MSG_applyMessageRDT").css({"display": "none"});
			}
			if (MSG_LENGTH > MSG_MAX_LENGTH){
				$("#lbl-msg-length").addClass("red");
				$("#lbl-msg-length").removeClass("green");
				$("#MSG_applyMessageRDT").css({"display": "none"});
			}
			if (MSG_LENGTH === MSG_MAX_LENGTH){
				$("#lbl-msg-length").addClass("green");
				$("#lbl-msg-length").removeClass("red");
				$("#MSG_applyMessageRDT").css({"display": "inline"});
			}
		} else {
			$("#lbl-msg-length").removeClass("red");
			$("#lbl-msg-length").removeClass("green");
			$("#MSG_applyMessageRDT").css({"display": "none"});
		}
	}
}
function MSG_renderDialog(id, args, index, isMod){
	if (args === undefined){
		args = "";
	}
	if (index === undefined){
		index = MSG_totalComandos;
	}
	if (isMod === undefined){
		isMod = false;
	}
	// Cancel Form
	if (id === 0){
		$("#text-msg-events").css({"display": "block"});
		document.getElementById("dialog-msg-render").innerHTML = " ";
		$("#dialog-msg-addcomand").css({"display": "none", "height": "auto"});
		if (MSG_totalComandos !== 0){
			$("#MSG_saveAs").css({"display": "inline"});
		}
		if (RDT_arquivoBruto !== undefined && MSG_arquivoBruto === undefined){
			$("#MSG_applyMessageRDT").css({"display": "inline"});
		}
	} else {
		$("#MSG_saveAs").css({"display": "none"});
		$("#text-msg-events").css({"display": "none"});
		$("#MSG_applyMessageRDT").css({"display": "none"});
		$("#dialog-msg-addcomand").css({"display": "block"});
	}
	// Iniciar Mensagem
	if (id === 1){
		$("#dialog-msg-addcomand").css({"top": "192px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Start Message";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_START;
		document.getElementById('msg-comeco-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_STARTMSG(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Finalizar Mensagem
	if (id === 2){
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "End Message";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_END;
		document.getElementById('msg-fim-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ENDMSG(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Texto
	if (id === 3){ 
		var correcao = "";
		$("#dialog-msg-addcomand").css({"top": "98px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Show Text";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_ADDTEXT;
		if (localStorage.getItem('MSG_Mensagem-' + args) !== null){
			args = localStorage.getItem('MSG_Mensagem-' + args);
			correcao = args.replace(new RegExp("<br>", 'gi'), "\n").replace(new RegExp("Yes / No", 'gi'), "*").replace(new RegExp("(Green Color)", 'gi'), "[").replace(new RegExp("(Line Break)", 'gi'), "@").replace(new RegExp("Pause", 'gi'), "|").replace(new RegExp("(Formatação: Cor Verde)", "gi"), "[").replace(/[{()}]/g, '');
		}
		document.getElementById('msg-txt-toTrans').value = correcao;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDTEXT(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Caracter Especial
	if (id === 4){ 
		if (args == ""){
			args = "ea24";
		}
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Show Special Char";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_ADDCHAR;
		document.getElementById('msg-char-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDCHAR(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Nome de Item
	if (id === 5){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Show Item Name";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_NAMEITEM;
		document.getElementById('msg-lblitem-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWITEMNAME(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Reproduzir SE
	if (id === 6){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Play SE";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_EXECSE;
		document.getElementById('msg-execse-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_EXECSE(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Trocar Câmera
	if (id === 7){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Change Camera";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_SHOWCAMERA;
		document.getElementById('msg-cam-id').value = args;
		MSG_seekCameras();
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWCAMERA(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Comando desconhecido usado em r101.rdt
	if (id === 8){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Unknown Function (F5)";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_FUNCTIONF5;
		document.getElementById('msg-f5-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_F5(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Trocar cor do texto
	if (id === 9){
		var splitColor = undefined;
		if (args === ""){
			splitColor = "1";
		} else {
			splitColor = args;
		}
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Change Text Color";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_TEXTCOLOR;
		document.getElementById('msg-selectColor-id').value = splitColor;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_TEXTCOLOR(index, isMod);
			MSG_renderDialog(0);
		}
	}
}
function MSG_renderCamPreview(){
	if (RDT_arquivoBruto !== undefined && fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\") === true){
		var currentFile = getFileName(ORIGINAL_FILENAME).toUpperCase().slice(0, 4);
		var currentCam = document.getElementById('msg-selectCam-id').value.toUpperCase();
		document.getElementById('MSG_camPreview').src = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + currentFile + currentCam + ".JPG";
	}
}

/// RDT
function RDT_showMenu(id){
	var c = 1;
	document.title = APP_NAME + " - Map Editor (*.rdt) - File: " + ORIGINAL_FILENAME;
	$("#img-logo").css({"display": "none"});
	if (enable_mod === true && EXTERNAL_APP_RUNNING === false){
		$("#RDT_MSG-holder").css({"height": "430px"});
		$("#RDT_menu-" + id).css({"height": "482px"});
		$("#RDT-item-list").css({"height": "428px"});
		$("#RDT-Item-Edit").css({"height": "418px"});
		$("#RDT_BG_" + id).css({"height": "470px"});
		$("#RDT-geral").css({"height": "472px"});
		$("#RDT-msgs").css({"height": "472px"});
		$("#RDT-ifm").css({"height": "472px"});
	} else {
		$("#RDT_MSG-holder").css({"height": "472px"});
		$("#RDT_menu-" + id).css({"height": "528px"});
		$("#RDT-item-list").css({"height": "472px"});
		$("#RDT-Item-Edit").css({"height": "458px"});
		$("#RDT_BG_" + id).css({"height": "512px"});
		$("#RDT-geral").css({"height": "516px"});
		$("#RDT-msgs").css({"height": "516px"});
		$("#RDT-ifm").css({"height": "516px"});
		$("#menu-topo-MOD").css({"display": "none"});
	}
	while(c < RDT_totalMenus + 1){
		$("#RDT_menu-" + c).css({"display": "none"});
		c++;
	}
	RDT_editItemCancel();
	if (RDT_totalItensGeral < 0){
		RDT_totalItensGeral = 0;
	}
	if (SHOW_EDITONHEX === true){
		$("#RDT_openInHex").css({"display": "inline"});
	} else {
		$("#RDT_openInHex").css({"display": "none"});
	}
	$("#RDT_reload").css({"display": "inline"});
	document.getElementById("RDT-item-list").scrollTop = 0;
	document.getElementById("RDT_MSG-holder").scrollTop = 0;
	document.getElementById("RDT-map-select").innerHTML = RDT_EDIT_MAP;
	document.getElementById("RDT_mapFileName").innerHTML = RDT_MAPFILE;
	document.getElementById("RDT-file-select").innerHTML = RDT_EDIT_FILE;
	document.getElementById("RDT-item-select").innerHTML = RDT_EDIT_ITEM;
	document.getElementById("RDT_lbl-totMsg").innerHTML = RDT_totalMessages;
	document.getElementById("RDT_lbl-totalMaps").innerHTML = RDT_totalMapas;
	document.getElementById("RDT_lbl-totalFiles").innerHTML = RDT_totalFiles;
	document.getElementById("RDT_lbl-totalItens").innerHTML = RDT_totalItens;
	document.getElementById("RDT_lbl-totalMsg").innerHTML = RDT_totalMessages;
	document.getElementById("RDT_lbl-totItens").innerHTML = RDT_totalItensGeral;
	document.getElementById("RDT-lbl-mapName").innerHTML = getFileName(ORIGINAL_FILENAME);
	document.getElementById("RDT-msg-mapName").innerHTML = getFileName(ORIGINAL_FILENAME);
	document.getElementById("RDT-aba-menu-2").value = "Messages (" + RDT_totalMessages + ")";
	document.getElementById("RDT-aba-menu-3").value = "Items, Files and Maps (" + RDT_totalItensGeral + ")";
	document.getElementById("RDT-lbl-FILENAME").innerHTML = getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdt";
	$("#log-programa").css({"height": "86px", "top": "626px"});
	$("#RDT_menu-" + id).css({"display": "block"});
	$("#menu-RDT").css({"display": "block"});
	RDT_applyMenuFocus(id);
	RDT_Error_404();
	scrollLog();
}
function TRANSFER_RDT_TO_MSG(){
	document.title = APP_NAME + " - Transfering message...";
	$("#lbl-msg-length").addClass("green");
	$("#lbl-msg-length").removeClass("red");
	$("#menu-RDT").css({"display": "none"});
	$("#RDT_BG_1").css({"display": "none"});
	$("#RDT_BG_2").css({"display": "none"});
	$("#RDT_BG_3").css({"display": "none"});
	$("#menu-topo-MOD").css({"display": "none"});
	$("#menu-topo-RDT").css({"display": "none"});
	$("#RDT_openInHex").css({"display": "none"});
	$("#MSG_openInHex").css({"display": "none"});
	$("#menu-topo-msg").css({"display": "block"});
	$("#btn-goback-rdt").css({"display": "inline"});
	$("#lbl-msg-maxlength").css({"display": "inline"});
	$("#MSG_applyMessageRDT").css({"display": "inline"});
	document.getElementById('RDT_MSG-holder').innerHTML = " ";
	document.getElementById('MSG_saveAs').value = 'Save as MSG';
	document.getElementById('lbl-msg-maxlength').innerHTML =  " (" + MSG_MAX_LENGTH + ")";
	MSG_showMenu(1);
}
function RDT_BG_display(){
	if (enable_mod === true){
		var c = 0;
		while (c < 9){
			if (fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\" + getFileName(ORIGINAL_FILENAME) + "0" + c + ".JPG")){
				$("#RDT_BG_1").css({"background-image": "url(../Assets/DATA_A/BSS/" + getFileName(ORIGINAL_FILENAME) + "0" + c + ".JPG)"});
				$("#RDT_BG_2").css({"background-image": "url(../Assets/DATA_A/BSS/" + getFileName(ORIGINAL_FILENAME) + "0" + c + ".JPG)"});
				$("#RDT_BG_3").css({"background-image": "url(../Assets/DATA_A/BSS/" + getFileName(ORIGINAL_FILENAME) + "0" + c + ".JPG)"});
				$("#RDT_BG_1").fadeIn({duration: 500, queue: false});
				$("#RDT_BG_2").fadeIn({duration: 500, queue: false});
				$("#RDT_BG_3").fadeIn({duration: 500, queue: false});
				break;
			} else {
				c++;
			}
		}
		if (c === 9 || c > 9){
			$("#RDT_BG_1").css({"display": "none"});
			$("#RDT_BG_2").css({"display": "none"});
			$("#RDT_BG_3").css({"display": "none"});
		}
	}
}
function RDT_Error_404(){
	if (RDT_totalMessages < 1){
		$("#RDT-msg-404").css({"display": "block"});
		$("#RDT_MSG-holder").css({"display": "none"});
	} else {
		$("#RDT-msg-404").css({"display": "none"});
		$("#RDT_MSG-holder").css({"display": "block"});
	}
	if (RDT_totalItensGeral < 1){
		$("#RDT-item-404").css({"display": "block"});
		$("#RDT-item-list").css({"display": "none"});
	} else {
		$("#RDT-item-404").css({"display": "none"});
		$("#RDT-item-list").css({"display": "block"});
	}
}
function RDT_displayItemEdit(id, hex, posX, posY, posZ, posR, anim, index, quant, header){
	var nome = undefined;
	if (hex.length < 2){
		hex = "0" + hex;
	}
	if (quant > 255){
		quant = 255;
	}
	if (quant < 0){
		quant = 0;
	}
	// Item
	if (id === 1){
		nome = ITEM[hex][0];
		document.getElementById('RDT-item-select').value = hex;
		$("#RDT-edit-item-select").removeClass("none");
		$("#RDT-edit-file-select").addClass("none");
		$("#RDT-edit-map-select").addClass("none");
	}
	// File
	if (id === 2){
		nome = FILES[hex][0];
		document.getElementById('RDT-file-select').value = hex;
		$("#RDT-edit-file-select").removeClass("none");
		$("#RDT-edit-item-select").addClass("none");
		$("#RDT-edit-map-select").addClass("none");
	}
	// Map
	if (id === 3){
		nome = RDT_MAPAS[hex][0];
		document.getElementById('RDT-map-select').value = hex;
		$("#RDT-edit-map-select").removeClass("none");
		$("#RDT-edit-file-select").addClass("none");
		$("#RDT-edit-item-select").addClass("none");
	}
	document.getElementById('RDT_item-edit-X').value = posX;
	document.getElementById('RDT_item-edit-Y').value = posY;
	document.getElementById('RDT_item-edit-Z').value = posZ;
	document.getElementById('RDT_item-edit-R').value = posR;
	document.getElementById('RDT_item-edit-A').value = anim;
	document.getElementById('RDT_item-edit-Quant').value = quant;
	document.getElementById("RDT-lbl-item-edit").innerHTML = nome;
	document.getElementById("RDT-lbl-edit-index").innerHTML = index;
	document.getElementById('RDT-btn-aplicarItem').onclick = function(){
		RDT_ITEM_APPLY(index, id);
	}
	if (header === "67"){
		$("#RDT-btn-aplicarItem").css({"display": "inline"});
	} else {
		$("#RDT-btn-aplicarItem").css({"display": "none"});
	}
	$("#RDT-Item-Edit").css({"display": "block"});
	$("#RDT-item-list").css({"width": "622px"});
}
function RDT_editItemCancel(){
	$("#RDT-item-list").css({"width": "1288px"});
	$("#RDT-Item-Edit").css({"display": "none"});
	document.getElementById('RDT_item-edit-X').value = "";
	document.getElementById('RDT_item-edit-Y').value = "";
	document.getElementById('RDT_item-edit-Z').value = "";
	document.getElementById('RDT_item-edit-R').value = "";
	document.getElementById('RDT_item-edit-A').value = "";
	document.getElementById('RDT_item-edit-Quant').value = "";
	document.getElementById("RDT-lbl-edit-index").innerHTML = "N/A";
	document.getElementById("RDT-lbl-item-edit").innerHTML = "No item select";
}
function RDT_applyMenuFocus(menuId){
	RDT_aba_atual = menuId;
	var i = 0;
	while(i < RDT_totalMenus + 1){
		$('#RDT-aba-menu-' + i).removeClass('aba-select');
		i++;
	}
	$('#RDT-aba-menu-' + menuId).addClass('aba-select');
	scrollLog();
}

// Updater
function R3DITORshowUpdate(){
	$("#menu-topo").css({"display": "none"});
	$("#R3ditor_update").css({"display": "block"});
}
function R3DITORcloseUpdate(){
	$("#menu-topo").css({"display": "block"});
	$("#R3ditor_update").css({"display": "none"});
}
function R3DITORshowUpdateProgress(){
	document.title = APP_NAME + " - Updating...";
	$("#R3ditor_update").css({"display": "none"});
	$("#progress_window").css({"display": "block"});
}
function R3DITOR_movePercent(id, percent, status){
	var p = parseInt(percent);
	if (p < 0){
		p = 0;
	}
	if (p > 100){
		p = 100;
	}
	// Update
	if (id === 0){
		if (status === "" || status === undefined || status === null){
			status = "Message";
		}
		addLog('log', "Process - " + status);
		document.getElementById('update_status').innerHTML = status;
		document.getElementById('update_percent').innerHTML = p + "%";
		$("#update_progressbar").css({"width": p + "%"});
		scrollLog();
	}
	// Wizard
	if (id === 1){
		$("#WZ_progressbar").animate({"width": p + "%"}, {duration: 250, queue: false});
	}
}

/// Run game
function R3DITOR_RUNGAME(id){
	if (id === 0){
		$("#menu-topo-MOD").fadeOut({duration: 100, queue: false});
		$("#RDT_MSG-holder").css({"height": "472px"});
		$("#RDT-item-list").css({"height": "472px"});
		$("#RDT-Item-Edit").css({"height": "458px"});
		$("#RDT_menu-1").css({"height": "528px"});
		$("#RDT_menu-2").css({"height": "528px"});
		$("#RDT_menu-3").css({"height": "528px"});
		$("#RDT-geral").css({"height": "516px"});
		$("#RDT_BG_1").css({"height": "512px"});
		$("#RDT_BG_2").css({"height": "470px"});
		$("#RDT_BG_3").css({"height": "470px"});
		$("#RDT-msgs").css({"height": "516px"});
		$("#RDT-ifm").css({"height": "516px"});
	} else {
		if (EXEC_BIO3_original !== ""){
			$("#btn_run_bio3").css({"display": "inline"});
		}
		if (EXEC_BIO3_MERCE !== ""){
			$("#btn_run_merce").css({"display": "inline"});
		}
		if (EXEC_BIO3_MERCE !== "" || EXEC_BIO3_original !== ""){
			$("#RDT_MSG-holder").css({"height": "430px"});
			$("#RDT-item-list").css({"height": "428px"});
			$("#RDT-Item-Edit").css({"height": "418px"});
			$("#RDT_menu-1").css({"height": "482px"});
			$("#RDT_menu-2").css({"height": "482px"});
			$("#RDT_menu-3").css({"height": "482px"});
			$("#RDT-geral").css({"height": "472px"});
			$("#RDT_BG_1").css({"height": "470px"});
			$("#RDT_BG_2").css({"height": "470px"});
			$("#RDT_BG_3").css({"height": "470px"});
			$("#RDT-msgs").css({"height": "472px"});
			$("#RDT-ifm").css({"height": "472px"});
			$("#menu-topo-MOD").fadeIn({duration: 100, queue: false});
		}
	}
}