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
}

function main_menu(anim){
	localStorage.clear();
	if (anim === 0){ // Voltar
		reload();
	} else {
		$("#menu-topo").css({"display": "none"});
	}
	if (anim === 1){ // Save
		document.title = APP_NAME + " - Editor de Saves (*.sav)";
		$("#menu-topo-save").css({"display": "block"});
	}
	if (anim === 2){ // MSG
		$("#msg-lbl-totalCommands").html(MSG_totalComandos);
		document.title = APP_NAME + " - Editor de Mensagens (*.msg)";
		$("#menu-topo-msg").css({"display": "block"});
		MSG_showMenu(1);
	}
	if (anim === 3){ // RDT
		document.title = APP_NAME + " - Editor de Mapas (*.rdt)";
		$("#menu-topo-RDT").css({"display": "block"});
		
	}
}

function SAVE_showMenu(menuId){
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
			$("#s-menu-general").css({"display": "block", "width": "80%"});
			$("#save-geral").removeClass('none');
			$("#save-geral").css({"height": "550px"});
			$("#menu-info").css({"height": "560px"});
			$("#msg-viewer").addClass('none');
			$("#save-carlos").addClass('none');
			$("#save-jill").addClass('none');
		}
		request_render_save = false;
		scrollLog();
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
	$("#dialog_render").html(DIALOG_SELECT_ITEM);
	hideMenusForDialog();
	$("#lbl-exchange-item").html(ITEM[itemId][0]);
	document.getElementById("btn-item-apply").onclick = function(){
		applyItem(modo, person, pos);
		cancelShowModItem(0);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModPerson(person){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_PERSON);
	hideMenusForDialog();
	$("#lbl-exchange-person").html(PLAYERS[person][0]);
	document.getElementById("btn-item-apply").onclick = function(){
		applyPerson();
		cancelShowModItem(1);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModDificuldade(diff){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_DIFICULDADE);
	hideMenusForDialog();
	$("#lbl-exchange-dificuldade").html(DIFICULDADE[diff][0]);
	document.getElementById("btn-item-apply").onclick = function(){
		applyDificuldade();
		cancelShowModItem(2);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModRoupa(roupa){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_ROUPA);
	hideMenusForDialog();
	$("#lbl-exchange-roupas").html(ROUPA[roupa][0]);
	document.getElementById("btn-item-apply").onclick = function(){
		applyRoupa();
		cancelShowModItem(3);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModSaveCount(nSaves){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_SAVECOUNT);
	hideMenusForDialog();
	$("#lbl-exchange-savecount").html(parseInt("0x" + nSaves));
	document.getElementById("btn-item-apply").onclick = function(){
		applySaveCount();
		cancelShowModItem(4);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModHP(showLife){
	adjustDialogSave(40);
	var ll = showLife.slice(0, 2);
	$("#dialog_render").html(DIALOG_SELECT_HP);
	hideMenusForDialog();
	$("#lbl-exchange-HP").html(parseInt("0x" + ll));
	document.getElementById("btn-item-apply").onclick = function(){
		applyHP();
		cancelShowModItem(5);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModEpilogos(eps){
	adjustDialogSave(37);
	$("#dialog_render").html(DIALOG_SELECT_EPILOGO);
	hideMenusForDialog();
	$("#lbl-exchange-epilogues").html(EPILOGOS[eps][0]);
	document.getElementById("btn-item-apply").onclick = function(){
		applyEpil();
		cancelShowModItem(6);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModIGT(){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_IGT);
	hideMenusForDialog();
	$("#lbl-exchange-IGT").html(hora + ":" + minutos + ":" + segundos);
	document.getElementById("btn-item-apply").onclick = function(){
		makeHexTime();
		cancelShowModItem(7);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModSidepack(person){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_SIDEPACK);
	var pp = undefined;
	var st = undefined;
	if (person === 1){ // J
		pp = "Jill Valentine";
		st = SIDEPACK[jSide][0];
	} else {
		pp = "Carlos Oliveira";
		st = SIDEPACK[cSide][0];
	}
	$("#person-sidepack").html(pp);
	hideMenusForDialog();
	$("#lbl-exchange-sidepack").html(st);
	document.getElementById("btn-item-apply").onclick = function(){
		applySidepack(person);
		cancelShowModItem(8);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModCurrentArma(person){
	adjustDialogSave(34);
	$("#dialog_render").html(DIALOG_SELECT_ARMA);
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
		st = "Nenhuma arma equipada";
	} else {
		st = ITEM[arma][0];
	}
	$("#person-arma").html(pp);
	hideMenusForDialog();
	$("#lbl-exchange-arma").html(st);
	document.getElementById("btn-item-apply").onclick = function(){
		applyArma(person);
		cancelShowModItem(9);
	}
	$("#menu-mod-item").fadeIn({duration: 100, queue: false});
}

function showModPoison(){
	adjustDialogSave(40);
	$("#dialog_render").html(DIALOG_SELECT_POISON);
	hideMenusForDialog();
	$("#lbl-exchange-poison").html(POISON[veneno][0]);
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
	$("#about-r3ditor").fadeIn({duration: 500, queue: false});
}

function closeAbout(){
	$("#about-r3ditor").css({"display": "none"});
	$("#log-programa").css({"display": "block"});
	$("#menu-topo").css({"display": "block"});
}

/// MSG
function MSG_showMenu(id){
	if (id === 1){ // Inicial
		$("#menu-MSG").removeClass("none");
		$("#menu-MSG").css({"display": "block"});
		$("#log-programa").css({"height": "88px"});
		MSG_doTheTitleThing();
	}
}

function MSG_doTheTitleThing(){
	if (ORIGINAL_FILENAME === undefined){
		document.title = APP_NAME + " - Editor / Tradutor de Mensagens";
	} else {
		document.title = APP_NAME + " - Editor / Tradutor de Mensagens - File: " + ORIGINAL_FILENAME;
	}
}

function cleanMSGFields(){
	MSG_arquivoBruto = undefined;
	ORIGINAL_FILENAME = undefined;
	document.getElementById('msg-hex-toTrans').value = "";
	$("#text-msg-hexToASCII").html("");
	$("#div-msg-traduzido").html("");
	$("#text-msg-raw").html("");
}

function MSG_clearHexTextfield(){
	document.getElementById('msg-hex-toTrans').value = "";
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
	// Cancelar Form
	if (id === 0){
		$("#text-msg-events").css({"display": "block"});
		$("#dialog-msg-addcomand").css({"display": "none"});
		$("#dialog-msg-render").html("<!-- Dialogo vazio - por enquanto... -->");
	} else {
		$("#dialog-msg-addcomand").css({"display": "block"});
		$("#text-msg-events").css({"display": "none"});
	}
	// Iniciar Mensagem
	if (id === 1){ 
		$("#dialog-msg-addcomand").css({"top": "192px"});
		$("#msg-addcomand-title").html("Iniciar Mensagem");
		$("#dialog-msg-render").html(DIALOG_MSG_START);
		document.getElementById('msg-comeco-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_STARTMSG(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Finalizar Mensagem
	if (id === 2){
		$("#dialog-msg-addcomand").css({"top": "200px"});
		$("#msg-addcomand-title").html("Finalizar Mensagem");
		$("#dialog-msg-render").html(DIALOG_MSG_END);
		document.getElementById('msg-fim-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ENDMSG(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Texto
	if (id === 3){ 
		$("#dialog-msg-addcomand").css({"top": "90px"});
		$("#msg-addcomand-title").html("Exibir Texto");
		$("#dialog-msg-render").html(DIALOG_MSG_ADDTEXT);
		var correcao = "";
		if (localStorage.getItem('MSG_Mensagem-' + args) !== null){
			args = localStorage.getItem('MSG_Mensagem-' + args);
			correcao = args.replace(new RegExp("<br>", 'gi'), "\n").replace(new RegExp("(Cor Verde)", 'gi'), "[").replace(new RegExp("(Quebra de Linha)", 'gi'), "@").replace(new RegExp("Pausa", 'gi'), "|").replace(new RegExp("(Formatação: Cor Verde)", "gi"), "[").replace(/[{()}]/g, '');
		}
		document.getElementById('msg-txt-toTrans').value = correcao;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDTEXT(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Caracter Especial
	if (id === 4){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		$("#msg-addcomand-title").html("Exibir Caracter Especial");
		$("#dialog-msg-render").html(DIALOG_MSG_ADDCHAR);
		document.getElementById('msg-char-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDCHAR(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Nome de Item
	if (id === 5){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		$("#msg-addcomand-title").html("Exibir Nome de Item");
		$("#dialog-msg-render").html(DIALOG_MSG_NAMEITEM);
		document.getElementById('msg-lblitem-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWITEMNAME(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Reproduzir SE
	if (id === 6){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		$("#msg-addcomand-title").html("Executar SE");
		$("#dialog-msg-render").html(DIALOG_MSG_EXECSE);
		document.getElementById('msg-execse-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_EXECSE(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Trocar Câmera
	if (id === 7){ 
		$("#dialog-msg-addcomand").css({"top": "200px"});
		$("#msg-addcomand-title").html("Trocar Camera");
		$("#dialog-msg-render").html(DIALOG_MSG_SHOWCAMERA);
		document.getElementById('msg-cam-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWCAMERA(index, isMod);
			MSG_renderDialog(0);
		}
	}
}

/// RDT
function RDT_showMenu(id){
	var c = 1;
	while(c < RDT_totalMenus + 1){
		$("#RDT_menu-" + c).css({"display": "none"});
		c++;
	}
	$("#RDT_lbl-totalMaps").html(RDT_totalMapas);
	$("#RDT_lbl-totalFiles").html(RDT_totalFiles);
	$("#RDT_lbl-totalItens").html(RDT_totalItens);
	$("#RDT_lbl-totItens").html(RDT_totalItensGeral);
	$("#RDT-lbl-mapName").html(getFileName(ORIGINAL_FILENAME));
	document.getElementById("RDT-aba-menu-3").value = "Itens, Files e Mapas (" + RDT_totalItensGeral + ")";
	$("#RDT-lbl-FILENAME").html("Arquivo Atual: " + getFileName(ORIGINAL_FILENAME).toUpperCase() + ".rdt");
	$("#menu-RDT").css({"display": "block"});
	$("#RDT_menu-" + id).css({"display": "block"});
	$("#log-programa").css({"height": "86px", "top": "626px"});
	document.title = APP_NAME + " - Editor de Mapas (*.rdt) - " + ORIGINAL_FILENAME;
	RDT_applyMenuFocus(id);
	RDT_Error_Item_404();
}

function RDT_Error_Item_404(){
	if (RDT_totalItensGeral < 1){
		$("#RDT_lbl-totItens").html("0");
		$("#RDT_lbl-totalMaps").html("0");
		$("#RDT_lbl-totalItens").html("0");
		$("#RDT_lbl-totalFiles").html("0");
		$("#RDT-Item-Edit").css({"display": "none"});
		$("#RDT-item-list").css({"display": "none"});
		$("#RDT-item-404").css({"display": "block"});
		document.getElementById("RDT-aba-menu-3").value = "Itens / Files (0)";
	} else {
		$("#RDT-item-404").css({"display": "none"});
		$("#RDT-item-list").css({"display": "block"});
		$("#RDT-Item-Edit").css({"display": "block"});
	}
}

function RDT_applyMenuFocus(menuId){
	RDT_aba_atual = menuId;
	var i = 0;
	while(i < RDT_totalMenus + 1){
		$('#RDT-aba-menu-' + i).removeClass('aba-select');
		i++;
	}
	$('#RDT-aba-menu-' + menuId).addClass('aba-select');
}