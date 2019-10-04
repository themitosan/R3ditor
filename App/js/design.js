/*
	R3ditor - design.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please!
*/
var onMSG = false;
var RDT_aba_atual;
var SAVE_aba_atual;
var RDT_totalMenus = 6;
var SAVE_totalMenus = 4;
var request_render_save;
var l_separador = '<div class="menu-separador separador-log-fix"></div>';
window.onclose = function(){
	localStorage.clear();
	sessionStorage.clear();
	killExternalSoftware();
}
window.onresize = function(){
	window.resizeBy(1340, 733);
}
function reload(){
	process.chdir(TEMP_APP_PATH);
	sessionStorage.clear();
	localStorage.clear();
	location.reload();
}
function scrollLog(){
	document.getElementById("log-programa").scrollTop = document.getElementById("log-programa").scrollHeight;
}
/// General
function main_renderFileList(id){
	var c = 0;
	// RDT Recent
	if (id === 1 && RDT_lastFileOpened !== ""){
		var mFile;
		var imgPreview;
		var origName = "Unknown";
		var origCity = "Unknown";
		var pFile = RDT_lastFileOpened;
		var RDT_name = getFileName(RDT_lastFileOpened).toUpperCase();
		if (fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "00.JPG") === true){
			imgPreview = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "00.JPG";
		} else if (fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "01.JPG") === true){
			imgPreview = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "01.JPG";
		} else {
			imgPreview = APP_PATH + "\\App\\img\\404.png";
		}
		if (fs.existsSync(APP_PATH + "\\Configs\\RDT\\" + RDT_name.toUpperCase() + ".rdtmap") === true){
			mFile = APP_PATH + "\\Configs\\RDT\\" + RDT_name.toUpperCase() + ".rdtmap";
		} else {
			mFile = "There is no map file for this RDT. Open it to generate!";
		}
		if (RDT_locations[RDT_name] !== undefined && RDT_locations[RDT_name] !== null){
			origName = RDT_locations[RDT_name][0];
			origCity = RDT_locations[RDT_name][1];
		}
		if (mFile.length > 44){
			mFile = "..." + mFile.slice(10, mFile.length);
		}
		if (pFile.length > 44){
			pFile = "..." + pFile.slice(10, pFile.length);
		}
		var fileList_HTML_template = '<div class="fileList_item fileList_item_color_a" style="height: 100px;" id="RDT_file_' + c + '"' + 
			' onclick="RDT_openFile(\'' + RDT_lastFileOpened.replace(new RegExp('\\\\', 'gi'), '/') + '\');"><img src="' + imgPreview +'" class="fileList_img" ' + 
			'draggable="false" style="width: 134px;"><div class="fileList_details" style="margin-top: -104px;margin-left: 138px;">File: ' + RDT_name.toUpperCase() + '.RDT<br>Path: ' + pFile +  '<br>Map File: ' + mFile + 
			'<br><div class="menu-separador"></div>Original Local Name: ' + origName + '<br>Original City Location: ' + origCity + '<br></div></div>';
		$("#RDT_recentFile").append(fileList_HTML_template);
		$("#RDT_recentFile").css({"display": "block", "left": "690px", "height": "144px", "width": "630px", "top": "424px", "background-image": "linear-gradient(to bottom, #2d2d2d, #232323)","border-top-left-radius": "0px", "border-bottom-left-radius": "0px"});
	} else {
		document.getElementById("fileListHolder").innerHTML = "";
	}
	// RDT
	if (id === 3){
		document.getElementById('fileList_title').innerHTML = "File List";
		$("#fileListHolder").css({"height": "466px"});
		if (fs.existsSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\") === true && fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\") === true){
			var listRDT = fs.readdirSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\").filter(fn => fn.endsWith(".RDT"));
			if (listRDT.length < 1){
				listRDT = fs.readdirSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\").filter(fn => fn.endsWith(".rdt"));
			}
			while(c < listRDT.length){
				var mFile;
				var imgPreview;
				var origName = "Unknown";
				var origCity = "Unknown";
				var currentRDT = APP_PATH + "\\Assets\\DATA_E\\RDT\\" + listRDT[c];
				var RDT_name = getFileName(currentRDT).toUpperCase();
				if (fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "00.JPG") === true){
					imgPreview = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "00.JPG";
				} else if (fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "01.JPG") === true){
					imgPreview = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + RDT_name.toUpperCase() + "01.JPG";
				} else {
					imgPreview = APP_PATH + "\\App\\img\\404.png";
				}
				if (fs.existsSync(APP_PATH + "\\Configs\\RDT\\" + RDT_name.toUpperCase() + ".rdtmap") === true){
					mFile = APP_PATH + "\\Configs\\RDT\\" + RDT_name.toUpperCase() + ".rdtmap";
				} else {
					mFile = "There is no map file for this RDT. Open it to generate!";
				}
				if (RDT_locations[RDT_name] !== undefined && RDT_locations[RDT_name] !== null){
					origName = RDT_locations[RDT_name][0];
					origCity = RDT_locations[RDT_name][1];
				}
				if (mFile.length > 57){
					mFile = "..." + mFile.slice(10, mFile.length);
				}
				var fileList_HTML_template = '<div class="fileList_item fileList_item_color_a" id="RDT_file_' + c + '"' + 
					' onclick="RDT_openFile(\'' + currentRDT.replace(new RegExp('\\\\', 'gi'), '/') + '\');"><img src="' + imgPreview +'" class="fileList_img" ' + 
					'draggable="false"><div class="fileList_details">File: ' + RDT_name.toUpperCase() + '.RDT<br>Map File: ' + mFile + 
					'<br><div class="menu-separador"></div>Original Local Name: ' + origName + '<br>Original City Location: ' + origCity + '<br></div></div>';
				$("#fileListHolder").append(fileList_HTML_template);
				c++;
			}
			$("#fileListHolder").css({"display": "block"});
			$("#FILELIST_goBackBtn").css({"display": "inline"});
			$("#avaliable_fileList").css({"display": "block", "border-bottom-right-radius": "2px"});
		} else {
			console.warn('WARN - Unable to render FileList!');
			addLog('warn', 'WARN - Unable to render FileList!');
			scrollLog();
		}
	}
	// Save
	if (id === 2){
		$("#fileListHolder").css({"height": "466px"});
		document.getElementById('fileList_title').innerHTML = "Saves";
		if (fs.existsSync(APP_PATH + "\\Assets\\Save\\") === true){
			var SAV_list = fs.readdirSync(APP_PATH + "\\Assets\\Save\\").filter(fn => fn.endsWith(".SAV"));
			if (SAV_list.length < 1){
				SAV_list = fs.readdirSync(APP_PATH + "\\Assets\\Save\\").filter(fn => fn.endsWith(".sav"));
			}
			while (c < SAV_list.length){
				var currentSAV = SAV_list[c];
				var fileList_HTML_template = '<div class="fileList_item fileList_item_color_b" id="SAV_file_' + c + '"' + 
					' onclick="CARREGAR_SAVE(\'' + APP_PATH.replace(new RegExp("\\\\", "gi"), "/") + "/Assets/Save/" + currentSAV + '\');"><img src="' + APP_PATH + '\\App\\img\\SAVICON.png" class="fileList_img" ' + 
					'draggable="false"><div class="fileList_details">File: ' + currentSAV + ' (Mod)<div class="menu-separador"></div>' + 
					'Path: ' + APP_PATH.replace(new RegExp("\\\\", "gi"), "/") + "/Assets/Save/" + currentSAV + '</div>';
				$("#fileListHolder").append(fileList_HTML_template);
				c++;
			}
			c = 0;
			SAV_list = fs.readdirSync(GAME_PATH).filter(fn => fn.endsWith(".SAV"));
			if (SAV_list.length < 1){
				SAV_list = fs.readdirSync(GAME_PATH).filter(fn => fn.endsWith(".sav"));
			}
			while (c < SAV_list.length){
				var currentSAV = SAV_list[c];
				var fileList_HTML_template = '<div class="fileList_item fileList_item_color_c" id="SAV_file_' + c + '"' + 
					' onclick="CARREGAR_SAVE(\'' + GAME_PATH.replace(new RegExp('\\\\', 'gi'), '/') + currentSAV + '\');"><img src="' + APP_PATH + '\\App\\img\\SAVICON.png" class="fileList_img" ' + 
					'draggable="false"><div class="fileList_details">File: ' + currentSAV + ' (Original)<div class="menu-separador"></div>' + 
					'Path: ' + GAME_PATH.replace(new RegExp('\\\\', 'gi'), '/') + currentSAV + '</div>';
				$("#fileListHolder").append(fileList_HTML_template);
				c++;
			}
			$("#avaliable_fileList").css({"display": "block", "height": "428px"});
			$("#fileListHolder").css({"display": "block", "height": "378px"});
		} else {
			console.warn('WARN - Unable to render FileList!');
			addLog('warn', 'WARN - Unable to render FileList!');
			scrollLog();
		}
	}
}
function main_openFileList(){
	$("#avaliable_fileList").css({"display": "block"});
	$("#FILELIST_goBackBtn").css({"display": "inline"});
}
function main_closeFileList(){
	$("#avaliable_fileList").css({"display": "none"});
	$("#FILELIST_goBackBtn").css({"display": "none"});
}
function main_menu(anim){
	localStorage.clear();
	$("#avaliable_fileList").css({"display": "none"});
	if (anim === 0){ // Voltar
		reload();
	} else {
		$("#menu-topo").css({"display": "none"});
		$("#menu-utility").css({"display": "none"});
		$("#menu-utility-aba").css({"display": "none"});
		$("#menu-utility-aba-2").css({"display": "none"});
	}
	if (anim === 1){ // Save
		document.title = APP_NAME + " - Save Editor (*.sav)";
		$("#menu-topo-save").css({"display": "block"});
		main_renderFileList(2);
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
		if (enable_mod === true){
			main_renderFileList(3);
		} else {
			$("#avaliable_fileList").css({"display": "none"});
		}
		RDT_checkBKP();
		if (RDT_lastFileOpened !== ""){
			main_renderFileList(1);
		}
	}
	if (anim === 4){ // FILEGEN
		document.title = APP_NAME + " - File Generator";
		$("#menu-topo-fileEditor").css({"display": "block"});
		$("#FILEGEN_contents").css({"height": "434px"});
		$("#menu-FILEGEN").css({"display": "inline"});
		$("#FILEGEN_holder").css({"height": "474px"});
		$("#FILEGEN_menu").css({"height": "484px"});
	}
}
function RDT_checkBKP(){
	if (RDT_lastBackup !== "" && fs.existsSync(RDT_lastBackup) === true){
		$("#RDT_restoreLastBackup").css({"display": "inline"});
	} else {
		$("#RDT_restoreLastBackup").css({"display": "none"});
	}
}
/// Save
function SAVE_applyMenuFocus(menuId){
	var i = 0; // i? why not c?
	main_closeFileList();
	SAVE_aba_atual = menuId;
	if (GAME_PATH !== "" && GAME_PATH !== undefined){
		$("#SAV_openFileList").css({"display": "inline"});
	}
	while(i < SAVE_totalMenus){
		$('#menu-' + i).removeClass('aba-select');
		i++;
	}
	$('#menu-' + menuId).addClass('aba-select');
	scrollLog();
}
function SAVE_showMenu(menuId){
	main_closeFileList();
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
			$("#save-geral").css({"height": "550px"});
			$("#menu-info").css({"height": "560px"});
			$("#save-geral").removeClass('none');
			$("#save-carlos").addClass('none');
			$("#msg-viewer").addClass('none');
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
		$("#msg-viewer").addClass('none');
		$("#save-carlos").addClass('none');
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
	main_closeFileList();
	adjustDialogSave(40);
	$("#JILL-BOX").empty();
	$("#CARLOS-BOX").empty();
	$("#JILL-LIFESTATUS").removeClass('txt-fine');
	$("#JILL-LIFESTATUS").removeClass('txt-posion');
	$("#JILL-LIFESTATUS").removeClass('txt-danger');
	$("#CARLOS-LIFESTATUS").removeClass('txt-fine');
	$("#JILL-LIFESTATUS").removeClass('txt-caution');
	$("#CARLOS-LIFESTATUS").removeClass('txt-danger');
	$("#CARLOS-LIFESTATUS").removeClass('txt-posion');
	$("#CARLOS-LIFESTATUS").removeClass('txt-caution');
	$("#JILL-LIFESTATUS").removeClass('txt-caution-red');
	$("#CARLOS-LIFESTATUS").removeClass('txt-caution-red');
	while(cu !== to){
		$("#slt-save-" + cu).removeClass("slot-ausente");
		$("#slt-save-" + cu).removeClass("slot-presente");
		cu++;
	}
}
function showModItem(modo, person, pos, itemId){
	main_closeFileList();
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
	document.getElementById("dialog_render").innerHTML = DIALOG_SELECT_HP;
	document.getElementById("lbl-exchange-HP").innerHTML = processBIO3Vars(showLife);
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
	var pp;
	var st;
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
	var pp;
	var st;
	var arma;
	if (person === 1){ // Jill
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
	main_closeFileList();
	if (GAME_PATH !== "" && GAME_PATH !== undefined){
		$("#SAV_openFileList").css({"display": "inline"});
	}
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
	$("#j_box").css({"display": "none"});
	$("#j_box").css({"display": "none"});
	$("#c_box").css({"display": "none"});
	$("#c_info").css({"display": "none"});
	$("#j_info").css({"display": "none"});
	$("#j_invent").css({"display": "none"});
	$("#c_invent").css({"display": "none"});
	$("#JILL-STATUS").css({"display": "none"});
	$("#save-alterar").css({"display": "none"});
	$("#CARLOS-STATUS").css({"display": "none"});
	$("#s-menu-general").css({"display": "none"});
}
function adjustDialogSave(percent){
	main_closeFileList();
	$("#SAV_openFileList").css({"display": "none"});
	$("#menu-mod-item").css({"top": percent + "%"});
}
function log_separador() {
	addLog("log", l_separador);
}
/// About
function showAbout(){
	main_closeFileList();
	$("#menu-topo").css({"display": "none"});
	$("#log-programa").css({"display": "none"});
	$("#menu-utility").css({"display": "none"});
	$("#menu-topo-MOD").css({"display": "none"});
	$("#menu-utility-aba").css({"display": "none"});
	$("#menu-utility-aba-2").css({"display": "none"});
	$("#about-r3ditor").fadeIn({duration: 500, queue: false});
}
/// MSG
function MSG_showMenu(id){
	scrollLog();
	onMSG = true;
	main_closeFileList();
	$("#img-logo").css({"display": "none"});
	$("#menu-topo-MOD").css({"display": "none"});
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
	onMSG = false;
	main_closeFileList();
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
	MSG_clearHexTextfield();
	MSG_arquivoBruto = undefined;
	ORIGINAL_FILENAME = undefined;
	$("#MSG_saveAs").css({"display": "none"});
	$("#MSG_applyMessageRDT").css({"display": "none"});
	document.getElementById("text-msg-raw").innerHTML = "";
	document.getElementById("lbl-msg-length").innerHTML = "0";
}
function MSG_clearHexTextfield(){
	document.getElementById('msg-hex-toTrans').value = "";
}
function MSG_renderMSGLength(totalMsg){
	if (totalMsg === 0){
		$("#MSG_saveAs").css({"display": "none"});
		$("#MSG_applyMessageRDT").css({"display": "none"});
	} else {
		$("#MSG_saveAs").css({"display": "inline"});
		if (RDT_arquivoBruto !== undefined){
			$("#MSG_applyMessageRDT").css({"display": "inline"});
		} else {
			$("#MSG_applyMessageRDT").css({"display": "none"});
		}
	}
}
function MSG_renderDialog(id, args, index, isMod){
	$("#msg-addcomand-confirm").css({"display": "inline"});
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
			$("#btn-goback-rdt").css({"display": "inline"});
		}
	} else {
		$("#MSG_saveAs").css({"display": "none"});
		$("#btn-goback-rdt").css({"display": "none"});
		$("#text-msg-events").css({"display": "none"});
		$("#MSG_applyMessageRDT").css({"display": "none"});
		$("#dialog-msg-addcomand").css({"display": "block"});
	}
	// Iniciar Mensagem
	if (id === 1){
		$("#dialog-msg-addcomand").css({"top": "192px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Start Message / Text Speed";
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
		$("#dialog-msg-addcomand").css({"top": "48px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Show Text";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_ADDTEXT;
		if (localStorage.getItem('MSG_Mensagem-' + args) !== null){
			args = localStorage.getItem('MSG_Mensagem-' + args);
			correcao = args.replace(new RegExp("<br>", 'gi'), "\n").replace(new RegExp("Function: Climax", 'gi'), "#").replace(new RegExp("Yes / No", 'gi'), "*").replace(new RegExp("(Green Color)", 'gi'), "[").replace(new RegExp("(Line Break)", 'gi'), "@").replace(new RegExp("Pause", 'gi'), "|").replace(/[{()}]/g, '').replace(new RegExp("<code><</code>", 'gi'), "<").replace(new RegExp("<code>></code>", 'gi'), ">");
		}
		document.getElementById('msg-txt-toTrans').value = correcao;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDTEXT(index, isMod);
		}
	}
	// Exibir Caracter Especial
	if (id === 4){ 
		if (args === ""){
			args = "ea10";
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
		if (args === ""){
			args = "00";
		}
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
		if (args === ""){
			args = "00";
		}
		$("#dialog-msg-addcomand").css({"top": "200px"});
		document.getElementById("msg-addcomand-title").innerHTML = "Change Camera";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_SHOWCAMERA;
		MSG_seekCameras();
		document.getElementById('msg-cam-id').value = args;
		document.getElementById('msg-selectCam-id').value = args;
		MSG_renderCamPreview();
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWCAMERA(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Comando desconhecido usado em R101.RDT
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
		var splitColor;
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
	// Inserir Hex Manual
	if (id === 10){
		var msgHex;
		if (localStorage.getItem('MSG_comando-' + index) !== null){
			msgHex = localStorage.getItem('MSG_comando-' + index);
		} else {
			msgHex = "";
		}
		$("#dialog-msg-addcomand").css({"top": "126px"});
		$("#msg-addcomand-confirm").css({"display": "none"});
		document.getElementById("msg-addcomand-title").innerHTML = "Insert / Modify Hex";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_INSERTHEX;
		document.getElementById('msg-insertHexManual').innerHTML = msgHex;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_INSERTHEXMANUAL(index, isMod);
		}
		MSG_checkHexLength();
	}
	// Selecionar Opção
	if (id === 11){
		$("#dialog-msg-addcomand").css({"top": "156px"});
		console.log(args);
		document.getElementById("msg-addcomand-title").innerHTML = "Select Option";
		document.getElementById("dialog-msg-render").innerHTML = DIALOG_MSG_SELECTOPTION;
		document.getElementById('msg-selectOption-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SELECTOPTION(index, isMod);
		}
	}
}
function MSG_hideTranslateInput(){
	$("#text-hex-editor").css({"display": "none"});
	$("#MSG_addcomand-menu").css({"height": "562px"});
	$("#MSG_optionTranslate").css({"display": "inline"});
}
function MSG_showTranslateInput(){
	$("#text-hex-editor").css({"display": "inline"});
	$("#MSG_addcomand-menu").css({"height": "350px"});
	$("#MSG_optionTranslate").css({"display": "none"});
}
function MSG_renderCamPreview(){
	if (RDT_arquivoBruto !== undefined && fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\") === true){
		var currentFile = getFileName(ORIGINAL_FILENAME).toUpperCase().slice(0, 4);
		var currentCam = document.getElementById('msg-selectCam-id').value.toUpperCase();
		document.getElementById('MSG_camPreview').src = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + currentFile + currentCam + ".JPG";
		document.getElementById('MSG_camPreview').title = "Cam: " + currentCam + "\nFile: " + currentFile + currentCam + ".JPG";
	}
}
/// RDT
function RDT_showMenu(id){
	var c = 1;
	RDT_loop = 0;
	document.title = APP_NAME + " - Map Editor (*.rdt) - File: " + ORIGINAL_FILENAME;
	$("#img-logo").css({"display": "none"});
	$("#avaliable_fileList").css({"display": "none"});
	if (RDT_lastFileOpened !== ""){
		$("#RDT_recentFile").remove();
	}
	if (enable_mod === true && EXTERNAL_APP_RUNNING === false){
		$("#RDT_openFileList").css({"display": "inline"});
		$("#RDT-canvas-hold").css({"height": "472px"});
		$("#RDT-audio-hold").css({"height": "472px"});
		$("#RDT_MSG-holder").css({"height": "430px"});
		$("#RDT_menu-" + id).css({"height": "482px"});
		$("#RDT-item-list").css({"height": "428px"});
		$("#RDT-Item-Edit").css({"height": "418px"});
		$("#RDT_BG_" + id).css({"height": "470px"});
		$("#RDT-geral").css({"height": "472px"});
		$("#RDT-msgs").css({"height": "472px"});
		$("#RDT-ifm").css({"height": "472px"});
	} else {
		$("#RDT_openFileList").css({"display": "none"});
		$("#RDT-canvas-hold").css({"height": "516px"});
		$("#RDT-audio-hold").css({"height": "516px"});
		$("#RDT_MSG-holder").css({"height": "472px"});
		$("#RDT_menu-" + id).css({"height": "528px"});
		$("#menu-topo-MOD").css({"display": "none"});
		$("#RDT-item-list").css({"height": "472px"});
		$("#RDT-Item-Edit").css({"height": "458px"});
		$("#RDT_BG_" + id).css({"height": "512px"});
		$("#RDT-geral").css({"height": "516px"});
		$("#RDT-msgs").css({"height": "516px"});
		$("#RDT-ifm").css({"height": "516px"});
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
	if (RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()] !== undefined && RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()] !== null){
		document.getElementById('RDT_lbl-localName').innerHTML = RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()][0];
		document.getElementById('RDT_lbl-localCity').innerHTML = RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()][1];
	} else {
		document.getElementById('RDT_lbl-localName').innerHTML = "Unknown";
		document.getElementById('RDT_lbl-localCity').innerHTML = "Unknown";
	}
	var RDT_stage = parseInt(getFileName(ORIGINAL_FILENAME).slice(1, 2)) - 1;
	var RDT_MSG_P = "Undefined - This map don't have any messages!";
	if (RDT_MSG_POINTERS[0] !== undefined){
		RDT_MSG_P = RDT_MSG_POINTERS[0].toUpperCase();
	}
	RDT_checkBKP();
	if (id !== 4){
		$("#RDT-aba-menu-4").css({'display': 'none'});
	}
	$("#RDT_reload").css({"display": "inline"});
	if (EXTERNAL_APP_RUNNING === false){
		$("#RDT-door-Edit").css({"height": "417px"});
		$("#RDT-door-hold").css({"height": "472px"});
		$("#RDT_door_holder").css({"height": "430px"});
		$("#RDT_MSGBLOCKINFO").css({"height": "449px"});
		$("#RDT_audio_holder").css({"height": "430px"});
	}
	$("#RDT_backupBtn").css({"display": "inline"});
	document.getElementById("RDT-item-list").scrollTop = 0;
	document.getElementById("RDT_MSG-holder").scrollTop = 0;
	$("#log-programa").css({"height": "86px", "top": "626px"});
	document.getElementById("RDT_lbl-stage").innerHTML = RDT_stage;
	document.getElementById("RDT-map-select").innerHTML = RDT_EDIT_MAP;
	document.getElementById("RDT_mapFileName").innerHTML = RDT_MAPFILE;
	document.getElementById("RDT-file-select").innerHTML = RDT_EDIT_FILE;
	document.getElementById("RDT-item-select").innerHTML = RDT_EDIT_ITEM;
	document.getElementById("RDT_lbl-msg_pointer").innerHTML = RDT_MSG_P;
	document.getElementById("RDT_lbl_totDoors").innerHTML = RDT_totalDoors;
	document.getElementById("RDT_lbl-totMsg").innerHTML = RDT_totalMessages;
	document.getElementById("RDT_lbl-totalMaps").innerHTML = RDT_totalMapas;
	document.getElementById("RDT_lbl-totalDoors").innerHTML = RDT_totalDoors;
	document.getElementById("RDT_lbl-totalFiles").innerHTML = RDT_totalFiles;
	document.getElementById("RDT_lbl-totalItens").innerHTML = RDT_totalItens;
	document.getElementById("RDT_lbl-totalMsg").innerHTML = RDT_totalMessages;
	document.getElementById("RDT_lbl-totalAudios").innerHTML = RDT_totalAudios;
	document.getElementById("RDT_lbl_totalAudios").innerHTML = RDT_totalAudios;
	document.getElementById("RDT_lbl-totItens").innerHTML = RDT_totalItensGeral;
	document.getElementById("RDT-aba-menu-6").value = "Doors (" + RDT_totalDoors + ")";
	document.getElementById("RDT-aba-menu-5").value = "Audios (" + RDT_totalAudios + ")";
	document.getElementById("RDT-aba-menu-2").value = "Messages (" + RDT_totalMessages + ")";
	document.getElementById("RDT-aba-menu-3").value = "Items, Files and Maps (" + RDT_totalItensGeral + ")";
	document.getElementById("RDT-lbl-FILENAME").innerHTML = getFileName(ORIGINAL_FILENAME).toUpperCase() + ".RDT";
	$("#RDT_menu-" + id).css({"display": "block"});
	$("#menu-RDT").css({"display": "block"});
	RDT_applyMenuFocus(id);
	if (getFileName(ORIGINAL_FILENAME) === "r212" || getFileName(ORIGINAL_FILENAME) === "r20b" || getFileName(ORIGINAL_FILENAME) === "r216"){
		$("#RDT-aba-menu-2").css({"display": "none"});
	}
	RDT_Error_404();
	scrollLog();
}
function RDT_showEditDoor(index, id, hex){
	main_closeFileList();
	RDT_doorShowCamPreview(1);
	document.getElementById('RDT_door-edit-NC').innerHTML = "";
	var nextCam = hex.slice(RANGES["RDT_door-0-doorNextCamNumber"][0], RANGES["RDT_door-0-doorNextCamNumber"][1]);
	var roomNumber = hex.slice(RANGES["RDT_door-0-doorNextRoomNumber"][0], RANGES["RDT_door-0-doorNextRoomNumber"][1]).toUpperCase();
	var realStage = parseInt(parseInt(hex.slice(RANGES["RDT_door-0-doorNextStage"][0], RANGES["RDT_door-0-doorNextStage"][1]), 16) + 1).toString();
	document.getElementById("RDT-lbl-doorEdit-id").innerHTML = id;
	document.getElementById("RDT-lbl-door-index").innerHTML = index;
	document.getElementById('RDT_door-edit-LK').innerHTML = RDT_EDIT_ITEM;
	document.getElementById("RDT_door-edit-LK").value = hex.slice(RANGES["RDT_door-0-doorKey"][0], RANGES["RDT_door-0-doorKey"][1]);
	document.getElementById("RDT_door-edit-X").value = hex.slice(RANGES["RDT_door-0-doorXpos"][0], RANGES["RDT_door-0-doorXpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-Y").value = hex.slice(RANGES["RDT_door-0-doorYpos"][0], RANGES["RDT_door-0-doorYpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-Z").value = hex.slice(RANGES["RDT_door-0-doorZpos"][0], RANGES["RDT_door-0-doorZpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-R").value = hex.slice(RANGES["RDT_door-0-doorRpos"][0], RANGES["RDT_door-0-doorRpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-DT").value = hex.slice(RANGES["RDT_door-0-doorType"][0], RANGES["RDT_door-0-doorType"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-NX").value = hex.slice(RANGES["RDT_door-0-doorNextXpos"][0], RANGES["RDT_door-0-doorNextXpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-NY").value = hex.slice(RANGES["RDT_door-0-doorNextYpos"][0], RANGES["RDT_door-0-doorNextYpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-NZ").value = hex.slice(RANGES["RDT_door-0-doorNextZpos"][0], RANGES["RDT_door-0-doorNextZpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-NR").value = hex.slice(RANGES["RDT_door-0-doorNextRpos"][0], RANGES["RDT_door-0-doorNextRpos"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-NS").value = hex.slice(RANGES["RDT_door-0-doorNextStage"][0], RANGES["RDT_door-0-doorNextStage"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-OO").value = hex.slice(RANGES["RDT_door-0-doorOpenOrient"][0], RANGES["RDT_door-0-doorOpenOrient"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-LF").value = hex.slice(RANGES["RDT_door-0-doorLockedFlag"][0], RANGES["RDT_door-0-doorLockedFlag"][1]).toUpperCase();
	document.getElementById("RDT_door-edit-NRN").value = roomNumber;
	RDT_renderNextRDTLbl();
	document.getElementById("RDT_door-edit-NC").value = nextCam;
	document.getElementById("RDT_door-edit-NC-TXT").value = nextCam.toUpperCase();
	document.getElementById("RDT_lbl_door_editCam").innerHTML = nextCam.toUpperCase();
	document.getElementById('RDT-btn-aplicarDoor').onclick = function(){
		RDT_DOOR_APPLY(index);
	}
	if (enable_mod === true){
		RDT_renderEditDoorCamPreview();
	}
	$("#RDT-door-Edit").css({"display": "block"});
	$("#RDT_door_holder").css({"width": "752px"});
}
function RDT_doorValidadeInput(){
	document.getElementById("RDT_door-edit-LK").value = document.getElementById("RDT_door-edit-LK").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-X").value = document.getElementById("RDT_door-edit-X").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-Y").value = document.getElementById("RDT_door-edit-Y").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-Z").value = document.getElementById("RDT_door-edit-Z").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-R").value = document.getElementById("RDT_door-edit-R").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-NX").value = document.getElementById("RDT_door-edit-NX").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-NY").value = document.getElementById("RDT_door-edit-NY").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-NZ").value = document.getElementById("RDT_door-edit-NZ").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-NR").value = document.getElementById("RDT_door-edit-NR").value.slice(0, 4).toUpperCase();
	document.getElementById("RDT_door-edit-DT").value = document.getElementById("RDT_door-edit-DT").value.slice(0, 2).toUpperCase();
	document.getElementById("RDT_door-edit-NS").value = document.getElementById("RDT_door-edit-NS").value.slice(0, 2).toUpperCase();
	document.getElementById("RDT_door-edit-OO").value = document.getElementById("RDT_door-edit-OO").value.slice(0, 2).toUpperCase();
	document.getElementById("RDT_door-edit-LF").value = document.getElementById("RDT_door-edit-LF").value.slice(0, 2).toUpperCase();
	document.getElementById("RDT_door-edit-NRN").value = document.getElementById("RDT_door-edit-NRN").value.slice(0, 2).toUpperCase();
	document.getElementById("RDT_door-edit-NC-TXT").value = document.getElementById("RDT_door-edit-NC-TXT").value.slice(0, 2).toUpperCase();
}
function RDT_renderNextRDTLbl(){
	//
	var c = 0;
	var rst = parseInt(parseInt(document.getElementById("RDT_door-edit-NS").value) + 1).toString();
	var nrn = document.getElementById("RDT_door-edit-NRN").value;
	if (nrn.length === 2 && rst.length === 1){
		var rComp = "R" + rst.toUpperCase() + nrn.toUpperCase();
		document.getElementById("RDT_lbl_door_nextRDT").innerHTML = rComp + ".RDT";
		var existsRDT = fs.existsSync(APP_PATH + "\\Assets\\DATA_E\\RDT\\" + rComp + ".RDT");
		if (existsRDT === true){
			document.getElementById("RDT_lbl_door_nextRDT").title = RDT_locations[rComp][0] + ", " + RDT_locations[rComp][1];
		} else {
			document.getElementById("RDT_lbl_door_nextRDT").title = "Unknown Location";
		}
		if (enable_mod === true && existsRDT === true){
			document.getElementById('RDT_door-edit-NC').innerHTML = "";
			var DOOR_CAMS_ARRAY = fs.readdirSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\").filter(fn => fn.startsWith(getFileName(rComp).toUpperCase()));
			if (DOOR_CAMS_ARRAY.length !== 0){
				while(c < DOOR_CAMS_ARRAY.length){
					if (DOOR_CAMS_ARRAY[c].indexOf(".SLD") !== -1){
						DOOR_CAMS_ARRAY.splice(c, 1);
					} else {
						var camId = DOOR_CAMS_ARRAY[c].slice(rComp.length, DOOR_CAMS_ARRAY[c].length).replace(".JPG", "");
						$("#RDT_door-edit-NC").append('<option value="' + camId.toUpperCase() + '">Cam ' + camId.toUpperCase() + '</option>');
						c++;
					}
				}
				if (DOOR_CAMS_ARRAY[document.getElementById('RDT_door-edit-NC').value] !== undefined){
					document.getElementById('RDT_door-edit-NC').value = document.getElementById('RDT_lbl_door_editCam').innerHTML;
				} else {
					document.getElementById('RDT_door-edit-NC').value = "00";
				}
				$("#RDT_doorCamPreviewImg").css({"display": "inline"});
			} else {
				$("#RDT_doorCamPreviewImg").css({"display": "none"});
				$("#RDT_door-edit-NC").append('<option disabled>No Cam Avaliable</option>');
			}
			RDT_renderEditDoorCamPreview();
		}
	}
}
function RDT_renderEditDoorCamPreview(){
	var rst = parseInt(parseInt(document.getElementById("RDT_door-edit-NS").value) + 1).toString();
	var nrn = document.getElementById("RDT_door-edit-NRN").value;
	var rComp = "R" + rst.toUpperCase() + nrn.toUpperCase();
	var camFile = APP_PATH + "\\Assets\\DATA_A\\BSS\\" + rComp + document.getElementById('RDT_door-edit-NC').value + ".JPG";
	document.getElementById("RDT_door-edit-NC-TXT").value = document.getElementById('RDT_door-edit-NC').value;
	document.getElementById("RDT_doorCamPreviewImg").src = camFile;
}
function RDT_cancelDoorCamEdit(){
	var pCam = document.getElementById('RDT_lbl_door_editCam').innerHTML;
	document.getElementById("RDT_door-edit-NC-TXT").value = pCam;
	document.getElementById("RDT_door-edit-NC").value = pCam;
	RDT_doorShowCamPreview(1);
}
function RDT_applyDoorCamSelect(){
	if (enable_mod === true){
		document.getElementById('RDT_lbl_door_editCam').innerHTML = document.getElementById("RDT_door-edit-NC").value;
	} else {
		document.getElementById('RDT_lbl_door_editCam').innerHTML = document.getElementById("RDT_door-edit-NC-TXT").value;
	}
	RDT_doorShowCamPreview(1);
}
function RDT_doorShowCamPreview(mode){
	if (mode === 0){
		$("#RDT_applyDoorDiv").css({"display": "none"});
		$("#RDT-door-edit-form").css({"display": "none"});
		$("#RDT_applyDoorCamDiv").css({"display": "block"});
		$("#RDT_doorCamPrevewDiv").css({"display": "block"});
	} else {
		$("#RDT_doorCamPrevewDiv").css({"display": "none"});
		$("#RDT_applyDoorCamDiv").css({"display": "none"});
		$("#RDT-door-edit-form").css({"display": "block"});
		$("#RDT_applyDoorDiv").css({"display": "block"});
	}
}
function TRANSFER_RDT_TO_MSG(){
	main_closeFileList();
	document.title = APP_NAME + " - Transfering message...";
	$("#menu-RDT").css({"display": "none"});
	$("#MSG_hexPrev").css({"height": "122px"});
	$("#menu-topo-MOD").css({"display": "none"});
	$("#menu-topo-RDT").css({"display": "none"});
	$("#RDT_openInHex").css({"display": "none"});
	$("#MSG_openInHex").css({"display": "none"});
	$("#menu-topo-msg").css({"display": "block"});
	$("#RDT_MSG_NUMBER").css({"display": "inline"});
	$("#btn-goback-rdt").css({"display": "inline"});
	$("#MSG_RDT_BLOCKUSAGE").css({"display": "block"});
	$("#MSG_applyMessageRDT").css({"display": "inline"});
	document.getElementById('RDT_MSG-holder').innerHTML = " ";
	document.getElementById('MSG_saveAs').value = 'Save as MSG';
	MSG_showMenu(1);
	MSG_hideTranslateInput();
	$("#MSG_optionTranslate").css({"display": "none"});
}
function RDT_BG_display(){
	if (enable_mod === true){
		var c = 0;
		var found = false;
		while (c < 9){
			if (fs.existsSync(APP_PATH + "\\Assets\\DATA_A\\BSS\\" + getFileName(ORIGINAL_FILENAME).toUpperCase() + "0" + c + ".JPG")){
				found = true;
				var d = 1;
				while(d < parseInt(RDT_totalMenus + 1)){
					$("#RDT_BG_" + d).css({"background-image": "url(../Assets/DATA_A/BSS/" + getFileName(ORIGINAL_FILENAME).toUpperCase() + "0" + c + ".JPG)", "filter": "blur(2px)", "opacity": "1"});
					$("#RDT_BG_" + d).fadeIn({duration: 500, queue: false});
					d++;
				}
				break;
			} else {
				c++;
			}
		}
		if (found === false){
			var e = 1;
			while(e < parseInt(RDT_totalMenus + 1)){
				$("#RDT_BG_" + e).css({"background-image": "url(img/404.png)", "filter": "blur(6px)", "opacity": "1"});
				e++;
			}
		}
	}
}
function RDT_Error_404(){
	if (RDT_totalMessages < 1){
		$("#RDT_MSG-holder").css({"display": "none"});
		$("#RDT-aba-menu-2").css({"display": "none"});
	} else {
		$("#RDT_MSG-holder").css({"display": "block"});
	}
	if (RDT_totalItensGeral < 1){
		$("#RDT-item-list").css({"display": "none"});
		$("#RDT-aba-menu-3").css({"display": "none"});
	} else {
		$("#RDT-item-list").css({"display": "block"});
		$("#RDT-aba-menu-3").css({"display": "inline"});
	}
	if (RDT_totalAudios < 1){
		$("#RDT-aba-menu-5").css({'display': 'none'});
	} else {
		$("#RDT-aba-menu-5").css({'display': 'inline'});
	}
}
function RDT_displayItemEdit(id, hex, posX, posY, posZ, posR, anim, index, quant, header){
	main_closeFileList();
	$("#RDT_openFileList").css({"display": "none"});
	var nome;
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
		$("#RDT_btnEditPos").css({"top": "174px"});
	}
	// File
	if (id === 2){
		nome = FILES[hex][0];
		document.getElementById('RDT-file-select').value = hex;
		$("#RDT-edit-file-select").removeClass("none");
		$("#RDT-edit-item-select").addClass("none");
		$("#RDT-edit-map-select").addClass("none");
		$("#RDT_btnEditPos").css({"top": "140px"});
	}
	// Map
	if (id === 3){
		nome = RDT_MAPAS[hex][0];
		document.getElementById('RDT-map-select').value = hex;
		$("#RDT-edit-map-select").removeClass("none");
		$("#RDT-edit-file-select").addClass("none");
		$("#RDT-edit-item-select").addClass("none");
		$("#RDT_btnEditPos").css({"top": "140px"});
	}
	document.getElementById("RDT-lbl-edit-index").innerHTML = parseInt(index + 1);
	document.getElementById('RDT_item-edit-X').innerHTML = posX.toUpperCase();
	document.getElementById('RDT_item-edit-Y').innerHTML = posY.toUpperCase();
	document.getElementById('RDT_item-edit-Z').innerHTML = posZ.toUpperCase();
	document.getElementById('RDT_item-edit-R').innerHTML = posR.toUpperCase();
	document.getElementById('RDT_item-edit-A').value = anim.toUpperCase();
	document.getElementById("RDT-lbl-item-edit").innerHTML = nome;
	document.getElementById('RDT_item-edit-Quant').value = quant;
	document.getElementById('RDT-btn-aplicarItem').onclick = function(){
		RDT_ITEM_APPLY(index, id, false);
	}
	document.getElementById('RDT_applyConvertItem').onclick = function(){
		RDT_ITEM_APPLY(index, id, true);
	}
	document.getElementById('RDT_canvas_btn_apply').onclick = function(){
		RDT_hideCanvasTab();
		$("#RDT_editItemBtn_" + index).trigger('click');
	}
	$("#RDT_item_X").css({"display": "block"});
	$("#RDT_item_Y").css({"display": "block"});
	$("#RDT_item_Z").css({"display": "block"});
	$("#RDT_item_R").css({"display": "block"});
	$("#RDT-item-list").css({"width": "622px"});
	$("#RDT-Item-Edit").css({"display": "block"});
	if (header === "68"){
		$("#RDT_btnEditPos").css({"display": "none"});
	} else {
		$("#RDT_btnEditPos").css({"display": "block"});
	}
}
function RDT_editItemCancel(){
	main_closeFileList();
	if (enable_mod === true){
		$("#RDT_openFileList").css({"display": "inline"});
	}
	$("#RDT-item-list").css({"width": "auto"});
	$("#RDT-Item-Edit").css({"display": "none"});
	$("#RDT-door-Edit").css({"display": "none"});
	$("#RDT_door_holder").css({"width": "auto"});
	document.getElementById('RDT_item-edit-A').value = "";
	document.getElementById('RDT_door-edit-X').value = "";
	document.getElementById('RDT_door-edit-Y').value = "";
	document.getElementById('RDT_door-edit-Z').value = "";
	document.getElementById('RDT_door-edit-R').value = "";
	document.getElementById('RDT_door-edit-NX').value = "";
	document.getElementById('RDT_door-edit-NY').value = "";
	document.getElementById('RDT_door-edit-NZ').value = "";
	document.getElementById('RDT_door-edit-NR').value = "";
	document.getElementById('RDT_door-edit-DT').value = "";
	document.getElementById('RDT_door-edit-NS').value = "";
	document.getElementById('RDT_door-edit-NC').value = "";
	document.getElementById('RDT_door-edit-LF').value = "";
	document.getElementById('RDT_door-edit-OO').value = "";
	document.getElementById('RDT_door-edit-NRN').value = "";
	document.getElementById('RDT_item-edit-X').innerHTML = "";
	document.getElementById('RDT_item-edit-Y').innerHTML = "";
	document.getElementById('RDT_item-edit-Z').innerHTML = "";
	document.getElementById('RDT_item-edit-R').innerHTML = "";
	document.getElementById('RDT_item-edit-Quant').value = "";
	document.getElementById('RDT_door-edit-LK').innerHTML = "";
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
function RDT_showCanvasTab(){
	$("#RDT-aba-menu-4").css({'display': 'inline'});
	RDT_selectPoint(RDT_selectedPoint);
	RDT_showMenu(4);
}
// Updater
function R3DITORshowUpdate(){
	$("#menu-topo").css({"display": "none"});
	$("#menu-utility").css({"display": "none"});
	$("#menu-topo-MOD").css({"display": "none"});
	$("#menu-utility-aba").css({"display": "none"});
	$("#R3ditor_update").css({"display": "block"});
}
function R3DITORcloseUpdate(){
	$("#R3ditor_update").css({"display": "none"});
	$("#menu-utility-aba").css({"display": "block"});
	$("#menu-utility").css({"display": "block"});
	$("#menu-topo").css({"display": "block"});
	if (EXEC_BIO3_original !== ""){
		$("#menu-topo-MOD").css({"display": "block"});
	}
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
	var c = 0;
	if (onMSG === false){
		if (id === 0){
			$("#menu-topo-MOD").fadeOut({duration: 100, queue: false});
			while(c < parseInt(RDT_totalMenus + 1)){
				$("#RDT_menu-" + c).css({"height": "528px"});
				$("#RDT_BG_" + c).css({"height": "512px"});
				c++;
			}
			$("#FILEGEN_contents").css({"height": "474px"});
			$("#RDT_MSGBLOCKINFO").css({"height": "493px"});
			$("#RDT_audio_holder").css({"height": "472px"});
			$("#RDT_door_holder").css({"height": "482px"});
			$("#RDT-canvas-hold").css({"height": "516px"});
			$("#RDT-audio-hold").css({"height": "516px"});
			$("#RDT_MSG-holder").css({"height": "472px"});
			$("#FILEGEN_holder").css({"height": "516px"});
			$("#RDT-door-hold").css({"height": "518px"});
			$("#RDT-item-list").css({"height": "472px"});
			$("#RDT-Item-Edit").css({"height": "458px"});
			$("#RDT-door-Edit").css({"height": "463px"});
			$("#FILEGEN_menu").css({"height": "526px"});
			$("#RDT-geral").css({"height": "516px"});
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
				while(c < parseInt(RDT_totalMenus + 1)){
					$("#RDT_menu-" + c).css({"height": "482px"});
					$("#RDT_BG_" + c).css({"height": "470px"});
					c++;
				}
				$("#FILEGEN_contents").css({"height": "434px"});
				$("#RDT_MSGBLOCKINFO").css({"height": "449px"});
				$("#RDT_audio_holder").css({"height": "430px"});
				$("#RDT_door_holder").css({"height": "430px"});
				$("#RDT-canvas-hold").css({"height": "472px"});
				$("#RDT-audio-hold").css({"height": "472px"});
				$("#RDT_MSG-holder").css({"height": "430px"});
				$("#FILEGEN_holder").css({"height": "474px"});
				$("#RDT-door-Edit").css({"height": "417px"});
				$("#RDT-door-hold").css({"height": "472px"});
				$("#RDT-item-list").css({"height": "428px"});
				$("#RDT-Item-Edit").css({"height": "418px"});
				$("#FILEGEN_menu").css({"height": "484px"});
				$("#RDT-geral").css({"height": "472px"});
				$("#RDT-msgs").css({"height": "472px"});
				$("#RDT-ifm").css({"height": "472px"});
				$("#menu-topo-MOD").fadeIn({duration: 100, queue: false});
			}
		}
	}
}